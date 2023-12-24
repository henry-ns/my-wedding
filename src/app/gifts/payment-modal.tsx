"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { tv } from "tailwind-variants";
import { Gift } from "~/types/gift";

type Props = {
  gift?: Gift;
  onClose: () => void;
};

const styles = tv({
  slots: {
    root: "hidden fixed bg-gray-200/40 top-0 left-0 w-full h-full p-2",
    content:
      "flex flex-col items-center p-6 bg-white rounded-lg w-1/2 xl:w-1/3 min-w-fit max-w-lg shadow",
    header: "w-full flex items-center justify-between mb-8",
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
          <h2 className={s.title()}>Pagamento</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 -mr-1 rounded transition-colors hover:bg-gray-200"
          >
            <Cross2Icon className="w-6 h-auto" />
          </button>
        </div>

        {/* <span className="text-xl font-bold">{gift?.name}</span>
        <span className="text-xl font-bold mt-2 text-primary-500">
          {formatCentsToCurrency(gift?.priceInCents)}
        </span>

        <div className="border-2 rounded p-2 w-40 h-40 mt-8">QRCODE</div> */}
      </div>
    </div>
  );
}
