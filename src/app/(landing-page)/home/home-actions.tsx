import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { getUserPresence } from "~/server/services/presences";

import { Button } from "../components/button";
import { PresenceButton } from "../components/presence-button";

export async function HomeActions() {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center space-y-6 md:flex-row md:space-x-8 md:space-y-0">
        <Link href="sign-in">
          <Button color="primary">Confirmar Presença</Button>
        </Link>
        <Link href="sign-in">
          <Button color="secondary">Lista de Presentes</Button>
        </Link>
      </div>
    );
  }

  const presence = await getUserPresence(session.user.id);

  return (
    <div className="mt-10 flex flex-col items-center justify-center space-y-6 md:flex-row md:space-x-8 md:space-y-0">
      <PresenceButton userId={session.user.id} presence={presence} />
      <Link href="/gifts">
        <Button color="secondary">Lista de Presentes</Button>
      </Link>
    </div>
  );
}
