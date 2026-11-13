
import type {
  GeneratedTopic,
  ProgressField,
  RegistrationInput,
  SearchEntry,
  StudentBackend,
  StudentProfile,
  TopicProgress,
} from '@/lib/studentBackend';
import { STUDENT_API_URL, SUPABASE_ANON_KEY } from '@/lib/config';
import type { TopicContent } from '@/content/types';

type ProgressColumn =
  | 'textbook_completed'
  | 'drawing_completed'
  | 'observation_completed';

const FIELD_COLUMNS: Record<ProgressField, ProgressColumn> = {
  textbookCompleted: 'textbook_completed',
  drawingCompleted: 'drawing_completed',
  observationCompleted: 'observation_completed',
};

async function callStudentApi<T>(
  action: string,
  payload: Record<string, unknown>,
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(STUDENT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ action, ...payload }),
    });
  } catch {
    throw new Error(
      'Could not reach the CurioCanvas server. Check your internet connection and try again.',
    );
  }

  let body: unknown;

  try {
    body = await response.json();
  } catch {
    throw new Error('The server sent an unexpected response. Please try again.');
  }

  if (!response.ok) {
    const message =
      typeof body === 'object' &&
      body !== null &&
      'error' in body
        ? String(body.error)
        : '';

    throw new Error(message || `Request failed (${response.status}).`);
  }

  if (typeof body !== 'object' || body === null) {
    throw new Error('The server sent an unexpected response. Please try again.');
  }

  return body as T;
}

interface ApiProgressRow {
  topic: string;
  textbookCompleted: boolean;
  drawingCompleted: boolean;
  observationCompleted: boolean;
  updatedAt: string;
}

interface ApiSearchRow {
  id: string;
  topic: string;
  searchedAt: string;
}

const isStudentProfile = (value: unknown): value is StudentProfile =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as StudentProfile).id === 'string' &&
  typeof (value as StudentProfile).studentName === 'string' &&
  typeof (value as StudentProfile).schoolName === 'string' &&
  typeof (value as StudentProfile).registrationNumber === 'string';

const isProgressRow = (value: unknown): value is ApiProgressRow =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as ApiProgressRow).topic === 'string' &&
  typeof (value as ApiProgressRow).textbookCompleted === 'boolean';

export const supabaseStudentBackend: StudentBackend = {
  mode: 'supabase',

  async register(input: RegistrationInput) {
    const result = await callStudentApi<{
      student?: unknown;
      created?: unknown;
    }>('register', { ...input });

    if (
      !isStudentProfile(result.student) ||
      typeof result.created !== 'boolean'
    ) {
      throw new Error(
        'The server returned incomplete student details. Please try again.',
      );
    }

    return { student: result.student, created: result.created };
  },

  async recordSearch(registrationNumber, topic) {
    await callStudentApi<{ ok: boolean }>('recordSearch', {
      registrationNumber,
      topic,
    });
  },

  async listSearches(registrationNumber) {
    const result = await callStudentApi<{ searches?: ApiSearchRow[] }>(
      'listSearches',
      { registrationNumber },
    );

    const rows = Array.isArray(result.searches) ? result.searches : [];

    return rows.map((row): SearchEntry => ({
      id: row.id,
      topic: row.topic,
      searchedAt: row.searchedAt,
    }));
  },

  async listProgress(registrationNumber) {
    const result = await callStudentApi<{ progress?: unknown[] }>(
      'listProgress',
      { registrationNumber },
    );

    const rows = Array.isArray(result.progress) ? result.progress : [];

    return rows.filter(isProgressRow) as TopicProgress[];
  },

  async saveProgress(registrationNumber, topic, field, value) {
    const result = await callStudentApi<{ progress?: unknown }>(
      'saveProgress',
      {
        registrationNumber,
        topic,
        field: FIELD_COLUMNS[field],
        value,
      },
    );

    if (!isProgressRow(result.progress)) {
      throw new Error(
        'The server returned incomplete progress details. Please try again.',
      );
    }

    return result.progress as TopicProgress;
  },

  async cacheTopicContent(registrationNumber, content: TopicContent) {
    await callStudentApi<{ ok: boolean }>('cacheTopicContent', {
      registrationNumber,
      topic: content.title,
      textbookContent: content.textbook,
      drawingSteps: content.drawingSteps,
    });
  },

  async generateTopic(registrationNumber, topic): Promise<GeneratedTopic> {
    const result = await callStudentApi<{
      topic?: unknown;
      content?: unknown;
      source?: unknown;
    }>('generateTopic', {
      registrationNumber,
      topic,
    });

    if (
      typeof result.topic !== 'string' ||
      typeof result.content !== 'string' ||
      result.source !== 'gemini'
    ) {
      throw new Error('Gemini returned an incomplete lesson. Please try again.');
    }

    return {
      topic: result.topic,
      content: result.content,
      source: 'gemini',
    };
  },
};
