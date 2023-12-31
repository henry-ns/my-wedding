import { NextPages } from "./next-pages";
import { PageButton } from "./page-button";
import { PreviousPages } from "./previous-pages";

type Props = {
  totalPages: number;
  totalItems?: number;
  currentPage: number;
  pageLimit: number;
};

export function Pagination({
  currentPage,
  pageLimit,
  totalPages,
  totalItems,
}: Props) {
  if (!totalItems) return null;

  const firstItem = totalItems !== 0 ? (currentPage - 1) * pageLimit + 1 : 0;
  const lastItem = currentPage * pageLimit;
  const lastPossibleItem = Math.min(totalItems, lastItem);

  return (
    <div className="w-full flex space-x-2 items-center justify-between mt-8">
      <p className="text-lg">
        <strong>{firstItem}</strong>
        {" - "}
        <strong>{lastPossibleItem}</strong>
        {" de "}
        <strong>{totalItems}</strong>
      </p>

      <div className="flex space-x-2">
        <PreviousPages currentPage={currentPage} />
        <PageButton isActive page={currentPage} />
        <NextPages currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
