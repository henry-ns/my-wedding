"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Data = {
  amount: number;
  price: number;
  status: string;
};

type Store = {
  infos: Record<
    "total" | "approved" | "pending" | "rejected",
    { amount: number; price: number }
  >;
  update: (id: string, data: Data) => void;
};

export const DashContext = createContext({} as Store);

type Props = {
  children: React.ReactNode;
};

export function DashboardProvider({ children }: Props) {
  const [data, setData] = useState<Record<string, Data | undefined>>({});

  function update(id: string, data: Data) {
    setData((s) => ({ ...s, [id]: data }));
  }

  const infos = useMemo(() => {
    const result = {
      total: {
        amount: 0,
        price: 0,
      },
      approved: {
        amount: 0,
        price: 0,
      },
      pending: {
        amount: 0,
        price: 0,
      },
      rejected: {
        amount: 0,
        price: 0,
      },
    };

    for (const item of Object.values(data)) {
      if (!item) continue;

      result.total.price += item.price;
      result.total.amount += item.amount;

      switch (item.status) {
        case "approved": {
          result.approved.price += item.price;
          result.approved.amount += item.amount;
          break;
        }

        case "charged_back":
        case "refunded":
        case "cancelled":
        case "rejected": {
          result.rejected.price += item.price;
          result.rejected.amount += item.amount;
          break;
        }

        default: {
          result.pending.price += item.price;
          result.pending.amount += item.amount;
        }
      }
    }

    return result;
  }, [data]);

  return (
    <DashContext.Provider value={{ infos, update }}>
      {children}
    </DashContext.Provider>
  );
}

type UpdateProps = {
  id: string;
  data: Data;
};
export function UpdateContext({ id, data }: UpdateProps) {
  const { update } = useContext(DashContext);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    update(id, data);
  }, [id, data]);

  return null;
}
