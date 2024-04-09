import { InfoCircledIcon } from "@radix-ui/react-icons";
import { addDays, format, isBefore } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { env } from "~/env";
import { requireAuthentication } from "~/server/auth";
import { getUserPresence } from "~/server/services/presences";
import { getUser } from "~/server/services/user";
import { getUserPayments } from "./_server/get-user-payments";
import { EditProfile } from "./_components/edit-profile";
import { PaymentInfo } from "./_components/payment-info";
import { PresenceForm } from "./_components/presence-form";
import { SignOutButton } from "./_components/sign-out-button";

export default async function ProfilePage() {
  const session = await requireAuthentication("profile");

  const [payments, presence, user] = await Promise.all([
    getUserPayments(session.user.id),
    getUserPresence(session.user.id),
    getUser(session.user.id),
  ]);

  const limitDate = addDays(env.NEXT_PUBLIC_WEDDING_DATE, -8);
  const available = isBefore(new Date(), limitDate);

  return (
    <main className="flex flex-col overflow-hidden">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-bold font-sans text-3xl">Meu Perfil</h2>

        <EditProfile />
        <SignOutButton />
      </header>

      <dl className="mt-8 flex flex-wrap gap-4">
        <div className="min-w-64 grow rounded-xl bg-primary-100 p-4">
          <dt className="font-bold text-primary-800">Nome</dt>
          <dd className="text-lg">{user?.name}</dd>
        </div>
        <div className="min-w-64 grow rounded-xl bg-primary-100 p-4">
          <dt className="font-bold text-primary-800">Email</dt>
          <dd className="text-lg">{user?.email}</dd>
        </div>
      </dl>

      <section className="mt-8 flex flex-col">
        <h3 className="font-bold font-sans text-xl">Presença</h3>
        <h4 className="font-sans text-lg">
          Por favor, poderia nos informar sua presença no nosso casamento?
        </h4>
        {available ? (
          <div className="mt-2 mr-auto mb-4 flex items-center gap-3 rounded-md bg-orange-200 px-4 py-3">
            <InfoCircledIcon className="h-5 w-fit text-orange-800" />
            <h5 className="font-bold text-orange-800">
              É possível marcar presença até no máximo dia{" "}
              {format(limitDate, "dd 'de' LLLL", { locale: ptBR })}, 30 dias
              antes do casamento.
            </h5>
          </div>
        ) : (
          <div className="mt-2 mr-auto mb-4 flex items-center gap-3 rounded-md bg-red-200 px-4 py-3">
            <InfoCircledIcon className="h-5 w-fit text-red-800" />
            <h5 className="font-bold text-orange-800">
              Não é mais possível marcar presença.
            </h5>
          </div>
        )}

        <PresenceForm
          userId={session.user.id}
          presence={presence}
          available={available}
        />
      </section>

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
    </main>
  );
}
