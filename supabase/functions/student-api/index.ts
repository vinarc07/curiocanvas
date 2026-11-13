
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

const PROGRESS_FIELDS = [
  "textbook_completed",
  "drawing_completed",
  "observation_completed",
] as const;

type ProgressField = (typeof PROGRESS_FIELDS)[number];

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

const text = (value: unknown, label: string, min: number, max: number) => {
  if (typeof value !== "string") {
    throw new ApiError(400, `${label} is required.`);
  }

  const trimmed = value.trim().replace(/\s+/g, " ");

  if (trimmed.length < min || trimmed.length > max) {
    throw new ApiError(
      400,
      `${label} must be between ${min} and ${max} characters.`,
    );
  }

  return trimmed;
};

const normalizeName = (value: string) => value.toLowerCase();

async function findStudent(registrationNumber: unknown) {
  const reg = text(
    registrationNumber,
    "Registration number",
    2,
    30,
  ).toUpperCase();

  const { data, error } = await supabase
    .from("students")
    .select("id, student_name, school_name, registration_number, created_at")
    .eq("registration_number", reg)
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (!data) {
    throw new ApiError(
      404,
      "Student record not found. Please log in again.",
    );
  }

  return data;
}

const toStudent = (row: {
  id: string;
  student_name: string;
  school_name: string;
  registration_number: string;
}) => ({
  id: row.id,
  studentName: row.student_name,
  schoolName: row.school_name,
  registrationNumber: row.registration_number,
});

async function register(body: Record<string, unknown>) {
  const studentName = text(body.studentName, "Student name", 2, 80);
  const schoolName = text(body.schoolName, "School or college name", 2, 120);
  const reg = text(
    body.registrationNumber,
    "Registration number",
    2,
    30,
  ).toUpperCase();

  const { data: existing, error: lookupError } = await supabase
    .from("students")
    .select("id, student_name, school_name, registration_number")
    .eq("registration_number", reg)
    .maybeSingle();

  if (lookupError) throw new Error(lookupError.message);

  if (existing) {
    const sameDetails =
      normalizeName(existing.student_name) === normalizeName(studentName) &&
      normalizeName(existing.school_name) === normalizeName(schoolName);

    if (!sameDetails) {
      throw new ApiError(
        409,
        "This registration number is already linked to a different student. Check the details and try again.",
      );
    }

    return { student: toStudent(existing), created: false };
  }

  const { data, error } = await supabase
    .from("students")
    .insert({
      student_name: studentName,
      school_name: schoolName,
      registration_number: reg,
    })
    .select("id, student_name, school_name, registration_number")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new ApiError(
        409,
        "This registration number was just registered. Please try again.",
      );
    }

    throw new Error(error.message);
  }

  return { student: toStudent(data), created: true };
}

async function recordSearch(body: Record<string, unknown>) {
  const student = await findStudent(body.registrationNumber);
  const topic = text(body.topic, "Search topic", 1, 100);

  const { error } = await supabase
    .from("search_history")
    .insert({
      student_id: student.id,
      searched_topic: topic,
    });

  if (error) throw new Error(error.message);

  return { ok: true };
}

async function listSearches(body: Record<string, unknown>) {
  const student = await findStudent(body.registrationNumber);

  const { data, error } = await supabase
    .from("search_history")
    .select("id, searched_topic, searched_at")
    .eq("student_id", student.id)
    .order("searched_at", { ascending: false })
    .limit(12);

  if (error) throw new Error(error.message);

  return {
    searches: (data ?? []).map((row) => ({
      id: row.id,
      topic: row.searched_topic,
      searchedAt: row.searched_at,
    })),
  };
}

const toProgress = (row: {
  topic: string;
  textbook_completed: boolean;
  drawing_completed: boolean;
  observation_completed: boolean;
  updated_at: string;
}) => ({
  topic: row.topic,
  textbookCompleted: row.textbook_completed,
  drawingCompleted: row.drawing_completed,
  observationCompleted: row.observation_completed,
  updatedAt: row.updated_at,
});

async function listProgress(body: Record<string, unknown>) {
  const student = await findStudent(body.registrationNumber);

  const { data, error } = await supabase
    .from("learning_progress")
    .select(
      "topic, textbook_completed, drawing_completed, observation_completed, updated_at",
    )
    .eq("student_id", student.id)
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);

  return { progress: (data ?? []).map(toProgress) };
}

