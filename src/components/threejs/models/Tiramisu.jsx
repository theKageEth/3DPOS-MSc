import { useGLTF } from "@react-three/drei";

export function Tiramisu(props) {
  const { nodes, materials } = useGLTF("/models/tiramisu.glb");
  return (
    <group
      {...props}
      dispose={null}
      scale={1.2}
      position={[0, 0, 0]}
      rotation={[Math.PI * 0.1, 0, 0]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh"].geometry}
        material={materials.mat18}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.mat19}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_2"].geometry}
        material={materials.mat20}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_3"].geometry}
        material={materials.mat21}
      />
    </group>
  );
}

useGLTF.preload("/models/tiramisu.glb");
