"use client";

import Image from "next/image";
import { Suspense } from "react";
import { formatCentsToCurrency } from "~/utils/format-currency";
import { PaymentHeader } from "./payment-header";

type Props = {
  index: number;
  payment: {
    id: string;
    unitTotal: number;
    payerId: string;
    gifts: Array<{
      id: string;
      imageUrl: string;
      unitPrice: number;
      name: string;
      slug: string;
      quantity: number;
      buyerId: string;
      paymentId: string;
    }>;
  };
};

export function PaymentInfo({ index, payment }: Props) {
  return (
    <div
      key={payment.id}
      className="flex flex-col gap-4 rounded-xl bg-primary-100 p-4"
    >
      <Suspense
        fallback={
          <div className="flex items-start justify-between w-full">
            <div>
              <h4 className="flex-1 text-xl">
                Presente #{index + 1} - Total:{" "}
                {formatCentsToCurrency(payment.unitTotal)}
              </h4>
              <div className="h-4 w-full max-w-40 animate-pulse bg-gray-200 rounded-full" />
            </div>
            <div className="h-6 w-full max-w-40 animate-pulse bg-gray-200 rounded-full" />
          </div>
        }
      >
        <PaymentHeader
          index={index}
          unitTotal={payment.unitTotal}
          paymentId={payment.id}
        />
      </Suspense>

      {payment.gifts.map((g) => (
        <div key={g.id} className="flex items-center space-x-4">
          <Image
            width={80}
            height={80}
            alt={g.name}
            src={g.imageUrl}
            className="rounded-lg h-20 w-20 object-cover"
          />

          <div className="flex-1 flex flex-col">
            <span className="text-lg">{g.name}</span>
            <span className="text-xl font-bold">
              {g.quantity}x {formatCentsToCurrency(g.unitPrice)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
