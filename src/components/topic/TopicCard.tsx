
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { TopicContent } from '@/content/types';
import { TopicSvg } from './TopicSvg';

interface TopicCardProps {
  topic: TopicContent;
  index?: number;
}

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

export function TopicCard({ topic, index = 0 }: TopicCardProps) {
  const image = topicImages[topic.slug];
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      {/* Topic illustration */}
      <div className="relative flex aspect-[5/3] items-center justify-center overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-100">

        {image && !imageFailed ? (
          <img
            key={image}
            src={image}
            alt={`${topic.title} educational illustration`}
            className="relative z-10 h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            loading="eager"
            onError={() => {
              console.error('Failed to load topic image:', image);
              setImageFailed(true);
            }}
          />
        ) : (
          <TopicSvg
            topic={topic}
            stage={5}
            className="relative z-10 h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}

        {/* Category */}
        <span className="absolute left-4 top-4 z-20 rounded-lg border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
          {topic.category}
        </span>

        {/* Bottom label */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between bg-gradient-to-t from-white/95 via-white/80 to-transparent px-5 pb-4 pt-10">
          <span className="text-xs font-medium text-slate-500">
            Interactive learning
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition group-hover:border-violet-200 group-hover:bg-violet-50 group-hover:text-violet-700">
            <ArrowRight className="h-4 w-4 transition-transform group-hover:-rotate-45" />
          </span>
        </div>
      </div>

      {/* Topic details */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold tracking-tight text-slate-900">
          {topic.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">
          {topic.summary}
        </p>

        <Link
          to={`/topic/${topic.slug}/textbook`}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-700"
        >
          Explore topic
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
