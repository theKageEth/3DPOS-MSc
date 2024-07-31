import { useSession } from "next-auth/react";

import React, { useEffect } from "react";

const Menu = ({ visibleModel, showModel, addToCart }) => {
  const session = useSession();

  useEffect(() => {
    console.log(session);
  }, []);

  return (
    <div className=" overflow-x-scroll flex-wrap absolute bottom-0 left-0 w-full h-[100px] flex justify-center items-center bg-black bg-opacity-50 text-white z-10">
      <div className="space-y-4">
        <button
          className="bg-gray-800 py-2 px-4 rounded hover:bg-gray-600 transition"
          onClick={() => showModel("tiramisu")}
        >
          {visibleModel === "tiramisu" ? "Hide Tiramisu" : "Show Tiramisu"}
        </button>
        <button
          className="bg-gray-800 py-2 px-4 rounded hover:bg-gray-600 transition"
          onClick={() => showModel("burger")}
        >
          {visibleModel === "burger" ? "Hide Burger" : "Show Burger"}
        </button>
        <button
          className="bg-gray-800 py-2 px-4 rounded hover:bg-gray-600 transition"
          onClick={() => showModel("pizza")}
        >
          {visibleModel === "pizza" ? "Hide Pizza" : "Show Pizza"}
        </button>
        <button
          className="bg-green-600 py-2 px-4 rounded hover:bg-green-500 transition"
          onClick={() => addToCart("tiramisu")}
        >
          Add Tiramisu to Cart
        </button>
        <button
          className="bg-green-600 py-2 px-4 rounded hover:bg-green-500 transition"
          onClick={() => addToCart("burger")}
        >
          Add Burger to Cart
        </button>
        <button
          className="bg-green-600 py-2 px-4 rounded hover:bg-green-500 transition"
          onClick={() => addToCart("pizza")}
        >
          Add Pizza to Cart
        </button>
      </div>
    </div>
  );
};

export default Menu;
