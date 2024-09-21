import { NextResponse } from "next/server";
import path from 'path';
import { promises as fs } from 'fs';
import { IArticle } from "@/types";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "utils", "data.json");

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "5", 10);
        const searchQuery = searchParams.get("search") || ""; // Get search query if provided

        // Read the data file
        const fileContents = await fs.readFile(DATA_FILE_PATH, "utf-8");
        let { data: articles, total } = JSON.parse(fileContents);

        // Sort articles by date (latest first)
        articles = articles.sort((a: IArticle, b: IArticle) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Filter articles by title if search query is provided
        if (searchQuery) {
            articles = articles.filter((article: IArticle) =>
                article.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Update total to reflect filtered results
        total = articles.length;

        // Calculate start and end indices for pagination
        const start = (page - 1) * limit;
        const end = start + limit;

        // Slice data for pagination
        const paginatedArticles = articles.slice(start, end);

        return NextResponse.json({
            articles: paginatedArticles,
            total,
            page,
            limit,
        });
    } catch (error) {
        console.error("Error fetching articles:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
