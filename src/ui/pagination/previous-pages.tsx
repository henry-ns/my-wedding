import { PageButton } from "./page-button";

type Props = {
  currentPage: number;
};

export function PreviousPages({ currentPage }: Props) {
  if (currentPage === 1) {
    return null;
  }

  return (
    <>
      <PageButton page={1} />

      {currentPage - 1 > 2 && (
        <span className="mr-2 w-4 align-center">...</span>
      )}

      {currentPage > 2 && <PageButton page={currentPage - 1} />}
    </>
  );
}
