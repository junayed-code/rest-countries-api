export default async function loadCountriesData(): Promise<any[]> {
  const res = await fetch("https://restcountries.com/v3.1/all", {
    cache: "force-cache",
  });
  const data = res.json();
  return data;
}
