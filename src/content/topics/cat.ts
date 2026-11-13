
import type { TopicContent } from '@/content/types';

export const cat: TopicContent = {
  slug: 'cat',
  title: 'Cat',
  category: 'Animals',
  summary: 'A graceful, agile mammal and one of the most popular companion animals.',
  aliases: ['cats', 'feline', 'kitten', 'kitty'],
  accent: 'from-slate-400 to-zinc-700',
  cameraDistance: 7,

  audio: {
    kind: 'unavailable',
    note: 'Authentic cat meowing recordings are not included in this build, so no animal sound is played.',
  },

  textbook: {
    introduction:
      'The domestic cat is a small, agile carnivorous mammal. Cats are known for their flexibility, sharp senses and independent nature.',
    definition:
      'The **cat** (Felis catus) is a small, furry, warm-blooded mammal of the family **Felidae**, which also includes lions and tigers.',
    explanation: [
      'Cats are obligate carnivores, which means they need nutrients from meat to stay healthy.',
      'Their flexible spines, retractable claws and strong hind legs make them excellent climbers and jumpers.',
      'Cats communicate with meows, purrs, body language and tail positions.',
    ],
    structure: [
      { term: 'Head', meaning: 'Holds the brain, large eyes, and the sensitive ears.' },
      { term: 'Ears', meaning: 'Pointed, mobile ears that can detect very faint sounds.' },
      { term: 'Whiskers', meaning: 'Long touch-sensitive hairs that help judge gaps and movement.' },
      { term: 'Body (torso)', meaning: 'A flexible spine and muscles allow twisting and jumping.' },
      { term: 'Legs', meaning: 'Strong hind legs provide powerful jumps; front paws grip prey.' },
      { term: 'Tail', meaning: 'Helps balance when walking on narrow ledges and shows mood.' },
    ],
    functions: [
      'Whiskers help cats move safely in the dark and sense nearby objects.',
      'Night vision and hearing help cats hunt in low light.',
      'Retractable claws stay sharp and protected until needed for climbing or catching.',
    ],
    characteristics: [
      'Warm-blooded mammal with fur and a backbone.',
      'Has a flexible spine and collarbones that are not fully attached.',
      'Sleeps for long periods, often 12 to 16 hours a day.',
    ],
    examples: [
      'A cat lands on its feet by twisting its body in mid-air, a reflex called the righting reflex.',
      'Pet cats hunt toys with the same stalking and pouncing behaviour as wild cats.',
    ],
    keyPoints: [
      'Cats are small carnivorous mammals in the family Felidae.',
      'Whiskers and hearing help cats sense their surroundings.',
      'Flexible bodies and strong legs make cats excellent jumpers.',
    ],
  },

  drawingSteps: [
    {
      title: 'Draw the body curve',
      instructions: 'Draw a curved, pear-shaped body with the back slightly arched.',
      tip: 'Cats look elegant when the body curve is smooth and relaxed.',
    },
    {
      title: 'Add the head',
      instructions: 'Draw a rounded head at the top front, slightly smaller than the body.',
      tip: 'Use a light circle for the head and place it in line with the front legs.',
    },
    {
      title: 'Draw the triangular ears',
      instructions: 'Add two pointed triangles on top of the head, slightly apart.',
      tip: 'Angle the ears outward for a relaxed look.',
    },
    {
      title: 'Add legs, whiskers and tail',
      instructions: 'Draw four legs, a long curved tail, and three whiskers on each side of the nose.',
      tip: 'Whiskers should be long, thin lines that extend past the cheek.',
    },
    {
      title: 'Colour and label',
      instructions: 'Shade the fur softly and label the head, ears, whiskers, body, legs and tail.',
      tip: 'Short diagonal strokes give a soft fur texture.',
    },
  ],

  parts: [
    {
      id: 'cat-body',
      label: 'Body (torso)',
      description: 'A flexible torso with a long spine that lets the cat twist, stretch and jump.',
      drawStage: 1,
      color: '#9AA3AD',
      svg: {
        tag: 'path',
        attrs: { d: 'M120 190 Q150 130 230 150 Q270 165 262 200 Q240 220 180 214 Q130 214 120 190 Z' },
      },
      geo: {
        shape: 'sphere',
        position: [0, -0.05, 0],
        scale: [1.25, 0.62, 0.62],
      },
    },

    {
      id: 'cat-head',
      label: 'Head',
      description: 'Houses the brain, large forward-facing eyes and sensitive ears.',
      drawStage: 2,
      color: '#9AA3AD',
      svg: {
        tag: 'circle',
        attrs: { cx: 270, cy: 130, r: 34 },
      },
      geo: {
        shape: 'sphere',
        position: [1.25, 0.58, 0.08],
        scale: [0.58, 0.55, 0.52],
      },
    },

    {
      id: 'cat-ears',
      label: 'Ears',
      description: 'Pointed, mobile ears that can rotate toward faint sounds.',
      drawStage: 3,
      color: '#7C8590',
      svg: {
        tag: 'path',
        attrs: { d: 'M244 106 L240 72 L266 96 Z M292 96 L304 70 L310 108 Z' },
      },
      geo: {
        shape: 'cone',
        position: [1.05, 1.12, 0.02],
        scale: [0.2, 0.38, 0.18],
      },
    },

    {
      id: 'cat-whiskers',
      label: 'Whiskers',
      description: 'Long, touch-sensitive hairs that help the cat judge gaps and detect nearby movement.',
      drawStage: 4,
      color: '#3A004D',
      svg: {
        tag: 'path',
        attrs: { d: 'M300 130 L345 122 M300 138 L346 140 M300 146 L342 156', strokeWidth: 1.5 },
      },
      geo: {
        shape: 'cylinder',
        position: [1.78, 0.42, 0.25],
        scale: [0.025, 0.48, 0.025],
        rotation: [0, 0, -1.4],
      },
    },

    {
      id: 'cat-front-legs',
      label: 'Front legs',
      description: 'Front paws grip prey and help the cat climb and land safely.',
      drawStage: 3,
      color: '#7C8590',
      svg: {
        tag: 'path',
        attrs: { d: 'M236 200 V264 M250 200 V264' },
      },
      geo: {
        shape: 'cylinder',
        position: [0.72, -0.72, 0.12],
        scale: [0.11, 0.56, 0.11],
      },
    },

    {
      id: 'cat-hind-legs',
      label: 'Hind legs',
      description: 'Strong hind legs give the cat powerful jumps and quick bursts of speed.',
      drawStage: 3,
      color: '#7C8590',
      svg: {
        tag: 'path',
        attrs: { d: 'M140 200 V264 M154 200 V264' },
      },
      geo: {
        shape: 'cylinder',
        position: [-0.78, -0.72, 0.12],
        scale: [0.14, 0.6, 0.14],
      },
    },

    {
      id: 'cat-tail',
      label: 'Tail',
      description: 'A long tail that helps the cat balance on narrow ledges and shows its mood.',
      drawStage: 2,
      color: '#7C8590',
      svg: {
        tag: 'path',
        attrs: { d: 'M124 176 Q80 176 70 140 Q64 112 84 104', strokeWidth: 8 },
      },
      geo: {
        shape: 'cylinder',
        position: [-1.48, 0.35, 0],
        scale: [0.09, 0.78, 0.09],
        rotation: [0, 0, 1.0],
      },
    },
  ],
};
