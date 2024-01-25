import slugify from "slugify";
import Link from "next/link";
import config from "@/config";

type Props = {
  searchParams: { page?: string; region?: string; search?: string };
};

async function Countries({ searchParams }: Props) {
  const { page = "1", region = "", search = "" } = searchParams;

  const query = `?limit=12&page=${page}&region=${region}&search=${search}`;
  const res = await fetch(`${config.BASE_URL}/api/countries${query}`);
  const countries: any[] = await res.json();

  return (
    <div className="grid gap-8 md:gap-14 xl:gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12 justify-items-center">
      {countries.map(country => (
        <CountryCard key={country.name} country={country} />
      ))}
    </div>
  );
}

function CountryCard({ country }: { country: any }) {
  const slug = slugify(country.name, { lower: true, trim: true });
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
        <h3 className="text-xl font-bold mb-4">{country.name}</h3>
        <p className="font-semibold">
          Population:{" "}
          <span className="font-normal text-gray-600 dark:text-slate-300">
            {country.population < 1000000
              ? country.population
              : `${(country.population / 1000000).toFixed(2)}M`}
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
