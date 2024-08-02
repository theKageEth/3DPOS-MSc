import { AiOutlinePlus } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import React, { useEffect, useRef } from "react";

const Menu = ({ visibleModel, showModel, addToCart }) => {
  const session = useSession();
  useEffect(() => {
    console.log(session);
  }, []);

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

  return (
    <div className="absolute bottom-0 w-screen h-[150px]   text-green-900 z-0">
      {/* Left Arrow Button */}
      <div className="absolute left-5 bottom-12 h-full flex items-end z-10">
        <button
          onClick={scrollLeft}
          className="bg-gray-800 p-2 rounded-full hover:bg-gray-600 transition"
        >
          <MdArrowBack className="text-white text-sm" />
        </button>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="absolute bottom-0 left-0 w-screen flex items-center justify-center overflow-x-auto  bg-transparent"
      >
        <div className="flex space-x-4 p-2 ">
          <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded hover:bg-yellow-300">
            <button
              className="text-white text-sm"
              onClick={() => showModel("tiramisu")}
            >
              tiramisu
            </button>
            <AiOutlinePlus
              className="bg-green-400 cursor-pointer text-white text-xl hover:text-gray-400 transition"
              onClick={() => addToCart("tiramisu")}
            />
          </div>
          <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded hover:bg-yellow-300">
            <button
              className="text-white text-sm"
              onClick={() => showModel("burger")}
            >
              burger
            </button>
            <AiOutlinePlus
              className="bg-green-400 cursor-pointer text-white text-xl hover:text-gray-400 transition"
              onClick={() => addToCart("burger")}
            />
          </div>
          <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded hover:bg-yellow-300">
            <button
              className="text-white text-sm"
              onClick={() => showModel("pizza")}
            >
              pizza
            </button>
            <AiOutlinePlus
              className="bg-green-400 cursor-pointer text-white text-xl hover:text-gray-400 transition"
              onClick={() => addToCart("pizza")}
            />
          </div>
          {/* Add more items as needed */}
        </div>
      </div>

      {/* Right Arrow Button */}
      <div className="absolute right-5 bottom-12 h-full flex items-end z-10">
        <button
          onClick={scrollRight}
          className="bg-gray-800 p-2 rounded-full hover:bg-gray-600 transition"
        >
          <MdArrowForward className="text-white text-sm" />
        </button>
      </div>
    </div>
  );
};

export default Menu;
