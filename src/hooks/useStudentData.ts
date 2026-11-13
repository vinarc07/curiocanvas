import { useCallback, useEffect, useState } from 'react';
import { useStudent } from '@/context/StudentContext';
import { studentBackend } from '@/lib/backend';
import type { ProgressField, SearchEntry, TopicProgress } from '@/lib/studentBackend';

interface ProgressState {
  status: 'loading' | 'ready' | 'error';
  items: TopicProgress[];
  error: string | null;
}

export function useStudentProgress() {
  const { student } = useStudent();
  const registrationNumber = student?.registrationNumber ?? '';
  const [state, setState] = useState<ProgressState>({ status: 'loading', items: [], error: null });

  const reload = useCallback(async () => {
    setState((current) => ({ ...current, status: 'loading', error: null }));
    try {
      const items = await studentBackend.listProgress(registrationNumber);
      setState({ status: 'ready', items, error: null });
    } catch (err) {
      setState((current) => ({
        ...current,
        status: 'error',
        error: err instanceof Error ? err.message : 'Progress could not be loaded.',
      }));
    }
  }, [registrationNumber]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const saveProgress = useCallback(
    async (topic: string, field: ProgressField, value: boolean) => {
      const row = await studentBackend.saveProgress(registrationNumber, topic, field, value);
      setState((current) => ({
        ...current,
        items: [row, ...current.items.filter((item) => item.topic !== topic)],
      }));
      return row;
    },
    [registrationNumber],
  );

  const getTopicProgress = useCallback(
    (topic: string) => state.items.find((item) => item.topic === topic),
    [state.items],
  );

  return { ...state, reload, saveProgress, getTopicProgress };
}

export function useSearchHistory() {
  const { student } = useStudent();
  const registrationNumber = student?.registrationNumber ?? '';
  const [state, setState] = useState<{ status: 'loading' | 'ready' | 'error'; items: SearchEntry[]; error: string | null }>({
    status: 'loading',
    items: [],
    error: null,
  });

  useEffect(() => {
    let active = true;
    studentBackend
      .listSearches(registrationNumber)
      .then((items) => {
        if (active) setState({ status: 'ready', items, error: null });
      })
      .catch((err: unknown) => {
        if (active) {
          setState({
            status: 'error',
            items: [],
            error: err instanceof Error ? err.message : 'Search history could not be loaded.',
          });
        }
      });
    return () => {
      active = false;
    };
  }, [registrationNumber]);

  return state;
}
