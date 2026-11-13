
import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function ModelViewer() {
  const { scene } = useGLTF(
    '/models/heart/human-heart-cutaway-light.glb'
  );

  const modelData = useMemo(() => {
    const model = scene.clone(true);

    // Update all model transformations before measuring
    model.updateMatrixWorld(true);

    // Find the complete model dimensions
    const bounds = new THREE.Box3().setFromObject(model);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());

    // Scale the heart to fit the viewing box
    const largestDimension = Math.max(
      size.x,
      size.y,
      size.z
    );

    const scale = largestDimension > 0
      ? 3.2 / largestDimension
      : 1;

    return {
      model,
      scale,
      center,
    };
  }, [scene]);

  return (
    <group
      position={[
        -modelData.center.x * modelData.scale,
        -modelData.center.y * modelData.scale,
        -modelData.center.z * modelData.scale,
      ]}
    >
      <primitive
        object={modelData.model}
        scale={modelData.scale}
      />
    </group>
  );
}

useGLTF.preload('/models/heart/human-heart-cutaway-light.glb');
