"use server";

import { eq } from "drizzle-orm";
import Link from "next/link";
import { cache } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import { Button } from "~/components/ui/button";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { paymentApi } from "~/server/mercadopago";
import { formatCentsToCurrency } from "~/utils/format-currency";
import { UpdateContext } from "./dashboard-context";

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

const statusLabel: Record<string, string> = {
  pending: "Aguardando Pagamento",
  approved: "Aprovado",
  in_process: "Processando",
  authorized: "Autorizado",
  in_mediation: "Em Mediação",
  rejected: "Rejeitado",
  cancelled: "Cancelado",
  refunded: "Devolvido",
  charged_back: "Estornado",
};

const styles = tv({
  base: [
    "my-auto font-bold px-2 py-0.5 rounded-md",
    "text-md text-white whitespace-nowrap",
  ],
  variants: {
    status: {
      pending: "bg-orange-200 text-orange-700",
      in_process: "bg-orange-200 text-orange-700",
      in_mediation: "bg-orange-200 text-orange-700",
      approved: "bg-green-200 text-green-700",
      authorized: "bg-blue-200 text-blue-700",
      rejected: "bg-red-200 text-red-700",
      cancelled: "bg-red-200 text-red-700",
      refunded: "bg-gray-200 text-gray-700",
      charged_back: "bg-gray-200 text-gray-700",
    },
  },
});

const getPayerName = cache(async (payerId: string) => {
  const user = await db
    .select({ name: users.name })
    .from(users)
    .where(eq(users.id, payerId))
    .get();

  return user?.name;
});

export async function PaymentHeader({ index, payment }: Props) {
  const [payer, data] = await Promise.all([
    getPayerName(payment.payerId),
    paymentApi.get({ id: payment.id }),
  ]);

  return (
    <div className="flex w-full flex-wrap items-start justify-between gap-4">
      <UpdateContext
        id={payment.id}
        data={{
          amount: payment.gifts.length || 1,
          price: payment.unitTotal,
          status: data.status || "pending",
        }}
      />

      <div>
        <h4 className="flex-1 text-xl">
          Presente #{index + 1} - Total:{" "}
          {formatCentsToCurrency(payment.unitTotal)}
        </h4>
        <h3>{payer}</h3>
      </div>

      <div className="flex gap-4">
        {data.status === "pending" && (
          <Link href={`/checkout/${payment.id}`}>
            <Button className="h-8">Ver Checkout</Button>
          </Link>
        )}

        <span
          className={styles({
            status: data.status as VariantProps<typeof styles>["status"],
          })}
        >
          {statusLabel[data.status || "pending"]}
        </span>
      </div>
    </div>
  );
}
