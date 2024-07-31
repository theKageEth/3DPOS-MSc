import { useGLTF } from "@react-three/drei";

export function Burger(props) {
  const { nodes, materials } = useGLTF("/models/burger.glb");
  return (
    <group scale={0.3} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Hamburguer_Mesh.geometry}
        material={materials.Hamburguer_Mat}
      />
    </group>
  );
}

useGLTF.preload("/models/burger.glb");
