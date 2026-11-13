import { Suspense, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function HeartModel() {
  const { scene } = useGLTF(
    '/models/heart/human-heart-cutaway-light.glb'
  );

  const model = useMemo(() => {
    const clone = scene.clone(true);

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDimension = Math.max(size.x, size.y, size.z);
    const scale = 3 / maxDimension;

    clone.scale.setScalar(scale);

    clone.position.set(
      -center.x * scale,
      -center.y * scale - 0.55,
      -center.z * scale
    );

    return clone;
  }, [scene]);

  return <primitive object={model} />;
}

export default function ModelViewer() {
  return (
    <Suspense fallback={null}>
      <HeartModel />
    </Suspense>
  );
}

useGLTF.preload('/models/heart/human-heart-cutaway-light.glb');
