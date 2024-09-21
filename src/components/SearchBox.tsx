"use client";
import React, { useEffect, useRef, useState } from "react";
import { IArticle } from "@/types";
import { GetArticles } from "@/services/articles";

interface IProps {
  setArticles: (e: IArticle[]) => void;
  setPage: (e: number) => void;
  setTotalPages: (e: number) => void;
  setSearching: (e: boolean) => void;
  setError: (e: string | null) => void; // Accept setError from parent
}

const SearchBox = ({
  setArticles,
  setPage,
  setTotalPages,
  setSearching,
  setError,
}: IProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const queryRef = useRef(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search handler
  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current); // Clear timeout if user is still typing
    }

    typingTimeoutRef.current = setTimeout(async () => {
      if (searchTerm.length >= 3) {
        setSearching(true);
        setError(null);
        await GetArticles(1, searchTerm)
          .then((data) => {
            const isFound = data?.articles.filter((item: IArticle) =>
              item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setArticles(isFound || []);
            setPage(1);
            setTotalPages(Math.ceil(data?.total / 5));
          })
          .catch(() => {
            setError("Error fetching search results. Please try again.");
          })
          .finally(() => {
            setSearching(false);
          });
      } else if (searchTerm === "") {
        // Fetch default articles if search is cleared
        setSearching(true);
        setError(null);
        await GetArticles(1)
          .then((data) => {
            setArticles(data.articles);
            setPage(1);
            setTotalPages(Math.ceil(data.total / 5));
            setSearching(false);
          })
          .catch(() => {
            setError("Error fetching search results. Please try again.");
          })
          .finally(() => {
            setSearching(false);
          });
      }
    }, 500);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <form
        className={`w-full`}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="relative">
          <input
            type="text"
            ref={queryRef}
            className={`text-sm w-full text-primaryText pl-4 pr-[40px] focus:outline-none py-2 rounded-[4px] border border-borderLight`}
            placeholder="Enter keywords"
            autoComplete="off"
            onChange={handleSearchChange}
            value={searchTerm}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-4">
            <button
              type="submit"
              className="focus:outline-none focus:shadow-outline"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.0257 13.8478L18.5948 17.4162L17.4157 18.5953L13.8473 15.0262C12.5196 16.0905 10.8682 16.6694 9.1665 16.667C5.0265 16.667 1.6665 13.307 1.6665 9.16699C1.6665 5.02699 5.0265 1.66699 9.1665 1.66699C13.3065 1.66699 16.6665 5.02699 16.6665 9.16699C16.6689 10.8687 16.09 12.5201 15.0257 13.8478ZM13.354 13.2295C14.4116 12.1419 15.0022 10.684 14.9998 9.16699C14.9998 5.94449 12.389 3.33366 9.1665 3.33366C5.944 3.33366 3.33317 5.94449 3.33317 9.16699C3.33317 12.3895 5.944 15.0003 9.1665 15.0003C10.6835 15.0027 12.1414 14.4121 13.229 13.3545L13.354 13.2295Z"
                  fill="#009baa"
                />
              </svg>
            </button>
          </span>
        </div>
      </form>
    </>
  );
};

export default SearchBox;
