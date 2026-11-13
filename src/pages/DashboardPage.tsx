
import { motion } from 'framer-motion';
import {
  BookOpen,
  Box,
  Brush,
  Compass,
  History,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SkeletonBlock } from '@/components/ui/Skeleton';
import { Notice } from '@/components/ui/Notice';
import { SearchBar } from '@/components/search/SearchBar';
import { TopicCard } from '@/components/topic/TopicCard';
import { useStudent } from '@/context/StudentContext';
import {
  SUGGESTED_TOPIC_SLUGS,
  TOPICS,
  findTopicBySlug,
} from '@/content/topics';
import type { TopicContent } from '@/content/types';
import { isDemoMode } from '@/lib/backend';
import {
  useSearchHistory,
  useStudentProgress,
} from '@/hooks/useStudentData';

const MODULES = [
  {
    icon: BookOpen,
    title: 'Textbook',
    text: 'Understand every topic through structured lessons and clear explanations.',
  },
  {
    icon: Brush,
    title: 'Drawing',
    text: 'Learn diagrams step by step and practice drawing them yourself.',
  },
  {
    icon: Box,
    title: '3D Observation',
    text: 'Explore interactive models, rotate them, and discover their parts.',
  },
];

export default function DashboardPage() {
  const { student } = useStudent();
  const progress = useStudentProgress();
  const history = useSearchHistory();

  const firstName = student?.studentName.split(' ')[0] ?? 'there';

  const suggested = SUGGESTED_TOPIC_SLUGS
    .map(findTopicBySlug)
    .filter((topic): topic is TopicContent => Boolean(topic));

  const completedSteps = progress.items.reduce(
    (total, item) =>
      total +
      [
        item.textbookCompleted,
        item.drawingCompleted,
        item.observationCompleted,
      ].filter(Boolean).length,
    0,
  );

  const overall = Math.round(
    (completedSteps / (TOPICS.length * 3)) * 100,
  );

  const recent =
    history.status === 'ready'
      ? [...new Set(history.items.map((entry) => entry.topic))].slice(0, 6)
      : [];

  return (
    <div className="mx-auto max-w-7xl space-y-12 pb-10">

      {/* Welcome section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">

        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-100 blur-3xl"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-indigo-50 blur-3xl"
        />

        <div className="relative space-y-6">

          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
            <Sparkles className="h-3.5 w-3.5" />
            {student?.schoolName}
          </div>

          <div className="space-y-3">

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            >
              Welcome back, {firstName}
              <span className="text-violet-600">.</span>
            </motion.h1>

            <p className="max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Discover science, explore interactive diagrams, and learn
              something new today.
            </p>

          </div>

          {/* Wider search box */}
          <div className="w-full max-w-5xl">
            <SearchBar />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-violet-600" />
              Learn
            </span>

            <span className="text-slate-300">/</span>

            <span className="flex items-center gap-1.5">
              <Brush className="h-3.5 w-3.5 text-violet-600" />
              Draw
            </span>

            <span className="text-slate-300">/</span>

            <span className="flex items-center gap-1.5">
              <Box className="h-3.5 w-3.5 text-violet-600" />
              Explore in 3D
            </span>
          </div>

        </div>
      </section>

      {/* Suggested topics */}
      <section className="space-y-6">

        <div className="flex flex-wrap items-end justify-between gap-4">

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">
              Discover
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Suggested topics
            </h2>

            <p className="text-sm text-slate-500">
              Start exploring something interesting.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
          >
            View all topics
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {suggested.map((topic, index) => (
            <TopicCard
              key={topic.slug}
              topic={topic}
              index={index}
            />
          ))}
        </div>

      </section>

      {/* Activity and progress */}
      <section className="grid gap-5 lg:grid-cols-2">

        {/* Recent searches */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <History className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recently searched
              </h2>

              <p className="text-xs text-slate-500">
                Continue exploring your previous topics.
              </p>
            </div>

          </div>

          {history.status === 'loading' && (
            <SkeletonBlock className="h-24" />
          )}

          {history.status === 'error' && (
            <Notice
              tone="error"
              title="Search history unavailable"
            >
              {history.error}
            </Notice>
          )}

          {history.status === 'ready' && recent.length === 0 && (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
              Your recent searches will appear here.
            </p>
          )}

          {recent.length > 0 && (
            <ul className="flex flex-wrap gap-2.5">
              {recent.map((topic) => (
                <li key={topic}>
                  <Link
                    to={`/search?q=${encodeURIComponent(topic)}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                  >
                    <History className="h-3.5 w-3.5" />
                    {topic}
                  </Link>
                </li>
              ))}
            </ul>
          )}

        </div>

        {/* Learning progress */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Compass className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Learning progress
              </h2>

              <p className="text-xs text-slate-500">
                Your completed learning activities.
              </p>
            </div>

          </div>

          {progress.status === 'loading' && (
            <SkeletonBlock className="h-28" />
          )}

          {progress.status === 'error' && (
            <Notice
              tone="error"
              title="Progress unavailable"
            >
              {progress.error}
            </Notice>
          )}

          {progress.status === 'ready' && (
            <div className="space-y-4">

              <ProgressBar
                value={overall}
                label={`${completedSteps} of ${TOPICS.length * 3} steps completed`}
              />

              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">
                  Overall completion
                </span>

                <span className="text-lg font-bold text-violet-700">
                  {overall}%
                </span>
              </div>

              <p className="text-sm leading-6 text-slate-500">
                {completedSteps === 0
                  ? 'Complete a textbook, drawing, or 3D lesson to start tracking your progress.'
                  : 'Keep learning. Every completed activity brings you closer to your goal.'}
              </p>

            </div>
          )}

          {isDemoMode && (
            <p className="mt-4 text-xs text-slate-400">
              Demo mode: progress is saved in this browser.
            </p>
          )}

        </div>

      </section>

      {/* Learning modules */}
      <section className="space-y-6">

        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">
            Learning experience
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Three ways to learn
          </h2>

          <p className="text-sm text-slate-500">
            Every topic brings reading, drawing, and interactive exploration together.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          {MODULES.map(({ icon: Icon, title, text }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-700 transition group-hover:bg-violet-100">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mb-2 text-lg font-bold text-slate-900">
                {title}
              </h3>

              <p className="mb-5 text-sm leading-6 text-slate-500">
                {text}
              </p>

              <Link
                to="/explore"
                className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition hover:gap-3"
              >
                Choose a topic
                <ArrowRight className="h-4 w-4" />
              </Link>

            </motion.div>
          ))}

        </div>

      </section>

    </div>
  );
}
