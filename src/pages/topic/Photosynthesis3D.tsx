
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Props = {
  selectedId: string;
};

function Leaf({
  position,
  rotation = [0, 0, 0],
  selected,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  selected: boolean;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh scale={[0.78, 0.34, 0.09]}>
        <sphereGeometry args={[1, 40, 24]} />
        <meshStandardMaterial
          color={selected ? '#a7e879' : '#4caa4d'}
          roughness={0.65}
          side={THREE.DoubleSide}
          emissive={selected ? '#2d781e' : '#000000'}
          emissiveIntensity={selected ? 0.25 : 0}
        />
      </mesh>

      <mesh position={[0, 0, 0.095]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 1.35, 8]} />
        <meshStandardMaterial color="#d0e5a2" />
      </mesh>

      {[-0.35, -0.15, 0.15, 0.35].map((x) => (
        <mesh
          key={x}
          position={[x, x * 0.35, 0.1]}
          rotation={[0, 0, -0.35]}
        >
          <cylinderGeometry args={[0.006, 0.006, 0.38, 6]} />
          <meshStandardMaterial color="#b4d68b" />
        </mesh>
      ))}
    </group>
  );
}

function WaterParticles() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((child, index) => {
        child.position.y =
          -1.6 + ((state.clock.elapsedTime * 0.7 + index * 0.45) % 2.8);
      });
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 7 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 1.7) * 0.08,
            -1.6 + i * 0.4,
            0.28,
          ]}
        >
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial
            color="#35aeea"
            emissive="#168acb"
            emissiveIntensity={0.5}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function SunlightRays() {
  const rayRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (rayRef.current) {
      rayRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
    }
  });

  return (
    <group ref={rayRef} position={[-2.4, 2.1, -0.2]}>
      <mesh>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshBasicMaterial color="#ffc83d" />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.52, 32, 32]} />
        <meshBasicMaterial
          color="#ffcf54"
          transparent
          opacity={0.15}
        />
      </mesh>

      {Array.from({ length: 12 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 6) * 0.65,
            Math.sin((i * Math.PI) / 6) * 0.65,
            0,
          ]}
        >
          <boxGeometry args={[0.055, 0.22, 0.04]} />
          <meshBasicMaterial color="#ffc83d" />
        </mesh>
      ))}
    </group>
  );
}

function GasParticles({
  color,
  position,
  direction,
}: {
  color: string;
  position: [number, number, number];
  direction: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.position.x =
        position[0] +
        Math.sin(state.clock.elapsedTime * 1.4) * 0.15;

      group.current.position.y =
        position[1] +
        Math.sin(state.clock.elapsedTime * 1.8) * 0.12;
    }
  });

  return (
    <group ref={group} position={position}>
      {[-0.15, 0, 0.15].map((offset, index) => (
        <mesh
          key={index}
          position={[offset * direction, 0, 0]}
        >
          <sphereGeometry args={[0.11, 20, 20]} />
          <meshStandardMaterial
            color={color}
            roughness={0.4}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function Plant({ selectedId }: Props) {
  const leafSelected =
    selectedId === 'leaf' || selectedId === 'chloroplasts';

  const veinSelected = selectedId === 'veins';
  const waterSelected = selectedId === 'water';
  const sunlightSelected = selectedId === 'sunlight';
  const carbonSelected = selectedId === 'carbon-dioxide';
  const oxygenSelected = selectedId === 'oxygen';

  return (
    <group>
      {/* Soil */}
      <mesh position={[0, -1.75, 0]}>
        <cylinderGeometry args={[1.25, 1.25, 0.22, 48]} />
        <meshStandardMaterial color="#795438" roughness={1} />
      </mesh>

      {/* Main stem */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.095, 0.15, 2.9, 24]} />
        <meshStandardMaterial
          color="#328346"
          roughness={0.7}
        />
      </mesh>

      {/* Roots */}
      {Array.from({ length: 7 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 1.1) * 0.4,
            -2.05 - (i % 3) * 0.18,
            Math.cos(i * 1.1) * 0.2,
          ]}
          rotation={[0, 0, (i - 3) * 0.2]}
        >
          <cylinderGeometry args={[0.018, 0.045, 0.9, 8]} />
          <meshStandardMaterial color="#bd9564" />
        </mesh>
      ))}

      {/* Branches */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 0.45, 0.55, 0]}
          rotation={[0, 0, side * -0.65]}
        >
          <cylinderGeometry args={[0.045, 0.07, 1.15, 12]} />
          <meshStandardMaterial color="#39894b" />
        </mesh>
      ))}

      {/* Leaves */}
      <Leaf
        position={[-0.75, 0.9, 0]}
        rotation={[0, 0, 0.45]}
        selected={leafSelected}
      />

      <Leaf
        position={[0.75, 0.9, 0]}
        rotation={[0, 0, -0.45]}
        selected={leafSelected}
      />

      <Leaf
        position={[0, 1.65, 0]}
        rotation={[0, 0, 0.1]}
        selected={leafSelected}
      />

      <Leaf
        position={[-0.85, -0.05, 0]}
        rotation={[0, 0, 0.65]}
        selected={leafSelected}
      />

      <Leaf
        position={[0.85, -0.05, 0]}
        rotation={[0, 0, -0.65]}
        selected={leafSelected}
      />

      {/* Vein highlight */}
      {veinSelected && (
        <mesh position={[0, 0.9, 0.2]}>
          <sphereGeometry args={[0.11, 24, 24]} />
          <meshBasicMaterial color="#c8f2a3" />
        </mesh>
      )}

      {/* Water transport */}
      <WaterParticles />

      {/* Sun and rays */}
      <SunlightRays />

      {/* Carbon dioxide entering */}
      <GasParticles
        color="#8e9caf"
        position={[1.9, 0.7, 0.2]}
        direction={-1}
      />

      {/* Oxygen leaving */}
      <GasParticles
        color="#45b8e6"
        position={[-1.9, 0.1, 0.2]}
        direction={-1}
      />

      {/* Chloroplast markers */}
      {leafSelected && (
        <>
          {[-0.75, 0.75, 0].map((x, i) => (
            <mesh
              key={i}
              position={[x, i === 2 ? 1.65 : 0.9, 0.22]}
            >
              <sphereGeometry args={[0.075, 16, 16]} />
              <meshStandardMaterial
                color="#174d25"
                emissive="#2c9b42"
                emissiveIntensity={0.7}
              />
            </mesh>
          ))}
        </>
      )}

      {/* Highlight sunlight when selected */}
      {sunlightSelected && (
        <pointLight
          position={[-2.4, 2.1, 0.5]}
          color="#ffd34f"
          intensity={4}
          distance={5}
        />
      )}

      {/* Highlight gases */}
      {(carbonSelected || oxygenSelected) && (
        <pointLight
          position={carbonSelected ? [1.9, 0.7, 0.5] : [-1.9, 0.1, 0.5]}
          color={carbonSelected ? '#8e9caf' : '#45b8e6'}
          intensity={2}
          distance={3}
        />
      )}

      {/* Highlight water */}
      {waterSelected && (
        <pointLight
          position={[0, -0.5, 0.7]}
          color="#35aeea"
          intensity={2.5}
          distance={4}
        />
      )}
    </group>
  );
}

export default function Photosynthesis3D({ selectedId }: Props) {
  return (
    <group>
      <Plant selectedId={selectedId} />
    </group>
  );
}
