import {
  MeshReflectorMaterial,
  Float,
  Text,
  Html,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useState } from "react";
import { useRef } from "react";
import { Tiramisu } from "./models/Tiramisu";
import { Burger } from "./models/Burger";
import { Pizza } from "./models/pizza";

const Experience = ({ showTiramisu, showBurger, showPizza }) => {
  const Three = useThree();
  const viewport = Three.viewport;
  const scaleFactor = viewport.width / 7;

  return (
    <>
      <group scale={scaleFactor}>
        <group visible={showTiramisu} scale={1.5}>
          <PresentationControls>
            <Tiramisu />
          </PresentationControls>
        </group>
        <PresentationControls>
          <group visible={showBurger} position={[0, -1, 0]}>
            <Burger />
          </group>
        </PresentationControls>
        <PresentationControls zoom={1}>
          <group visible={showPizza} scale={5} rotation={[Math.PI * 0.1, 0, 0]}>
            <Pizza />
          </group>
        </PresentationControls>
      </group>
    </>
  );
};
export default Experience;
