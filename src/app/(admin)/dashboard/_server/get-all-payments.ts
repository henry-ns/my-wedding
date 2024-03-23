"use server";

import { db } from "~/server/db";

export async function getAllPayments() {
  const payments = await db.query.payments.findMany({
    with: {
      gifts: true,
    },
  });

  return payments;
}
