"use client";

import { initMercadoPago } from "@mercadopago/sdk-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { env } from "~/env";
import { useCart } from "~/hooks/cart";
import { useDebounceValue } from "~/hooks/debounce";
import { formatCentsToCurrency } from "~/utils/format-currency";
import { PayButton } from "./pay-button";

initMercadoPago(env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY);

export default function CartPage() {
  const cart = useCart();
  const cartItems = useDebounceValue(cart.items, 400);
  const totalPrice = useDebounceValue(cart.totalPrice, 400);

  return (
    <SessionProvider>
      <div className="rounded-lg border-2 border-dashed p-6">
        {cart.items.map((i, index) => (
          <Fragment key={i.slug}>
            {index > 0 && <div className="my-4 h-0.5 w-full bg-gray-200" />}

            <div className="flex flex-wrap items-center gap-4">
              <Image
                width={80}
                height={80}
                alt={i.name}
                src={`https:${i.images[0]?.fields.file.url}`}
                className="h-20 w-20 rounded-lg object-cover"
              />

              <div className="flex flex-1 flex-col">
                <span className="text-lg">{i.name}</span>
                <span className="font-bold text-xl">
                  {formatCentsToCurrency(i.priceInCents)}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="secondary"
                  className="w-10 rounded-lg p-0"
                  onClick={() => {
                    const quantity = i.selectedAmount - 1;

                    if (quantity < 1) {
                      return cart.remove(i.slug);
                    }

                    cart.updateQuantity({ slug: i.slug, quantity });
                  }}
                >
                  <ChevronLeftIcon className="h-8 w-8 stroke-white p-1.5" />
                </Button>
                <Input
                  name="amount"
                  className="h-10 w-14"
                  inputProps={{
                    className: "text-center",
                    value: i.selectedAmount,
                    onChange: (e) => {
                      const quantity = Number(e.currentTarget.value);
                      if (quantity < 1) return;

                      cart.updateQuantity({
                        slug: i.slug,
                        quantity: Number(e.currentTarget.value),
                      });
                    },
                  }}
                />
                <Button
                  variant="primary"
                  className="w-10 rounded-lg p-0"
                  isDisabled={i.selectedAmount >= i.amount}
                  onClick={() =>
                    cart.updateQuantity({
                      slug: i.slug,
                      quantity: i.selectedAmount + 1,
                    })
                  }
                >
                  <ChevronRightIcon className="h-8 w-8 stroke-white p-1.5" />
                </Button>
              </div>
            </div>
          </Fragment>
        ))}

        {cart.items.length === 0 && (
          <>
            <h3 className="mb-4 text-center font-gray-500 font-sans text-3xl">
              Carrinho vazio
            </h3>
            <Link href="/gifts" prefetch>
              <Button className="mx-auto">Lista de Presentes</Button>
            </Link>
          </>
        )}
      </div>

      {cart.items.length > 0 && (
        <div className="mt-8 rounded-lg border-2">
          <div className="mb-4 flex items-end justify-between space-x-4 px-6 pt-6">
            <strong className="font-bold text-3xl">Total</strong>
            <span className="font-bold text-3xl text-primary-500">
              {formatCentsToCurrency(cart.totalPrice)}
            </span>
          </div>

          <PayButton
            items={cartItems}
            totalPrice={totalPrice}
            onSuccess={cart.clean}
          />
        </div>
      )}
    </SessionProvider>
  );
}
