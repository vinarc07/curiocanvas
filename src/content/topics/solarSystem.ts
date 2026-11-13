
import type { TopicContent, TopicPart } from '@/content/types';

const ORBIT_CENTER = { x: 200, y: 150 };
const SCALE_2D = 40;

interface PlanetSpec {
  id: string;
  label: string;
  description: string;
  orbitRadius: number;
  angleDeg: number;
  size3d: number;
  size2d: number;
  color: string;
}

const planetSpecs: PlanetSpec[] = [
  { id: 'mercury', label: 'Mercury', description: 'The smallest planet and the closest to the Sun. It has almost no atmosphere.', orbitRadius: 34, angleDeg: 20, size3d: 0.1, size2d: 3, color: '#B8A99A' },
  { id: 'venus', label: 'Venus', description: 'The hottest planet because its thick atmosphere traps heat. It is similar in size to Earth.', orbitRadius: 46, angleDeg: 70, size3d: 0.16, size2d: 5, color: '#E9C58D' },
  { id: 'earth', label: 'Earth', description: 'Our home planet. It is the only known world with liquid water on its surface and life.', orbitRadius: 58, angleDeg: 160, size3d: 0.18, size2d: 5.5, color: '#4F86C6' },
  { id: 'mars', label: 'Mars', description: 'The red planet. It has the largest volcano and polar ice caps in the solar system.', orbitRadius: 70, angleDeg: 250, size3d: 0.13, size2d: 4, color: '#C8553D' },
  { id: 'jupiter', label: 'Jupiter', description: 'The largest planet. It is a gas giant with a famous Great Red Spot storm.', orbitRadius: 90, angleDeg: 330, size3d: 0.42, size2d: 11, color: '#D9A77C' },
  { id: 'saturn', label: 'Saturn', description: 'A gas giant famous for its bright rings made of ice and rock.', orbitRadius: 108, angleDeg: 100, size3d: 0.36, size2d: 9, color: '#E6D3A3' },
  { id: 'uranus', label: 'Uranus', description: 'An ice giant that spins on its side, tilted about 98 degrees.', orbitRadius: 124, angleDeg: 200, size3d: 0.26, size2d: 7, color: '#A8DDE0' },
  { id: 'neptune', label: 'Neptune', description: 'The farthest planet from the Sun. It has the strongest winds in the solar system.', orbitRadius: 138, angleDeg: 45, size3d: 0.25, size2d: 7, color: '#3E64C4' },
];

const toRad = (deg: number) => (deg * Math.PI) / 180;

const planetPart = (spec: PlanetSpec, drawStage: 3 | 4): TopicPart => {
  const rad = toRad(spec.angleDeg);
  const x2 = ORBIT_CENTER.x + spec.orbitRadius * Math.cos(rad);
  const y2 = ORBIT_CENTER.y - spec.orbitRadius * Math.sin(rad);
  const r3 = spec.orbitRadius / SCALE_2D;

  return {
    id: spec.id,
    label: spec.label,
    description: spec.description,
    drawStage,
    color: spec.color,
    svg: {
      tag: 'circle',
      attrs: {
        cx: Number(x2.toFixed(1)),
        cy: Number(y2.toFixed(1)),
        r: spec.size2d,
      },
    },
    geo: {
      shape: 'sphere',
      position: [
        Number((r3 * Math.cos(rad)).toFixed(3)),
        Number((r3 * Math.sin(rad)).toFixed(3)),
        0,
      ],
      scale: [spec.size3d, spec.size3d, spec.size3d],
    },
  };
};

const orbitPart = (spec: PlanetSpec): TopicPart => ({
  id: `orbit-${spec.id}`,
  label: `${spec.label} orbit`,
  description: '',
  decorative: true,
  drawStage: 2,
  color: 'none',
  svg: {
    tag: 'circle',
    attrs: {
      cx: ORBIT_CENTER.x,
      cy: ORBIT_CENTER.y,
      r: spec.orbitRadius,
    },
  },
  geo: {
    shape: 'torus',
    position: [0, 0, 0],
    scale: [
      spec.orbitRadius / SCALE_2D,
      spec.orbitRadius / SCALE_2D,
      spec.orbitRadius / SCALE_2D,
    ],
    opacity: 0.35,
  },
});

const asteroidBelt: TopicPart = {
  id: 'asteroid-belt',
  label: 'Asteroid belt',
  description: 'A region of rocky objects between the orbits of Mars and Jupiter.',
  decorative: true,
  drawStage: 3,
  color: '#A98A65',
  svg: {
    tag: 'circle',
    attrs: {
      cx: ORBIT_CENTER.x,
      cy: ORBIT_CENTER.y,
      r: 80,
      fill: 'none',
      stroke: '#A98A65',
      strokeWidth: 3,
      strokeDasharray: '2 5',
    },
  },
  geo: {
    shape: 'torus',
    position: [0, 0, 0],
    scale: [2, 2, 2],
    opacity: 0.2,
  },
};

