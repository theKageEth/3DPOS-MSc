import { useGLTF } from "@react-three/drei";

export function Burger(props) {
  const { nodes, materials } = useGLTF("/models/burger.glb");
  return (
    <group
      {...props}
      dispose={null}
      scale={0.3}
      position={[0, -0.5, 0]}
      rotation={[Math.PI * 0.01, 0, 0]}
    >
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
