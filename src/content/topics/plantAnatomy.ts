
import type { TopicContent } from '@/content/types';

export const plantAnatomy: TopicContent = {
  slug: 'plant-anatomy',
  title: 'Plant Anatomy',
  category: 'Botany',
  summary: 'The roots, stem, leaves and flowers that make up a flowering plant.',
  aliases: ['plant', 'plants', 'botany', 'roots', 'stem', 'flower'],
  accent: 'from-lime-400 to-emerald-700',
  cameraDistance: 7.5,

  textbook: {
    introduction:
      'Plants are living organisms that make their own food. Their body is organised into parts that each do a specific job.',
    definition:
      '**Plant anatomy** is the study of the structure of a plant, from its underground **roots** to its **flowers**, and how each part works.',
    explanation: [
      'Roots anchor the plant and absorb water and minerals from the soil.',
      'The stem carries water and food between roots and leaves, and supports the plant upward.',
      'Leaves are the main food factories, where sunlight is used to make sugar.',
    ],
    structure: [
      { term: 'Roots', meaning: 'Anchor the plant and absorb water and minerals.' },
      { term: 'Stem', meaning: 'Transports water and food and holds leaves toward the light.' },
      { term: 'Leaves', meaning: 'Carry out photosynthesis to make food for the plant.' },
      { term: 'Flower', meaning: 'The reproductive part, which produces seeds after pollination.' },
    ],
    functions: [
      'Xylem carries water upward from roots to leaves.',
      'Phloem carries sugar made in leaves to the rest of the plant.',
      'Flowers attract pollinators so the plant can produce seeds.',
    ],
    characteristics: [
      'Plants are multicellular and have cell walls made of cellulose.',
      'Most plants are green because they contain chlorophyll.',
      'Plants cannot move from place to place, so their structure is built to reach light and water.',
    ],
    examples: [
      'Carrots and radishes are roots that store food for the plant.',
      'Potato tubers are stems that store starch underground.',
    ],
    keyPoints: [
      'Roots absorb water; leaves make food; the stem transports materials.',
      'Flowers are the reproductive organs of flowering plants.',
      'Each plant part has a special job that supports the whole organism.',
    ],
  },

  drawingSteps: [
    {
      title: 'Draw the roots',
      instructions: 'Start below the ground line and sketch a branching root system spreading outward.',
      tip: 'Roots branch more the further they grow from the base.',
    },
    {
      title: 'Draw the stem',
      instructions: 'Draw two straight, slightly curved lines rising from the soil to form the stem.',
      tip: 'Keep the stem narrow at the top and a little wider at the base.',
    },
    {
      title: 'Add the leaves',
      instructions: 'Sketch leaves growing from the stem on alternate sides, angled toward the light.',
      tip: 'Leaves on opposite sides balance the drawing.',
    },
    {
      title: 'Draw the flower',
      instructions: 'Add a flower at the top of the stem with a round centre and petals around it.',
      tip: 'Draw petals as simple rounded shapes first, then refine.',
    },
    {
      title: 'Colour and label',
      instructions: 'Colour the roots brown, stem and leaves green, and the flower in a bright shade. Label each part.',
      tip: 'Use lighter greens for new leaves and darker greens for older ones.',
    },
  ],

  parts: [
    {
      id: 'roots',
      label: 'Roots',
      description: 'Anchor the plant in the soil and absorb water and minerals through tiny root hairs.',
      drawStage: 1,
      color: '#8B6B4A',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M200 252 Q186 276 168 292 M200 252 Q200 280 200 296 M200 252 Q216 276 234 290 M200 262 Q176 268 150 276 M200 262 Q226 266 252 274',
          strokeWidth: 3,
        },
      },
      geo: {
        shape: 'cylinder',
        position: [0, -1.55, 0],
        scale: [0.08, 0.55, 0.08],
      },
    },

    {
      id: 'stem',
      label: 'Stem',
      description: 'Carries water and food between roots and leaves, and holds the plant upright toward light.',
      drawStage: 2,
      color: '#4E8C4A',
      svg: {
        tag: 'path',
        attrs: { d: 'M200 252 L200 118', strokeWidth: 14 },
      },
      geo: {
        shape: 'cylinder',
        position: [0, 0.1, 0],
        scale: [0.13, 1.8, 0.13],
      },
    },

    {
      id: 'leaf-left',
      label: 'Leaf (left)',
      description: 'A broad leaf that uses sunlight to make sugar through photosynthesis.',
      drawStage: 3,
      color: '#5FAF57',
      svg: {
        tag: 'path',
        attrs: { d: 'M192 204 Q150 194 134 152 Q172 152 192 188 Z' },
      },
      geo: {
        shape: 'sphere',
        position: [-0.62, 0.48, 0],
        scale: [0.65, 0.28, 0.12],
        rotation: [0, 0, 0.35],
      },
    },

    {
      id: 'leaf-right',
      label: 'Leaf (right)',
      description: 'Leaves are arranged to receive as much sunlight as possible.',
      drawStage: 3,
      color: '#5FAF57',
      svg: {
        tag: 'path',
        attrs: { d: 'M208 170 Q250 160 266 120 Q226 120 208 156 Z' },
      },
      geo: {
        shape: 'sphere',
        position: [0.62, 0.9, 0],
        scale: [0.65, 0.28, 0.12],
        rotation: [0, 0, -0.35],
      },
    },

    {
      id: 'flower',
      label: 'Flower',
      description: 'The reproductive part of the plant. After pollination it develops into seeds.',
      drawStage: 4,
      color: '#E98BB0',
      svg: {
        tag: 'circle',
        attrs: { cx: 200, cy: 102, r: 20 },
      },
      geo: {
        shape: 'sphere',
        position: [0, 1.95, 0],
        scale: [0.42, 0.42, 0.2],
      },
    },
  ],
};
