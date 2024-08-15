import { AiOutlinePlus } from "react-icons/ai";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import React, { useState, useRef } from "react";
import { PRODUCTS } from "@/lib/helpers/contants";

const Menu = ({ showModel, addToCart, cart, isAuthenticated }) => {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].name);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct);
  };
  const getProductQuantity = (productName) => {
    return cart[productName] || 0;
  };
  return (
    <div className="absolute bottom-0 w-screen h-[150px]  text-green-500 z-0">
      {/* Left Arrow Button */}
      <div className="absolute left-5 bottom-20 h-full flex items-end z-10">
        <button
          onClick={scrollLeft}
          className="bg-gray-800 p-2 rounded-full hover:bg-gray-600 transition hidden lg:block"
        >
          <MdArrowBack className="text-white text-sm" />
        </button>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="absolute bottom-0 left-0 w-screen h-[150px]  flex items-center justify-center overflow-x-auto bg-transparent"
      >
        <div className="flex space-x-4 p-2">
          {PRODUCTS.map((product) => (
            <div
              key={product.name}
              className={`flex flex-col items-center space-y-2 bg-gray-800 p-2 rounded text-center cursor-pointer select-none ${
                selectedProduct === product.name
                  ? "border-4 border-yellow-400 "
                  : ""
              }`}
              onClick={() => {
                setSelectedProduct(product.name);
                showModel(product.name);
              }}
            >
              {getProductQuantity(product.name) > 0 && (
                <p className="text-white  absolute top-5   text-md bg-red-500 w-6 h-6 rounded-full  my-1 ">
                  {getProductQuantity(product.name)}
                </p>
              )}
              <p>{product.name}</p>
              <p className="text-white text-xs">£{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow Button */}
      <div className="absolute right-5 bottom-20 h-full flex items-end z-10">
        <button
          onClick={scrollRight}
          className="bg-gray-800 p-2 rounded-full hover:bg-gray-600 transition hidden lg:block"
        >
          <MdArrowForward className="text-white text-sm" />
        </button>
      </div>

      {/* Add to Cart Button */}
      {isAuthenticated && (
        <div className="absolute bottom-0 -translate-y-32 w-full flex items-center justify-center my-1">
          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            <AiOutlinePlus />
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
