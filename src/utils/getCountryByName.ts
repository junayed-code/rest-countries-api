import { notFound } from "next/navigation";
import slugify from "slugify";
import loadCountriesData from "./loadCountriesData";

const slugOptions = { lower: true, trim: true };

async function getCountryByName(name: string) {
  let data: any[] = await loadCountriesData();

  const nameSlug = slugify(name, slugOptions);
  const country = data.find(
    country => slugify(country.name.common, slugOptions) === nameSlug
  );

  return country;
}

export default getCountryByName;
