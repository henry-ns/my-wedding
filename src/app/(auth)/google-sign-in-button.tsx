"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export function GoogleSignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className={
        "flex w-full cursor-pointer items-center justify-center space-x-4 rounded-md border-2 bg-white p-3 text-gray-900 transition-all active:bg-gray-300 hover:bg-gray-100"
      }
    >
      <Image src="/google.svg" width="24" height="24" alt="google logo" />
      <span>Continuar com Google</span>
    </button>
  );
}
