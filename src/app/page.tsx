import HomePage from "@/components/Home";
import { GetArticles } from "@/services/articles";
import { IArticles } from "@/types";

type Props = {
  searchParams?: {
    page?: string;
  };
};

export default async function Home(params: Props) {
  const page = parseInt(
    params.searchParams!.page ? params.searchParams!.page : "1",
    10
  );

  const data: IArticles = await GetArticles(page);

  return (
    <div className="container mx-auto">
      <HomePage data={data?.articles} totalRecords={data?.total} />
    </div>
  );
}
export const dynamic = "force-dynamic";
