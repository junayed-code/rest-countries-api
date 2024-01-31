import config from "@/config";

type Args = {
  codes: string[];
  fields?: string[];
};

async function getCountriesByCodes({ codes, fields }: Args) {
  let URL = `${config.REST_COUNTRIES_API}/alpha?codes=${codes}`;
  if (fields?.length) URL += `&fields=${fields}`;

  const data: any[] = await fetch(URL, { cache: "force-cache" }).then(res =>
    res.json()
  );

  if (!data?.length) return [];
  return data;
}

export default getCountriesByCodes;
