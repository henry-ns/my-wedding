"use client";

import { Wallet } from "@mercadopago/sdk-react";
import { memo } from "react";
import { getPreferenceId } from "~/server/services/preference";
import { CartItem } from "~/types/gift";

type Props = {
  items: CartItem[];
};

export const PayButton = memo(({ items }: Props) => {
  async function onSubmit() {
    return getPreferenceId({ items });
  }

  return (
    <Wallet
      locale="pt-BR"
      onSubmit={onSubmit}
      initialization={{ redirectMode: "modal" }}
      customization={{
        texts: {
          action: "pay",
          valueProp: "convenience_all",
        },
        visual: {
          buttonBackground: "black",
        },
      }}
    />
  );
});
