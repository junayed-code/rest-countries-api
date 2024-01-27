import Countries from "@/components/Countries";
import CountryQuery from "@/components/CountryQuery";
import { Suspense } from "react";

export const dynamic = "auto";

type Props = {
  params: any;
  searchParams: { page?: string; region?: string; search?: string };
};

export default async function Home({ searchParams }: Props) {
  return (
    <>
      <Suspense fallback={<></>}>
        <CountryQuery />
      </Suspense>
      <Suspense
        fallback={
          <div className="text-3xl font-bold text-center">Loading...</div>
        }
      >
        <Countries searchParams={searchParams} />
      </Suspense>
    </>
  );
}
