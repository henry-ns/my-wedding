import Link from "next/link";
import { PaymentInfo } from "~/app/(shopping)/profile/components/payment-info";
import { Button } from "~/components/ui/button";
import { getAllPayments } from "./_server/get-all-payments";

export default async function Dashboard() {
  const payments = await getAllPayments();

  return (
    <section className="mt-8">
      <h3 className="mb-4 font-bold font-sans text-xl">Meus Presentes</h3>
      <ul className="space-y-4">
        {payments.map((p, i) => (
          <PaymentInfo key={p.id} payment={p} index={i} />
        ))}

        {payments.length === 0 && (
          <Button>
            <Link prefetch href="/gifts">
              Lista de Presentes
            </Link>
          </Button>
        )}
      </ul>
    </section>
  );
}
