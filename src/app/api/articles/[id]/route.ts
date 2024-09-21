import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { IArticle } from "@/types";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "utils", "data.json");

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const articleId = parseInt(id, 10);

        // Read the data file
        const fileContents = await fs.readFile(DATA_FILE_PATH, "utf-8");

        const { data: articles } = JSON.parse(fileContents);

        // Find the article by ID
        const article = articles.find((article: IArticle) => article.id === articleId);

        if (!article) {
            return new NextResponse("Article not found", { status: 404 });
        }

        return NextResponse.json(article);
    } catch (error) {
        return new NextResponse(`Internal Server Error ${JSON.stringify(error)}`, { status: 500 });
    }
}
