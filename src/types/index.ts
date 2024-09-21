interface Category {
    id: number;
    name: string;
    locale: string;
    published_at: string;
    created_at: string;
    updated_at: string;
}

interface Year {
    id: number;
    year: string;
    published_at: string;
    created_at: string;
    updated_at: string;
}

interface Localization {
    id: number;
    locale: string;
    published_at: string;
}

export interface IArticle {
    id: number;
    metatitle: string;
    metadescription: string;
    title: string;
    body: string;
    date: string;
    category: Category;
    year: Year;
    slug: string;
    locale: string;
    published_at: string;
    created_at: string;
    updated_at: string;
    localizations: Localization[];
    featuredimage: any;
}

export interface IArticles {
    articles: IArticle[]
    total: number,
    page: number,
    limit: number
}
