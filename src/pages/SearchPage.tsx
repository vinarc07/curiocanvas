
import { motion } from 'framer-motion';
import { ArrowLeft, Search, SearchX, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchBar } from '@/components/search/SearchBar';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Notice } from '@/components/ui/Notice';
import { useStudent } from '@/context/StudentContext';
import { TOPICS, matchTopic } from '@/content/topics';
import { studentBackend } from '@/lib/backend';
import { validateTopicQuery } from '@/lib/validation';

type Phase = 'searching' | 'missing' | 'generated' | 'error';

function FormattedLesson({ content }: { content: string }) {
  return (
    <div className="space-y-4 break-words text-sm leading-7 text-plum sm:text-base">
      {content.split(/\r?\n/).map((line, index) => {
        const trimmed = line.trim();

        if (!trimmed || trimmed === '---') return null;

        const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);

        if (heading) {
          const title = heading[2].replace(/\*\*/g, '');

          if (heading[1].length === 1) {
            return (
              <h2 key={index} className="pt-4 text-xl font-bold text-plum">
                {title}
              </h2>
            );
          }

          return (
            <h3 key={index} className="pt-3 text-lg font-bold text-plum">
              {title}
            </h3>
          );
        }

        const numbered = trimmed.match(/^\d+\.\s+(.+)$/);
        const bullet = trimmed.match(/^[-*]\s+(.+)$/);

        if (numbered || bullet) {
          return (
            <p key={index} className="pl-4">
              <span className="mr-2 font-semibold text-mauve">
                {numbered ? `${trimmed.match(/^\d+/)?.[0]}.` : '•'}
              </span>
              <span>{(numbered?.[1] ?? bullet?.[1] ?? '').replace(/\*\*/g, '')}</span>
            </p>
          );
        }

        const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);

        return (
          <p key={index}>
            {parts.map((part, partIndex) =>
              part.startsWith('**') && part.endsWith('**') ? (
                <strong key={partIndex}>
                  {part.slice(2, -2)}
                </strong>
              ) : (
                <span key={partIndex}>{part}</span>
              ),
            )}
          </p>
        );
      })}
    </div>
  );
}

export default function SearchPage() {
  const navigate = useNavigate();
  const { student } = useStudent();
  const [searchParams] = useSearchParams();

  const query = (searchParams.get('q') ?? '').trim();
  const validationError = validateTopicQuery(query);

  const [phase, setPhase] = useState<Phase>('searching');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [attempt, setAttempt] = useState(0);

  const startedRef = useRef<string | null>(null);

  useEffect(() => {
    if (validationError || !student) return;

    const runKey = `${query}#${attempt}`;
    if (startedRef.current === runKey) return;

    startedRef.current = runKey;

    const topic = matchTopic(query);
    const registrationNumber = student.registrationNumber;

    const run = async () => {
      setPhase('searching');
      setErrorMessage(null);
      setGeneratedContent('');
      setGeneratedTitle('');

      try {
        await studentBackend.recordSearch(
          registrationNumber,
          topic?.title ?? query,
        );

        // Existing CurioCanvas topics use their original lessons.
        if (topic) {
          await studentBackend
            .cacheTopicContent(registrationNumber, topic)
            .catch(() => undefined);

          navigate(`/topic/${topic.slug}/textbook`, { replace: true });
          return;
        }

        // New topics are generated using Gemini.
        if (!studentBackend.generateTopic) {
          throw new Error(
            'Gemini search is unavailable in the current backend. Please check your Supabase configuration.',
          );
        }

        const generated = await studentBackend.generateTopic(
          registrationNumber,
          query,
        );

        setGeneratedTitle(generated.topic);
        setGeneratedContent(generated.content);
        setPhase('generated');
      } catch (err) {
        setErrorMessage(
          err instanceof Error
            ? err.message
            : 'The search could not be completed.',
        );
        setPhase('error');
      }
    };

    void run();
  }, [query, attempt, validationError, student, navigate]);

  const retry = () => {
    startedRef.current = null;
    setAttempt((value) => value + 1);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-5">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-mauve transition-colors hover:text-plum"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <SearchBar initialQuery={query} />
      </div>

      {validationError && (
        <Notice tone="error" title="This search cannot be used">
          {validationError}
        </Notice>
      )}

      {!validationError && phase === 'searching' && (
        <SearchingState query={query} />
      )}

      {!validationError && phase === 'error' && (
        <Notice
          tone="error"
          title="The search did not finish"
          action={
            <Button variant="secondary" onClick={retry}>
              <Search className="h-4 w-4" />
              Try again
            </Button>
          }
        >
          {errorMessage}
        </Notice>
      )}

      {!validationError && phase === 'missing' && (
        <div className="glass p-6 sm:p-10">
          <EmptyState
            icon={SearchX}
            title="No matching topic yet"
            description={`We do not have a lesson for "${query}" in the CurioCanvas library yet.`}
            action={
              <ul className="flex flex-wrap justify-center gap-3">
                {TOPICS.map((topic) => (
                  <li key={topic.slug}>
                    <Link
                      to={`/topic/${topic.slug}/textbook`}
                      className="rounded-full border border-blush bg-white/80 px-4 py-2 text-sm font-medium text-plum transition-all hover:-translate-y-0.5 hover:border-dusty hover:shadow-soft"
                    >
                      {topic.title}
                    </Link>
                  </li>
                ))}
              </ul>
            }
          />
        </div>
      )}

      {!validationError && phase === 'generated' && (
        <section className="glass space-y-6 p-6 sm:p-10">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blush/60 p-3">
              <Sparkles className="h-6 w-6 text-plum" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-mauve">
                AI-generated lesson
              </p>
              <h1 className="text-2xl font-bold text-plum">
                {generatedTitle}
              </h1>
            </div>
          </div>

          <div className="rounded-2xl border border-blush/70 bg-white/70 p-5 sm:p-7">
            <FormattedLesson content={generatedContent} />
          </div>

          <p className="text-xs leading-5 text-mauve">
            This lesson was generated by AI. Check important facts with your
            textbook or teacher.
          </p>

          <Button
            variant="secondary"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Button>
        </section>
      )}
    </div>
  );
}

function SearchingState({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass flex flex-col items-center gap-6 p-10 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="relative h-24 w-24">
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-blush border-t-plum"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.span
          className="absolute inset-4 rounded-full bg-gradient-to-br from-dusty to-mauve"
          animate={{ scale: [0.85, 1, 0.85] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="space-y-2">
        <p className="text-lg font-semibold text-plum">
          Searching for &ldquo;{query}&rdquo;
        </p>
        <p className="text-sm text-mauve">
          Checking the CurioCanvas library. If the topic is new, Gemini will
          prepare a lesson for you.
        </p>
      </div>
    </motion.div>
  );
}
