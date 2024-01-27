import fs from "fs/promises";

export default async function loadCountriesData(): Promise<any[]> {
  const dataString = await fs.readFile(
    `${process.cwd()}/app/data.json`,
    "utf-8"
  );
  return JSON.parse(dataString);
}
