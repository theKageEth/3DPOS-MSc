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
const MODEL_COMPONENTS = {
  Tiramisu: Tiramisu,
  Burger: Burger,
  Pizza: Pizza,
  // Add other models as needed
};

const Experience = ({ visibleModel }) => {
  const ModelComponent = MODEL_COMPONENTS[visibleModel];
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
          {ModelComponent && <ModelComponent />}
        </group>
      </PresentationControls>
      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
};
export default Experience;
