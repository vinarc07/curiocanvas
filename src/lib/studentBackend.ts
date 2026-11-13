
import type { TopicContent } from '@/content/types';

export interface StudentProfile {
  id: string;
  studentName: string;
  schoolName: string;
  registrationNumber: string;
}

export interface RegistrationInput {
  studentName: string;
  schoolName: string;
  registrationNumber: string;
}

export interface SearchEntry {
  id: string;
  topic: string;
  searchedAt: string;
}

export type ProgressField = 'textbookCompleted' | 'drawingCompleted' | 'observationCompleted';

export interface TopicProgress {
  topic: string;
  textbookCompleted: boolean;
  drawingCompleted: boolean;
  observationCompleted: boolean;
  updatedAt: string;
}

export interface GeneratedTopic {
  topic: string;
  content: string;
  source: 'gemini';
}

export interface StudentBackend {
  readonly mode: 'supabase' | 'demo';
  register(input: RegistrationInput): Promise<{ student: StudentProfile; created: boolean }>;
  recordSearch(registrationNumber: string, topic: string): Promise<void>;
  listSearches(registrationNumber: string): Promise<SearchEntry[]>;
  listProgress(registrationNumber: string): Promise<TopicProgress[]>;
  saveProgress(
    registrationNumber: string,
    topic: string,
    field: ProgressField,
    value: boolean,
  ): Promise<TopicProgress>;
  cacheTopicContent(registrationNumber: string, content: TopicContent): Promise<void>;

  // Optional so the existing demo backend does not need to change.
  generateTopic?(
    registrationNumber: string,
    topic: string,
  ): Promise<GeneratedTopic>;
}
