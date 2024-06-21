"use client";
import { login } from "@/lib/action";
import Image from "next/image";
import { useFormState } from "react-dom";
import Link from "next/link";

const LoginPage = () => {
  const [state, formAction] = useFormState(login, undefined);

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
        <h3 className="text-3xl mb-4 font-bold  text-center  ">Login!</h3>
        <input
          type="text"
          placeholder="username"
          name="username"
          className="rounded-full border-gray-300 focus:border-secondary focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full px-3 py-2 mt-1 mb-2"
        />

        <input
          className="rounded-full border-gray-300 focus:border-secondary focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full px-3 py-2 mt-1 mb-2"
          type="password"
          placeholder="password"
          name="password"
        />

        <button className="bg-transparent hover:bg-secondary text-secondary font-semibold hover:text-black  py-2 px-4 border border-secondary hover:border-transparent rounded-full transition-all duration-500">
          Login
        </button>
        <p className=" mt-2 font-bold  text-center  text-red-300  ">
          {state?.message}
        </p>
        <p className=" mt-2 font-bold  text-center">{state?.error}</p>

        <Link href="/register" className=" mb-4 font-bold  text-center">
          {"Need an account?"} <b>Register</b>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
