"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";

const PARTICLE_COUNT_DESKTOP = 1500;
const PARTICLE_COUNT_MOBILE = 400;
const CONNECTION_DISTANCE = 2.5;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const count = typeof window !== "undefined" && window.innerWidth < 768
    ? PARTICLE_COUNT_MOBILE
    : PARTICLE_COUNT_DESKTOP;

  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = (Math.random() - 0.5) * 10;

      vel[i3] = (Math.random() - 0.5) * 0.003;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.001;

      // Gold to white color palette
      const t = Math.random();
      col[i3] = 0.77 + t * 0.14;     // R
      col[i3 + 1] = 0.64 + t * 0.27; // G
      col[i3 + 2] = 0.35 + t * 0.55; // B
    }
    return { positions: pos, velocities: vel, colors: col };
  }, [count]);

  const handlePointerMove = useCallback((e: THREE.Event & { clientX?: number; clientY?: number }) => {
    if (typeof window === "undefined") return;
    const event = e as unknown as PointerEvent;
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const geometry = meshRef.current.geometry;
    const posArray = geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    const mx = mouseRef.current.x * viewport.width * 0.5;
    const my = mouseRef.current.y * viewport.height * 0.5;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Apply velocity
      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];

      // Gentle floating oscillation
      posArray[i3 + 1] += Math.sin(time * 0.3 + i * 0.01) * 0.001;

      // Mouse repulsion
      const dx = posArray[i3] - mx;
      const dy = posArray[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        const force = (3 - dist) * 0.002;
        posArray[i3] += dx * force;
        posArray[i3 + 1] += dy * force;
      }

      // Wrap around boundaries
      if (posArray[i3] > 10) posArray[i3] = -10;
      if (posArray[i3] < -10) posArray[i3] = 10;
      if (posArray[i3 + 1] > 10) posArray[i3 + 1] = -10;
      if (posArray[i3 + 1] < -10) posArray[i3 + 1] = 10;
    }

    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group onPointerMove={handlePointerMove}>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection Lines */}
      <ConnectionLines positions={positions} count={count} />
    </group>
  );
}

function ConnectionLines({
  positions,
  count,
}: {
  positions: Float32Array;
  count: number;
}) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const maxLines = 2000;

  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useFrame(() => {
    if (!lineRef.current) return;

    let lineCount = 0;
    const geo = lineRef.current.geometry;

    for (let i = 0; i < count && lineCount < maxLines; i++) {
      for (let j = i + 1; j < count && lineCount < maxLines; j++) {
        const i3 = i * 3;
        const j3 = j * 3;

        const dx = positions[i3] - positions[j3];
        const dy = positions[i3 + 1] - positions[j3 + 1];
        const dz = positions[i3 + 2] - positions[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          const lc = lineCount * 6;
          const alpha = 1 - dist / CONNECTION_DISTANCE;

          linePositions[lc] = positions[i3];
          linePositions[lc + 1] = positions[i3 + 1];
          linePositions[lc + 2] = positions[i3 + 2];
          linePositions[lc + 3] = positions[j3];
          linePositions[lc + 4] = positions[j3 + 1];
          linePositions[lc + 5] = positions[j3 + 2];

          // Gold color with distance-based alpha
          lineColors[lc] = 0.77 * alpha;
          lineColors[lc + 1] = 0.64 * alpha;
          lineColors[lc + 2] = 0.35 * alpha;
          lineColors[lc + 3] = 0.77 * alpha;
          lineColors[lc + 4] = 0.64 * alpha;
          lineColors[lc + 5] = 0.35 * alpha;

          lineCount++;
        }
      }
    }

    geo.setDrawRange(0, lineCount * 2);
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[linePositions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[lineColors, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.15}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export default function ParticleCanvas() {
  const { isMobile, reducedMotion } = useDeviceDetect();

  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={isMobile ? 1 : Math.min(window?.devicePixelRatio || 1, 1.5)}
        style={{ pointerEvents: "auto" }}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <color attach="background" args={["#0a0a0f"]} />
        <ambientLight intensity={0.2} />
        <Particles />
      </Canvas>
    </div>
  );
}
