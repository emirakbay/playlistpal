"use client";

import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { MeshPhysicalMaterial } from "three";

const View = dynamic(() =>
  import("~/three/components/canvas/view").then((mod) => mod.View),
);

export default function Beamed8Note() {
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
  const meshRef = useRef<THREE.Mesh[]>([]);
  const targetPositions = useRef<[number, number, number][]>([
    [-30, 0, 0],
    [20, 0, 0],
  ]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          if (index === 0) {
            child.rotation.y +=
              Math.sin(state.clock.elapsedTime * 0.25) * 0.0125;
            child.position.y = Math.cos(state.clock.elapsedTime * 0.8) * 0.15;
            const scaleX = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
            const scaleY = 1 + Math.cos(state.clock.elapsedTime * 1.3) * 0.015;
            const scaleZ = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.018;
            child.scale.set(scaleX, scaleY, scaleZ);
            child.rotation.x = Math.cos(state.clock.elapsedTime * 0.6) * 0.12;
            child.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
          } else {
            child.rotation.y += Math.cos(state.clock.elapsedTime * 0.3) * 0.015;
            child.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.2;
            const scaleX = 1 + Math.cos(state.clock.elapsedTime * 1.1) * 0.025;
            const scaleY = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
            const scaleZ = 1 + Math.cos(state.clock.elapsedTime * 1.3) * 0.022;
            child.scale.set(scaleX, scaleY, scaleZ);
            child.rotation.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.15;
            child.rotation.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
          }
        }
      });
    }

    if (meshRef.current) {
      meshRef.current.forEach((mesh, index) => {
        easing.damp3(mesh.position, targetPositions.current[index]!, 1, delta);
      });
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }

    if (meshRef.current) {
      meshRef.current.forEach((mesh) => {
        if (mesh.material instanceof MeshPhysicalMaterial) {
          mesh.material.roughness =
            Math.sin(state.clock.elapsedTime) * 0.2 + 0.1;
          mesh.material.metalness =
            Math.cos(state.clock.elapsedTime * 0.5) * 0.2 + 0.8;
          mesh.material.clearcoat =
            Math.sin(state.clock.elapsedTime * 0.3) * 0.3 + 0.7;
          mesh.material.iridescence =
            Math.cos(state.clock.elapsedTime * 0.4) * 0.5 + 0.5;
          mesh.material.envMapIntensity =
            Math.sin(state.clock.elapsedTime * 0.2) * 1 + 2;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        color={"green"}
      />
      <pointLight position={[-10, -10, -10]} intensity={1} color={"green"} />
      <mesh
        scale={1}
        castShadow
        geometry={nodes.Plane001__0?.geometry}
        position={[-90, 0, 0]}
        ref={(el) => {
          if (el) {
            meshRef.current[0] = el;
          }
        }}
      >
        <meshPhysicalMaterial
          color={new THREE.Color(0.1, 0.7, 0.2)}
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
      <mesh
        scale={1}
        castShadow
        geometry={nodes.Plane002__0?.geometry}
        position={[-100, 0, 0]}
        ref={(el) => {
          if (el) {
            meshRef.current[1] = el;
          }
        }}
      >
        <meshPhysicalMaterial
          color={new THREE.Color(0, 0.4, 0.6)}
          metalness={0.8}
          roughness={0.1}
          envMapIntensity={2}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          reflectivity={1}
          iridescence={0.5}
          iridescenceIOR={2}
          sheen={1}
        />
      </mesh>
    </group>
  );
}
