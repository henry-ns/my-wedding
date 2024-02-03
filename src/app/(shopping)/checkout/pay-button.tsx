"use client";

import { Wallet } from "@mercadopago/sdk-react";
import { memo } from "react";
import { getPreferenceId } from "~/server/services/preference";
import { Gift } from "~/types/gift";

type Props = {
  items: Gift[];
};

export const PayButton = memo(({ items }: Props) => {
  async function onSubmit() {
    return getPreferenceId({ items });
  }

  return (
    <Wallet
      locale="pt-BR"
      initialization={{
        redirectMode: "modal",
      }}
      customization={{
        visual: {
          buttonBackground: "black",
        },
      }}
      onSubmit={onSubmit}
    />
  );
});