const saturnRings: TopicPart = {
  id: 'saturn-rings',
  label: 'Saturn rings',
  description: 'Wide rings surrounding Saturn, made mainly of ice and rocky particles.',
  decorative: true,
  drawStage: 5,
  color: '#C5A875',
  svg: {
    tag: 'ellipse',
    attrs: {
      cx: 181.3,
      cy: 256.3,
      rx: 17,
      ry: 6,
      fill: 'none',
      stroke: '#C5A875',
      strokeWidth: 3,
    },
  },
  geo: {
    shape: 'torus',
    position: [-0.469, 2.658, 0],
    scale: [0.55, 0.55, 0.12],
    opacity: 0.85,
  },
};

export const solarSystem: TopicContent = {
  slug: 'solar-system',
  title: 'Solar System',
  category: 'Space',
  summary: 'The Sun, eight planets and the other bodies bound to them by gravity.',
  aliases: ['solar', 'planets', 'planet', 'space'],
  accent: 'from-amber-300 to-orange-600',
  cameraDistance: 10,

  textbook: {
    introduction:
      'The solar system is a family of objects that orbit the Sun, the star at its centre. It includes eight planets, moons, asteroids and comets.',
    definition:
      'The **solar system** is the Sun together with everything that is held in orbit around it by the Sun\'s **gravity**.',
    explanation: [
      'The Sun contains more than 99 percent of the mass of the solar system.',
      'Planets travel around the Sun in **elliptical orbits**, and each planet moves at its own speed.',
      'The solar system formed about 4.6 billion years ago from a rotating cloud of gas and dust.',
    ],
    structure: [
      { term: 'The Sun', meaning: 'A star that provides light, heat and gravity to the whole system.' },
      { term: 'Inner (rocky) planets', meaning: 'Mercury, Venus, Earth and Mars: small, solid and close to the Sun.' },
      { term: 'Outer (giant) planets', meaning: 'Jupiter, Saturn, Uranus and Neptune: large and mostly gas or ice.' },
      { term: 'Asteroid belt', meaning: 'A ring of rocky bodies between Mars and Jupiter.' },
    ],
    functions: [
      'Gravity keeps planets in orbit and holds the whole system together.',
      'Sunlight powers weather, seasons and life on Earth.',
      'Planets sweep out their own paths, clearing debris from their orbits.',
    ],
    characteristics: [
      'Planets closer to the Sun are hotter and smaller on average.',
      'Most planets spin on their axes and travel in the same direction.',
      'Distances are so large that astronomers measure them in astronomical units (AU).',
    ],
    examples: [
      'One year on Earth is the time it takes Earth to complete one orbit of the Sun.',
      'Jupiter is so massive that it has more than 90 known moons.',
    ],
    keyPoints: [
      'The Sun is at the centre and holds the system together by gravity.',
      'There are four rocky inner planets and four giant outer planets.',
      'Earth is the only known planet with life.',
    ],
  },

  drawingSteps: [
    {
      title: 'Draw the Sun at the centre',
      instructions:
        'Draw a large circle in the middle of your page. Add a smaller inner circle or short rays around it to represent the Sun.',
      tip: 'Keep enough empty space around the Sun for all eight planetary orbits.',
    },
    {
      title: 'Draw the eight orbital paths',
      instructions:
        'Draw eight thin circular or slightly oval paths around the Sun. Make each orbit larger than the previous one.',
      tip: 'Use light pencil or dotted lines so the planets remain easy to see.',
    },
    {
      title: 'Add the four inner planets',
      instructions:
        'Place Mercury, Venus, Earth and Mars on the first four orbits. Draw them as small circles, with Earth blue and Mars reddish.',
      tip: 'The four inner planets are rocky and much smaller than the giant outer planets.',
    },
    {
      title: 'Draw the asteroid belt',
      instructions:
        'Between the Mars and Jupiter orbits, add a narrow dotted ring made of many tiny irregular dots to represent asteroids.',
      tip: 'Keep the asteroid belt between Mars and Jupiter, not around the Sun.',
    },
    {
      title: 'Add the four outer planets',
      instructions:
        'Place Jupiter, Saturn, Uranus and Neptune on the remaining four orbits. Make Jupiter the largest and use different sizes for the other planets.',
      tip: 'Jupiter should be the largest planet in your drawing.',
    },
    {
      title: 'Add Saturn rings, colours and labels',
      instructions:
        'Draw a wide ring around Saturn. Colour the Sun yellow, Earth blue and green, Mars red, and the other planets in suitable shades. Label all eight planets in order.',
      tip: 'Check the order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune.',
    },
  ],

  parts: [
    {
      id: 'sun',
      label: 'Sun',
      description:
        'A star made of hot hydrogen and helium. It provides the light and gravity that hold the solar system together.',
      drawStage: 1,
      color: '#F5B942',
      svg: {
        tag: 'circle',
        attrs: { cx: ORBIT_CENTER.x, cy: ORBIT_CENTER.y, r: 22 },
      },
      geo: {
        shape: 'sphere',
        position: [0, 0, 0],
        scale: [0.75, 0.75, 0.75],
      },
    },

    ...planetSpecs.map((spec) => orbitPart(spec)),

    asteroidBelt,

    ...planetSpecs.map((spec) =>
      planetPart(spec, spec.orbitRadius > 60 ? 4 : 3),
    ),

    saturnRings,
  ],
};
