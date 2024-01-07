import Image from "next/image";

import { requireAuthentication } from "~/server/auth";
import { getUserGifts } from "~/server/services/gifts";
import { getUserPresence } from "~/server/services/presences";
import { formatCentsToCurrency } from "~/utils/format-currency";

import { getUser } from "~/server/services/user";
import { EditProfile } from "./edit-profile";
import { PresenceForm } from "./presence-form";
import { SignOutButton } from "./sign-out-button";

export default async function ProfilePage() {
  const session = await requireAuthentication("profile");

  const [gifts, presence, user] = await Promise.all([
    getUserGifts(session.user.id),
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
          {gifts.map((g) => (
            <div
              key={g.id}
              className="flex items-center space-x-4 rounded-xl bg-primary-100 p-4"
            >
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
                  {formatCentsToCurrency(g.unitPrice)}
                </span>
              </div>
            </div>
          ))}
        </ul>
      </section>
    </main>
  );
}
