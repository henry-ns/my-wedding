"use client";

import { signOut } from "next-auth/react";
import { Button } from "../landing-page/button";

export function SignOutButton() {
  return (
    <Button onClick={() => signOut()} color="secondary">
      Sair
    </Button>
  );
}
