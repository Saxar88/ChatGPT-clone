"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from "/public/logo.png";

function LogIn() {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-[#11a37f] h-screen">
      <Image src={logo} width={300} height={300} alt="logo" />
      <button
        onClick={() => signIn("google")}
        className="text-white text-3xl font-bold animate-pulse"
      >
        Sign in to use ChatGPT
      </button>
    </div>
  );
}

export default LogIn;
