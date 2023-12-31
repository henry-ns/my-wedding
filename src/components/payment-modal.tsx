"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { tv } from "tailwind-variants";

import { Button } from "~/components/ui/button";
import { Gift } from "~/types/gift";
import { formatCentsToCurrency } from "~/utils/format-currency";
import { checkout } from "../server/services/checkout";

type Props = {
  gift?: Gift;
  onClose: () => void;
};

const styles = tv({
  slots: {
    root: "hidden fixed bg-gray-200/40 top-0 left-0 w-full h-full p-2 pb-0",
    content:
      "flex flex-col items-stretch p-2 bg-white rounded-lg w-1/2 xl:w-1/3 min-w-fit max-w-lg shadow max-h-[80%] overflow-y-scroll",
    header: "w-full flex items-center justify-between p-4",
    title: "font-sans text-2xl",
  },
  variants: {
    open: {
      true: {
        root: "flex items-center justify-center",
      },
    },
  },
});

export function PaymentModal({ gift, onClose }: Props) {
  const s = styles({ open: !!gift });

  return (
    <div className={s.root()}>
      <div className={s.content()}>
        <div className={s.header()}>
          <h2 className={s.title()}>Presente Escolhido</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 -mr-1 rounded transition-colors hover:bg-gray-200"
          >
            <Cross2Icon className="w-6 h-auto" />
          </button>
        </div>

        <div className="flex items-center space-x-4 p-4">
          {gift?.images[0] ? (
            <Image
              alt={gift?.name || "Presente"}
              src={`https:${gift.images[0].fields.file.url}`}
              width={100}
              height={100}
              className="h-20 w-20 rounded-lg object-cover"
            />
          ) : null}

          <div className="flex flex-col">
            <span className="text-xl">{gift?.name}</span>
            <span className="text-2xl font-bold text-primary-500">
              {formatCentsToCurrency(gift?.priceInCents)}
            </span>
          </div>
        </div>

        <Button
          className="ml-auto"
          onClick={() => {
            if (!gift) return;

            checkout({
              gift,
              payer: {
                // email: session.data?.user.email ?? undefined,
                // name: session.data?.user.name ?? undefined,
              },
            });
          }}
        >
          Finalizar
        </Button>
      </div>
    </div>
  );
}
