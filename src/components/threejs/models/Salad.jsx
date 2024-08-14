import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Salad(props) {
  const { nodes, materials } = useGLTF("/models/salad.glb");
  return (
    <group
      {...props}
      dispose={null}
      scale={8}
      rotation={[Math.PI * 0.1, 0, 0]}
      position={[0, -0.5, 0]}
    >
      <group scale={0.134}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.Bowl}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.poly_0}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/salad.glb");
