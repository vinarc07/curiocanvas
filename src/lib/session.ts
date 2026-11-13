import type { StudentProfile } from '@/lib/studentBackend';

const SESSION_KEY = 'curiocanvas.session';

export function loadSession(): StudentProfile | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StudentProfile>;
    if (
      typeof parsed.id === 'string' &&
      typeof parsed.studentName === 'string' &&
      typeof parsed.schoolName === 'string' &&
      typeof parsed.registrationNumber === 'string'
    ) {
      return {
        id: parsed.id,
        studentName: parsed.studentName,
        schoolName: parsed.schoolName,
        registrationNumber: parsed.registrationNumber,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function saveSession(student: StudentProfile) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(student));
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
}
