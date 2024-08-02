"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "@/components/threejs/Experience";
import { useState } from "react";
import Menu from "./Menu";
import Cart from "./Cart";

const Scene = () => {
  const [visibleModel, setVisibleModel] = useState("pizza");
  const [cartVisible, setCartVisible] = useState(false);
  const [cart, setCart] = useState([]);

  const showModel = (model) => {
    setVisibleModel(model);
  };
  const addToCart = (model) => {
    setCart((prev) => ({
      ...prev,
      [model]: (prev[model] || 0) + 1,
    }));
  };

  const removeFromCart = (model) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[model] > 1) {
        newCart[model] -= 1;
      } else {
        delete newCart[model];
      }
      return newCart;
    });
  };

  const deleteFromCart = (model) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[model];
      return newCart;
    });
  };
  const toggleCartVisibility = () => {
    setCartVisible((prev) => !prev);
  };

  return (
    <>
      <Canvas
        eventPrefix="client"
        className="touch-none "
        camera={{
          fov: 75,
          near: 0.1,
          far: 200,
          position: [0, 0, 5],
        }}
      >
        <ambientLight intensity={3} />
        <directionalLight position={[1, 0, 0]} intensity={5} castShadow />

        <Experience
          showTiramisu={visibleModel === "tiramisu"}
          showBurger={visibleModel === "burger"}
          showPizza={visibleModel === "pizza"}
        />
      </Canvas>

      <Menu
        visibleModel={visibleModel}
        showModel={showModel}
        addToCart={addToCart}
      />
      {cartVisible && (
        <Cart
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          deleteFromCart={deleteFromCart}
        />
      )}
      <button
        className="bg-blue-600 py-2 px-4 rounded hover:bg-blue-500 transition absolute top-5 right-5 z-10"
        onClick={toggleCartVisibility}
      >
        {cartVisible ? "Hide Cart" : "Show Cart"}
      </button>
    </>
  );
};

export default Scene;
