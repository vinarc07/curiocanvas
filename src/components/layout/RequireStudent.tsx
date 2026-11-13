import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useStudent } from '@/context/StudentContext';

export function RequireStudent({ children }: { children: ReactNode }) {
  const { student } = useStudent();
  if (!student) return <Navigate to="/" replace />;
  return <>{children}</>;
}
