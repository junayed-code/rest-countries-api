import BackButton from "@/components/BackButton";
import config from "@/config";
import slugify from "slugify";

type Props = {
  params: { name: string };
};

export function generateStaticParams() {
  return config.PREFETCH_COUNTRIES.map(country => ({
    name: slugify(country, { lower: true, trim: true }),
  }));
}

async function CountryDetailsPage({ params }: Props) {
  const res = await fetch(
    `${config.BASE_URL}/api/countries/name/${params.name}`
  );
  const country = await res.json();

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
            alt={`${country.name}'s flag image`}
          />
        </figure>

        <div className="basis-full">
          <h2 className="text-[28px] font-bold">{country.name}</h2>
          <div className="mt-6 flex flex-col sm:flex-row gap-y-6 gap-x-16 items-start leading-8">
            <div>
              <p className="font-semibold">
                Native Name:{" "}
                <span className="font-normal text-gray-600 dark:text-slate-300">
                  {country.nativeName}
                </span>
              </p>
              <p className="font-semibold">
                Population:{" "}
                <span className="font-normal text-gray-600 dark:text-slate-300">
                  {country.population}
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
                  {country.capital}
                </span>
              </p>
            </div>

            <div>
              <p className="font-semibold">
                Top Level Domain:{" "}
                <span className="font-normal text-gray-600 dark:text-slate-300">
                  {country.topLevelDomain}
                </span>
              </p>
              <p className="font-semibold">
                Currencies:{" "}
                <span className="font-normal text-gray-600 dark:text-slate-300">
                  {country.currencies?.[0]?.name}
                </span>
              </p>
              <p className="font-semibold">
                Languages:{" "}
                <span className="font-normal text-gray-600 dark:text-slate-300">
                  {country.languages
                    ?.map((language: any) => language.name)
                    ?.slice(0, 3)
                    ?.join(", ")}
                </span>
              </p>
            </div>
          </div>

          {country.borders?.length > 0 && (
            <p className="font-semibold mt-10 flex flex-wrap items-center gap-3">
              <span>Border Countries:</span>
              <span className="font-normal flex flex-wrap gap-2 ml-1">
                {country.borders.map((border: string) => (
                  <span
                    key={border}
                    className="inline-block rounded-sm px-4 py-1 shadow-[0_0_10px_-2px] shadow-black/30 bg-white dark:bg-slate-700 dark:text-slate-50"
                  >
                    {border}
                  </span>
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
