
import { motion } from 'framer-motion';
import { BookOpen, Brush, Box, ArrowRight, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TOPICS } from '@/content/topics';
import { useStudentProgress } from '@/hooks/useStudentData';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Notice } from '@/components/ui/Notice';
import { useStudent } from '@/context/StudentContext';

export default function LearningPage() {
  const { student } = useStudent();
  const progress = useStudentProgress();

  const completed = progress.items.reduce(
    (sum, item) =>
      sum +
      [item.textbookCompleted, item.drawingCompleted, item.observationCompleted]
        .filter(Boolean).length,
    0
  );

  const total = TOPICS.length * 3;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="space-y-8">
      <section className="glass space-y-3 p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-mauve">
          Your learning journey
        </p>
        <h1 className="text-3xl font-bold text-plum sm:text-4xl">
          My Learning
        </h1>
        <p className="text-mauve">
          Keep exploring, {student?.studentName}.
          Your completed lessons and progress appear here.
        </p>
        <div className="max-w-xl pt-3">
          <ProgressBar
            value={percentage}
            label={`${completed} of ${total} learning modules completed`}
          />
        </div>
      </section>

      {progress.status === 'loading' && (
        <p className="text-mauve">Loading your learning progress...</p>
      )}

      {progress.status === 'error' && (
        <Notice tone="error" title="Progress unavailable">
          {progress.error}
        </Notice>
      )}

      <section className="grid gap-5 sm:grid-cols-3">
        {[
          { icon: BookOpen, label: 'Textbook lessons', field: 'textbookCompleted' as const },
          { icon: Brush, label: 'Drawing lessons', field: 'drawingCompleted' as const },
          { icon: Box, label: '3D observations', field: 'observationCompleted' as const },
        ].map(({ icon: Icon, label, field }) => {
          const count = progress.items.filter((item) => item[field]).length;
          return (
            <div key={field} className="glass space-y-3 p-6">
              <Icon className="h-7 w-7 text-mauve" />
              <p className="text-sm text-mauve">{label}</p>
              <p className="text-3xl font-bold text-plum">
                {count}/{TOPICS.length}
              </p>
            </div>
          );
        })}
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <Trophy className="h-6 w-6 text-mauve" />
          <h2 className="text-2xl font-bold text-plum">Your topics</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {TOPICS.map((topic, index) => {
            const item = progress.items.find((p) => p.topic === topic.slug);
            const count = item
              ? [
                  item.textbookCompleted,
                  item.drawingCompleted,
                  item.observationCompleted,
                ].filter(Boolean).length
              : 0;

            return (
              <motion.article
                key={topic.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="glass flex items-center justify-between gap-4 p-5"
              >
                <div>
                  <h3 className="font-bold text-plum">{topic.title}</h3>
                  <p className="mt-1 text-xs text-mauve">
                    {count}/3 modules completed
                  </p>
                  <div className="mt-3 w-48 max-w-full">
                    <ProgressBar value={(count / 3) * 100} />
                  </div>
                </div>
                <Link
                  to={`/topic/${topic.slug}`}
                  className="flex shrink-0 items-center gap-2 rounded-xl bg-plum px-4 py-3 text-sm font-semibold text-white transition hover:bg-mauve"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
