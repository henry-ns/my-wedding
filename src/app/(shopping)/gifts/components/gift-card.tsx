"use client";

import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { useCartItem } from "~/hooks/cart.ts";
import type { Gift } from "~/types/gift";
import { formatCentsToCurrency } from "~/utils/format-currency";

type Props = {
  gift: Gift;
};

export function GiftCard({ gift }: Props) {
  const cartItem = useCartItem(gift);
  const [image] = gift.images;
  const quantity = gift.amount || 1;

  return (
    <div className="group flex w-full flex-col rounded-xl border-4 border-gray-200 p-4 transition-all hover:border-primary-500">
      <Image
        alt={image?.fields.title || ""}
        src={`https:${image?.fields.file.url}`}
        height={128}
        width={300}
        priority={false}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="group-hover:-translate-y-6 mb-4 h-32 w-full rounded-lg bg-primary-100 object-cover transition-all group-hover:scale-y-[130%]"
      />

      <span className="mb-2 block text-lg">{gift.name}</span>
      <div className="mt-auto flex w-full items-end justify-between">
        <div className="flex flex-col">
          <span
            className={`${
              quantity > 1 ? "text-gray-600" : "text-secondary-600"
            }font-bold text-sm leading-none`}
          >
            {quantity}
            {quantity > 1 ? " disponíveis" : " disponível"}
          </span>
          <span className="font-bold text-2xl text-primary-500">
            {formatCentsToCurrency(gift.priceInCents)}
          </span>
        </div>
        <Button
          variant={cartItem.isOnCard ? "secondary" : "primary"}
          className="w-10 rounded-lg p-0"
          onClick={cartItem.toggle}
        >
          {cartItem.isOnCard ? (
            <Cross2Icon className="h-8 w-8 stroke-white p-1.5" />
          ) : (
            <CheckIcon className="h-8 w-8 stroke-white p-1.5" />
          )}
        </Button>
      </div>
    </div>
  );
}
