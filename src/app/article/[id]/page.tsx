import Back from "@/components/Back";
import { GetArticleByID } from "@/services/articles";
import { IArticle } from "@/types";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

interface ArticlePageProps {
  params: {
    id: string;
  };
}
export default async function NewsDetailsPage({ params }: ArticlePageProps) {
  const article: IArticle = await GetArticleByID(params.id);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col py-10 px-5">
        <div className="mb-10">
          <Back />
        </div>
        <h1 className="app-heading text-center">{article?.title}</h1>
        <div className="w-full mt-10">
          <img
            src={`${
              article?.featuredimage?.url
                ? article?.featuredimage?.url
                : "https://via.placeholder.com/600x400"
            }`}
            alt={article?.featuredimage?.name}
            className="w-full h-[500px] object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="mt-5">
          <div className="text-gray-500 text-sm">
            <span>
              {format(new Date(article?.date), "dd MMM, yyyy")} | Almosafer
            </span>
          </div>

          <div className="mt-10 text-primaryText font-normal">
            <ReactMarkdown>{article?.body}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
export const dynamic = "force-dynamic";
