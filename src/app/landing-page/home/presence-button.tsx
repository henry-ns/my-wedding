"use client";

import { useState, useTransition } from "react";
import { setPresence, type Presence } from "../../../server/services/presences";
import { Button } from "../button";

type Props = {
  userId: string;
  presence?: Presence;
};

export function PresenceButton({ presence, userId }: Props) {
  const [isUpdating, startTransition] = useTransition();
  const [checker, setChecker] = useState(!!presence?.check);

  async function makePresence() {
    startTransition(async () => {
      try {
        await setPresence({
          userId,
          check: !checker,
        });

        setChecker(!checker);
      } catch (e) {
        console.error("ops");
      }
    });
  }

  return (
    <Button
      color="primary"
      onClick={makePresence}
      isLoading={isUpdating}
      loadingText={checker ? "Removendo..." : "Confirmando..."}
    >
      {checker ? "Remover Presença" : "Confirmar Presença"}
    </Button>
  );
}
