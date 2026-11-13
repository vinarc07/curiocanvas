
import type { TopicContent } from '@/content/types';

export const animalCell: TopicContent = {
  slug: 'animal-cell',
  title: 'Animal Cell',
  category: 'Cell Biology',
  summary:
    'The basic unit of life in animals, packed with organelles that keep it alive.',
  aliases: [
    'animal cells',
    'organelle',
    'organelles',
    'nucleus',
    'mitochondria',
  ],
  accent: 'from-violet-400 to-fuchsia-800',
  cameraDistance: 6.5,

  textbook: {
    introduction:
      'Every animal is built from cells. The animal cell is a small, flexible unit that performs all the processes needed for life.',
    definition:
      'An **animal cell** is a eukaryotic cell bounded by a flexible **cell membrane** and containing membrane-bound **organelles**. It has no cell wall.',
    explanation: [
      'Each organelle has a specific job, similar to organs in a body.',
      'The **nucleus** controls the cell by storing DNA, the instructions for making proteins.',
      'The **mitochondria** release energy from food through respiration.',
    ],
    structure: [
      {
        term: 'Cell membrane',
        meaning:
          'A flexible outer layer that controls what enters and leaves the cell.',
      },
      {
        term: 'Nucleus',
        meaning: 'Contains DNA and controls the cell activities.',
      },
      {
        term: 'Nucleolus',
        meaning:
          'Inside the nucleus; makes the parts of ribosomes.',
      },
      {
        term: 'Mitochondria',
        meaning:
          'Release energy from glucose; called the powerhouse of the cell.',
      },
      {
        term: 'Endoplasmic reticulum',
        meaning:
          'A network of membranes that makes and transports proteins and lipids.',
      },
      {
        term: 'Golgi apparatus',
        meaning:
          'Packages, sorts and ships proteins to where they are needed.',
      },
    ],
    functions: [
      'Respiration in the mitochondria releases energy as ATP.',
      'Proteins made on ribosomes support growth, repair and structure.',
      'The membrane controls the movement of substances in and out.',
    ],
    characteristics: [
      'Animal cells have no cell wall and no chloroplasts.',
      'Their shape can change because the membrane is flexible.',
      'Most animal cells are between 10 and 30 micrometres wide.',
    ],
    examples: [
      'Muscle cells have many mitochondria to supply the energy needed for movement.',
      'Nerve cells have long extensions that carry electrical signals.',
    ],
    keyPoints: [
      'The cell membrane is the boundary of the cell.',
      'The nucleus holds the genetic material.',
      'Mitochondria produce the energy the cell needs.',
    ],
  },

  drawingSteps: [
    {
      title: 'Draw the cell membrane',
      instructions:
        'Draw a large, slightly irregular circle to represent the flexible outer membrane.',
      tip: 'Use a light, continuous line; animal cells have no thick wall.',
    },
    {
      title: 'Add the nucleus',
      instructions:
        'Draw a large circle near the centre and a smaller dot inside it for the nucleolus.',
      tip: 'The nucleus is usually the largest organelle, so draw it generously.',
    },
    {
      title: 'Add mitochondria and the ER',
      instructions:
        'Draw a few bean-shaped mitochondria, and wavy lines near the nucleus for the endoplasmic reticulum.',
      tip: 'Mitochondria have an inner folded membrane, so draw small folds inside.',
    },
    {
      title: 'Draw the Golgi apparatus',
      instructions:
        'Sketch a stack of curved, flattened lines near the nucleus for the Golgi apparatus.',
      tip: 'Stack the curves like a pile of pancakes.',
    },
    {
      title: 'Colour and label',
      instructions:
        'Colour each organelle differently and label the membrane, nucleus, mitochondria, ER and Golgi.',
      tip: 'Use the same colour for the same organelle throughout the drawing.',
    },
  ],

  parts: [
    {
      id: 'membrane',
      label: 'Cell membrane',
      description:
        'A flexible outer boundary that controls which substances enter and leave the cell.',
      drawStage: 1,
      color: '#F4DCE8',
      svg: {
        tag: 'circle',
        attrs: { cx: 200, cy: 150, r: 115 },
      },
      geo: {
        shape: 'sphere',
        position: [0, 0, 0],
        scale: [2, 1.65, 1.8],
        opacity: 0.22,
      },
    },

    {
      id: 'nucleus',
      label: 'Nucleus',
      description:
        'The control centre of the cell. It stores DNA and controls cell activities.',
      drawStage: 2,
      color: '#9B72C8',
      svg: {
        tag: 'circle',
        attrs: { cx: 186, cy: 140, r: 42 },
      },
      geo: {
        shape: 'sphere',
        position: [-0.3, 0.2, 0.3],
        scale: [0.75, 0.75, 0.75],
      },
    },

    {
      id: 'nucleolus',
      label: 'Nucleolus',
      description:
        'A dense region inside the nucleus where ribosome components are produced.',
      drawStage: 3,
      color: '#54256E',
      svg: {
        tag: 'circle',
        attrs: { cx: 180, cy: 132, r: 13 },
      },
      geo: {
        shape: 'sphere',
        position: [-0.35, 0.25, 0.85],
        scale: [0.25, 0.25, 0.25],
      },
    },

    {
      id: 'mitochondria',
      label: 'Mitochondria',
      description:
        'Release energy from food through cellular respiration.',
      drawStage: 3,
      color: '#E08E6D',
      svg: {
        tag: 'ellipse',
        attrs: { cx: 270, cy: 110, rx: 26, ry: 14 },
      },
      geo: {
        shape: 'sphere',
        position: [1.0, 0.65, 0.2],
        scale: [0.48, 0.25, 0.3],
      },
    },

    {
      id: 'mitochondria-2',
      label: 'Mitochondrion (second)',
      description:
        'Another mitochondrion that helps supply energy to the cell.',
      drawStage: 3,
      color: '#E08E6D',
      decorative: true,
      svg: {
        tag: 'ellipse',
        attrs: { cx: 122, cy: 218, rx: 24, ry: 13 },
      },
      geo: {
        shape: 'sphere',
        position: [-1.0, -0.85, 0.2],
        scale: [0.42, 0.23, 0.28],
      },
    },

    {
      id: 'er',
      label: 'Endoplasmic reticulum',
      description:
        'A membrane network that makes and transports proteins and fats.',
      drawStage: 4,
      color: '#6FA8DC',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M236 196 Q246 180 256 196 T276 196 T296 196',
        },
      },
      geo: {
        shape: 'torus',
        position: [0.75, -0.65, 0.2],
        scale: [0.55, 0.35, 0.4],
        rotation: [0.6, 0.4, 0],
      },
    },

    {
      id: 'golgi',
      label: 'Golgi apparatus',
      description:
        'Packages, sorts and ships proteins to where they are needed.',
      drawStage: 4,
      color: '#E8C547',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M96 170 Q112 160 96 150 Q112 140 96 130 M104 172 Q122 160 104 148 Q122 138 104 126',
          strokeWidth: 3,
        },
      },
      geo: {
        shape: 'box',
        position: [-1.05, -0.45, 0.2],
        scale: [0.45, 0.12, 0.3],
        rotation: [0, 0, 0.4],
      },
    },
  ],
};
