"use client";
import { register } from "@/lib/action";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [state, formAction] = useFormState(register, undefined);

  const router = useRouter();
  useEffect(() => {
    if (state?.success) {
      const redirectTimer = setTimeout(() => {
        router.push("/login");
      }, 2000); // 2000 milliseconds = 2 seconds

      return () => clearTimeout(redirectTimer);
    }
  }, [state?.success, router]);

  return (
    <div className="h-screen  flex flex-col  justify-center items-center align-middle p-10  mt-10 mb-20">
      <div className="relative">
        <Image
          src={"/logo.png"}
          width={100}
          height={100}
          className=" pointer-events-none select-none"
        />
      </div>

      <form
        className="pt-10 flex flex-col gap-1 bg-primary bg-opacity-30 backdrop-filter backdrop-blur-3xl px-4 rounded-xl mx-2"
        action={formAction}
      >
        <h3 className="text-3xl mb-4 font-bold  text-center ">Register!</h3>
        <input
          type="text"
          placeholder="username"
          name="username"
          className="rounded-full border-gray-300 focus:border-secondary focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full px-3 py-2 mt-1 mb-2"
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          className="rounded-full border-gray-300 focus:border-secondary focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full px-3 py-2 mt-1 mb-2"
        />
        <input
          className="rounded-full border-gray-300 focus:border-secondary focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full px-3 py-2 mt-1 mb-2"
          type="password"
          placeholder="password"
          name="password"
        />
        <input
          className="rounded-full border-gray-300 focus:border-secondary focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full px-3 py-2 mt-1 mb-2"
          type="password"
          placeholder="repeat password"
          name="passwordRepeat"
        />

        <button className="bg-transparent hover:bg-secondary text-secondary font-semibold hover:text-black  py-2 px-4 border border-secondary hover:border-transparent rounded-full transition-all duration-500">
          Register
        </button>
        <p className=" mt-2 font-bold  text-center">{state?.error}</p>
        <p className=" mt-2 font-bold  text-center  text-red-300  ">
          {state?.message}
        </p>
        <Link href="/login" className=" mb-4 font-bold  text-center ">
          Have an account? <b>Login</b>
        </Link>
      </form>
    </div>
  );
};

export default Register;
