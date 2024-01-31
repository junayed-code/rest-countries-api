import slugify from "slugify";
import config from "@/config";
import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import getCountryByName from "@/utils/api/getCountryByName";
import getCountriesByCodes from "@/utils/api/getCountriesByCodes";
import numberFormate from "@/utils/numberFormate";

type Props = {
  params: { name: string };
};

export function generateStaticParams() {
  return config.PREFETCH_COUNTRIES.map(country => ({
    name: slugify(country, { lower: true, trim: true }),
  }));
}

async function CountryDetailsPage({ params }: Props) {
  const country = await getCountryByName(params.name.replace(/-/g, " "));
  if (!country) return notFound();

  const countryName = country.name?.common;
  const nativeName = Object.values<{ common: string }>(
    country.name?.nativeName
  )?.[0]?.common;
  const currencies = Object.values<{ name: string }>(country.currencies)?.[0]
    .name;
  const languages = Object.values(country.languages);

  const borderCountries = (
    await getCountriesByCodes({
      codes: country.borders,
      fields: ["name"],
    })
  ).map(country => country.name?.common);

  return (
    <>
      <div className="my-12">
        <BackButton />
      </div>

      <div className="flex flex-col max-w-2xl lg:max-w-full mx-auto lg:flex-row gap-x-20 gap-y-10 mt-4 mb-12">
        <figure className="basis-full">
          <img
            className="w-full object-cover aspect-[2.5_/_1.5] shadow-[0_0_15px_-4px] shadow-black/30 rounded-md"
            src={country.flags?.png}
            alt={`Flag of ${countryName}`}
          />
        </figure>

        <div className="basis-full">
          <h2 className="text-[28px] font-bold">{countryName}</h2>
          <div className="mt-6 flex flex-col sm:flex-row gap-y-6 gap-x-16 items-start leading-8">
            <div>
              <p className="font-semibold">
                Native Name:{" "}
                <span className="font-normal text-gray-600 dark:text-slate-300">
                  {nativeName}
                </span>
              </p>
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
                Sub Region:{" "}
                <span className="font-normal text-gray-600 dark:text-slate-300">
                  {country.subregion}
                </span>
              </p>
              <p className="font-semibold">
                Capital:{" "}
                <span className="font-normal text-gray-600 dark:text-slate-300">
                  {country.capital?.[0]}
                </span>
              </p>
            </div>

            <div>
              <p className="font-semibold">
                Top Level Domain:{" "}
                <span className="font-normal text-gray-600 dark:text-slate-300">
                  {country.tld?.[0]}
                </span>
              </p>
              <p className="font-semibold">
                Currencies:{" "}
                <span className="font-normal text-gray-600 dark:text-slate-300">
                  {currencies}
                </span>
              </p>
              <p className="font-semibold">
                Languages:{" "}
                <span className="font-normal text-gray-600 dark:text-slate-300">
                  {languages?.slice(0, 3)?.join(", ")}
                </span>
              </p>
            </div>
          </div>

          {borderCountries?.length > 0 && (
            <p className="font-semibold mt-10 flex flex-wrap items-center gap-3">
              <span>Border Countries:</span>
              <span className="font-normal flex flex-wrap gap-2 ml-1">
                {borderCountries.map((name: string) => (
                  <Link
                    href={`/country/${slugify(name, { lower: true })}`}
                    key={name}
                    className="inline-block rounded-sm px-4 py-1 shadow-[0_0_10px_-2px] shadow-black/30 bg-white dark:bg-slate-700 dark:text-slate-50 cursor-pointer"
                  >
                    {name}
                  </Link>
                ))}
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default CountryDetailsPage;
