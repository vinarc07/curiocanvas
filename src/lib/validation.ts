export const NAME_PATTERN = /^[A-Za-z][A-Za-z .'-]*$/;
export const REGISTRATION_PATTERN = /^[A-Za-z0-9][A-Za-z0-9/-]*$/;
export const TOPIC_QUERY_PATTERN = /^[A-Za-z0-9][A-Za-z0-9 '&()-]*$/;

export interface StudentFormErrors {
  studentName?: string;
  schoolName?: string;
  registrationNumber?: string;
}

export interface StudentFormValues {
  studentName: string;
  schoolName: string;
  registrationNumber: string;
}

export function validateStudentForm(values: StudentFormValues): StudentFormErrors {
  const errors: StudentFormErrors = {};
  const name = values.studentName.trim();
  const school = values.schoolName.trim();
  const reg = values.registrationNumber.trim();

  if (!name) errors.studentName = 'Please enter your full name.';
  else if (name.length < 2) errors.studentName = 'Name must be at least 2 characters long.';
  else if (name.length > 80) errors.studentName = 'Name must be 80 characters or fewer.';
  else if (!NAME_PATTERN.test(name)) errors.studentName = 'Use letters only, with spaces, dots, hyphens or apostrophes.';

  if (!school) errors.schoolName = 'Please enter your school or college name.';
  else if (school.length < 2) errors.schoolName = 'School name must be at least 2 characters long.';
  else if (school.length > 120) errors.schoolName = 'School name must be 120 characters or fewer.';

  if (!reg) errors.registrationNumber = 'Registration number is required.';
  else if (reg.length < 2 || reg.length > 30) errors.registrationNumber = 'Registration number must be 2 to 30 characters.';
  else if (!REGISTRATION_PATTERN.test(reg)) errors.registrationNumber = 'Use letters, numbers, hyphens or slashes only.';

  return errors;
}

export function validateTopicQuery(query: string): string | null {
  const trimmed = query.trim();
  if (!trimmed) return 'Type a topic you would like to explore.';
  if (trimmed.length < 3) return 'Please enter at least 3 characters.';
  if (trimmed.length > 60) return 'Topics must be 60 characters or fewer.';
  if (!TOPIC_QUERY_PATTERN.test(trimmed)) return 'Use letters, numbers and simple punctuation only.';
  return null;
}
