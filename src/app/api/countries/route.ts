import loadCountriesData from "@/utils/loadCountriesData";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const region = searchParams.get("region");
  const search = searchParams.get("search");

  let data = await loadCountriesData();

  if (typeof region === "string" && region?.length > 3) {
    data = data.filter(
      country => country.region.toLowerCase() === region.toLowerCase()
    );
  }

  if (typeof search === "string" && search?.length > 2) {
    data = data.filter(
      country =>
        country.name.toLowerCase().includes(search.toLowerCase()) ||
        country.capital?.toLowerCase().includes(search.toLowerCase())
    );
  }

  // if (data.length === 0) {
  //   return NextResponse.json(
  //     { message: "Not Data Found!", status: 404 },
  //     { status: 404 }
  //   );
  // }

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || data.length;
  const skip = (page - 1) * limit;

  const response = data.slice(skip, skip + limit);
  return NextResponse.json(response);
}
