"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "react-feather";

import { Button } from "~/components/ui/button";
import { useCart } from "~/hooks/cart";

export function SignOutButton() {
  const cart = useCart();

  function logout() {
    cart.clean();
    signOut();
  }

  return (
    <Button variant="secondary" onClick={logout}>
      <LogOut className="mr-2" />
      Sair
    </Button>
  );
}
