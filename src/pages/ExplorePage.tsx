
import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';
import { SearchBar } from '@/components/search/SearchBar';
import { TopicCard } from '@/components/topic/TopicCard';
import { TOPICS } from '@/content/topics';

export default function ExplorePage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 pb-10">

      {/* Header */}
      <header className="space-y-6">

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-700 shadow-sm"
        >
          <Compass className="h-3.5 w-3.5" />
          Explore
        </motion.div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Explore every topic
          </h1>

          <p className="max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Discover science, nature and the world around you.
            Learn through interactive lessons, drawing exercises
            and 3D models.
          </p>
        </div>

        {/* Search */}
        <div className="w-full">
          <SearchBar />
        </div>

      </header>

      {/* Topic section */}
      <section className="space-y-6">

        <div className="flex flex-wrap items-center justify-between gap-3">

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              All topics
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose a topic and start learning.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-2 text-xs font-medium text-violet-700">
            <Sparkles className="h-3.5 w-3.5" />
            Interactive learning
          </div>

        </div>

        {/* Topic cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          {TOPICS.map((topic, index) => (
            <motion.div
              key={topic.slug}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 12,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.35,
                ease: 'easeOut',
              }}
            >
              <TopicCard
                topic={topic}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>

      </section>

    </div>
  );
}
