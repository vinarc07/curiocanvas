
import type { TopicContent } from '@/content/types';

export const volcano: TopicContent = {
  slug: 'volcano',
  title: 'Volcano',
  category: 'Earth Science',
  summary: 'An opening in Earth\'s crust where magma, gas and ash escape to the surface.',
  aliases: ['volcanoes', 'lava', 'magma', 'eruption', 'crater'],
  accent: 'from-orange-400 to-red-700',
  cameraDistance: 7.5,

  textbook: {
    introduction:
      'Volcanoes are some of the most powerful natural forces on Earth. They form where molten rock from deep underground reaches the surface.',
    definition:
      'A **volcano** is an opening in Earth\'s crust through which **magma**, gases and ash escape. Molten rock is called **lava** once it reaches the surface.',
    explanation: [
      'Magma collects in a chamber deep below the volcano, where pressure and heat build up.',
      'When pressure is high enough, magma rises through a pipe and erupts through a **vent** or **crater**.',
      'Over many eruptions, layers of lava and ash build a cone-shaped mountain.',
    ],
    structure: [
      { term: 'Magma chamber', meaning: 'A pool of molten rock beneath the volcano.' },
      { term: 'Vent', meaning: 'The pipe through which magma rises to the surface.' },
      { term: 'Crater', meaning: 'The bowl-shaped opening at the top of the volcano.' },
      { term: 'Lava flow', meaning: 'Molten rock that flows over the surface after an eruption.' },
      { term: 'Ash cloud', meaning: 'Tiny rock particles and gases thrown high into the air.' },
    ],
    functions: [
      'Releases heat and gases from Earth\'s interior.',
      'Builds new land, such as islands formed from lava.',
      'Enriches soil with minerals from weathered volcanic rock.',
    ],
    characteristics: [
      'Usually found near the boundaries of tectonic plates.',
      'Shapes include shield, cinder cone and stratovolcano.',
      'Eruptions vary from gentle lava flows to explosive blasts.',
    ],
    examples: [
      'Hawaii\'s islands were formed by volcanic activity over millions of years.',
      'Mount Vesuvius buried the Roman city of Pompeii in ash in 79 CE.',
    ],
    keyPoints: [
      'Magma is molten rock underground; lava is magma on the surface.',
      'Volcanoes form at plate boundaries and hotspots.',
      'Eruptions can build land or cause dangerous hazards.',
    ],
  },

  drawingSteps: [
    {
      title: 'Draw the mountain outline',
      instructions: 'Sketch a broad triangle with a slightly curved, sloping outline and a flat top.',
      tip: 'Volcano slopes are gentler near the base and steeper near the top.',
    },
    {
      title: 'Draw the crater',
      instructions: 'Add a shallow oval at the summit to represent the crater.',
      tip: 'Make the crater opening wider than it is deep.',
    },
    {
      title: 'Show the magma chamber',
      instructions: 'Draw a rounded shape below the surface to represent the magma chamber, and a vent connecting it to the crater.',
      tip: 'Show the chamber with a dashed outline to indicate it is underground.',
    },
    {
      title: 'Add lava and ash',
      instructions: 'Draw a curved lava flow down one side and a puffy ash cloud rising from the crater.',
      tip: 'Lava flows follow the slope downhill.',
    },
    {
      title: 'Colour and label',
      instructions: 'Colour the mountain in brown, the lava in bright orange and the ash cloud in grey. Label the crater, vent, magma chamber and lava flow.',
      tip: 'Keep the lava bright so it stands out from the brown rock.',
    },
  ],

  parts: [
    {
      id: 'cone',
      label: 'Volcano cone',
      description: 'The mountain built from layers of hardened lava and ash.',
      drawStage: 1,
      color: '#7A5C4D',
      svg: {
        tag: 'path',
        attrs: { d: 'M40 260 L160 110 L240 110 L360 260 Z' },
      },
      geo: {
        shape: 'cone',
        position: [0, -0.15, 0],
        scale: [1.55, 1.65, 1.55],
      },
    },

    {
      id: 'crater',
      label: 'Crater',
      description: 'The bowl-shaped opening at the top where gases and lava escape.',
      drawStage: 2,
      color: '#3A2A24',
      svg: {
        tag: 'ellipse',
        attrs: { cx: 200, cy: 110, rx: 40, ry: 10 },
      },
      geo: {
        shape: 'torus',
        position: [0, 1.12, 0],
        scale: [0.38, 0.38, 0.12],
        rotation: [Math.PI / 2, 0, 0],
      },
    },

    {
      id: 'magma-chamber',
      label: 'Magma chamber',
      description: 'A reservoir of molten rock beneath the volcano that builds pressure before an eruption.',
      drawStage: 3,
      color: '#E4572E',
      svg: {
        tag: 'ellipse',
        attrs: { cx: 200, cy: 262, rx: 80, ry: 18 },
      },
      geo: {
        shape: 'sphere',
        position: [0, -1.45, 0],
        scale: [0.85, 0.32, 0.65],
      },
    },

    {
      id: 'vent',
      label: 'Vent',
      description: 'The pipe that carries magma from the chamber up to the crater.',
      drawStage: 3,
      color: '#B9452A',
      svg: {
        tag: 'path',
        attrs: { d: 'M200 110 L200 244', strokeWidth: 6 },
      },
      geo: {
        shape: 'cylinder',
        position: [0, -0.15, 0],
        scale: [0.12, 1.2, 0.12],
      },
    },

    {
      id: 'lava-flow',
      label: 'Lava flow',
      description: 'Molten rock that flows down the slope after an eruption, cooling into new rock.',
      drawStage: 4,
      color: '#FF7A1A',
      svg: {
        tag: 'path',
        attrs: { d: 'M212 116 Q252 140 276 256', strokeWidth: 8 },
      },
      geo: {
        shape: 'cylinder',
        position: [0.65, 0.25, 0.42],
        scale: [0.13, 0.75, 0.13],
        rotation: [0, 0, -0.55],
      },
    },

    {
      id: 'ash-cloud',
      label: 'Ash cloud',
      description: 'Fine ash and gas thrown high into the air, which can travel for hundreds of kilometres.',
      drawStage: 4,
      color: '#9A9A9A',
      svg: {
        tag: 'ellipse',
        attrs: { cx: 200, cy: 46, rx: 62, ry: 16 },
      },
      geo: {
        shape: 'sphere',
        position: [0, 1.85, 0],
        scale: [0.72, 0.35, 0.48],
      },
    },
  ],
};
