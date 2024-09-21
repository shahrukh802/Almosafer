export const BASE_URL = "http://localhost:3000"

export const GetArticles = async (page: number, search?: string) => {
    try {
        let url = ""
        if (search) {
            url = `${BASE_URL}/api/articles?page=${page}&search=${search}`
        } else {
            url = `${BASE_URL}/api/articles?page=${page}`
        }
        const response = await fetch(url, { next: { tags: ['GetArticles', page.toString()] } });
        return await response.json();
    } catch (error) {
        console.error('Get request failed', error);
        throw error;
    }
};

export const GetArticleByID = async (id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/api/articles/${id}`, { next: { tags: ['GetArticleByID', id.toString()] } });
        return await response.json();
    } catch (error) {
        console.error('Get request failed', error);
        throw error;
    }
};
