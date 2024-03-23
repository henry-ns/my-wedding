"use client";

import { useState, useTransition } from "react";
import { Button } from "~/components/ui/button";
import { type Presence, setPresence } from "~/server/services/presences";

type Props = {
  userId: string;
  presence?: Presence;
  available?: boolean;
};

export function PresenceForm({ userId, presence, available }: Props) {
  const [isLoading, startTransition] = useTransition();
  const [checker, setChecker] = useState(presence?.check);

  function confirmPresence(check: boolean) {
    startTransition(async () => {
      try {
        await setPresence({
          userId,
          check,
        });

        setChecker(check);
      } catch (e) {
        console.error(e);
      }
    });
  }

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
      <Button
        isDisabled={checker === true || !available}
        onClick={() => confirmPresence(true)}
        isLoading={checker !== true && isLoading}
      >
        Irei com certeza
      </Button>
      <span className="text-center">ou</span>
      <Button
        isDisabled={checker === false}
        isLoading={checker !== false && isLoading}
        onClick={() => confirmPresence(false)}
        variant="secondary"
      >
        Não vou poder ir
      </Button>
    </div>
  );
}
