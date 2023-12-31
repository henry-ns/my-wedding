"use client";

import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { env } from "~/env";

initMercadoPago(env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY);

type Props = {
  preferenceId: string;
};

export function Payment({ preferenceId }: Props) {
  return <Wallet initialization={{ preferenceId }} />;
}
