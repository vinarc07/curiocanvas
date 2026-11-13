export type SvgTag = 'ellipse' | 'circle' | 'path' | 'rect' | 'line';

export type GeoShape = 'sphere' | 'box' | 'cylinder' | 'cone' | 'torus';

export type Vec3 = [number, number, number];

export type DrawStage = 1 | 2 | 3 | 4 | 5;

export interface TopicPart {
  id: string;
  label: string;
  description: string;
  drawStage: DrawStage;
  color: string;
  svg: { tag: SvgTag; attrs: Record<string, number | string> };
  geo: { shape: GeoShape; position: Vec3; scale: Vec3; rotation?: Vec3; opacity?: number };
  decorative?: boolean;
}

export interface TextbookStructureItem {
  term: string;
  meaning: string;
}

export interface TextbookContent {
  introduction: string;
  definition: string;
  explanation: string[];
  structure: TextbookStructureItem[];
  functions: string[];
  characteristics: string[];
  examples: string[];
  keyPoints: string[];
}

export interface DrawingStep {
  title: string;
  instructions: string;
  tip: string;
}

export type TopicAudio =
  | { kind: 'heartbeat' }
  | { kind: 'unavailable'; note: string };

export interface TopicContent {
  slug: string;
  title: string;
  category: string;
  summary: string;
  aliases: string[];
  accent: string;
  textbook: TextbookContent;
  drawingSteps: DrawingStep[];
  parts: TopicPart[];
  audio?: TopicAudio;
  cameraDistance: number;
}
