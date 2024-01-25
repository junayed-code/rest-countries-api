"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "./icons";

function BackButton() {
  const { back } = useRouter();

  return (
    <button
      onClick={() => back()}
      className="bg-white dark:bg-slate-700 dark:text-slate-50 rounded-md flex items-center gap-x-2 sm:text-lg font-semibold px-5 sm:px-7 py-2 shadow-[0_0_12px_-1.5px] shadow-black/30"
    >
      <ArrowLeftIcon className="text-xl sm:text-2xl" />
      <span className="leading-none">Back</span>
    </button>
  );
}

export default BackButton;
