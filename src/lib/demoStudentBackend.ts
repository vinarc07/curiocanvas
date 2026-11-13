import type { TopicContent } from '@/content/types';
import type {
  ProgressField,
  RegistrationInput,
  SearchEntry,
  StudentBackend,
  StudentProfile,
  TopicProgress,
} from '@/lib/studentBackend';

const STORAGE_KEY = 'curiocanvas.demo-database.v1';

interface StoredStudent extends StudentProfile {
  createdAt: string;
}

interface StoredSearch extends SearchEntry {
  registrationNumber: string;
}

interface StoredProgress extends TopicProgress {
  registrationNumber: string;
}

interface DemoDatabase {
  students: StoredStudent[];
  searches: StoredSearch[];
  progress: StoredProgress[];
  content: Record<string, { textbookContent: unknown; drawingSteps: unknown }>;
}

const emptyDatabase = (): DemoDatabase => ({ students: [], searches: [], progress: [], content: {} });

function readDatabase(): DemoDatabase {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyDatabase();
    const parsed = JSON.parse(raw) as Partial<DemoDatabase>;
    return {
      students: Array.isArray(parsed.students) ? parsed.students : [],
      searches: Array.isArray(parsed.searches) ? parsed.searches : [],
      progress: Array.isArray(parsed.progress) ? parsed.progress : [],
      content: parsed.content && typeof parsed.content === 'object' ? parsed.content : {},
    };
  } catch {
    return emptyDatabase();
  }
}

function writeDatabase(database: DemoDatabase) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(database));
}

const normalizeRegistration = (value: string) => value.trim().replace(/\s+/g, ' ').toUpperCase();
const sameText = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

const toProgress = (row: StoredProgress): TopicProgress => ({
  topic: row.topic,
  textbookCompleted: row.textbookCompleted,
  drawingCompleted: row.drawingCompleted,
  observationCompleted: row.observationCompleted,
  updatedAt: row.updatedAt,
});

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `demo-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const demoStudentBackend: StudentBackend = {
  mode: 'demo',

  async register(input: RegistrationInput) {
    const database = readDatabase();
    const reg = normalizeRegistration(input.registrationNumber);
    const existing = database.students.find((student) => student.registrationNumber === reg);

    if (existing) {
      const sameDetails = sameText(existing.studentName, input.studentName) && sameText(existing.schoolName, input.schoolName);
      if (!sameDetails) {
        throw new Error(
          'This registration number is already linked to a different student. Check the details and try again.',
        );
      }
      return {
        student: { id: existing.id, studentName: existing.studentName, schoolName: existing.schoolName, registrationNumber: reg },
        created: false,
      };
    }

    const student: StoredStudent = {
      id: createId(),
      studentName: input.studentName.trim().replace(/\s+/g, ' '),
      schoolName: input.schoolName.trim().replace(/\s+/g, ' '),
      registrationNumber: reg,
      createdAt: new Date().toISOString(),
    };
    database.students.push(student);
    writeDatabase(database);
    return {
      student: { id: student.id, studentName: student.studentName, schoolName: student.schoolName, registrationNumber: reg },
      created: true,
    };
  },

  async recordSearch(registrationNumber, topic) {
    const database = readDatabase();
    database.searches.push({
      id: createId(),
      registrationNumber: normalizeRegistration(registrationNumber),
      topic,
      searchedAt: new Date().toISOString(),
    });
    writeDatabase(database);
  },

  async listSearches(registrationNumber) {
    const reg = normalizeRegistration(registrationNumber);
    return readDatabase()
      .searches.filter((search) => search.registrationNumber === reg)
      .sort((a, b) => b.searchedAt.localeCompare(a.searchedAt))
      .slice(0, 12)
      .map(({ id, topic, searchedAt }) => ({ id, topic, searchedAt }));
  },

  async listProgress(registrationNumber) {
    const reg = normalizeRegistration(registrationNumber);
    return readDatabase()
      .progress.filter((row) => row.registrationNumber === reg)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .map(toProgress);
  },

  async saveProgress(registrationNumber, topic, field: ProgressField, value) {
    const database = readDatabase();
    const reg = normalizeRegistration(registrationNumber);
    let row = database.progress.find((item) => item.registrationNumber === reg && item.topic === topic);
    if (!row) {
      row = {
        registrationNumber: reg,
        topic,
        textbookCompleted: false,
        drawingCompleted: false,
        observationCompleted: false,
        updatedAt: new Date().toISOString(),
      };
      database.progress.push(row);
    }
    row[field] = value;
    row.updatedAt = new Date().toISOString();
    writeDatabase(database);
    return toProgress(row);
  },

  async cacheTopicContent(_registrationNumber, content: TopicContent) {
    const database = readDatabase();
    if (!database.content[content.title]) {
      database.content[content.title] = {
        textbookContent: content.textbook,
        drawingSteps: content.drawingSteps,
      };
      writeDatabase(database);
    }
  },
};
