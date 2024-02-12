import { GiftList } from "~/app/(shopping)/gifts/components/gift-list";
import { Pagination } from "~/components/ui/pagination";
import { getAvailableGifts } from "~/server/services/gifts";

type Props = {
  searchParams: {
    search?: string | string[];
    page?: string | string[];
    limit?: string | string[];
    order?: string | string[];
  };
};

export default async function GiftsPage({ searchParams }: Props) {
  const gifts = await getAvailableGifts({
    page: Number(searchParams.page?.toString() || "1"),
    limit: Number(searchParams.limit?.toString() || "12"),
    order: searchParams.order?.toString() || "name",
    name: searchParams.search?.toString(),
  });

  return (
    <>
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
