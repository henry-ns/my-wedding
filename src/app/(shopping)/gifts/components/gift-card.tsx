"use client";

import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { useCartItem } from "~/hooks/cart.ts";
import { Gift } from "~/types/gift";
import { formatCentsToCurrency } from "~/utils/format-currency";

type Props = {
  gift: Gift;
};

export function GiftCard({ gift }: Props) {
  const cartItem = useCartItem(gift);
  const [image] = gift.images;
  const quantity = gift.amount || 1;

  return (
    <div className="flex flex-col group border-4 p-4 rounded-xl border-gray-200 w-full hover:border-primary-500 transition-all">
      <Image
        alt={image?.fields.title || ""}
        src={`https://${image?.fields.file.url}`}
        height={128}
        width={128}
        className="w-full h-32 object-cover bg-primary-100 rounded-lg mb-4 transition-all group-hover:-translate-y-6 group-hover:scale-y-[130%]"
      />

      <span className="text-lg block mb-2">{gift.name}</span>
      <div className="flex w-full items-end justify-between mt-auto">
        <div className="flex flex-col">
          <span
            className={`${
              quantity > 1 ? "text-gray-600" : "text-secondary-600"
            } font-bold text-sm leading-none`}
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
          className="rounded-lg w-10 p-0"
          onClick={cartItem.toggle}
        >
          {cartItem.isOnCard ? (
            <Cross2Icon className="stroke-white w-8 h-8 p-1.5" />
          ) : (
            <CheckIcon className="stroke-white w-8 h-8 p-1.5" />
          )}
        </Button>
      </div>
    </div>
  );
}
