
import type { TopicContent } from '@/content/types';

export const humanBrain: TopicContent = {
  slug: 'human-brain',
  title: 'Human Brain',
  category: 'Human Body',
  summary: 'The control centre of the nervous system, responsible for thought, movement and senses.',
  aliases: ['brain', 'neuron', 'nervous system', 'cerebrum'],
  accent: 'from-pink-400 to-rose-700',
  cameraDistance: 7,

  textbook: {
    introduction:
      'The brain is the command centre of the body. It receives information from the senses, processes it and coordinates every action and thought.',
    definition:
      'The **brain** is the soft, highly folded organ inside the skull that forms the centre of the **nervous system**.',
    explanation: [
      'The brain contains around 86 billion nerve cells called **neurons**.',
      'Neurons communicate with each other using electrical and chemical signals.',
      'Different regions of the brain control different tasks, such as movement, language and vision.',
    ],
    structure: [
      { term: 'Cerebrum', meaning: 'The largest part; responsible for thinking, memory and voluntary movement.' },
      { term: 'Frontal lobe', meaning: 'Controls planning, decision-making and speech.' },
      { term: 'Parietal lobe', meaning: 'Processes touch, temperature and spatial awareness.' },
      { term: 'Temporal lobe', meaning: 'Processes hearing and memory.' },
      { term: 'Occipital lobe', meaning: 'Processes visual information from the eyes.' },
      { term: 'Cerebellum', meaning: 'Coordinates balance, posture and fine movements.' },
      { term: 'Brainstem', meaning: 'Controls breathing, heartbeat and other automatic functions.' },
    ],
    functions: [
      'Receives and interprets signals from the eyes, ears and skin.',
      'Sends commands to muscles to produce movement.',
      'Stores memories and supports learning and emotion.',
    ],
    characteristics: [
      'Soft organ protected by the skull and three layers of membranes called meninges.',
      'Uses about 20 percent of the body\'s oxygen and energy.',
      'Left and right halves communicate through a thick band of fibres.',
    ],
    examples: [
      'Catching a ball uses the visual lobe to track it and the cerebellum to coordinate your hand.',
      'Breathing continues during sleep because the brainstem controls it automatically.',
    ],
    keyPoints: [
      'The brain is the control centre of the nervous system.',
      'It is divided into the cerebrum, cerebellum and brainstem.',
      'Each lobe has special jobs, and they all work together.',
    ],
  },

  drawingSteps: [
    {
      title: 'Draw the brain outline',
      instructions:
        'Sketch the large upper cerebrum with a rounded front, curved top and narrower lower back. Add a small guideline underneath for the brainstem.',
      tip: 'Keep the outline slightly asymmetrical to give the brain a natural anatomical shape.',
    },
    {
      title: 'Divide the four lobes',
      instructions:
        'Draw curved boundaries to show the frontal lobe at the front, parietal lobe at the top, temporal lobe at the lower side and occipital lobe at the back.',
      tip: 'Use light pencil lines first so the boundaries remain easy to adjust.',
    },
    {
      title: 'Add brain folds',
      instructions:
        'Draw several short curved and wavy lines across the cerebrum to represent its folds and grooves.',
      tip: 'Use irregular curved lines rather than straight parallel lines.',
    },
    {
      title: 'Draw the cerebellum and brainstem',
      instructions:
        'Add the rounded cerebellum below the back of the cerebrum. Draw the brainstem as a narrowing curved structure extending downward.',
      tip: 'The cerebellum is smaller than the cerebrum and sits behind the brainstem.',
    },
    {
      title: 'Colour and label the brain',
      instructions:
        'Use different shades for the frontal, parietal, temporal and occipital lobes. Label the cerebrum, cerebellum and brainstem.',
      tip: 'Keep each anatomical region a different colour to make identification easier.',
    },
  ],

  parts: [
    {
      id: 'cerebrum',
      label: 'Cerebrum',
      description:
        'The largest part of the brain. It handles thinking, memory, language and voluntary movement.',
      drawStage: 1,
      color: '#EDB0C2',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M78 143 C58 115 76 77 108 70 C112 38 158 34 178 55 C205 30 247 49 253 69 C286 54 324 82 318 112 C344 136 321 177 296 181 C282 211 244 214 220 197 C189 220 153 203 144 188 C110 199 76 176 78 143 Z',
        },
      },
      geo: {
        shape: 'sphere',
        position: [0, 0.35, 0],
        scale: [1.65, 1.15, 1.0],
      },
    },
    {
      id: 'frontal-lobe',
      label: 'Frontal lobe',
      description:
        'Located at the front. It controls planning, decision-making, personality and speech.',
      drawStage: 2,
      color: '#E08AA6',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M80 143 C59 115 77 77 108 70 C119 84 132 108 137 133 C126 158 120 178 144 188 C110 199 76 176 80 143 Z',
        },
      },
      geo: {
        shape: 'sphere',
        position: [-0.95, 0.45, 0.48],
        scale: [0.72, 0.78, 0.65],
      },
    },
    {
      id: 'parietal-lobe',
      label: 'Parietal lobe',
      description:
        'Processes sensations such as touch, pressure and temperature, and helps with spatial awareness.',
      drawStage: 2,
      color: '#D98AA8',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M108 70 C112 38 158 34 178 55 C205 30 247 49 253 69 C255 91 240 110 220 119 C188 107 158 109 137 133 C132 108 119 84 108 70 Z',
        },
      },
      geo: {
        shape: 'sphere',
        position: [0.0, 1.0, 0.12],
        scale: [0.78, 0.48, 0.72],
      },
    },
    {
      id: 'temporal-lobe',
      label: 'Temporal lobe',
      description:
        'Processes sound, language comprehension and stores long-term memories.',
      drawStage: 2,
      color: '#CF7E9E',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M137 133 C158 109 188 107 220 119 C241 133 254 157 244 181 C222 205 178 203 144 188 C120 178 126 154 137 133 Z',
        },
      },
      geo: {
        shape: 'sphere',
        position: [0.0, -0.38, 0.48],
        scale: [0.95, 0.42, 0.62],
      },
    },
    {
      id: 'occipital-lobe',
      label: 'Occipital lobe',
      description:
        'At the back of the brain. It processes what the eyes see.',
      drawStage: 2,
      color: '#C9749A',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M253 69 C286 54 324 82 318 112 C344 136 321 177 296 181 C282 193 263 187 244 181 C254 157 241 133 220 119 C240 110 255 91 253 69 Z',
        },
      },
      geo: {
        shape: 'sphere',
        position: [1.15, 0.28, -0.05],
        scale: [0.58, 0.72, 0.68],
      },
    },
    {
      id: 'brain-folds',
      label: 'Brain folds',
      description:
        'The grooves and raised folds increase the surface area of the cerebrum.',
      drawStage: 3,
      color: '#A94F78',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M104 92 Q119 77 133 96 Q147 114 161 94 M169 69 Q184 84 177 101 M198 62 Q218 73 207 91 M235 79 Q251 91 238 108 M93 137 Q109 122 123 142 M151 143 Q169 127 183 145 M197 119 Q213 104 228 126 M256 137 Q275 120 292 139 M163 174 Q181 159 198 176 M221 170 Q238 154 254 169',
          strokeWidth: 3,
        },
      },
      geo: {
        shape: 'sphere',
        position: [0, 0.35, 0.85],
        scale: [1.25, 0.8, 0.08],
      },
    },
    {
      id: 'cerebellum',
      label: 'Cerebellum',
      description:
        'Coordinates balance, posture and smooth, precise movements.',
      drawStage: 4,
      color: '#B86A8A',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M239 185 Q252 169 273 178 Q296 171 311 191 Q322 213 300 226 Q275 237 251 222 Q232 210 239 185 Z M246 191 Q266 201 302 194 M244 203 Q270 213 309 204 M251 216 Q276 224 301 216',
          strokeWidth: 2,
        },
      },
      geo: {
        shape: 'sphere',
        position: [0.75, -0.85, -0.38],
        scale: [0.72, 0.48, 0.62],
      },
    },
    {
      id: 'brainstem',
      label: 'Brainstem',
      description:
        'Controls breathing, heartbeat and other automatic body functions.',
      drawStage: 4,
      color: '#E2B1A0',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M204 190 Q207 211 217 223 L213 260 Q208 273 196 270 L187 261 L193 225 Q196 208 190 190 Z',
        },
      },
      geo: {
        shape: 'cylinder',
        position: [0.25, -1.15, -0.18],
        scale: [0.22, 0.72, 0.22],
      },
    },
  ],
};
