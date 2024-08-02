import {
  MeshReflectorMaterial,
  Float,
  Text,
  Html,
  PresentationControls,
  useGLTF,
  OrbitControls,
  ContactShadows,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { Tiramisu } from "./models/Tiramisu";
import { Burger } from "./models/Burger";
import { Pizza } from "./models/Pizza";

const Experience = ({ showTiramisu, showBurger, showPizza }) => {
  const Three = useThree();
  const viewport = Three.viewport;
  const baseScaleFactor = viewport.width / 4;
  const minScale = 1;
  const maxScale = 2.0;

  const scaleFactor = Math.min(
    Math.max(baseScaleFactor * 0.3, minScale),
    maxScale
  );
  return (
    <>
      <PresentationControls
        global={true}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
        rotation={[Math.PI * 0.1, 0, 0]}
        polar={[-0.5, 0.5]} // Vertical limits
        azimuth={[-2, 2]}
      >
        <group scale={scaleFactor} position={[0, 1, 0]}>
          <group
            visible={showTiramisu}
            scale={1.5}
            rotation={[Math.PI * 0.1, 0, 0]}
          >
            <Tiramisu />
          </group>

          <group visible={showBurger} position={[0, -1, 0]}>
            <Burger />
          </group>

          <group
            visible={showPizza}
            scale={6}
            rotation={[Math.PI * 0.1, 0, 0]}
            position={[0, -0.5, 0]}
          >
            <Pizza />
          </group>
        </group>
      </PresentationControls>
      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
};
export default Experience;
