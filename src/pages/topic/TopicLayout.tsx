
import { motion } from 'framer-motion';
import { ArrowLeft, Box, Brush, BookOpen } from 'lucide-react';
import { NavLink, Outlet, useParams, Link } from 'react-router-dom';
import { TopicSvg } from '@/components/topic/TopicSvg';
import { Notice } from '@/components/ui/Notice';
import { findTopicBySlug } from '@/content/topics';

const TABS = [
  { to: 'textbook', label: 'Textbook', icon: BookOpen },
  { to: 'drawing', label: 'Drawing', icon: Brush },
  { to: 'observe', label: '3D Observation', icon: Box },
];

const topicImages: Record<string, string> = {
  'human-heart': '/images/topics/human-heart.png',
  'solar-system': '/images/topics/solar-system.png',
  'photosynthesis': '/images/topics/photosynthesis.png',
  'human-brain': '/images/topics/human-brain.png',
  'water-cycle': '/images/topics/water-cycle.png',
  'animal-cell': '/images/topics/animal-cell.png',
  'dog': '/images/topics/dog.png',
  'cat': '/images/topics/cat.png',
  'volcano': '/images/topics/volcano.png',
  'plant-anatomy': '/images/topics/plant-anatomy.png',
};

export default function TopicLayout() {
  const { slug } = useParams();
  const topic = findTopicBySlug(slug);

  if (!topic) {
    return (
      <div className="space-y-6">
        <Notice tone="error" title="Topic not found">
          We could not find that topic in the library. Try searching for it again.
        </Notice>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-sm font-semibold text-mauve hover:text-plum"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse all topics
        </Link>
      </div>
    );
  }

  const topicImage = topicImages[topic.slug];

  return (
    <div className="space-y-8">
      <header className="glass relative overflow-hidden p-6 sm:p-8">
        <div
          aria-hidden
          className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${topic.accent} opacity-25 blur-3xl`}
        />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-sm font-semibold text-mauve transition-colors hover:text-plum"
            >
              <ArrowLeft className="h-4 w-4" />
              All topics
            </Link>

            <div className="space-y-2">
              <span className="inline-block rounded-full bg-blush/70 px-3 py-1 text-xs font-semibold text-plum">
                {topic.category}
              </span>

              <h1 className="text-3xl font-bold text-plum sm:text-4xl">
                {topic.title}
              </h1>

              <p className="max-w-xl text-mauve">
                {topic.summary}
              </p>
            </div>
          </div>

          {/* Topic image */}
          <div className="flex h-40 w-56 shrink-0 items-center justify-center self-center md:h-44 md:w-64">
            {topicImage ? (
              <img
                src={topicImage}
                alt={`${topic.title} educational illustration`}
                className="h-full w-full object-contain"
                loading="eager"
              />
            ) : (
              <TopicSvg
                topic={topic}
                stage={5}
                className="h-full w-full"
              />
            )}
          </div>
        </div>

        <nav
          aria-label="Learning modules"
          className="relative mt-8 flex flex-wrap gap-2 rounded-2xl bg-white/50 p-1.5"
        >
          {TABS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className="relative flex-1 rounded-xl px-4 py-2.5 text-center text-sm font-semibold text-plum transition-colors hover:text-mauve sm:flex-none sm:px-6"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="topic-tab"
                      className="absolute inset-0 rounded-xl bg-plum shadow-soft"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}

                  <span
                    className={`relative flex items-center justify-center gap-2 ${
                      isActive ? 'text-ivory' : ''
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </header>

      <Outlet context={topic} />
    </div>
  );
}
