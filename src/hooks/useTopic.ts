import { useOutletContext } from 'react-router-dom';
import type { TopicContent } from '@/content/types';

export function useTopic() {
  return useOutletContext<TopicContent>();
}
