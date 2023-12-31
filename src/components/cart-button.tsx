"use client";

import Link from "next/link";
import { ShoppingCart } from "react-feather";

import { useTotalCartItems } from "~/hooks/cart.ts";

export function CartButton() {
  const totalItems = useTotalCartItems();

  return (
    <Link
      href="/checkout"
      className="relative ml-auto mr-4 hover:bg-gray-200/30 p-2 transition-all hover:scale-110 active:scale-95 rounded-md"
    >
      {totalItems > 0 && (
        <span className="absolute bottom-1 left-1 h-5 w-5 bg-white/80 text-sm flex items-center justify-center rounded-full">
          {totalItems}
        </span>
      )}
      <ShoppingCart className="w-auto h-8 text-white" />
    </Link>
  );
}
