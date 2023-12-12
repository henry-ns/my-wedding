"use client";

import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  return (
    <button type="button" onClick={() => signIn("google")}>
      Continuar com Google
    </button>
  );
}
