"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "./LoadSpinner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const session = useSession();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isAuthenticated = session.status === "authenticated";
  const isLoading = session.status === "loading";
  return (
    <nav className="text-white bg-primary shadow-md backdrop-blur-lg  bg-opacity-80 fixed top-0 w-screen text-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="flex flex-row items-center gap-3 hover:scale-125 transition duration-300 ease-in-out">
                <Image src="/logo.png" width={60} height={60} alt="logo" />
                <p className=" font-bold text-2xl">3D POS Pizza</p>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="/"
                className="text-secondary hover:text-white px-3 py-2 rounded-md  font-medium"
              >
                Home
              </a>

              {isLoading ? (
                <LoadingSpinner />
              ) : isAuthenticated ? (
                <button
                  onClick={() => signOut()}
                  className="hover:text-white px-3 py-2 rounded-md font-medium"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="hover:text-white px-3 py-2 rounded-md font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="mr-5 px-2 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-secondary focus:outline-none focus:bg-secondary focus:text-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="/"
            className=" hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </a>

          {isLoading ? (
            <LoadingSpinner />
          ) : isAuthenticated ? (
            <button
              onClick={() => signOut()}
              className="hover:text-white px-3 py-2 rounded-md font-medium"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="hover:text-white px-3 py-2 rounded-md font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
