"use server";

import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { type VariantProps, tv } from "tailwind-variants";
import { Button } from "~/components/ui/button";
import { paymentApi } from "~/server/mercadopago";
import { formatCentsToCurrency } from "~/utils/format-currency";

type Props = {
  index: number;
  paymentId: string;
  unitTotal: number;
  gifts: Array<{
    slug: string;
    quantity: number;
  }>;
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

export async function PaymentHeader({ paymentId, index, unitTotal }: Props) {
  const data = await paymentApi.get({ id: paymentId });

  return (
    <div className="flex w-full flex-wrap items-start justify-between gap-4">
      <div>
        <h4 className="flex-1 text-xl">
          Presente #{index + 1} - Total: {formatCentsToCurrency(unitTotal)}
        </h4>
        {!!data.date_of_expiration && (
          <h5 className="text-gray-700 text-md">
            {`Vencimento: ${format(
              parseISO(data.date_of_expiration),
              "dd 'de' LLLL 'às' hh:mm",
              { locale: ptBR },
            )}`}
          </h5>
        )}
      </div>

      <div className="flex gap-4">
        <span
          className={styles({
            status: data.status as VariantProps<typeof styles>["status"],
          })}
        >
          {statusLabel[data.status || "pending"]}
        </span>

        {data.status === "pending" && (
          <Link href={`/checkout/${paymentId}`}>
            <Button>Realizar Pagamento</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
