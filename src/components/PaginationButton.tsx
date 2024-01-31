"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  value: number | string;
  currentPage?: number | string;
};

function PaginationButton({ value, currentPage }: Props) {
  const params = new URLSearchParams(useSearchParams());
  params.set("page", value.toString());
  const isActive = value == currentPage;

  return (
    <Link
      href={`/?${params.toString()}`}
      className={"w-12 h-12 text-lg font-semibold rounded-sm flex justify-center items-center border border-slate-300 dark:border-slate-500 "
        .concat(
          isActive
            ? "bg-slate-600 dark:bg-slate-300 text-slate-100 dark:text-slate-800"
            : "dark:bg-slate-700 bg-white"
        )
        .concat(value === "..." ? " pointer-events-none" : "")}
    >
      {value}
    </Link>
  );
}

export default PaginationButton;
