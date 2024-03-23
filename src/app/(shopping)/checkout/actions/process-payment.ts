"use server";

import type { IPaymentFormData } from "@mercadopago/sdk-react/bricks/payment/type";
import { Payment } from "mercadopago";
import type { PaymentCreateData } from "mercadopago/dist/clients/payment/create/types";
import { db } from "~/server/db";
import { payments } from "~/server/db/schema";
import { mercadopago } from "~/server/mercadopago";
import type { CartItem } from "~/types/gift";
import { buyGifts } from "./buy-gifts";

type Input = {
  userId: string;
  paymentData: IPaymentFormData;
  items: CartItem[];
};

const paymentApi = new Payment(mercadopago);

export async function processPayment({
  userId,
  paymentData,
  items,
}: Input): Promise<string> {
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

  const response = await paymentApi.create(payload);
  if (!response.id) {
    throw new Error("Api de pagamento não retornou o id");
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

  return String(response.id);
}
