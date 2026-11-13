
import type { TopicContent } from '@/content/types';

export const dog: TopicContent = {
  slug: 'dog',
  title: 'Dog',
  category: 'Animals',
  summary: 'A loyal domesticated mammal with a powerful sense of smell.',
  aliases: ['dogs', 'canine', 'puppy'],
  accent: 'from-amber-400 to-orange-700',
  cameraDistance: 7,

  audio: {
    kind: 'unavailable',
    note: 'Authentic dog barking recordings are not included in this build, so no animal sound is played.',
  },

  textbook: {
    introduction:
      'The dog is one of the first animals humans domesticated. It is valued as a companion, a helper and a working partner.',
    definition:
      'The **dog** (Canis familiaris) is a domesticated, furry, warm-blooded mammal of the family **Canidae**.',
    explanation: [
      'Dogs descend from wolves and have lived alongside people for thousands of years.',
      'Their bodies are built for walking, running and tracking, with four legs, a tail and a long snout.',
      'Dogs communicate through barks, body posture, tail movement and facial expressions.',
    ],
    structure: [
      { term: 'Head', meaning: 'Holds the brain, eyes, and the senses of hearing and smell.' },
      { term: 'Snout and nose', meaning: 'Contains many smell receptors, which give dogs their strong sense of smell.' },
      { term: 'Ears', meaning: 'Detect a wide range of sounds, including high-pitched ones humans cannot hear.' },
      { term: 'Body (torso)', meaning: 'Houses the heart, lungs and digestive organs.' },
      { term: 'Legs', meaning: 'Front and hind legs support walking, running and jumping.' },
      { term: 'Tail', meaning: 'Helps with balance while running and turning, and shows mood.' },
    ],
    functions: [
      'Smell is far stronger than a human sense of smell, which is why dogs can track scents.',
      'Hearing helps dogs notice distant or quiet sounds.',
      'The tail and body language help dogs communicate with other dogs and people.',
    ],
    characteristics: [
      'Warm-blooded mammal with fur and a backbone.',
      'Gives birth to live young and feeds them with milk.',
      'Breeds vary greatly in size, shape, coat and temperament.',
    ],
    examples: [
      'Guide dogs help people with visual impairments walk safely.',
      'Detection dogs are trained to find specific smells at airports and disaster sites.',
    ],
    keyPoints: [
      'Dogs are domesticated mammals that have lived with humans for thousands of years.',
      'Smell and hearing are their strongest senses.',
      'Body parts work together for movement, balance and communication.',
    ],
  },

  drawingSteps: [
    {
      title: 'Draw the body',
      instructions: 'Draw a large oval for the body, slightly longer than it is tall.',
      tip: 'Use a light oval first, then refine the shape.',
    },
    {
      title: 'Add the head and snout',
      instructions: 'Draw a circle for the head at the front right and a smaller oval for the snout.',
      tip: 'The head is about one-third the length of the body.',
    },
    {
      title: 'Draw ears, nose and tail',
      instructions: 'Add floppy ears, a round nose at the end of the snout, and a curved tail at the back.',
      tip: 'Ears hang from the top of the head, not the side.',
    },
    {
      title: 'Add the legs',
      instructions: 'Draw four straight legs below the body, two at the front and two at the back.',
      tip: 'Legs are about as long as the body is deep.',
    },
    {
      title: 'Colour and label',
      instructions: 'Shade the coat in warm browns and label the head, snout, ears, body, legs and tail.',
      tip: 'Use short strokes for fur to give texture.',
    },
  ],

  parts: [
    {
      id: 'dog-body',
      label: 'Body (torso)',
      description: 'The main trunk of the dog. It holds the heart, lungs and digestive organs.',
      drawStage: 1,
      color: '#C8A27A',
      svg: {
        tag: 'ellipse',
        attrs: { cx: 190, cy: 165, rx: 92, ry: 44 },
      },
      geo: {
        shape: 'sphere',
        position: [0, 0, 0],
        scale: [1.65, 0.72, 0.72],
      },
    },

    {
      id: 'dog-head',
      label: 'Head',
      description: 'Holds the brain, eyes and the senses of hearing and smell.',
      drawStage: 2,
      color: '#C8A27A',
      svg: {
        tag: 'ellipse',
        attrs: { cx: 288, cy: 118, rx: 38, ry: 34 },
      },
      geo: {
        shape: 'sphere',
        position: [1.45, 0.48, 0],
        scale: [0.62, 0.62, 0.62],
      },
    },

    {
      id: 'dog-snout',
      label: 'Snout',
      description: 'Contains many smell receptors, which give dogs their powerful sense of smell.',
      drawStage: 2,
      color: '#B98E62',
      svg: {
        tag: 'ellipse',
        attrs: { cx: 325, cy: 130, rx: 22, ry: 16 },
      },
      geo: {
        shape: 'sphere',
        position: [1.95, 0.28, 0.08],
        scale: [0.42, 0.28, 0.32],
      },
    },

    {
      id: 'dog-nose',
      label: 'Nose',
      description: 'The dog\'s nose is wet and sensitive, helping it pick up scent particles.',
      drawStage: 3,
      color: '#2B1D16',
      svg: {
        tag: 'circle',
        attrs: { cx: 345, cy: 124, r: 6 },
      },
      geo: {
        shape: 'sphere',
        position: [2.3, 0.32, 0.1],
        scale: [0.12, 0.11, 0.12],
      },
    },

    {
      id: 'dog-ear',
      label: 'Ears',
      description: 'Ears can rotate to catch sounds, and they detect higher pitches than human ears.',
      drawStage: 3,
      color: '#8A5E3C',
      svg: {
        tag: 'path',
        attrs: { d: 'M276 98 Q262 70 282 74 Q300 80 292 106 Z' },
      },
      geo: {
        shape: 'box',
        position: [1.15, 0.98, 0.12],
        scale: [0.24, 0.48, 0.18],
        rotation: [0, 0, -0.35],
      },
    },

    {
      id: 'dog-front-legs',
      label: 'Front legs',
      description: 'Support the front of the body and help with walking, running and digging.',
      drawStage: 3,
      color: '#A67C52',
      svg: {
        tag: 'path',
        attrs: { d: 'M226 200 V268 M242 200 V268' },
      },
      geo: {
        shape: 'cylinder',
        position: [0.75, -0.78, 0.15],
        scale: [0.14, 0.62, 0.14],
      },
    },

    {
      id: 'dog-hind-legs',
      label: 'Hind legs',
      description: 'Powerful back legs push the dog forward when running and jumping.',
      drawStage: 3,
      color: '#A67C52',
      svg: {
        tag: 'path',
        attrs: { d: 'M138 200 V268 M154 200 V268' },
      },
      geo: {
        shape: 'cylinder',
        position: [-0.9, -0.78, 0.15],
        scale: [0.16, 0.62, 0.16],
      },
    },

    {
      id: 'dog-tail',
      label: 'Tail',
      description: 'Helps the dog balance while running and turning, and shows its mood.',
      drawStage: 2,
      color: '#8A5E3C',
      svg: {
        tag: 'path',
        attrs: { d: 'M100 150 Q68 112 86 88', strokeWidth: 9 },
      },
      geo: {
        shape: 'cylinder',
        position: [-1.72, 0.52, 0],
        scale: [0.11, 0.48, 0.11],
        rotation: [0, 0, 0.8],
      },
    },

    {
      id: 'dog-far-legs',
      label: 'Far legs',
      description: 'The other pair of legs, seen behind the body.',
      drawStage: 4,
      color: '#8A5E3C',
      decorative: true,
      svg: {
        tag: 'path',
        attrs: { d: 'M234 205 V270 M130 205 V270' },
      },
      geo: {
        shape: 'cylinder',
        position: [0.72, -0.78, -0.28],
        scale: [0.12, 0.62, 0.12],
      },
    },
  ],
};
