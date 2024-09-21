"use client";
import React, { useState } from "react";
import SearchBox from "./SearchBox";
import Article from "./Article";
import { IArticle } from "@/types";
import { GetArticles } from "@/services/articles";
import { Loader } from "./Loader";

interface IProps {
  data: IArticle[];
  totalRecords: number;
}

const HomePage = ({ data, totalRecords }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<IArticle[]>(data);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalRecords / 5));
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadMore = async () => {
    if (page < totalPages && !searching) {
      setLoading(true);
      setError(null);
      await GetArticles(page + 1)
        .then((data) => {
          setArticles([...articles.concat(data.articles)]);
          setPage((prevPage) => prevPage + 1);
        })
        .catch(() => {
          setError("Error loading more articles. Please try again.");
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="flex flex-col py-5 px-5">
      <h1 className="app-heading">News</h1>
      <div className="mt-5">
        <SearchBox
          setArticles={setArticles}
          setPage={setPage}
          setTotalPages={setTotalPages}
          setSearching={setSearching}
          setError={setError}
        />
      </div>

      {error && <div className="text-red-500 text-center py-4">{error}</div>}

      <h1 className="app-heading text-center pt-10">News</h1>
      <div>
        {searching ? (
          <Loader />
        ) : (
          <>
            {articles.map((article, index: number) => (
              <Article article={article} index={index} key={index} />
            ))}
          </>
        )}
      </div>

      {!searching && page < totalPages && (
        <div className="text-center mt-20">
          <button
            className="border-btn border text-btn py-2 px-6 md:px-10 rounded-3xl hover:shadow-lg hover:bg-btn hover:text-white disabled:border-none disabled:bg-gray-100 disabled:text-gray-600"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
