
import { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import {
  Box,
  RotateCcw,
  Volume2,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTopic } from '@/hooks/useTopic';
import { useModuleCompletion } from '@/hooks/useModuleCompletion';
import { Notice } from '@/components/ui/Notice';

import ModelViewer from './ModelViewer';
import SolarSystem3D from './SolarSystem3D';
import Photosynthesis3D from './Photosynthesis3D';

function ModelPart({
  part,
  selected,
  onSelect,
}: {
  part: ReturnType<typeof useTopic>['parts'][number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <mesh
      position={part.geo.position}
      scale={part.geo.scale}
      rotation={part.geo.rotation}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      {part.geo.shape === 'sphere' && (
        <sphereGeometry args={[1, 32, 32]} />
      )}

      {part.geo.shape === 'box' && (
        <boxGeometry args={[1, 1, 1]} />
      )}

      {part.geo.shape === 'cylinder' && (
        <cylinderGeometry args={[0.5, 0.5, 1, 24]} />
      )}

      {part.geo.shape === 'cone' && (
        <coneGeometry args={[0.5, 1, 24]} />
      )}

      {part.geo.shape === 'torus' && (
        <torusGeometry args={[0.7, 0.2, 16, 48]} />
      )}

      <meshStandardMaterial
        color={part.color}
        roughness={0.45}
        metalness={0.08}
        transparent
        opacity={part.geo.opacity ?? 1}
        emissive={selected ? part.color : '#000000'}
        emissiveIntensity={selected ? 0.25 : 0}
      />
    </mesh>
  );
}

export default function ObservePage() {
  const topic = useTopic();

  const {
    completed,
    saving,
    saveError,
    setCompletion,
  } = useModuleCompletion(
    topic.slug,
    'observationCompleted'
  );

  const visibleParts = useMemo(
    () => topic.parts.filter((part) => !part.decorative),
    [topic.parts]
  );

  const [selectedId, setSelectedId] = useState(
    visibleParts[0]?.id ?? ''
  );

  const [playing, setPlaying] = useState(false);

  const selectedPart =
    visibleParts.find((part) => part.id === selectedId) ??
    visibleParts[0];

  const isHumanHeart = topic.slug === 'human-heart';
  const isSolarSystem = topic.slug === 'solar-system';
  const isPhotosynthesis = topic.slug === 'photosynthesis';

  const playHeartbeat = () => {
    if (topic.audio?.kind !== 'heartbeat' || playing) return;

    const AudioContextClass =
      window.AudioContext ||
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextClass) return;

    const audio = new AudioContextClass();

    const beat = (
      start: number,
      frequency: number,
      duration: number
    ) => {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(
        0.25,
        start + 0.02
      );
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        start + duration
      );

      oscillator.connect(gain);
      gain.connect(audio.destination);

      oscillator.start(start);
      oscillator.stop(start + duration);
    };

    const now = audio.currentTime;

    beat(now, 65, 0.16);
    beat(now + 0.24, 55, 0.2);

    setPlaying(true);

    window.setTimeout(() => {
      void audio.close();
      setPlaying(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">

      {/* Page heading */}
      <section className="glass space-y-3 p-6 sm:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-mauve">
          <Box className="h-5 w-5" />
          Interactive 3D observation
        </div>

        <h1 className="text-3xl font-bold text-plum">
          Explore {topic.title}
        </h1>

        <p className="max-w-3xl leading-relaxed text-mauve">
          Rotate the model, zoom in and out, and select its different
          parts to understand how they work.
        </p>
      </section>

      {/* 3D model and parts */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">

        {/* 3D viewing box */}
        <section className="glass overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <h2 className="font-bold text-plum">
              3D Model
            </h2>

            <span className="text-xs text-mauve">
              Drag to rotate · Scroll to zoom
            </span>
          </div>

          <div className="h-[420px] bg-gradient-to-br from-white/80 to-blush/60">
            <Canvas
              camera={{
                position: [
                  0,
                  0,
                  isHumanHeart
                    ? 6.2
                    : isSolarSystem
                      ? 8
                      : isPhotosynthesis
                        ? 7
                        : topic.cameraDistance,
                ],
                fov: 45,
              }}
              onCreated={({ gl }) => {
                gl.setClearColor(
                  new THREE.Color('#F9F2F6'),
                  0
                );
              }}
            >
              <ambientLight intensity={1.35} />

              <directionalLight
                position={[4, 6, 7]}
                intensity={2.2}
              />

              <directionalLight
                position={[-5, 2, 4]}
                intensity={1}
              />

              <pointLight
                position={[0, -3, 5]}
                intensity={0.7}
              />

              {isHumanHeart ? (
                <ModelViewer />
              ) : isSolarSystem ? (
                <SolarSystem3D
                  selectedId={selectedId}
                />
              ) : isPhotosynthesis ? (
                <Photosynthesis3D
                  selectedId={selectedId}
                />
              ) : (
                <group>
                  {visibleParts.map((part) => (
                    <ModelPart
                      key={part.id}
                      part={part}
                      selected={selectedId === part.id}
                      onSelect={() => setSelectedId(part.id)}
                    />
                  ))}
                </group>
              )}

              <OrbitControls
                enablePan
                enableZoom
                enableRotate
                minDistance={2.5}
                maxDistance={15}
                target={[0, 0, 0]}
              />
            </Canvas>
          </div>

          <div className="flex flex-wrap items-center gap-3 p-4">
            <span className="inline-flex items-center gap-2 text-sm text-mauve">
              <RotateCcw className="h-4 w-4" />
              Drag to rotate
            </span>

            {topic.audio?.kind === 'heartbeat' && (
              <button
                type="button"
                onClick={playHeartbeat}
                disabled={playing}
                className="ml-auto inline-flex items-center gap-2 rounded-xl bg-plum px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                <Volume2 className="h-4 w-4" />
                {playing ? 'Playing...' : 'Hear heartbeat'}
              </button>
            )}
          </div>
        </section>

        {/* Parts selection */}
        <section className="glass space-y-5 p-6">
          <h2 className="text-xl font-bold text-plum">
            Explore parts
          </h2>

          <div className="flex flex-wrap gap-2">
            {visibleParts.map((part) => (
              <button
                type="button"
                key={part.id}
                onClick={() => setSelectedId(part.id)}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  selectedId === part.id
                    ? 'border-plum bg-plum text-white'
                    : 'border-dusty/50 bg-white/70 text-plum hover:bg-blush'
                }`}
              >
                {part.label}
              </button>
            ))}
          </div>

          {selectedPart && (
            <motion.div
              key={selectedPart.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-white/75 p-5"
            >
              <div
                className="mb-4 h-3 w-12 rounded-full"
                style={{
                  backgroundColor: selectedPart.color,
                }}
              />

              <h3 className="text-lg font-bold text-plum">
                {selectedPart.label}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-mauve">
                {selectedPart.description}
              </p>
            </motion.div>
          )}

          <p className="text-xs text-mauve">
            {isSolarSystem
              ? 'Select a planet name to view it separately in the 3D model.'
              : isPhotosynthesis
                ? 'Select a plant part or photosynthesis component to explore it in the 3D model.'
                : 'Select a part name or click a component in the 3D model to view its explanation.'}
          </p>
        </section>
      </div>

      {/* Observation progress */}
      <section className="glass flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-bold text-plum">
            Observation progress
          </h2>

          <p className="mt-1 text-sm text-mauve">
            Mark this module complete when you have finished exploring.
          </p>

          {completed && (
            <p className="mt-2 text-sm font-semibold text-mauve">
              <CheckCircle2 className="mr-1 inline h-4 w-4" />
              Module completed
            </p>
          )}

          {saveError && (
            <Notice
              tone="error"
              title="Progress could not be saved"
            >
              {saveError}
            </Notice>
          )}
        </div>

        <button
          type="button"
          disabled={saving}
          onClick={() => void setCompletion(!completed)}
          className="rounded-xl bg-plum px-5 py-3 font-semibold text-white transition hover:bg-mauve disabled:opacity-50"
        >
          {saving
            ? 'Saving...'
            : completed
              ? 'Mark incomplete'
              : 'Mark complete'}
        </button>
      </section>

      {/* Navigation */}
      <div className="flex flex-wrap gap-3">
        <Link
          to={`/topic/${topic.slug}/drawing`}
          className="rounded-xl border border-dusty px-5 py-3 text-sm font-semibold text-plum hover:bg-white"
        >
          Back to Drawing
        </Link>

        <Link
          to="/learning"
          className="rounded-xl bg-plum px-5 py-3 text-sm font-semibold text-white hover:bg-mauve"
        >
          My Learning
        </Link>
      </div>

    </div>
  );
}
