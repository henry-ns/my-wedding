"use client";

import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect } from "react";

import { Button } from "~/components/ui/button";
import { SkeletonCard } from "~/components/ui/skeletons/skeleton-card";
import { env } from "~/env";
import { useCart, usePreferenceId } from "~/hooks/cart";
import { getPreferenceId } from "~/server/services/preference";
import { formatCentsToCurrency } from "~/utils/format-currency";

initMercadoPago(env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY);

export default function CartPage() {
  const cart = useCart();
  const [{ state, preferenceId }, setPreference] = usePreferenceId();

  console.log({ state, preferenceId });
  useEffect(() => {
    if (cart.items.length === 0 || (state === "loaded" && preferenceId)) return;

    setPreference({ state: "loading" });
    getPreferenceId({ items: cart.items })
      .then((id) => setPreference({ preferenceId: id, state: "loaded" }))
      .catch(() => setPreference({ state: "error" }));
  }, [state, preferenceId, setPreference, cart.items]);

  return (
    <>
      <div className="border-2 border-dashed rounded-lg p-6">
        {cart.items.map((i, index) => (
          <Fragment key={i.slug}>
            {index > 0 && <div className="bg-gray-200 h-0.5 w-full my-4" />}

            <div className="flex items-center space-x-4">
              <Image
                width={80}
                height={80}
                alt={i.name}
                src={`https:${i.images[0]?.fields.file.url}`}
                className="rounded-lg h-20 w-20 object-cover"
              />

              <div className="flex-1 flex flex-col">
                <span className="text-lg">{i.name}</span>
                <span className="text-xl font-bold">
                  {formatCentsToCurrency(i.priceInCents)}
                </span>
              </div>

              <Button
                variant="secondary"
                className="rounded-lg w-10 p-0"
                onClick={() => cart.remove(i.slug)}
              >
                <Cross2Icon className="stroke-white w-8 h-8 p-1.5" />
              </Button>
            </div>
          </Fragment>
        ))}

        {cart.items.length === 0 && (
          <>
            <h3 className="text-center text-3xl font-gray-500 font-sans mb-4">
              Carrinho vazio
            </h3>
            <Link href="/gifts" prefetch>
              <Button className="mx-auto">Lista de Presentes</Button>
            </Link>
          </>
        )}
      </div>

      {cart.items.length > 0 && (
        <div className="border-2 rounded-lg p-6 mt-8">
          <div className="flex items-end justify-between space-x-4 mb-4">
            <strong className="text-3xl font-bold">Total</strong>
            <span className="text-3xl font-bold text-primary-500">
              {formatCentsToCurrency(cart.totalPrice)}
            </span>
          </div>

          {state !== "loaded" || !preferenceId ? (
            <SkeletonCard />
          ) : (
            <Wallet
              initialization={{ preferenceId }}
              customization={{
                visual: {
                  buttonBackground: "black",
                },
              }}
            />
          )}
        </div>
      )}
    </>
  );
}
