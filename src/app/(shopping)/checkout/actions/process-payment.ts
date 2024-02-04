"use server";

import { IPaymentFormData } from "@mercadopago/sdk-react/bricks/payment/type";
import { Payment } from "mercadopago";
import { PaymentCreateData } from "mercadopago/dist/clients/payment/create/types";
import { db } from "~/server/db";
import { payments } from "~/server/db/schema";
import { mercadopago } from "~/server/mercadopago";
import { CartItem } from "~/types/gift";
import { buyGifts } from "./buy-gifts";

type Input = {
  userId: string;
  paymentData: IPaymentFormData;
  items: CartItem[];
};

const paymentApi = new Payment(mercadopago);

export async function processPayment({ userId, paymentData, items }: Input) {
  console.log({ userId });
  const payload = {
    body: {
      ...paymentData.formData,
      issuer_id: paymentData.formData.issuer_id
        ? +paymentData.formData.issuer_id
        : undefined,
      additional_info: undefined,
      payer: {
        ...paymentData.formData.payer,
        address: {
          ...paymentData.formData.payer?.address,
          street_number: +paymentData.formData.payer.address?.street_number,
        },
      },
    },
  } satisfies PaymentCreateData;

  console.log(payload);

  const response = await paymentApi.create(payload);
  if (!response.id) {
    return {
      success: false,
      message: "Erro na criação do pagamento",
    };
  }

  const payment = await db
    .insert(payments)
    .values({
      id: String(response.id),
      payerId: userId,
      unitTotal: paymentData.formData.transaction_amount * 100,
    })
    .returning({ id: payments.id })
    .get();

  await buyGifts({
    items,
    userId,
    paymentId: payment.id,
  });

  return {
    success: true,
    paymentId: response.id,
  };
}
