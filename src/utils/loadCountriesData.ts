import fs from "fs/promises";

export default async function loadCountriesData(): Promise<any[]> {
  const dataString = await fs.readFile(
    `${process.cwd()}/src/_data.json`,
    "utf-8"
  );
  return JSON.parse(dataString);
}
