/*
# Create CurioCanvas student learning schema

Plain-English summary: creates the four tables the learning platform needs to remember students, their searches, their lesson progress, and reusable topic content.

1. New Tables
- `students`: one row per student (name, school, unique registration number, created time).
- `search_history`: every topic a student searched for, linked to the student.
- `learning_progress`: per student and topic, whether the textbook, drawing and 3D lessons were completed.
- `learning_content`: reusable topic lesson content (textbook and drawing steps), one row per topic.

2. Security
- Row Level Security is enabled on all four tables.
- No policies are granted to the public `anon` or `authenticated` roles, so the browser cannot read or write student records directly.
- Access happens only through a server-side function that uses the service role, which is granted full table access here.

3. Important Notes
- Constraints enforce required text, length limits and a unique registration number.
- Progress rows are unique per student and topic.
- Deleting a student removes their search history and progress (cascade).
*/

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL CHECK (char_length(btrim(student_name)) BETWEEN 2 AND 80),
  school_name text NOT NULL CHECK (char_length(btrim(school_name)) BETWEEN 2 AND 120),
  registration_number text NOT NULL UNIQUE CHECK (char_length(registration_number) BETWEEN 2 AND 30),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS search_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  searched_topic text NOT NULL CHECK (char_length(searched_topic) BETWEEN 1 AND 100),
  searched_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS search_history_student_recent_idx
  ON search_history (student_id, searched_at DESC);

CREATE TABLE IF NOT EXISTS learning_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  topic text NOT NULL CHECK (char_length(topic) BETWEEN 1 AND 100),
  textbook_completed boolean NOT NULL DEFAULT false,
  drawing_completed boolean NOT NULL DEFAULT false,
  observation_completed boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT learning_progress_student_topic_key UNIQUE (student_id, topic)
);

CREATE TABLE IF NOT EXISTS learning_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL UNIQUE CHECK (char_length(topic) BETWEEN 1 AND 100),
  textbook_content jsonb NOT NULL,
  drawing_steps jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_content ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON students, search_history, learning_progress, learning_content FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON students, search_history, learning_progress, learning_content TO service_role;
