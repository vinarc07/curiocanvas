
import type { TopicContent } from '@/content/types';

export const photosynthesis: TopicContent = {
  slug: 'photosynthesis',
  title: 'Photosynthesis',
  category: 'Plant Biology',
  summary: 'How green plants turn sunlight, water and carbon dioxide into food.',
  aliases: ['photo', 'chlorophyll', 'leaf', 'sunlight'],
  accent: 'from-green-400 to-teal-700',
  cameraDistance: 6.5,

  textbook: {
    introduction:
      'Photosynthesis is the process that lets plants make their own food from light energy. It is the main source of energy for almost every living thing.',
    definition:
      '**Photosynthesis** is the process by which green plants, algae and some bacteria use **sunlight**, **water** and **carbon dioxide** to make **glucose** and release **oxygen**.',
    explanation: [
      'The overall equation is: 6CO2 + 6H2O + light energy gives C6H12O6 + 6O2.',
      'Chlorophyll, the green pigment in chloroplasts, absorbs red and blue light to power the reaction.',
      'The process has two stages: light-dependent reactions and the Calvin cycle, which builds sugar.',
    ],
    structure: [
      { term: 'Leaf', meaning: 'The main site of photosynthesis, with a large surface to catch light.' },
      { term: 'Chloroplast', meaning: 'Organelle containing chlorophyll where the reactions happen.' },
      { term: 'Stomata', meaning: 'Tiny pores that let carbon dioxide in and oxygen out.' },
      { term: 'Veins', meaning: 'Carry water to the leaf and sugar away from it.' },
    ],
    functions: [
      'Converts light energy into chemical energy stored in glucose.',
      'Releases oxygen that animals and humans need to breathe.',
      'Provides the food that starts most food chains on Earth.',
    ],
    characteristics: [
      'Needs light, water, carbon dioxide and chlorophyll.',
      'Happens mostly in the leaves, during daytime.',
      'Produces oxygen as a by-product.',
    ],
    examples: [
      'A tree grows heavier as it turns carbon dioxide from the air into sugar and wood.',
      'Algae in ponds produce much of the oxygen that fish breathe.',
    ],
    keyPoints: [
      'Photosynthesis needs sunlight, water and carbon dioxide.',
      'It produces glucose for energy and oxygen as a by-product.',
      'Chloroplasts with chlorophyll are the sites where it happens.',
    ],
  },

  drawingSteps: [
    {
      title: 'Draw the leaf outline and stalk',
      instructions:
        'Draw a large pointed oval leaf, wider in the middle and narrower at both ends. Add a short curved stalk at the base of the leaf.',
      tip: 'Make both sides of the leaf slightly curved instead of drawing a perfect oval.',
    },
    {
      title: 'Draw the midrib and branching veins',
      instructions:
        'Draw one main vein from the stalk to the pointed tip. Add several smaller curved veins branching from the midrib towards both edges.',
      tip: 'Make the smaller veins thinner than the central midrib.',
    },
    {
      title: 'Show chloroplasts and stomata',
      instructions:
        'Draw several small oval chloroplasts inside the leaf. Add a few tiny pore-like marks along the leaf surface to represent stomata.',
      tip: 'Chloroplasts contain chlorophyll, while stomata allow gases to move in and out.',
    },
    {
      title: 'Add sunlight and water',
      instructions:
        'Draw a small Sun above the leaf with yellow rays pointing towards it. Add an arrow from the stalk or stem towards the leaf to show water entering through the veins.',
      tip: 'Use yellow for sunlight and blue arrows for water.',
    },
    {
      title: 'Show carbon dioxide entering',
      instructions:
        'Draw an arrow pointing into the leaf and label it Carbon dioxide (CO2). Show the arrow entering near the stomata.',
      tip: 'Carbon dioxide enters the leaf from the surrounding air.',
    },
    {
      title: 'Show glucose and oxygen',
      instructions:
        'Draw an arrow leaving the leaf labelled Oxygen (O2). Add another arrow towards the plant stem labelled Glucose (food) to show that the sugar is transported to other parts of the plant.',
      tip: 'Oxygen is released into the air, while glucose is used or stored by the plant.',
    },
    {
      title: 'Colour and label the complete process',
      instructions:
        'Colour the leaf green, veins dark green, Sun yellow and water arrows blue. Label the leaf, midrib, veins, chloroplasts, stomata, sunlight, water, carbon dioxide, glucose and oxygen.',
      tip: 'Check that every arrow points in the correct direction before finishing.',
    },
  ],

  parts: [
    {
      id: 'leaf',
      label: 'Leaf',
      description:
        'The main site of photosynthesis. Its broad surface catches as much sunlight as possible.',
      drawStage: 1,
      color: '#6BBF59',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M120 200 Q118 96 262 80 Q292 150 222 230 Q162 262 120 200 Z',
        },
      },
      geo: {
        shape: 'sphere',
        position: [0, 0, 0],
        scale: [1.4, 0.92, 0.12],
      },
    },
    {
      id: 'veins',
      label: 'Midrib and veins',
      description:
        'The midrib supports the leaf, while smaller veins carry water into it and transport sugars away.',
      drawStage: 2,
      color: '#2E7D4F',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M130 206 Q190 164 258 90 M150 192 Q146 158 139 137 M172 178 Q173 151 166 128 M194 159 Q202 136 205 117 M218 137 Q237 131 253 127 M179 169 Q207 178 231 185 M157 187 Q178 203 195 215',
          strokeWidth: 2.5,
        },
      },
      geo: {
        shape: 'box',
        position: [0, 0, 0.1],
        scale: [1.7, 0.05, 0.05],
        rotation: [0, 0, 0.5],
      },
    },
    {
      id: 'chloroplasts',
      label: 'Chloroplasts',
      description:
        'Organelles containing chlorophyll. Light energy is captured inside them to power photosynthesis.',
      drawStage: 3,
      color: '#1F6B3A',
      svg: {
        tag: 'ellipse',
        attrs: { cx: 166, cy: 172, rx: 12, ry: 7 },
      },
      geo: {
        shape: 'sphere',
        position: [-0.5, -0.1, 0.2],
        scale: [0.2, 0.14, 0.12],
      },
    },
    {
      id: 'stomata',
      label: 'Stomata',
      description:
        'Tiny pores on the leaf surface that allow carbon dioxide to enter and oxygen and water vapour to leave.',
      drawStage: 3,
      color: '#155D38',
      svg: {
        tag: 'ellipse',
        attrs: { cx: 207, cy: 195, rx: 5, ry: 3 },
      },
      geo: {
        shape: 'sphere',
        position: [0.25, -0.25, 0.18],
        scale: [0.1, 0.07, 0.06],
      },
    },
    {
      id: 'sunlight',
      label: 'Sunlight',
      description:
        'Light energy from the Sun. Chlorophyll absorbs mainly red and blue light to power the process.',
      drawStage: 4,
      color: '#F5B942',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M30 40 L84 82 M24 92 L76 122 M56 16 L100 58',
          strokeWidth: 3,
        },
      },
      geo: {
        shape: 'sphere',
        position: [-2.4, 1.7, 0.6],
        scale: [0.42, 0.42, 0.42],
      },
    },
    {
      id: 'water',
      label: 'Water entering',
      description:
        'Water is absorbed by the roots and transported through the stem and leaf veins.',
      drawStage: 4,
      color: '#398BD4',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M130 282 L130 224 M122 234 L130 224 L138 234',
          strokeWidth: 3,
        },
      },
      geo: {
        shape: 'sphere',
        position: [-1.8, -1.8, 0.5],
        scale: [0.22, 0.22, 0.22],
      },
    },
    {
      id: 'carbon-dioxide',
      label: 'Carbon dioxide in',
      description:
        'Carbon dioxide enters the leaf through stomata and is used to build glucose.',
      drawStage: 5,
      color: '#8E9AAF',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M372 150 L290 150 M300 140 L290 150 L300 160',
          strokeWidth: 3,
        },
      },
      geo: {
        shape: 'sphere',
        position: [2.3, 0.2, 0.5],
        scale: [0.26, 0.26, 0.26],
      },
    },
    {
      id: 'oxygen',
      label: 'Oxygen out',
      description:
        'Oxygen is produced during photosynthesis and released into the air through the stomata.',
      drawStage: 5,
      color: '#4FB3D9',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M70 246 L122 212 M108 208 L122 212 L118 226',
          strokeWidth: 3,
        },
      },
      geo: {
        shape: 'sphere',
        position: [-2.3, -1.2, 0.5],
        scale: [0.26, 0.26, 0.26],
      },
    },
    {
      id: 'glucose',
      label: 'Glucose produced',
      description:
        'Glucose is the sugar made during photosynthesis. The plant uses it for energy and growth or stores it.',
      drawStage: 5,
      color: '#D6A83D',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M260 224 L322 260 M310 244 L322 260 L302 258',
          strokeWidth: 3,
        },
      },
      geo: {
        shape: 'sphere',
        position: [1.8, -1.4, 0.4],
        scale: [0.25, 0.25, 0.25],
      },
    },
  ],
};
