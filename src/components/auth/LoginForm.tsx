import { motion } from 'framer-motion';
import { ArrowRight, IdCard, Loader2, School, UserRound } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Notice } from '@/components/ui/Notice';
import { useStudent } from '@/context/StudentContext';
import { isDemoMode, studentBackend } from '@/lib/backend';
import { validateStudentForm, type StudentFormErrors, type StudentFormValues } from '@/lib/validation';

type FieldName = keyof StudentFormValues;

const EMPTY_VALUES: StudentFormValues = { studentName: '', schoolName: '', registrationNumber: '' };

const FIELD_META: Record<FieldName, { label: string; placeholder: string; icon: typeof UserRound; autoComplete: string }> = {
  studentName: { label: 'Student Name', placeholder: 'e.g. Aisha Khan', icon: UserRound, autoComplete: 'name' },
  schoolName: { label: 'School / College Name', placeholder: 'e.g. Riverside Science College', icon: School, autoComplete: 'organization' },
  registrationNumber: { label: 'Registration Number', placeholder: 'e.g. 2026-CS-0148', icon: IdCard, autoComplete: 'off' },
};

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useStudent();
  const [values, setValues] = useState<StudentFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<StudentFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const updateField = (name: FieldName, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    setServerError(null);
    if (touched[name] || errors[name]) setErrors(validateStudentForm(next));
  };

  const touchField = (name: FieldName) => {
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors(validateStudentForm(values));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateStudentForm(values);
    setTouched({ studentName: true, schoolName: true, registrationNumber: true });
    setErrors(validation);
    setServerError(null);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    try {
      const { student } = await studentBackend.register({
        studentName: values.studentName.trim(),
        schoolName: values.schoolName.trim(),
        registrationNumber: values.registrationNumber.trim(),
      });
      login(student);
      navigate('/dashboard');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass w-full max-w-md p-7 sm:p-10"
    >
      <div className="mb-8 flex flex-col items-center text-center">
        <motion.div
          className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blush via-dusty to-mauve text-white shadow-soft"
          initial={{ scale: 0.6, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.2 }}
        >
          <UserRound className="h-9 w-9" strokeWidth={2} />
        </motion.div>
        <h2 className="text-3xl font-bold text-plum">Welcome to CurioCanvas</h2>
        <p className="mt-2 text-sm text-mauve">Enter your student details to begin learning.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {(Object.keys(FIELD_META) as FieldName[]).map((name) => {
          const meta = FIELD_META[name];
          const Icon = meta.icon;
          const error = touched[name] ? errors[name] : undefined;
          const inputId = `login-${name}`;
          return (
            <div key={name} className="space-y-2">
              <label htmlFor={inputId} className="block text-sm font-semibold text-plum">
                {meta.label}
              </label>
              <div className="relative">
                <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-dusty" />
                <input
                  id={inputId}
                  name={name}
                  type="text"
                  value={values[name]}
                  autoComplete={meta.autoComplete}
                  placeholder={meta.placeholder}
                  disabled={submitting}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${inputId}-error` : undefined}
                  onChange={(event) => updateField(name, event.target.value)}
                  onBlur={() => touchField(name)}
                  className={`field pl-12 ${error ? 'field-error' : ''}`}
                />
              </div>
              {error && (
                <motion.p
                  id={`${inputId}-error`}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-danger"
                  role="alert"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-danger" />
                  {error}
                </motion.p>
              )}
            </div>
          );
        })}

        {serverError && <Notice tone="error" title="We could not start your session">{serverError}</Notice>}

        <Button type="submit" fullWidth disabled={submitting} className="mt-2 py-4 text-base">
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Preparing your workspace...
            </>
          ) : (
            <>
              Start Learning
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>

        {isDemoMode && (
          <p className="text-center text-xs text-mauve">
            Demo mode: details are stored only in this browser until Supabase is connected.
          </p>
        )}
      </form>
    </motion.div>
  );
}
