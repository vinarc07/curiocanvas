import { isSupabaseConfigured } from '@/lib/config';
import { demoStudentBackend } from '@/lib/demoStudentBackend';
import type { StudentBackend } from '@/lib/studentBackend';
import { supabaseStudentBackend } from '@/lib/supabaseStudentBackend';

export const isDemoMode = !isSupabaseConfigured;

export const studentBackend: StudentBackend = isDemoMode ? demoStudentBackend : supabaseStudentBackend;
