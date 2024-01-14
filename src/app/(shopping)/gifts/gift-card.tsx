"use client";

import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

import { useCartItem } from "~/hooks/cart.ts";
import { Gift } from "~/types/gift";
import { formatCentsToCurrency } from "~/utils/format-currency";

import { Button } from "../../../components/ui/button";

type Props = {
  gift: Gift;
};

export function GiftCard({ gift }: Props) {
  const cardItem = useCartItem(gift);

  const [image] = gift.images;

  return (
    <div className="flex flex-col group border-4 p-4 rounded-xl border-gray-200 w-full hover:border-primary-500 transition-all">
      <img
        alt={image?.fields.title}
        src={image?.fields.file.url}
        className="w-full h-32 object-cover bg-primary-100 rounded-lg mb-4 transition-all group-hover:-translate-y-6 group-hover:scale-y-[130%]"
      />

      <span className="text-lg block">{gift.name}</span>
      <div className="flex w-full items-center justify-between mt-auto">
        <span className="font-bold text-2xl text-primary-500">
          {formatCentsToCurrency(gift.priceInCents)}
        </span>
        <Button
          variant={cardItem.isOnCard ? "secondary" : "primary"}
          className="rounded-lg w-10 p-0"
          onClick={cardItem.toggle}
        >
          {cardItem.isOnCard ? (
            <Cross2Icon className="stroke-white w-8 h-8 p-1.5" />
          ) : (
            <CheckIcon className="stroke-white w-8 h-8 p-1.5" />
          )}
        </Button>
      </div>
    </div>
  );
}
