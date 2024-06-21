"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "@/components/threejs/Experience";

const Scene = () => {
  return (
    <>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
      >
        <Experience />
      </Canvas>
    </>
  );
};

export default Scene;
