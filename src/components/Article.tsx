import { IArticle } from "@/types";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";

interface IProps {
  index: number;
  article: IArticle;
}

const Article = ({ index, article }: IProps) => {
  return (
    <div
      key={article.id}
      className={`flex flex-col items-center pt-10
        ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"}
        `}
    >
      <div className="w-full md:w-1/2">
        <img
          src={`${
            article?.featuredimage?.url
              ? article?.featuredimage?.url
              : "https://via.placeholder.com/600x400"
          }`}
          alt={article?.featuredimage?.name}
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
      </div>

      <div
        className={`w-full md:w-1/2 flex flex-col justify-center
                  ${index % 2 === 1 ? "md:pr-10 lg:pr-20" : "md:pl-10 lg:pl-20"}
          `}
      >
        <p className="text-primaryText font-semibold text-lg mb-4 mt-2 md:mt-0">
          {article?.title}
        </p>

        <div className="text-gray-500 text-sm">
          <span>
            {format(new Date(article?.date), "dd MMM, yyyy")} | Almosafer
          </span>
        </div>

        <Link href={`/article/${article.id}`} className="mt-10">
          <button className="bg-btn text-md text-[#e4f1f5] py-2 px-6 md:px-10 rounded-3xl hover:shadow-lg hover:text-white">
            Read more
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Article;
