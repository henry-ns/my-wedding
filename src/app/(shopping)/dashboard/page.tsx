import { DashboardProvider } from "./_components/dashboard-context";
import { GiftsInfo } from "./_components/gifts-info";
import { PaymentInfo } from "./_components/payment-info";
import { getAllPayments } from "./_server/get-all-payments";

export default async function Dashboard() {
  const payments = await getAllPayments();

  return (
    <main className="flex flex-col overflow-hidden">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-bold font-sans text-3xl">Dashboard</h2>
      </header>

      <DashboardProvider>
        <section className="mt-8">
          <GiftsInfo />
        </section>

        <section className="mt-8">
          <h3 className="mb-4 font-bold font-sans text-xl">Presentes</h3>

          <ul className="space-y-4">
            {payments.map((p, i) => (
              <PaymentInfo key={p.id} payment={p} index={i} />
            ))}
          </ul>
        </section>
      </DashboardProvider>
    </main>
  );
}
