"use client";
import toast, { Toaster } from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Canvas } from "@react-three/fiber";
import Experience from "@/components/threejs/Experience";
import { useState } from "react";
import Menu from "./Menu";
import Cart from "./Cart";
import { useSession, signOut } from "next-auth/react";

import { PRODUCTS } from "@/lib/helpers/contants";
const Scene = () => {
  const [visibleModel, setVisibleModel] = useState(PRODUCTS[0].name);
  const [cartVisible, setCartVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const session = useSession();
  const showModel = (model) => {
    setVisibleModel(model);
  };
  const addToCart = (model) => {
    setCart((prev) => ({
      ...prev,
      [model]: (prev[model] || 0) + 1,
    }));
    toast.success("Successfully added!");
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
    toast.success("Items Removed!");
  };

  const deleteFromCart = (model) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[model];
      return newCart;
    });
    toast.success("Deleted!");
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

        <Experience visibleModel={visibleModel} />
      </Canvas>

      <Menu showModel={showModel} addToCart={addToCart} />
      {cartVisible && (
        <Cart
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          deleteFromCart={deleteFromCart}
          userId={session?.data?.user?.id}
        />
      )}
      <button
        className="bg-blue-600 py-2 px-4 rounded hover:bg-blue-500 transition absolute top-5 right-5 z-10"
        onClick={toggleCartVisibility}
      >
        {cartVisible ? <ImCross /> : <FaShoppingCart />}
      </button>
      <button
        onClick={() => signOut()}
        className="font-bold py-2 px-4 rounded  transition absolute top-5 left-5 z-10"
      >
        <span className=" ">{session?.data?.user?.username || ""}</span>
      </button>
    </>
  );
};

export default Scene;
