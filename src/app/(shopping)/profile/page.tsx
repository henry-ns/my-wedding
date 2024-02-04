import Link from "next/link";
import { Button } from "~/components/ui/button";
import { requireAuthentication } from "~/server/auth";
import { getUserPresence } from "~/server/services/presences";
import { getUser } from "~/server/services/user";
import { getUserPayments } from "./actions/get-user-payments";
import { EditProfile } from "./components/edit-profile";
import { PaymentInfo } from "./components/payment-info";
import { PresenceForm } from "./components/presence-form";
import { SignOutButton } from "./components/sign-out-button";

export default async function ProfilePage() {
  const session = await requireAuthentication("profile");

  const [payments, presence, user] = await Promise.all([
    getUserPayments(session.user.id),
    getUserPresence(session.user.id),
    getUser(session.user.id),
  ]);

  return (
    <main className="flex flex-col overflow-hidden">
      <header className="flex flex-wrap gap-4 items-end justify-between">
        <h2 className="font-sans text-3xl font-bold">Meu Perfil</h2>

        <EditProfile />
        <SignOutButton />
      </header>

      <dl className="flex flex-wrap gap-4 mt-8">
        <div className="grow p-4 min-w-64 rounded-xl bg-primary-100">
          <dt className="font-bold text-primary-800">Nome</dt>
          <dd className="text-lg">{user?.name}</dd>
        </div>
        <div className="grow p-4 min-w-64 rounded-xl bg-primary-100">
          <dt className="font-bold text-primary-800">Email</dt>
          <dd className="text-lg">{user?.email}</dd>
        </div>
      </dl>

      <section className="mt-8">
        <h3 className="font-bold text-xl font-sans">Presença</h3>
        <h4 className="text-lg font-sans ">
          Por favor, poderia nos informar sua presença no nosso casamento?
        </h4>
        <h5 className="text-sm font-sans text-gray-500 mb-4">
          É possível alterar ela mais tarde se mudar de ideia
        </h5>

        <PresenceForm userId={session.user.id} presence={presence} />
      </section>

      <section className="mt-8">
        <h3 className="font-bold text-xl font-sans mb-4">Meus Presentes</h3>
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
