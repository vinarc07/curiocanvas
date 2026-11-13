
import type { TopicContent } from '@/content/types';

export const waterCycle: TopicContent = {
  slug: 'water-cycle',
  title: 'Water Cycle',
  category: 'Earth Science',
  summary: 'The endless journey of water through evaporation, clouds and rain.',
  aliases: ['water', 'rain', 'evaporation', 'precipitation', 'hydrologic'],
  accent: 'from-sky-400 to-blue-700',
  cameraDistance: 8,

  textbook: {
    introduction:
      'Water constantly moves between the oceans, the atmosphere and the land. This continuous movement is called the water cycle.',
    definition:
      'The **water cycle** is the continuous movement of water on, above and below Earth\'s surface, driven mainly by the Sun\'s energy.',
    explanation: [
      'Water changes state as it moves: liquid becomes vapour, vapour becomes liquid, and water falls back to Earth.',
      '**Evaporation** and **transpiration** send water into the air.',
      'Water returns to the ground and oceans through **precipitation** and **runoff**.',
    ],
    structure: [
      { term: 'Ocean and lakes', meaning: 'The largest reservoirs; most water evaporates from them.' },
      { term: 'Sun', meaning: 'Provides the energy that drives evaporation.' },
      { term: 'Clouds', meaning: 'Formed when water vapour cools and condenses into tiny droplets.' },
      { term: 'Mountains', meaning: 'Force moist air upward, where it cools and forms rain or snow.' },
      { term: 'Rivers', meaning: 'Carry runoff from land back to the sea.' },
    ],
    functions: [
      'Evaporation lifts water vapour into the atmosphere.',
      'Condensation forms clouds from vapour.',
      'Precipitation delivers fresh water to land and sustains life.',
    ],
    characteristics: [
      'The total amount of water on Earth stays roughly the same; it is recycled.',
      'Water can stay in the air for about 9 to 10 days on average.',
      'Most of Earth\'s water is in the oceans.',
    ],
    examples: [
      'Puddles disappearing after a sunny day are evaporating.',
      'Frost on a cold morning forms when water vapour condenses onto surfaces.',
    ],
    keyPoints: [
      'Evaporation, condensation and precipitation are the main stages.',
      'The Sun powers the whole cycle.',
      'Water is constantly recycled between the sky, land and sea.',
    ],
  },

  drawingSteps: [
    {
      title: 'Draw the ocean',
      instructions: 'Draw a wide wavy band across the bottom of the page for the ocean.',
      tip: 'Use gentle waves so the water looks calm and continuous.',
    },
    {
      title: 'Add the sun and mountains',
      instructions: 'Draw a circle with rays in the top left for the Sun, and a triangle mountain on the left.',
      tip: 'Mountains are useful because rain falls on their slopes.',
    },
    {
      title: 'Draw clouds and rain',
      instructions: 'Add a fluffy cloud in the upper right with short slanted lines beneath it for rain.',
      tip: 'Clouds have flat bottoms and rounded tops.',
    },
    {
      title: 'Show evaporation and the river',
      instructions: 'Draw upward arrows from the ocean for evaporation, and a winding river from the mountain to the sea.',
      tip: 'Arrows make the direction of the cycle obvious.',
    },
    {
      title: 'Colour and label',
      instructions: 'Colour the ocean blue, the sun yellow and the mountain brown. Label evaporation, condensation, precipitation and runoff.',
      tip: 'Use cool blues for water and warm tones for the Sun and land.',
    },
  ],

  parts: [
    {
      id: 'ocean',
      label: 'Ocean',
      description: 'The largest store of water. Most evaporation starts here.',
      drawStage: 1,
      color: '#4B8FC8',
      svg: {
        tag: 'rect',
        attrs: { x: 0, y: 214, width: 400, height: 86 },
      },
      geo: {
        shape: 'box',
        position: [0, -1.65, 0],
        scale: [6.5, 0.55, 1.8],
        opacity: 0.85,
      },
    },

    {
      id: 'sun',
      label: 'Sun',
      description: 'Provides the heat energy that makes water evaporate.',
      drawStage: 1,
      color: '#F5C542',
      svg: {
        tag: 'circle',
        attrs: { cx: 56, cy: 58, r: 26 },
      },
      geo: {
        shape: 'sphere',
        position: [-2.5, 1.85, 0],
        scale: [0.48, 0.48, 0.48],
      },
    },

    {
      id: 'mountain',
      label: 'Mountain',
      description: 'Pushes moist air upward, where it cools and falls as rain or snow.',
      drawStage: 2,
      color: '#8C7A6B',
      svg: {
        tag: 'path',
        attrs: { d: 'M20 214 L100 112 L176 214 Z' },
      },
      geo: {
        shape: 'cone',
        position: [-1.75, -0.45, -0.1],
        scale: [1.0, 1.35, 0.85],
      },
    },

    {
      id: 'cloud',
      label: 'Cloud (condensation)',
      description: 'Forms when water vapour cools and condenses into tiny droplets.',
      drawStage: 2,
      color: '#E8EEF4',
      svg: {
        tag: 'path',
        attrs: { d: 'M250 78 Q244 50 270 50 Q280 28 306 38 Q328 36 332 58 Q356 62 350 84 Z' },
      },
      geo: {
        shape: 'sphere',
        position: [1.35, 1.55, 0],
        scale: [0.85, 0.4, 0.5],
      },
    },

    {
      id: 'river',
      label: 'River',
      description: 'Carries runoff from the land back to the ocean, completing the cycle.',
      drawStage: 3,
      color: '#5FA8D3',
      svg: {
        tag: 'path',
        attrs: { d: 'M104 214 Q130 180 118 150 Q104 128 130 112', strokeWidth: 6 },
      },
      geo: {
        shape: 'cylinder',
        position: [-0.65, -0.95, 0.35],
        scale: [0.12, 1.0, 0.12],
        rotation: [0, 0, 1.35],
      },
    },

    {
      id: 'evaporation',
      label: 'Evaporation',
      description: 'Heat from the Sun turns liquid water into water vapour that rises into the air.',
      drawStage: 4,
      color: '#7FC4E8',
      svg: {
        tag: 'path',
        attrs: { d: 'M150 196 Q172 150 160 110 M200 200 Q222 156 210 116', strokeWidth: 3 },
      },
      geo: {
        shape: 'cylinder',
        position: [0.15, 0.0, 0.25],
        scale: [0.055, 0.95, 0.055],
        rotation: [0, 0, 0.12],
      },
    },

    {
      id: 'precipitation',
      label: 'Precipitation',
      description: 'Water falls from clouds as rain, snow, sleet or hail.',
      drawStage: 4,
      color: '#3D7FC1',
      svg: {
        tag: 'path',
        attrs: { d: 'M290 96 L285 120 M306 96 L301 120 M322 98 L317 122', strokeWidth: 2.5 },
      },
      geo: {
        shape: 'cylinder',
        position: [1.45, 0.65, 0.3],
        scale: [0.045, 0.65, 0.045],
      },
    },
  ],
};
