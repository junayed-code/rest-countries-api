"use client";

import { ChangeEvent } from "react";
import { ArrowDownIcon, SearchIcon } from "./icons";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import config from "@/config";

function CountryQuery() {
  const { push, replace } = useRouter();
  const params = new URLSearchParams(useSearchParams());

  const handleSearch = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") params.delete("search");
    else params.set("search", e.target.value);

    replace(`?${params.toString()}`);
  }, 350);

  const handleChangeRegion = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "") {
      params.set("region", e.target.value);
    } else params.delete("region");

    push(`?${params.toString()}`);
  };

  return (
    <div className="my-12 flex flex-col sm:flex-row sm:justify-between gap-5">
      <div className="relative max-w-xl basis-full">
        <SearchIcon className="absolute text-[26px] top-1/2 -translate-y-1/2 left-4" />
        <input
          id="search"
          type="search"
          name="search"
          onChange={handleSearch}
          defaultValue={params.get("search") || ""}
          className="bg-white dark:bg-slate-700 dark:text-slate-50 shadow-[0_0_20px_-8px] shadow-black/30 p-[14px_18px_14px_60px] rounded-md text-base leading-none border-0 outline-none w-full placeholder:select-none"
          placeholder="Search for a country..."
        />
      </div>

      <div className="relative flex group basis-full max-w-[270px]">
        <select
          id="region"
          name="region"
          onChange={handleChangeRegion}
          defaultValue={params.get("region") || ""}
          className="bg-white dark:bg-slate-700 dark:text-slate-50 py-3 pl-4 pr-14 outline-none rounded-md appearance-none shadow-[0_0_20px_-8px] shadow-black/30 cursor-pointer w-full"
        >
          <option value="">Filter by Region</option>
          {config.FILTER_REGIONS.map(region => (
            <option key={region} value={region.toLowerCase()}>
              {region}
            </option>
          ))}
        </select>
        <span className="absolute top-1/2 -translate-y-1/2 right-3 flex justify-center items-center font-bold pointer-events-none duration-100">
          <ArrowDownIcon className="text-[28px]" />
        </span>
      </div>
    </div>
  );
}

export default CountryQuery;
