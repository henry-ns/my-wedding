"use client";

import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import { tv } from "tailwind-variants";

type Props = {
  className?: string;
};

const styles = tv({
  base: `
    flex items-center justify-center space-x-4
    cursor-pointer w-full p-3 rounded-md transition-all
    text-white bg-discord-500 border-2 border-discord-500
    hover:bg-discord-600 hover:border-discord-600
    active:bg-discord-800 active:border-discord-800
  `,
});

export function DiscordSignInButton({ className }: Props) {
  return (
    <button
      type="button"
      onClick={() => signIn("discord")}
      className={styles({ className })}
    >
      <DiscordLogoIcon className="h-7 w-7" />
      <span>Continuar com Discord</span>
    </button>
  );
}
