import { Pagination } from "~/components/ui/pagination";
import { getGifts } from "~/server/services/gifts";

import { GiftList } from "~/components/gift-list";
import { GiftFilter } from "../../components/gift-filter";

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
    <>
      <GiftFilter />
      <GiftList gifts={gifts.items} />

      <Pagination
        currentPage={gifts.meta.currentPage}
        pageLimit={gifts.meta.itemsPerPage}
        totalPages={gifts.meta.totalPages}
        totalItems={gifts.meta.totalItems}
      />
    </>
  );
}
