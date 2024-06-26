"use server";

import { db } from "~/server/db";
import { presences, users } from "~/server/db/schema";

type Presence = {
  check: boolean;
  checkedAt: Date;
};

type Output = {
  id: string;
  name: string;
  response?: "yes" | "no";
  presence?: {
    check: boolean;
    checkedAt: Date;
  };
};

export async function getUserPresences() {
  const [userList, presenceList] = await Promise.all([
    db.select({ id: users.id, name: users.name }).from(users),
    db
      .select({
        userId: presences.userId,
        check: presences.check,
        checkedAt: presences.checkedAt,
      })
      .from(presences),
  ]);

  const meta = {
    yes: 0,
    no: 0,
    noResponde: 0,
  };
  const presenceMap = new Map<string, Presence>();
  for (const p of presenceList) {
    presenceMap.set(p.userId, p);
  }

  const items: Output[] = [];
  for (const user of userList) {
    const presence = presenceMap.get(user.id);
    let response: "yes" | "no" | undefined;

    if (!presence) {
      meta.noResponde += 1;
    } else {
      if (presence.check) {
        response = "yes";
        meta.yes += 1;
      } else {
        response = "no";
        meta.no += 1;
      }
    }

    items.push({
      id: user.id,
      name: user.name || "Anonimo",
      response,
      presence,
    });
  }

  return {
    items,
    meta,
  };
}
