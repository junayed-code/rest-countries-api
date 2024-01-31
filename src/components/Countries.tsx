import slugify from "slugify";
import Link from "next/link";
import Pagination from "./Pagination";
import getCountries from "@/utils/api/getCountries";
import numberFormate from "@/utils/numberFormate";

const COUNTRIES_PER_PAGE = 12;

type Props = {
  searchParams: { page?: string; region?: string; search?: string };
};

async function Countries({ searchParams }: Props) {
  const { totalLenght, data: countries } = await getCountries({
    ...searchParams,
    limit: COUNTRIES_PER_PAGE,
  });
  const totalPageNum = Math.ceil(totalLenght / COUNTRIES_PER_PAGE);

  return (
    <div>
      <div className="mb-12 grid gap-8 md:gap-14 xl:gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {countries.map(country => (
          <CountryCard key={country.name} country={country} />
        ))}
        {countries?.length === 0 && (
          <h3 className="text-3xl font-bold col-span-full text-center">
            No Countries Found!
          </h3>
        )}
      </div>
      <Pagination
        currentPage={searchParams.page || 1}
        lastPage={countries?.length && totalPageNum}
      />
    </div>
  );
}

function CountryCard({ country }: { country: any }) {
  const name = country.name?.common;

  const slug = slugify(name, { lower: true, trim: true });
  return (
    <Link
      href={`/country/${slug}`}
      className="rounded-md overflow-hidden bg-gray-50 dark:bg-slate-700 dark:text-slate-50 w-full max-w-sm shadow-[0_0_30px_-10px] shadow-black/30"
    >
      <figure>
        <img
          className="max-h-48 w-full object-cover aspect-[2.5_/_1.5]"
          src={country.flags?.png}
        />
      </figure>
      <div className="px-5 py-6">
        <h3 className="text-xl font-bold mb-4">{name}</h3>
        <p className="font-semibold">
          Population:{" "}
          <span className="font-normal text-gray-600 dark:text-slate-300">
            {numberFormate(country.population)}
          </span>
        </p>
        <p className="font-semibold">
          Region:{" "}
          <span className="font-normal text-gray-600 dark:text-slate-300">
            {country.region}
          </span>
        </p>
        <p className="font-semibold">
          Capital:{" "}
          <span className="font-normal text-gray-600 dark:text-slate-300">
            {country.capital}
          </span>
        </p>
      </div>
    </Link>
  );
}

export default Countries;
