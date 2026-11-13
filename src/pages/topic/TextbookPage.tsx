import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Box, Brush, CheckCircle2, CircleDot, Home } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Notice } from '@/components/ui/Notice';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { RichText } from '@/components/ui/RichText';
import { SkeletonBlock } from '@/components/ui/Skeleton';
import type { TopicContent } from '@/content/types';
import { useModuleCompletion } from '@/hooks/useModuleCompletion';
import { useTopic } from '@/hooks/useTopic';

const SECTIONS = [
  'Introduction',
  'Definition',
  'Explanation',
  'Structure',
  'Functions',
  'Characteristics',
  'Examples',
  'Key Points',
  'Summary',
] as const;

export default function TextbookPage() {
  const topic = useTopic();
  const [index, setIndex] = useState(0);
  const { status, loadError, completed, saving, saveError, setCompletion } = useModuleCompletion(topic.slug, 'textbookCompleted');
  const isLast = index === SECTIONS.length - 1;

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-4 lg:sticky lg:top-8 lg:self-start">
        <div className="glass space-y-4 p-5">
          <ProgressBar value={((index + 1) / SECTIONS.length) * 100} label={`Section ${index + 1} of ${SECTIONS.length}`} />
          <ol className="hidden space-y-1 lg:block">
            {SECTIONS.map((section, sectionIndex) => {
              const active = sectionIndex === index;
              return (
                <li key={section}>
                  <button
                    type="button"
                    onClick={() => setIndex(sectionIndex)}
                    aria-current={active ? 'step' : undefined}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      active ? 'bg-plum font-semibold text-ivory' : 'text-plum hover:bg-blush/50'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        active ? 'bg-ivory text-plum' : 'bg-blush text-plum'
                      }`}
                    >
                      {sectionIndex + 1}
                    </span>
                    {section}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="glass p-5">
          {status === 'loading' && <SkeletonBlock className="h-14" />}
          {status === 'error' && <Notice tone="error" title="Progress unavailable">{loadError}</Notice>}
          {status === 'ready' && (
            <p className="flex items-center gap-2 text-sm font-semibold text-plum">
              {completed ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  Textbook completed
                </>
              ) : (
                <>
                  <CircleDot className="h-5 w-5 text-dusty" />
                  Textbook in progress
                </>
              )}
            </p>
          )}
        </div>
      </aside>

      <section className="glass flex min-h-[420px] flex-col p-6 sm:p-10">
        <Notice tone="info">
          This lesson comes from the built-in CurioCanvas library. Live AI-written lessons are not connected in this version.
        </Notice>

        <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-mauve">
          Section {index + 1} of {SECTIONS.length}
        </p>
        <h2 className="mt-2 text-2xl font-bold text-plum sm:text-3xl">{SECTIONS[index]}</h2>

        <div className="mt-6 flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 text-base leading-[1.5] text-plum/90"
            >
              <SectionBody topic={topic} sectionIndex={index} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-blush/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="secondary" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0} icon={<ArrowLeft className="h-4 w-4" />}>
            Previous
          </Button>
          {isLast ? (
            <Button
              onClick={() => void setCompletion(!completed)}
              disabled={saving || status !== 'ready'}
              icon={<CheckCircle2 className="h-4 w-4" />}
            >
              {saving ? 'Saving...' : completed ? 'Mark as not completed' : 'Mark textbook as completed'}
            </Button>
          ) : (
            <Button onClick={() => setIndex((value) => Math.min(SECTIONS.length - 1, value + 1))} icon={<ArrowRight className="h-4 w-4" />}>
              Next
            </Button>
          )}
        </div>

        {saveError && (
          <div className="mt-4">
            <Notice tone="error" title="Progress was not saved">{saveError}</Notice>
          </div>
        )}
      </section>

      <div className="flex flex-col gap-3 sm:flex-row lg:col-span-2">
        <Link to="/dashboard" className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-blush bg-white/80 px-5 py-3 text-sm font-semibold text-plum transition-all hover:-translate-y-0.5 hover:border-dusty">
          <Home className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <Link to="../drawing" relative="path" className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-plum to-mauve px-5 py-3 text-sm font-semibold text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glass">
          <Brush className="h-4 w-4" />
          Start Drawing Lesson
        </Link>
        <Link to="../observe" relative="path" className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-plum to-mauve px-5 py-3 text-sm font-semibold text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glass">
          <Box className="h-4 w-4" />
          Explore in 3D
        </Link>
      </div>
    </div>
  );
}

function SectionBody({ topic, sectionIndex }: { topic: TopicContent; sectionIndex: number }) {
  const { textbook } = topic;
  switch (sectionIndex) {
    case 0:
      return <p><RichText text={textbook.introduction} /></p>;
    case 1:
      return <p><RichText text={textbook.definition} /></p>;
    case 2:
      return (
        <>
          {textbook.explanation.map((paragraph) => (
            <p key={paragraph}><RichText text={paragraph} /></p>
          ))}
        </>
      );
    case 3:
      return (
        <dl className="grid gap-3 sm:grid-cols-2">
          {textbook.structure.map((item) => (
            <div key={item.term} className="rounded-2xl border border-blush/80 bg-white/70 p-4">
              <dt className="font-semibold text-plum">{item.term}</dt>
              <dd className="mt-1 text-sm text-mauve">{item.meaning}</dd>
            </div>
          ))}
        </dl>
      );
    case 4:
      return <BulletList items={textbook.functions} />;
    case 5:
      return <BulletList items={textbook.characteristics} />;
    case 6:
      return <BulletList items={textbook.examples} />;
    case 7:
      return (
        <ol className="space-y-3">
          {textbook.keyPoints.map((point, pointIndex) => (
            <li key={point} className="flex gap-4 rounded-2xl bg-white/60 p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-plum text-xs font-bold text-ivory">
                {pointIndex + 1}
              </span>
              <span><RichText text={point} /></span>
            </li>
          ))}
        </ol>
      );
    default:
      return (
        <>
          <p><RichText text={topic.summary} /></p>
          <p className="text-mauve">
            You have reached the end of this lesson. Mark it as completed to record your progress, then try the drawing or 3D lesson.
          </p>
        </>
      );
  }
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-mauve to-dusty" />
          <span><RichText text={item} /></span>
        </li>
      ))}
    </ul>
  );
}
