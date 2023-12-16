import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { formatCentsToCurrency } from "~/utils/format-currency";
import { getGifts } from "./get-gifts";
import { Header } from "./header";

export default async function GiftsPage() {
  const gifts = await getGifts({ page: 1, limit: 10 });

  return (
    <main className="flex flex-col overflow-hidden">
      <Header />

      {gifts.items.map((g) => (
        <Link
          key={g.slug}
          href={`/gifts/${g.slug}`}
          className="border-4 p-4 rounded-lg border-gray-300 mr-auto min-w-[48] w-full max-w-xs"
        >
          {g.images.map((i) => (
            <img
              alt={i.fields.title}
              src={i.fields.file.url}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
          ))}
          <span className="text-lg block">{g.name}</span>
          <div className="flex w-full items-center justify-between">
            <span className="font-bold text-xl text-primary-500">
              {formatCentsToCurrency(g.priceInCents)}
            </span>
            <button
              type="button"
              className="bg-primary-500 text-white rounded-md"
            >
              <PlusIcon className="stroke-white w-8 h-8 p-1.5" />
            </button>
          </div>
        </Link>
      ))}
    </main>
  );
}
