"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DataLandscape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.PlaneGeometry>(null);

  useFrame((state) => {
    if (!geomRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions = geomRef.current.attributes.position;
    
    // Animate the vertices to create a wavy "data landscape"
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      
      // Calculate a flowing wave pattern
      const z = Math.sin(x * 0.5 + time * 0.8) * Math.cos(y * 0.5 + time * 0.6) * 1.5;
      positions.setZ(i, z);
    }
    positions.needsUpdate = true;
    
    if (meshRef.current) {
      // Slowly rotate the landscape for a dynamic feel
      meshRef.current.rotation.z = time * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry ref={geomRef} args={[30, 30, 40, 40]} />
      <meshStandardMaterial 
        color="#f97316" 
        wireframe={true} 
        transparent 
        opacity={0.8} 
        emissive="#f97316"
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full" aria-hidden="true">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <ambientLight intensity={1} />
        <pointLight position={[0, 5, 0]} intensity={2} color="#ffffff" />
        <DataLandscape />
      </Canvas>
    </div>
  );
}
