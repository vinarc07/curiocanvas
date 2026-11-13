
import type { TopicContent } from '@/content/types';

export const humanHeart: TopicContent = {
  slug: 'human-heart',
  title: 'Human Heart',
  category: 'Human Body',
  summary: 'The muscular pump that moves blood through the whole body.',
  aliases: ['heart', 'cardiac', 'heartbeat'],
  accent: 'from-rose-400 to-fuchsia-700',
  cameraDistance: 7,
  audio: { kind: 'heartbeat' },

  textbook: {
    introduction:
      'The human heart is a muscular organ that pumps blood through the body. It carries oxygen and nutrients to every cell and removes waste.',
    definition:
      'The **heart** is a hollow, four-chambered muscular pump located in the chest, between the two lungs and slightly left of centre.',
    explanation: [
      'The heart beats about **70 times per minute** at rest. One complete beat is called the **cardiac cycle**.',
      'In each cycle the chambers first relax and fill with blood, then contract and push blood out.',
      '**Valves** keep blood flowing in one direction so it never flows backwards.',
    ],
    structure: [
      { term: 'Right atrium', meaning: 'Receives oxygen-poor blood from the body.' },
      { term: 'Right ventricle', meaning: 'Pumps oxygen-poor blood to the lungs.' },
      { term: 'Left atrium', meaning: 'Receives oxygen-rich blood from the lungs.' },
      { term: 'Left ventricle', meaning: 'Pumps oxygen-rich blood to the whole body. Its wall is the thickest.' },
      { term: 'Aorta', meaning: 'The largest artery; carries oxygen-rich blood out of the heart.' },
      { term: 'Pulmonary artery', meaning: 'Carries oxygen-poor blood from the heart to the lungs.' },
      { term: 'Vena cava', meaning: 'Large veins that bring blood back to the right atrium.' },
    ],
    functions: [
      'Pumps about **5 litres** of blood per minute in an adult at rest.',
      'Sends blood to the lungs to pick up oxygen (pulmonary circulation).',
      'Sends oxygen-rich blood to the body (systemic circulation).',
      'Valves open and close with every beat so blood moves one way.',
    ],
    characteristics: [
      'Made mainly of cardiac muscle, which contracts without getting tired.',
      'Has four chambers: two atria on top and two ventricles below.',
      'The left side is stronger because it pumps blood through the whole body.',
    ],
    examples: [
      'During running, the heart beats faster to deliver extra oxygen to leg muscles.',
      'A doctor hears the "lub-dub" sound made when the heart valves close.',
    ],
    keyPoints: [
      'The heart has four chambers.',
      'The right side handles oxygen-poor blood; the left side handles oxygen-rich blood.',
      'Regular exercise keeps the heart strong and healthy.',
    ],
  },

  drawingSteps: [
    {
      title: 'Sketch the anatomical heart outline',
      instructions:
        'Draw the heart as a slightly tilted muscular organ, wider near the upper vessels and narrowing into a pointed apex at the lower end. Shape the right border with a gentle curve and make the left ventricular side fuller. Add a few shallow curved lines to suggest the outer muscle surface.',
      tip: 'Study the overall silhouette first. A real heart is not a symmetrical Valentine shape: its lower portion is rounded and tapers toward the left ventricular apex.',
    },
    {
      title: 'Divide the four chambers',
      instructions:
        'Inside the heart outline, draw two smaller upper chambers for the atria and two larger lower chambers for the ventricles. In an anterior view, the anatomical right chambers appear on the viewer’s left. Separate the right and left sides with the interventricular septum. Make the left ventricular wall visibly thicker.',
      tip: 'Keep the atria smaller and above the ventricles. The septum should separate the two lower chambers clearly.',
    },
    {
      title: 'Draw the major blood vessels',
      instructions:
        'Add the aorta rising from the left ventricle and curving into a large arch. Draw the pulmonary trunk emerging from the right ventricle and branching toward the lungs. Add the superior and inferior vena cava entering the right atrium, and pulmonary veins entering the left atrium.',
      tip: 'Use thick tube-like shapes for the large vessels. The aorta forms an arch, while the vena cava enters the right atrium from above and below.',
    },
    {
      title: 'Add valves and coronary arteries',
      instructions:
        'Mark the tricuspid valve between the right atrium and right ventricle, and the mitral valve between the left atrium and left ventricle. Add the pulmonary and aortic semilunar valves near the vessel openings. Draw coronary arteries branching across the outer surface of the heart.',
      tip: 'Use small curved flap shapes for the valves. Coronary arteries should branch across the surface rather than appear as internal chamber walls.',
    },
    {
      title: 'Shade, colour and label the heart',
      instructions:
        'Colour the right atrium, right ventricle and pulmonary artery blue to represent oxygen-poor blood. Colour the left atrium, left ventricle, pulmonary veins and aorta red to represent oxygen-rich blood. Shade the heart muscle in dark pink or reddish brown. Add highlights and shadows, then label all four chambers, the septum, valves and major vessels.',
      tip: 'Keep the red and blue colours consistent. Use darker shades around the edges and lighter highlights on the muscular surface to create a three-dimensional appearance.',
    },
  ],

  parts: [
    {
      id: 'heart-body',
      label: 'Heart wall (myocardium)',
      description: 'The thick muscular wall of the heart. Its cardiac muscle contracts rhythmically to pump blood.',
      drawStage: 1,
      color: '#C96C79',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M199 270 C183 251 148 225 126 193 C102 158 107 119 132 102 C155 86 185 98 200 122 C214 97 246 86 269 105 C296 128 291 164 270 198 C250 230 220 254 199 270 Z',
          strokeWidth: 4,
        },
      },
      geo: {
        shape: 'sphere',
        position: [0, -0.1, -0.1],
        scale: [1.45, 1.5, 1.1],
        opacity: 0.22,
      },
    },

    {
      id: 'right-atrium',
      label: 'Right atrium',
      description: 'The upper right chamber that receives oxygen-poor blood from the body through the vena cava.',
      drawStage: 2,
      color: '#5B8DB8',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M130 121 Q140 104 162 111 Q181 116 180 145 Q176 165 157 168 Q139 160 130 143 Z',
          strokeWidth: 2.5,
        },
      },
      geo: {
        shape: 'sphere',
        position: [-0.72, 0.55, 0.1],
        scale: [0.7, 0.65, 0.7],
      },
    },

    {
      id: 'left-atrium',
      label: 'Left atrium',
      description: 'The upper left chamber that receives oxygen-rich blood from the lungs through the pulmonary veins.',
      drawStage: 2,
      color: '#B23A48',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M207 119 Q224 101 247 109 Q270 117 270 142 Q263 162 242 166 Q220 160 211 143 Z',
          strokeWidth: 2.5,
        },
      },
      geo: {
        shape: 'sphere',
        position: [0.72, 0.55, 0.1],
        scale: [0.68, 0.65, 0.7],
      },
    },

    {
      id: 'right-ventricle',
      label: 'Right ventricle',
      description: 'The lower right chamber that pumps oxygen-poor blood toward the lungs through the pulmonary artery.',
      drawStage: 2,
      color: '#4A7AAE',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M129 163 Q151 151 178 169 Q195 187 195 223 Q184 248 199 265 Q163 247 139 218 Q120 190 129 163 Z',
          strokeWidth: 2.5,
        },
      },
      geo: {
        shape: 'sphere',
        position: [-0.6, -0.45, 0.2],
        scale: [0.95, 1.0, 0.9],
      },
    },

    {
      id: 'left-ventricle',
      label: 'Left ventricle',
      description: 'The powerful lower left chamber with a thick muscular wall that pumps oxygen-rich blood into the aorta.',
      drawStage: 2,
      color: '#9E2B3B',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M202 164 Q228 151 258 168 Q278 190 260 222 Q239 250 200 270 Q211 240 198 215 Q188 185 202 164 Z',
          strokeWidth: 3.5,
        },
      },
      geo: {
        shape: 'sphere',
        position: [0.65, -0.45, 0.15],
        scale: [1.05, 1.1, 1.0],
      },
    },

    {
      id: 'septum',
      label: 'Interventricular septum',
      description: 'The muscular wall that separates the right and left ventricles and prevents mixing of blood between them.',
      drawStage: 3,
      color: '#E3A0A4',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M199 159 Q190 195 199 226 Q205 249 200 264',
          strokeWidth: 7,
        },
      },
      geo: {
        shape: 'cylinder',
        position: [0, -0.45, 0.45],
        scale: [0.09, 0.85, 0.08],
      },
    },

    {
      id: 'aorta',
      label: 'Aorta',
      description: 'The largest artery. It carries oxygen-rich blood from the left ventricle to the body.',
      drawStage: 3,
      color: '#C0392B',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M224 116 C222 91 229 63 248 49 C265 35 292 43 299 62 M248 49 Q247 26 248 15 M270 43 Q275 23 284 16 M289 49 Q304 33 310 26',
          strokeWidth: 10,
        },
      },
      geo: {
        shape: 'cylinder',
        position: [0.35, 1.45, -0.1],
        scale: [0.2, 0.75, 0.2],
        rotation: [0, 0, -0.5],
      },
    },

    {
      id: 'pulmonary-artery',
      label: 'Pulmonary trunk and arteries',
      description: 'Carries oxygen-poor blood from the right ventricle and branches toward the lungs.',
      drawStage: 3,
      color: '#3D6FA0',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M183 137 Q175 110 181 82 Q184 65 201 62 Q220 61 238 75 M198 65 Q180 45 159 47',
          strokeWidth: 9,
        },
      },
      geo: {
        shape: 'cylinder',
        position: [-0.55, 1.4, 0.1],
        scale: [0.18, 0.7, 0.18],
        rotation: [0, 0, 0.6],
      },
    },

    {
      id: 'vena-cava',
      label: 'Superior and inferior vena cava',
      description: 'Large veins that return oxygen-poor blood from the upper and lower body to the right atrium.',
      drawStage: 3,
      color: '#2E5E8C',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M145 111 L145 42 Q145 29 155 23 M151 161 L151 239',
          strokeWidth: 9,
        },
      },
      geo: {
        shape: 'cylinder',
        position: [-1.25, 0.95, -0.2],
        scale: [0.2, 0.9, 0.2],
      },
    },

    {
      id: 'pulmonary-veins',
      label: 'Pulmonary veins',
      description: 'Bring oxygen-rich blood from the lungs into the left atrium.',
      drawStage: 3,
      color: '#C94B55',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M255 125 L295 112 M256 143 L299 151 M295 112 L310 104 M299 151 L314 161',
          strokeWidth: 6,
        },
      },
      geo: {
        shape: 'cylinder',
        position: [1.35, 0.45, 0.15],
        scale: [0.12, 0.48, 0.12],
        rotation: [0, 0, Math.PI / 2],
      },
    },

    {
      id: 'heart-valves',
      label: 'Heart valves',
      description: 'The tricuspid, mitral, pulmonary and aortic valves keep blood moving in one direction.',
      drawStage: 4,
      color: '#E7C4A5',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M151 157 Q159 148 167 157 M163 157 Q170 149 177 157 M221 157 Q229 148 237 157 M235 157 Q243 149 251 157 M180 102 Q190 94 200 102 M204 102 Q214 94 224 102',
          strokeWidth: 3,
        },
      },
      geo: {
        shape: 'sphere',
        position: [0, 0.12, 0.62],
        scale: [0.16, 0.1, 0.08],
      },
    },

    {
      id: 'coronary-arteries',
      label: 'Coronary arteries',
      description: 'Blood vessels that branch over the heart surface to supply oxygen and nutrients to the heart muscle.',
      drawStage: 4,
      color: '#E64B48',
      svg: {
        tag: 'path',
        attrs: {
          d: 'M199 132 Q181 145 177 169 Q165 183 147 190 M177 169 Q174 186 177 201 M200 132 Q218 144 224 167 Q244 177 252 195 M224 167 Q235 185 234 204 M199 132 Q199 145 200 155',
          strokeWidth: 3,
        },
      },
      geo: {
        shape: 'cylinder',
        position: [0.3, -0.15, 0.9],
        scale: [0.035, 0.55, 0.035],
        rotation: [0, 0, -0.6],
      },
    },
  ],
};
