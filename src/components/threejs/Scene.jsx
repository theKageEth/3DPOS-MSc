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
  const isAuthenticated = session.status === "authenticated";
  const isLoading = session.status === "loading";

  const showModel = (model) => {
    setVisibleModel(model);
  };
  const addToCart = (model) => {
    setCart((prev) => ({
      ...prev,
      [model]: (prev[model] || 0) + 1,
    }));
    toast.success("Successfully added!", { duration: 700 });
  };
  const totalItemsInCart = Object.values(cart).reduce(
    (total, count) => total + count,
    0
  );
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
    toast.success("Items Removed!", { duration: 500 });
  };

  const deleteFromCart = (model) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[model];
      return newCart;
    });
    toast.success("Deleted!", { duration: 500 });
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

      <Menu
        showModel={showModel}
        addToCart={addToCart}
        cart={cart}
        isAuthenticated={isAuthenticated}
      />
      {cartVisible && (
        <Cart
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          deleteFromCart={deleteFromCart}
          userId={session?.data?.user?.id}
        />
      )}

      {isAuthenticated && (
        <button
          className="py-2 px-4 rounded absolute top-5 right-5 z-50 hover:text-content hover:scale-150 ease-in-out transition duration-500 flex items-center space-x-2"
          onClick={toggleCartVisibility}
        >
          {cartVisible ? (
            <ImCross className="h-8 w-8" />
          ) : (
            <>
              <FaShoppingCart className="h-8 w-8" />
              <div className="text-black font-bold text-lg">
                {totalItemsInCart}
              </div>
            </>
          )}
        </button>
      )}
      <button
        onClick={() => signOut()}
        className="font-extrabold py-2 px-4 rounded  transition absolute top-5 left-5 z-10 text-2xl"
      >
        <span className=" ">{session?.data?.user?.username || ""}</span>
      </button>
    </>
  );
};

export default Scene;
