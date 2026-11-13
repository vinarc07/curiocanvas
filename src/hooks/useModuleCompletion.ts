import { useCallback, useState } from 'react';
import { useStudentProgress } from '@/hooks/useStudentData';
import type { ProgressField } from '@/lib/studentBackend';

export function useModuleCompletion(topicSlug: string, field: ProgressField) {
  const { status, error: loadError, getTopicProgress, saveProgress } = useStudentProgress();
  const completed = Boolean(getTopicProgress(topicSlug)?.[field]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const setCompletion = useCallback(
    async (value: boolean) => {
      setSaving(true);
      setSaveError(null);
      try {
        await saveProgress(topicSlug, field, value);
      } catch (err) {
        setSaveError(err instanceof Error ? err.message : 'Progress could not be saved. Please try again.');
      } finally {
        setSaving(false);
      }
    },
    [saveProgress, topicSlug, field],
  );

  return { status, loadError, completed, saving, saveError, setCompletion };
}
