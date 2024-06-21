import Image from "next/image";
import Link from "next/link";
import { RiTwitterXFill } from "react-icons/ri";
import { FaTiktok, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary py-6 w-screen bg-opacity-50 mt-14">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          {/* Company Logo */}
          <Link
            href={"/"}
            className="hover:scale-125 transition duration-300 ease-in-out"
          >
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Company Logo"
                width={100}
                height={100}
              />
            </div>
          </Link>

          {/* Developed by */}
          <div className="text-sm mb-2 flex flex-row gap-2">
            <p>Developed by</p>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={"https://Phantom3.dev"}
              className=" mx-2 hover:text-content hover:scale-125 ease-in-out transition duration-1000 relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-secondary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
            >
              Phantom3
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm mb-2">
            &copy; 2024 GrizzlyBeard. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 mt-2 mb-1 p-2 gap-5">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/"
              className=" hover:text-content hover:scale-150 ease-in-out transition duration-1000 "
            >
              <RiTwitterXFill className="w-5 h-5" />
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.tiktok.com/"
              className=" hover:text-content hover:scale-150 ease-in-out transition duration-1000 "
            >
              <FaTiktok className="w-5 h-5" />
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/"
              className=" hover:text-content hover:scale-150 ease-in-out transition duration-1000 "
            >
              <FaInstagram className="w-5 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
