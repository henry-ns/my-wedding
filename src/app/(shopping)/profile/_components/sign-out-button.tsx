"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "react-feather";
import { Button } from "~/components/ui/button";

export function SignOutButton() {
  function logout() {
    localStorage.removeItem("jh-cart-items");
    signOut();
  }

  return (
    <Button variant="secondary" onClick={logout}>
      <LogOut className="mr-2" />
      Sair
    </Button>
  );
}
