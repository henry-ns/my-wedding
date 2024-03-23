"use client";

import { useContext } from "react";
import { DashContext } from "./dashboard-context";
import { formatCentsToCurrency } from "~/utils/format-currency";
import { twMerge } from "tailwind-merge";

type InfoProps = {
  className?: string;
  label: string;
  data: {
    amount: number;
    price: number;
  };
};

function Info({ label, data, className }: InfoProps) {
  const price = formatCentsToCurrency(data.price);

  return (
    <div
      className={twMerge(
        "flex flex-1 grow flex-col whitespace-nowrap rounded-xl border bg-primary-100 p-4",
        className,
      )}
    >
      <p className="text-gray-800 text-lg">{label}</p>
      <strong className="text-primary-800 text-xl">
        {data.amount}
        {price ? " - " : ""}
        {price}
      </strong>
    </div>
  );
}

export function GiftsInfo() {
  const { infos } = useContext(DashContext);

  return (
    <ul className="flex flex-wrap gap-4">
      <Info
        className="border-gray-300 bg-gray-200"
        label="Total"
        data={infos.total}
      />
      <Info
        className="border-green-300 bg-green-200"
        label="Aprovados"
        data={infos.approved}
      />
      <Info
        className="border-orange-300 bg-orange-200"
        label="Pendentes"
        data={infos.pending}
      />
      <Info
        className="border-red-300 bg-red-200"
        label="Rejeitados"
        data={infos.rejected}
      />
    </ul>
  );
}
