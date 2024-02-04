"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "react-feather";

import { Button } from "~/components/ui/button";

export function SignOutButton() {
  return (
    <Button variant="secondary" onClick={() => signOut()}>
      <LogOut className="mr-2" />
      Sair
    </Button>
  );
}
