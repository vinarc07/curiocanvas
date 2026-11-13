import { useMemo } from 'react';
import * as THREE from 'three';
import type { TopicContent } from '@/content/types';

type Heart3DModelProps = {
  parts: TopicContent['parts'];
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function Heart3DModel({
  parts,
  selectedId,
  onSelect,
}: Heart3DModelProps) {
  const heartGeometry = useMemo(() => {
    const shape = new THREE.Shape();

    shape.moveTo(0, -1.35);
    shape.bezierCurveTo(-0.3, -1.12, -1.35, -0.35, -1.35, 0.55);
    shape.bezierCurveTo(-1.35, 1.35, -0.35, 1.55, 0, 0.82);
    shape.bezierCurveTo(0.35, 1.55, 1.35, 1.35, 1.35, 0.55);
    shape.bezierCurveTo(1.35, -0.35, 0.3, -1.12, 0, -1.35);

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.48,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.1,
      bevelThickness: 0.1,
      curveSegments: 32,
    });
  }, []);

  const vessels = useMemo(() => {
    const createTube = (
      points: [number, number, number][],
      radius: number
    ) => {
      const curve = new THREE.CatmullRomCurve3(
        points.map(([x, y, z]) => new THREE.Vector3(x, y, z))
      );

      return new THREE.TubeGeometry(curve, 48, radius, 16, false);
    };

    return [
      {
        id: 'aorta',
        geometry: createTube(
          [
            [0.43, 0.82, 0.12],
            [0.42, 1.2, 0.12],
            [0.62, 1.55, 0.12],
            [0.98, 1.62, 0.12],
            [1.16, 1.3, 0.12],
            [1.12, 0.98, 0.12],
          ],
          0.13
        ),
        color: '#C52C43',
      },
      {
        id: 'pulmonary-artery',
        geometry: createTube(
          [
            [-0.25, 0.83, 0.2],
            [-0.45, 1.15, 0.2],
            [-0.82, 1.42, 0.2],
            [-1.12, 1.32, 0.2],
            [-1.18, 1.05, 0.2],
          ],
          0.12
        ),
        color: '#287EB5',
      },
      {
        id: 'vena-cava',
        geometry: createTube(
          [
            [-0.92, 1.85, 0.08],
            [-0.92, 1.35, 0.08],
            [-0.86, 0.95, 0.08],
          ],
          0.12
        ),
        color: '#287EB5',
      },
      {
        id: 'vena-cava',
        geometry: createTube(
          [
            [-0.86, -0.65, 0.08],
            [-0.92, -1.12, 0.08],
            [-0.98, -1.65, 0.08],
          ],
          0.11
        ),
        color: '#287EB5',
      },
    ];
  }, []);

  const select = (id: string) => (event: {
    stopPropagation: () => void;
  }) => {
    event.stopPropagation();
    onSelect(id);
  };

  const chamberMaterial = (
    id: string,
    color: string,
    selectedColor: string
  ) => (
    <meshStandardMaterial
      color={color}
      roughness={0.42}
      metalness={0.04}
      emissive={selectedId === id ? selectedColor : '#000000'}
      emissiveIntensity={selectedId === id ? 0.28 : 0}
    />
  );

  return (
    <group position={[0, -0.05, 0]} scale={0.92}>
      {/* Main connected heart wall */}
      <mesh
        geometry={heartGeometry}
        position={[0, 0, -0.28]}
        onClick={select('heart-body')}
      >
        <meshStandardMaterial
          color="#D98D9F"
          roughness={0.58}
          metalness={0.02}
          emissive={selectedId === 'heart-body' ? '#A83D65' : '#000000'}
          emissiveIntensity={selectedId === 'heart-body' ? 0.25 : 0}
        />
      </mesh>

      {/* Right atrium - viewer's left */}
      <mesh
        position={[-0.57, 0.48, 0.32]}
        scale={[0.48, 0.48, 0.22]}
        onClick={select('right-atrium')}
      >
        <sphereGeometry args={[1, 40, 32]} />
        {chamberMaterial('right-atrium', '#438FBE', '#1C79B7')}
      </mesh>

      {/* Left atrium - viewer's right */}
      <mesh
        position={[0.57, 0.48, 0.32]}
        scale={[0.48, 0.48, 0.22]}
        onClick={select('left-atrium')}
      >
        <sphereGeometry args={[1, 40, 32]} />
        {chamberMaterial('left-atrium', '#D96D7D', '#C52C43')}
      </mesh>

      {/* Right ventricle */}
      <mesh
        position={[-0.48, -0.48, 0.36]}
        scale={[0.58, 0.78, 0.24]}
        rotation={[0, 0, 0.12]}
        onClick={select('right-ventricle')}
      >
        <sphereGeometry args={[1, 48, 40]} />
        {chamberMaterial('right-ventricle', '#287EB5', '#12669E')}
      </mesh>

      {/* Left ventricle */}
      <mesh
        position={[0.48, -0.48, 0.36]}
        scale={[0.59, 0.82, 0.25]}
        rotation={[0, 0, -0.12]}
        onClick={select('left-ventricle')}
      >
        <sphereGeometry args={[1, 48, 40]} />
        {chamberMaterial('left-ventricle', '#BD3049', '#97152F')}
      </mesh>

      {/* Central dividing wall */}
      <mesh position={[0, -0.12, 0.53]} scale={[0.055, 0.94, 0.07]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#8F314F" roughness={0.65} />
      </mesh>

      {/* Blood vessels */}
      {vessels.map((vessel, index) => (
        <mesh
          key={`${vessel.id}-${index}`}
          geometry={vessel.geometry}
          onClick={select(vessel.id)}
        >
          <meshStandardMaterial
            color={vessel.color}
            roughness={0.35}
            metalness={0.06}
            emissive={selectedId === vessel.id ? vessel.color : '#000000'}
            emissiveIntensity={selectedId === vessel.id ? 0.22 : 0}
          />
        </mesh>
      ))}

      {/* Small branches from the aorta */}
      {[-0.18, 0.12, 0.4].map((x, index) => (
        <mesh
          key={index}
          position={[0.48 + x, 1.72, 0.12]}
          rotation={[0, 0, -0.18 + index * 0.18]}
          onClick={select('aorta')}
        >
          <cylinderGeometry args={[0.065, 0.075, 0.42, 20]} />
          <meshStandardMaterial color="#B92740" roughness={0.38} />
        </mesh>
      ))}
    </group>
  );
}