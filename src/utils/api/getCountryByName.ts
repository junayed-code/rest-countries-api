import config from "@/config";

async function getCountryByName(name: string) {
  const res = await fetch(
    `${config.REST_COUNTRIES_API}/name/${name}?fullText=true`
  );
  if (!res.ok) return null;

  const [country] = await res.json();
  return country;
}

export default getCountryByName;
