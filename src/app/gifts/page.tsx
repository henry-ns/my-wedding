import { getGifts } from "~/server/services/gifts";
import { Pagination } from "~/ui/pagination";

import { GiftFilter } from "./gift-filter";
import { GiftList } from "./gift-list";
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
        <GiftList gifts={gifts.items} />

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
