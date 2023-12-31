"use client";

import { useState, useTransition } from "react";
import { Button } from "~/components/ui/button";
import { Presence, setPresence } from "~/server/services/presences";

type Props = {
  userId: string;
  presence?: Presence;
};

export function PresenceForm({ userId, presence }: Props) {
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
    <div className="flex items-center gap-4">
      <Button
        isDisabled={checker === true}
        onClick={() => confirmPresence(true)}
        isLoading={checker !== true && isLoading}
      >
        Irei com certeza
      </Button>
      <span>ou</span>
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
