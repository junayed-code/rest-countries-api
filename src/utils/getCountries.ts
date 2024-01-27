import loadCountriesData from "./loadCountriesData";

type Query = {
  page?: number | string;
  limit?: number | string;
  region?: string;
  search?: string;
};

export default async function getCountries({
  region,
  search,
  limit,
  page,
}: Query): Promise<any[]> {
  let data: any[] = await loadCountriesData();

  if (typeof region === "string" && region?.length > 3) {
    data = data.filter(
      country => country.region.toLowerCase() === region?.toLowerCase()
    );
  }

  if (typeof search === "string" && search?.length > 2) {
    data = data.filter(
      country =>
        country.name.common?.toLowerCase().includes(search?.toLowerCase()) ||
        country.capital?.[0]?.toLowerCase().includes(search?.toLowerCase())
    );
  }

  const LIMIT = Number(limit || data.length) || 1;
  const PAGE = Number(page) || 1;
  const SKIP = (PAGE - 1) * LIMIT;

  return data.slice(SKIP, SKIP + LIMIT);
}
