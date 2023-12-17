import { getGifts } from "~/server/services/gifts";
import { Pagination } from "~/ui/pagination";

import { GiftCard } from "./gift-card";
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

      <main className="p-8 max-w-7xl w-full mx-auto">
        <GiftFilter />

        <div className="flex justify-start items-start flex-wrap gap-6">
          {gifts.items.map((g) => (
            <GiftCard key={g.slug} gift={g} />
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
