"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(122,247,240,0.9)");
  g.addColorStop(0.6, "rgba(34,224,230,0.35)");
  g.addColorStop(1, "rgba(34,224,230,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.Texture(c);
  tex.needsUpdate = true;
  return tex;
}

function Mesh({ count, spread }: { count: number; spread: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { camera } = useThree();

  const sprite = useMemo(() => glowTexture(), []);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * (spread * 0.6);
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.008
        )
      );
    }
    return { positions, velocities };
  }, [count, spread]);

  const maxLinks = count * 6;
  const linePositions = useMemo(() => new Float32Array(maxLinks * 3), [maxLinks]);

  const mouse = useRef({ x: 0, y: 0 });
  const LINK_DIST = 7.5;

  useFrame((state) => {
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.04;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.04;

    const points = pointsRef.current;
    if (!points) return;
    const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      pos[ix] += velocities[i].x;
      pos[ix + 1] += velocities[i].y;
      pos[ix + 2] += velocities[i].z;
      if (Math.abs(pos[ix]) > spread / 2) velocities[i].x *= -1;
      if (Math.abs(pos[ix + 1]) > spread * 0.3) velocities[i].y *= -1;
      if (Math.abs(pos[ix + 2]) > 6) velocities[i].z *= -1;
    }
    posAttr.needsUpdate = true;

    // rebuild constellation links
    const lines = linesRef.current;
    if (lines) {
      const lp = linePositions;
      let v = 0;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < LINK_DIST && v < maxLinks - 2) {
            lp[v * 3] = pos[i * 3]; lp[v * 3 + 1] = pos[i * 3 + 1]; lp[v * 3 + 2] = pos[i * 3 + 2]; v++;
            lp[v * 3] = pos[j * 3]; lp[v * 3 + 1] = pos[j * 3 + 1]; lp[v * 3 + 2] = pos[j * 3 + 2]; v++;
          }
        }
      }
      const la = lines.geometry.attributes.position as THREE.BufferAttribute;
      la.needsUpdate = true;
      lines.geometry.setDrawRange(0, v);
      lines.rotation.y = points.rotation.y;
    }

    points.rotation.y += 0.0008;
    camera.position.x += (mouse.current.x * 4 - camera.position.x) * 0.05;
    camera.position.y += (mouse.current.y * 2.4 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.42}
          map={sprite}
          transparent
          opacity={0.75}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color={new THREE.Color("#39e6e0")}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={new THREE.Color("#1fb6c4")}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function ParticleField() {
  const count = typeof window !== "undefined" && window.innerWidth < 760 ? 70 : 130;
  return (
    <Canvas
      className="hero-canvas"
      camera={{ position: [0, 0, 22], fov: 60 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Mesh count={count} spread={34} />
    </Canvas>
  );
}
