"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "./icons";
import { useRouter, useSearchParams } from "next/navigation";
import GeneratePaginationButtons from "./GeneratePaginationButtons";

type Props = {
  currentPage: number | string;
  lastPage: number | string;
};

function Pagination({ currentPage, lastPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const c_page = Number(currentPage); // Current page number
  const l_page = Number(lastPage); // Last page number

  const handleNextPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", (c_page + 1).toString());
    router.push(`/?${params.toString()}`);
  };

  const handlePrevPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", (c_page - 1).toString());
    router.push(`/?${params.toString()}`);
  };

  if (l_page === 0) return null;

  return (
    <div className="mb-12 hidden sm:flex justify-center items-center gap-x-4">
      <button
        disabled={currentPage == 1}
        onClick={handlePrevPage}
        className={
          "w-14 h-12 mr-2 text-lg font-semibold rounded-lg flex justify-center items-center border border-slate-300 dark:border-slate-500 dark:bg-slate-700 bg-white disabled:opacity-50"
        }
      >
        <ArrowLeftIcon className="text-lg" />
      </button>
      <GeneratePaginationButtons currentPage={c_page} lastPage={l_page} />
      <button
        disabled={currentPage == lastPage}
        onClick={handleNextPage}
        className={
          "w-14 h-12 ml-2 text-lg font-semibold rounded-lg flex justify-center items-center border border-slate-300 dark:border-slate-500 dark:bg-slate-700 bg-white disabled:opacity-50"
        }
      >
        <ArrowRightIcon className="text-lg" />
      </button>
    </div>
  );
}

export default Pagination;
