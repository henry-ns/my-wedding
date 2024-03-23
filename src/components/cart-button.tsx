"use client";

import Link from "next/link";
import { ShoppingCart } from "react-feather";

import { useTotalCartItems } from "~/hooks/cart.ts";

export function CartButton() {
  const totalItems = useTotalCartItems();

  return (
    <Link
      href="/checkout"
      className="relative mr-4 ml-auto rounded-md p-2 transition-all active:scale-95 hover:scale-110 hover:bg-gray-200/30"
    >
      {totalItems > 0 && (
        <span className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary-500 text-sm text-white">
          {totalItems}
        </span>
      )}
      <ShoppingCart className="h-8 w-auto text-white" />
    </Link>
  );
}
