import type { TopicContent } from '@/content/types';
import { animalCell } from '@/content/topics/animalCell';
import { cat } from '@/content/topics/cat';
import { dog } from '@/content/topics/dog';
import { humanBrain } from '@/content/topics/humanBrain';
import { humanHeart } from '@/content/topics/humanHeart';
import { photosynthesis } from '@/content/topics/photosynthesis';
import { plantAnatomy } from '@/content/topics/plantAnatomy';
import { solarSystem } from '@/content/topics/solarSystem';
import { volcano } from '@/content/topics/volcano';
import { waterCycle } from '@/content/topics/waterCycle';

export const TOPICS: TopicContent[] = [
  humanHeart,
  solarSystem,
  photosynthesis,
  humanBrain,
  waterCycle,
  animalCell,
  dog,
  cat,
  volcano,
  plantAnatomy,
];

export const SUGGESTED_TOPIC_SLUGS = TOPICS.map((topic) => topic.slug);

export const findTopicBySlug = (slug: string | undefined): TopicContent | undefined =>
  TOPICS.find((topic) => topic.slug === slug);

const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, ' ');

export function matchTopic(query: string): TopicContent | undefined {
  const q = normalize(query);
  if (!q) return undefined;

  const exact = TOPICS.find(
    (topic) => normalize(topic.title) === q || topic.aliases.some((alias) => normalize(alias) === q),
  );
  if (exact) return exact;

  if (q.length < 3) return undefined;

  return TOPICS.find((topic) => {
    const title = normalize(topic.title);
    return q.includes(title) || title.includes(q) || topic.aliases.some((alias) => q.includes(normalize(alias)));
  });
}
