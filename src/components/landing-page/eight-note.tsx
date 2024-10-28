"use client";

import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const View = dynamic(() =>
  import("~/three/components/canvas/view").then((mod) => mod.View),
);

export default function EightNote() {
  return (
    <>
      <View className="h-48 w-full md:h-[450px] lg:h-[600px]">
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 50]} />
          <ambientLight intensity={1} color="white" />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            color={"white"}
          />
          <directionalLight
            position={[-5, 5, 5]}
            intensity={1}
            castShadow
            color={"white"}
          />
          <group position={[0, -10, 0]} rotation={[0, 0, 0]}>
            <Scene />
          </group>
        </Suspense>
      </View>
    </>
  );
}

function Scene() {
  const object = useGLTF("/musical_symbols__notes.glb") as unknown;

  const { nodes } = object as { nodes: Record<string, THREE.Mesh> };

  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current && isAnimating) {
      groupRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.rotation.y += Math.sin(state.clock.elapsedTime * 0.25) * 0.0125;
          child.position.y = Math.cos(state.clock.elapsedTime * 0.8) * 0.15;
          const scaleX = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
          const scaleY = 1 + Math.cos(state.clock.elapsedTime * 1.3) * 0.015;
          const scaleZ = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.018;
          child.scale.set(scaleX, scaleY, scaleZ);
          child.rotation.x = Math.cos(state.clock.elapsedTime * 0.6) * 0.12;
          child.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
        }
      });
    }

    if (meshRef.current && isAnimating) {
      const progress = Math.min(1, state.clock.elapsedTime / 5);
      const targetX = -10;
      const startX = -50;

      easing.damp3(
        meshRef.current.position,
        [startX + (targetX - startX) * progress, 0, 0],
        1,
        delta,
      );

      const targetScale = 1;
      const startScale = 0.01;
      const currentScale = startScale + (targetScale - startScale) * progress;
      easing.damp3(
        meshRef.current.scale,
        [currentScale, currentScale, currentScale],
        0.5,
        delta,
      );

      easing.dampE(
        meshRef.current.rotation,
        [0, Math.PI * 2 * progress, 0],
        0.5,
        delta,
      );
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        scale={0.01}
        castShadow
        geometry={nodes.Plane003__0?.geometry}
        position={[-200, 0, 0]}
        ref={meshRef}
      >
        <meshPhysicalMaterial
          color={new THREE.Color(0, 0.5, 0.4)}
          metalness={0.7}
          roughness={0.15}
          envMapIntensity={2.2}
          clearcoat={0.9}
          clearcoatRoughness={0.05}
          reflectivity={1}
          iridescence={0.6}
          iridescenceIOR={2.2}
          sheen={1}
        />
      </mesh>
    </group>
  );
}
