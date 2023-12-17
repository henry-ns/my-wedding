import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { formatCentsToCurrency } from "~/utils/format-currency";
import { Pagination } from "../../ui/pagination";
import { getGifts } from "./get-gifts";
import { GiftFilter } from "./gift-filter";
import { Header } from "./header";

type Props = {
  searchParams: {
    search?: string | string[];
    page?: string | string[];
    limit?: string | string[];
  };
};

export default async function GiftsPage({ searchParams }: Props) {
  const gifts = await getGifts({
    page: Number(searchParams.page?.toString() || "1"),
    limit: Number(searchParams.limit?.toString() || "10"),
    name: searchParams.search?.toString(),
  });

  return (
    <div className="flex flex-col overflow-hidden">
      <Header />

      <main className="p-8">
        <GiftFilter />

        <div className="flex">
          {gifts.items.map((g) => (
            <Link
              key={g.slug}
              href={`/gifts/${g.slug}`}
              className="border-4 p-4 rounded-xl border-gray-200 mr-auto min-w-[48] w-full max-w-xs"
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
                  className="bg-primary-500 text-white rounded-lg"
                >
                  <PlusIcon className="stroke-white w-8 h-8 p-1.5" />
                </button>
              </div>
            </Link>
          ))}
        </div>

        <Pagination
          currentPage={gifts.meta.currentPage}
          pageLimit={gifts.meta.itemsPerPage}
          totalPages={gifts.meta.totalPages}
          totalItems={gifts.meta.totalItems}
        />
      </main>
    </div>
  );
}
