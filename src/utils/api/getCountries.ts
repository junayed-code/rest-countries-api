import config from "@/config";

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
}: Query): Promise<{ totalLenght: number; data: any[] }> {
  let BASE_URL = config.REST_COUNTRIES_API;

  if (typeof region === "string" && region?.length > 3) {
    BASE_URL += `/region/${region}`;
  } else BASE_URL += "/all";

  let data: any[] = await fetch(BASE_URL, { cache: "force-cache" }).then(res =>
    res.json()
  );

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
  const DATA = data.slice(SKIP, SKIP + LIMIT);

  return { totalLenght: data.length, data: DATA };
}
