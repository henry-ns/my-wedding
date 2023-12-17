import { PageButton } from "./page-button";

type Props = {
  currentPage: number;
  totalPages: number;
};

export function NextPages({ currentPage, totalPages }: Props) {
  return (
    <>
      {totalPages - 1 > currentPage && <PageButton page={currentPage + 1} />}

      {totalPages - currentPage > 2 && <span className="ml-2 w-4">...</span>}

      {currentPage !== totalPages && <PageButton page={totalPages} />}
    </>
  );
}
