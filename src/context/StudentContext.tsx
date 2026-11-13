import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { clearSession, loadSession, saveSession } from '@/lib/session';
import type { StudentProfile } from '@/lib/studentBackend';

interface StudentContextValue {
  student: StudentProfile | null;
  login: (student: StudentProfile) => void;
  logout: () => void;
}

const StudentContext = createContext<StudentContextValue | null>(null);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<StudentProfile | null>(() => loadSession());

  const login = useCallback((profile: StudentProfile) => {
    saveSession(profile);
    setStudent(profile);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setStudent(null);
  }, []);

  const value = useMemo(() => ({ student, login, logout }), [student, login, logout]);

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudent(): StudentContextValue {
  const context = useContext(StudentContext);
  if (!context) throw new Error('useStudent must be used inside StudentProvider');
  return context;
}
