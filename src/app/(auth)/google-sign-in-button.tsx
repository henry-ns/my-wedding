"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export function GoogleSignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className={`
        flex items-center justify-center space-x-4
        cursor-pointer w-full p-3 rounded-md transition-all
        text-gray-900 bg-white border-2
        hover:bg-gray-100
        active:bg-gray-300
      `}
    >
      <Image src="/google.svg" width="24" height="24" alt="google logo" />
      <span>Continuar com Google</span>
    </button>
  );
}
