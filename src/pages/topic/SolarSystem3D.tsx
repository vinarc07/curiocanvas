
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type PlanetData = {
  id: string;
  name: string;
  color: string;
  secondary?: string;
  size: number;
  description: string;
  ring?: boolean;
};

const planets: PlanetData[] = [
  {
    id: 'sun',
    name: 'Sun',
    color: '#ffb52e',
    secondary: '#ff5b18',
    size: 1.25,
    description: 'The star at the centre of our Solar System.',
  },
  {
    id: 'mercury',
    name: 'Mercury',
    color: '#aaa49c',
    size: 0.48,
    description: 'The smallest planet and the closest planet to the Sun.',
  },
  {
    id: 'venus',
    name: 'Venus',
    color: '#e7b56e',
    secondary: '#a65e32',
    size: 0.7,
    description: 'A hot planet with a thick atmosphere.',
  },
  {
    id: 'earth',
    name: 'Earth',
    color: '#2479dc',
    secondary: '#36a66b',
    size: 0.75,
    description: 'Our home planet, with oceans, land and life.',
  },
  {
    id: 'mars',
    name: 'Mars',
    color: '#c75b3c',
    secondary: '#8d352b',
    size: 0.62,
    description: 'The red planet, known for its rocky surface.',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    color: '#d6a477',
    secondary: '#a75b39',
    size: 1.15,
    description: 'The largest planet in our Solar System.',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    color: '#dfc18a',
    secondary: '#ad8756',
    size: 1.0,
    description: 'A gas giant famous for its beautiful rings.',
    ring: true,
  },
  {
    id: 'uranus',
    name: 'Uranus',
    color: '#8bd5df',
    secondary: '#4b9cae',
    size: 0.85,
    description: 'An ice giant with a blue-green appearance.',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    color: '#3265d8',
    secondary: '#193c99',
    size: 0.82,
    description: 'A distant, deep-blue ice giant.',
  },
];

function Planet({ planet }: { planet: PlanetData }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.22;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.015;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[planet.size, 64, 64]} />
        <meshStandardMaterial
          color={planet.color}
          roughness={planet.id === 'sun' ? 0.35 : 0.8}
          metalness={0.05}
          emissive={planet.id === 'sun' ? '#ff7a18' : '#000000'}
          emissiveIntensity={planet.id === 'sun' ? 1.1 : 0}
        />
      </mesh>

      {planet.secondary && (
        <mesh scale={1.006}>
          <sphereGeometry args={[planet.size, 48, 48]} />
          <meshBasicMaterial
            color={planet.secondary}
            wireframe
            transparent
            opacity={0.09}
          />
        </mesh>
      )}

      {planet.id === 'earth' && (
        <group>
          <mesh scale={1.012}>
            <sphereGeometry args={[planet.size, 48, 48]} />
            <meshBasicMaterial
              color="#42bd78"
              wireframe
              transparent
              opacity={0.18}
            />
          </mesh>
        </group>
      )}

      {planet.ring && (
        <mesh ref={ringRef} rotation={[Math.PI / 2.35, 0, 0]}>
          <ringGeometry args={[planet.size * 1.35, planet.size * 2.05, 96]} />
          <meshStandardMaterial
            color="#d7bd91"
            side={THREE.DoubleSide}
            transparent
            opacity={0.85}
            roughness={0.8}
          />
        </mesh>
      )}

      {planet.id === 'sun' && (
        <mesh scale={1.2}>
          <sphereGeometry args={[planet.size, 32, 32]} />
          <meshBasicMaterial
            color="#ff9c26"
            transparent
            opacity={0.12}
          />
        </mesh>
      )}
    </group>
  );
}

export default function SolarSystem3D({
  selectedId,
}: {
  selectedId: string;
}) {
  const selectedPlanet = useMemo(() => {
    const normalizedId = selectedId.toLowerCase().replace(/\s+/g, '-');

    return (
      planets.find(
        (planet) =>
          planet.id === normalizedId ||
          planet.name.toLowerCase() === normalizedId
      ) ?? planets[2]
    );
  }, [selectedId]);

  const backgroundStars = useMemo(() => {
    const positions: number[] = [];

    for (let i = 0; i < 450; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 22;
      const z = (Math.random() - 0.5) * 15;

      positions.push(x, y, z);
    }

    return new Float32Array(positions);
  }, []);

  return (
    <group>
      <color attach="background" args={['#080d20']} />

      <Stars
        radius={45}
        depth={35}
        count={900}
        factor={3}
        saturation={0.4}
        fade
        speed={0.5}
      />

      <ambientLight intensity={0.8} />

      <directionalLight
        position={[5, 5, 7]}
        intensity={2.2}
      />

      <pointLight
        position={[-4, 2, 4]}
        intensity={1.1}
        color="#8caeff"
      />

      <Planet planet={selectedPlanet} />

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[backgroundStars, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.035}
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      <OrbitControls
        enablePan={false}
        enableZoom
        enableRotate
        minDistance={2.5}
        maxDistance={12}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </group>
  );
}
