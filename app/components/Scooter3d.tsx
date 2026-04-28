"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
  Center,
  Bounds,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group } from "three";

interface Scooter3DProps {
  /** Path to a .glb model under /public, e.g. "/models/oxo-dubai.glb". If absent, primitive scooter is shown. */
  modelSrc?: string;
  /** Auto-rotate speed (0 = off). Default 0.6. */
  autoRotateSpeed?: number;
  /** Enable user drag/orbit. Default true. */
  enableControls?: boolean;
  /** Background tone behind the scene */
  toneMode?: "dark" | "light";
}

/* ─── Loaded GLTF model ─── */
function GLTFModel({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  const ref = useRef<Group>(null!);

  useFrame((_state, delta) => {
    // Subtle floating bob
    if (ref.current) {
      ref.current.position.y = Math.sin(_state.clock.elapsedTime * 0.6) * 0.04;
    }
  });

  return (
    <Bounds fit clip observe margin={1.1}>
      <Center>
        <group ref={ref}>
          <primitive object={scene} />
        </group>
      </Center>
    </Bounds>
  );
}

/* ─── Primitive fallback (used when no .glb available) ─── */
function PrimitiveScooter() {
  const ref = useRef<Group>(null!);

  useFrame((state, _delta) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
    }
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      {/* Deck */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 0.1, 0.6]} />
        <meshStandardMaterial color="#1d1d1f" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Stem */}
      <mesh position={[-1.0, 0.85, 0]} rotation={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.05, 0.05, 1.6, 16]} />
        <meshStandardMaterial color="#1d1d1f" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Handlebar */}
      <mesh position={[-1.15, 1.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
        <meshStandardMaterial color="#1d1d1f" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Front wheel */}
      <group position={[-1.05, -0.42, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.32, 0.12, 16, 32]} />
          <meshStandardMaterial color="#111113" roughness={0.7} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.2, 24]} />
          <meshStandardMaterial
            color="#E63946"
            roughness={0.3}
            metalness={0.5}
            emissive="#E63946"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* Rear wheel */}
      <group position={[1.05, -0.42, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.32, 0.12, 16, 32]} />
          <meshStandardMaterial color="#111113" roughness={0.7} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.2, 24]} />
          <meshStandardMaterial
            color="#E63946"
            roughness={0.3}
            metalness={0.5}
            emissive="#E63946"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function Scooter3D({
  modelSrc,
  autoRotateSpeed = 0.6,
  enableControls = true,
  toneMode = "dark",
}: Scooter3DProps) {
  return (
    <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [2.5, 1.3, 4.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting setup — Apple's typical product key+fill+rim */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[3, 5, 4]}
          intensity={1.2}
          castShadow
        />
        <directionalLight
          position={[-3, 2, -2]}
          intensity={0.6}
          color={toneMode === "dark" ? "#ff5c6a" : "#ffd6d8"}
        />

        {/* Environment for nice reflections */}
        <Suspense fallback={null}>
          <Environment preset="studio" />
        </Suspense>

        {/* The scooter — either real glb or primitive fallback */}
        <Suspense fallback={null}>
          {modelSrc ? <GLTFModel src={modelSrc} /> : <PrimitiveScooter />}
        </Suspense>

        {/* Soft shadow under the wheels */}
        <ContactShadows
          position={[0, -0.85, 0]}
          opacity={toneMode === "dark" ? 0.5 : 0.3}
          scale={6}
          blur={2.5}
          far={4}
        />

        {/* Drag-to-orbit controls */}
        {enableControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={autoRotateSpeed > 0}
            autoRotateSpeed={autoRotateSpeed}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            enableDamping
            dampingFactor={0.08}
          />
        )}
      </Canvas>
    </div>
  );
}

// Preload the model when modelSrc is known at build time
// useGLTF.preload("/models/oxo-dubai.glb");