async function saveProgress(body: Record<string, unknown>) {
  const student = await findStudent(body.registrationNumber);
  const topic = text(body.topic, "Topic", 1, 100);
  const field = body.field as ProgressField;

  if (!PROGRESS_FIELDS.includes(field)) {
    throw new ApiError(400, "Unknown progress field.");
  }

  if (typeof body.value !== "boolean") {
    throw new ApiError(400, "Progress value must be true or false.");
  }

  const { data: existing, error: lookupError } = await supabase
    .from("learning_progress")
    .select(
      "textbook_completed, drawing_completed, observation_completed",
    )
    .eq("student_id", student.id)
    .eq("topic", topic)
    .maybeSingle();

  if (lookupError) throw new Error(lookupError.message);

  const merged = {
    textbook_completed: existing?.textbook_completed ?? false,
    drawing_completed: existing?.drawing_completed ?? false,
    observation_completed: existing?.observation_completed ?? false,
    [field]: body.value,
  };

  const { data, error } = await supabase
    .from("learning_progress")
    .upsert(
      {
        student_id: student.id,
        topic,
        ...merged,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "student_id,topic" },
    )
    .select(
      "topic, textbook_completed, drawing_completed, observation_completed, updated_at",
    )
    .single();

  if (error) throw new Error(error.message);

  return { progress: toProgress(data) };
}

async function cacheTopicContent(body: Record<string, unknown>) {
  await findStudent(body.registrationNumber);

  const topic = text(body.topic, "Topic", 1, 100);

  if (!body.textbookContent || typeof body.textbookContent !== "object") {
    throw new ApiError(400, "Textbook content is required.");
  }

  if (!Array.isArray(body.drawingSteps) || body.drawingSteps.length !== 5) {
    throw new ApiError(400, "Exactly five drawing steps are required.");
  }

  const payloadSize = JSON.stringify(body).length;

  if (payloadSize > 200_000) {
    throw new ApiError(413, "Topic content is too large.");
  }

  const { error } = await supabase
    .from("learning_content")
    .upsert(
      {
        topic,
        textbook_content: body.textbookContent,
        drawing_steps: body.drawingSteps,
      },
      { onConflict: "topic", ignoreDuplicates: true },
    );

  if (error) throw new Error(error.message);

  return { ok: true };
}

/**
 * Generate an educational lesson for a topic that is not in the
 * existing CurioCanvas topic library.
 */
async function generateTopic(body: Record<string, unknown>) {
  // Check that the requesting student exists.
  await findStudent(body.registrationNumber);

  const topic = text(body.topic, "Search topic", 2, 150);
  const apiKey = Deno.env.get("GEMINI_API_KEY");

  if (!apiKey) {
    throw new ApiError(
      500,
      "Gemini is not configured on the server. Please contact the administrator.",
    );
  }

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: [
                "You are CurioCanvas, a friendly educational tutor.",
                "Create accurate, student-friendly lessons.",
                "Use a clear title, headings, simple explanations, examples,",
                "important points, and a short conclusion.",
                "Adapt the explanation to a school student.",
                "Do not invent facts or sources.",
                "If the request is not an educational topic, politely explain",
                "that you can help with educational questions.",
              ].join(" "),
            },
          ],
        },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Create an educational lesson about: ${topic}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 2500,
        },
      }),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    console.error("Gemini API error:", result);

    if (response.status === 429) {
      throw new ApiError(
        429,
        "Gemini is receiving too many requests. Please wait a moment and try again.",
      );
    }

    throw new ApiError(
      502,
      "Gemini could not generate this topic. Please try again.",
    );
  }

  const generatedText = result.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part.text ?? "")
    .join("\n")
    .trim();

  if (!generatedText) {
    throw new ApiError(
      502,
      "Gemini returned an empty lesson. Please try again.",
    );
  }

  return {
    topic,
    content: generatedText,
    source: "gemini",
  };
}

const actions: Record<
  string,
  (body: Record<string, unknown>) => Promise<unknown>
> = {
  register,
  recordSearch,
  listSearches,
  listProgress,
  saveProgress,
  cacheTopicContent,
  generateTopic,
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      throw new ApiError(405, "Method not allowed.");
    }

    const body = (await req.json()) as Record<string, unknown>;
    const action =
      typeof body.action === "string"
        ? actions[body.action]
        : undefined;

    if (!action) {
      throw new ApiError(400, "Unknown action.");
    }

    const result = await action(body);

    return json(result);
  } catch (err) {
    if (err instanceof ApiError) {
      return json({ error: err.message }, err.status);
    }

    console.error(err);

    return json(
      { error: "Something went wrong on the server. Please try again." },
      500,
    );
  }
});
