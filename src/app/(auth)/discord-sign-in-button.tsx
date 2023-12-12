"use client";

import { signIn } from "next-auth/react";

export function DiscordSignInButton() {
  return (
    <button type="button" onClick={() => signIn("discord")}>
      Continuar com Discord
    </button>
  );
}
