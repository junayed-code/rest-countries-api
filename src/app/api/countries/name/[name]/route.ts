import loadCountriesData from "@/utils/loadCountriesData";
import { NextResponse, type NextRequest } from "next/server";
import slugify from "slugify";

type Props = {
  params: { name: string };
};

const slugOptions = { lower: true, trim: true };

export const GET = async (_request: NextRequest, { params }: Props) => {
  const data = await loadCountriesData();
  const nameSlug = slugify(params.name, slugOptions);

  const country = data.find(
    country => slugify(country.name, slugOptions) === nameSlug
  );

  if (!country) {
    return NextResponse.json(
      { message: "Country Not Found!" },
      { status: 404 }
    );
  }

  return NextResponse.json(country);
};
