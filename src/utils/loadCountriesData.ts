export default async function loadCountriesData(): Promise<any[]> {
  const res = await fetch("https://restcountries.com/v3.1/all", {
    cache: "force-cache",
  });
  return res.json();
}
