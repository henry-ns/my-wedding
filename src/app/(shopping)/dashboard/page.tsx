import { format } from "date-fns";
import { DashboardProvider } from "./_components/dashboard-context";
import { GiftsInfo } from "./_components/gifts-info";
import { PaymentInfo } from "./_components/payment-info";
import { getAllPayments } from "./_server/get-all-payments";
import { getUserPresences } from "./_server/get-user-presences";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

type Props = {
  className?: string;
  label: string;
  value: number;
};

function Info({ className, label, value }: Props) {
  return (
    <div
      className={twMerge(
        "flex flex-1 grow flex-col whitespace-nowrap rounded-xl border bg-primary-100 p-4",
        className,
      )}
    >
      <p className="text-gray-800 text-lg">{label}</p>
      <strong className="text-primary-800 text-xl">{value}</strong>
    </div>
  );
}

const presenceStyle = tv({
  base: "flex flex-col rounded-xl p-4 border",
  variants: {
    response: {
      yes: "bg-primary-100 border-primary-200",
      no: "bg-red-100 border-red-200",
      default: "bg-gray-100",
    },
  },
  defaultVariants: {
    response: "default",
  },
});

export default async function Dashboard() {
  const [payments, presences] = await Promise.all([
    getAllPayments(),
    getUserPresences(),
  ]);

  return (
    <main className="flex flex-col overflow-hidden">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-bold font-sans text-3xl">Dashboard</h2>
      </header>

      <DashboardProvider>
        <section className="mt-8">
          <h3 className="mb-4 font-bold font-sans text-xl">Presenças</h3>

          <ul className="flex flex-wrap gap-4">
            <Info
              className="border-green-300 bg-green-200"
              label="Vão"
              value={presences.meta.yes}
            />
            <Info
              className="border-red-300 bg-red-200"
              label="Não vão"
              value={presences.meta.no}
            />
            <Info
              className="border-gray-300 bg-gray-200"
              label="Não responderam"
              value={presences.meta.noResponde}
            />
          </ul>

          <ul className="mt-8 space-y-4">
            {presences.items.map((p) => (
              <li
                key={p.id}
                className={presenceStyle({ response: p.response })}
              >
                <h4 className="flex-1 text-xl">{p.name}</h4>

                <p>
                  {p.presence
                    ? p.presence.check
                      ? "Confirmou"
                      : "Confirmou que não vai"
                    : "Não respondeu"}
                </p>

                {!!p.presence && (
                  <p>{format(p.presence.checkedAt, "dd/MM/yyyy 'às' hh:mm")}</p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h3 className="mb-4 font-bold font-sans text-xl">Presentes</h3>
          <GiftsInfo />

          <ul className="mt-8 space-y-4">
            {payments.map((p, i) => (
              <PaymentInfo key={p.id} payment={p} index={i} />
            ))}
          </ul>
        </section>
      </DashboardProvider>
    </main>
  );
}
