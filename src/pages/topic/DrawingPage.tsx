
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Box,
  CheckCircle2,
  Eraser,
  Lightbulb,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { SketchCanvas } from '@/components/drawing/SketchCanvas';
import { HumanHeartDiagram } from '@/components/topic/HumanHeartDiagram';
import { TopicSvg } from '@/components/topic/TopicSvg';
import { Button } from '@/components/ui/Button';
import { Notice } from '@/components/ui/Notice';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { RichText } from '@/components/ui/RichText';

import type { DrawStage } from '@/content/types';
import { useModuleCompletion } from '@/hooks/useModuleCompletion';
import { useTopic } from '@/hooks/useTopic';

const SKETCH_COLOURS = [
  '#3A004D',
  '#8B4F67',
  '#C2185B',
  '#2E7D5B',
];

const SKETCH_WIDTHS = [2, 5, 9];
const ZOOM_MIN = 0.75;
const ZOOM_MAX = 2;
const ZOOM_STEP = 0.25;
const STEP_COUNT = 5;

export default function DrawingPage() {
  const topic = useTopic();

  const [step, setStep] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [colour, setColour] = useState(SKETCH_COLOURS[0]);
  const [lineWidth, setLineWidth] = useState(SKETCH_WIDTHS[1]);
  const [sketchKey, setSketchKey] = useState(0);

  const {
    status,
    loadError,
    completed,
    saving,
    saveError,
    setCompletion,
  } = useModuleCompletion(topic.slug, 'drawingCompleted');

  const current = topic.drawingSteps[step - 1];
  const isLast = step === STEP_COUNT;
  const progressValue = (step / STEP_COUNT) * 100;

  const resetCanvas = () => {
    setSketchKey((value) => value + 1);
    setZoom(1);
  };

  const changeStep = (nextStep: number) => {
    setStep(Math.max(1, Math.min(STEP_COUNT, nextStep)));
  };

  return (
    <div className="space-y-8">

      {/* Drawing progress */}
      <section className="glass space-y-5 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-mauve">
              Drawing lesson
            </p>
            <p className="text-lg font-bold text-plum">
              Step {step} of {STEP_COUNT}
            </p>
          </div>

          <div className="flex gap-2" role="tablist" aria-label="Drawing steps">
            {Array.from({ length: STEP_COUNT }, (_, index) => {
              const stepNumber = index + 1;
              const active = stepNumber === step;

              return (
                <button
                  key={stepNumber}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => changeStep(stepNumber)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-200 ${
                    active
                      ? 'scale-110 bg-plum text-ivory shadow-soft'
                      : stepNumber < step
                        ? 'bg-mauve/80 text-ivory hover:bg-mauve'
                        : 'bg-white text-plum ring-1 ring-blush hover:ring-dusty'
                  }`}
                >
                  {stepNumber}
                </button>
              );
            })}
          </div>
        </div>

        <ProgressBar value={progressValue} />
      </section>

      {/* Instructions and diagrams */}
      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">

        {/* Current drawing instructions */}
        <motion.section
          key={`copy-${step}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass flex flex-col gap-6 p-6 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-plum to-mauve text-2xl font-bold text-ivory shadow-soft">
              {step}
            </span>

            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-mauve">
                Step {step}
              </p>
              <h2 className="text-2xl font-bold text-plum">
                {current.title}
              </h2>
            </div>
          </div>

          <p className="text-base leading-[1.5] text-plum/90">
            <RichText text={current.instructions} />
          </p>

          <div className="flex gap-3 rounded-2xl border border-dusty/40 bg-gradient-to-br from-blush/60 to-white/70 p-5">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-mauve" />
            <p className="text-sm leading-relaxed text-plum">
              <span className="font-semibold">Tip: </span>
              <RichText text={current.tip} />
            </p>
          </div>

          <div className="mt-auto rounded-2xl border border-blush bg-white/60 p-4">
            <p className="text-sm font-semibold text-plum">
              Drawing guide
            </p>
            <p className="mt-1 text-sm leading-relaxed text-mauve">
              Follow the reference diagram on the right. Each step adds
              more anatomical details to the illustration.
            </p>
          </div>
        </motion.section>

        {/* Reference and personal sketch */}
        <div className="space-y-6">

          {/* Reference diagram */}
          <section className="glass space-y-4 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-plum">
                  Reference diagram
                </h3>
                <p className="text-xs text-mauve">
                  Step-by-step anatomical illustration
                </p>
              </div>

              <div className="flex items-center gap-2">
                <IconButton
                  label="Zoom out"
                  disabled={zoom <= ZOOM_MIN}
                  onClick={() =>
                    setZoom((value) =>
                      Math.max(ZOOM_MIN, value - ZOOM_STEP)
                    )
                  }
                >
                  <ZoomOut className="h-4 w-4" />
                </IconButton>

                <span className="w-12 text-center text-sm font-semibold text-plum">
                  {Math.round(zoom * 100)}%
                </span>

                <IconButton
                  label="Zoom in"
                  disabled={zoom >= ZOOM_MAX}
                  onClick={() =>
                    setZoom((value) =>
                      Math.min(ZOOM_MAX, value + ZOOM_STEP)
                    )
                  }
                >
                  <ZoomIn className="h-4 w-4" />
                </IconButton>

                <IconButton
                  label="Reset zoom"
                  onClick={() => setZoom(1)}
                >
                  <RotateCcw className="h-4 w-4" />
                </IconButton>
              </div>
            </div>

            <div className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-blush/50 bg-white/90 p-4">
              <motion.div
                animate={{ scale: zoom }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
                className="w-full"
              >
                {topic.slug === 'human-heart' ? (
                  <HumanHeartDiagram
                    stage={step as DrawStage}
                    className="mx-auto h-auto w-full max-w-lg"
                  />
                ) : (
                  <TopicSvg
                    topic={topic}
                    stage={step as DrawStage}
                    className="mx-auto h-auto w-full max-w-md"
                    title={`${topic.title} diagram at step ${step}`}
                  />
                )}
              </motion.div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-mauve">
              <span>
                Shows the parts drawn up to this step.
              </span>

              <button
                type="button"
                onClick={() => setStep(STEP_COUNT)}
                className="font-semibold text-plum underline-offset-4 hover:underline"
              >
                View completed diagram
              </button>
            </div>
          </section>

          {/* Personal sketch canvas */}
          <section className="glass space-y-4 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-plum">
                  Your sketch
                </h3>
                <p className="text-xs text-mauve">
                  Draw the diagram yourself
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">

                {/* Pen colours */}
                <div className="flex items-center gap-2" role="radiogroup" aria-label="Pen colour">
                  {SKETCH_COLOURS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={colour === value}
                      aria-label={`Pen colour ${value}`}
                      onClick={() => setColour(value)}
                      style={{ backgroundColor: value }}
                      className={`h-7 w-7 rounded-full transition-transform duration-200 hover:scale-110 ${
                        colour === value
                          ? 'ring-2 ring-plum ring-offset-2 ring-offset-white'
                          : ''
                      }`}
                    />
                  ))}
                </div>

                {/* Pen thickness */}
                <div className="flex items-center gap-2" role="radiogroup" aria-label="Pen thickness">
                  {SKETCH_WIDTHS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={lineWidth === value}
                      aria-label={`Pen thickness ${value}`}
                      onClick={() => setLineWidth(value)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                        lineWidth === value
                          ? 'bg-plum/10 ring-1 ring-plum'
                          : 'hover:bg-blush/50'
                      }`}
                    >
                      <span
                        className="rounded-full bg-plum"
                        style={{
                          width: value * 2 + 2,
                          height: value * 2 + 2,
                        }}
                      />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={resetCanvas}
                  className="inline-flex items-center gap-2 rounded-xl border border-blush bg-white/80 px-3 py-2 text-sm font-semibold text-plum transition-colors hover:border-dusty"
                >
                  <Eraser className="h-4 w-4" />
                  Reset canvas
                </button>
              </div>
            </div>

            <SketchCanvas
              key={sketchKey}
              colour={colour}
              lineWidth={lineWidth}
            />
          </section>
        </div>
      </div>

      {/* Step navigation */}
      <div className="glass flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant="secondary"
          onClick={() => changeStep(step - 1)}
          disabled={step === 1}
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          Previous step
        </Button>

        {isLast ? (
          <Button
            onClick={() => void setCompletion(!completed)}
            disabled={saving || status !== 'ready'}
            icon={<CheckCircle2 className="h-4 w-4" />}
          >
            {saving
              ? 'Saving...'
              : completed
                ? 'Mark as not completed'
                : 'Mark drawing as completed'}
          </Button>
        ) : (
          <Button
            onClick={() => changeStep(step + 1)}
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Next step
          </Button>
        )}
      </div>

      {status === 'error' && (
        <Notice tone="error" title="Progress unavailable">
          {loadError}
        </Notice>
      )}

      {saveError && (
        <Notice tone="error" title="Progress was not saved">
          {saveError}
        </Notice>
      )}

      {/* Module links */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          to="../textbook"
          relative="path"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-blush bg-white/80 px-5 py-3 text-sm font-semibold text-plum transition-all hover:-translate-y-0.5 hover:border-dusty"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Textbook
        </Link>

        <Link
          to="../observe"
          relative="path"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-plum to-mauve px-5 py-3 text-sm font-semibold text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glass"
        >
          <Box className="h-4 w-4" />
          Next: 3D Observation
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-blush bg-white/80 text-plum transition-colors hover:border-dusty disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}
