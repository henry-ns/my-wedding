"use client";

import { StatusScreen, initMercadoPago } from "@mercadopago/sdk-react";
import { env } from "~/env";

type Props = {
  params: {
    paymentId: string;
  };
};

initMercadoPago(env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY);

export default function PaymentStatus({ params }: Props) {
  return (
    <StatusScreen
      initialization={{
        paymentId: params.paymentId,
      }}
    />
  );
}
