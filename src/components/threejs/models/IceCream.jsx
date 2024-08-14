import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function IceCream(props) {
  const { nodes, materials } = useGLTF("/models/cream.glb");
  return (
    <group {...props} dispose={null}>
      <group
        rotation={[-Math.PI / 2, 0, 0]}
        scale={150}
        position={[0, -0.5, 0]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.IceCream_3_1.geometry}
          material={materials.LightYellow}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.IceCream_3_2.geometry}
          material={materials.Red}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.IceCream_3_3.geometry}
          material={materials.White}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/cream.glb");
