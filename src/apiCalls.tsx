import newsData from './mockData.json';

export type apiResponse = {
    status: string;
    totalResults: number;
    articles: {
        source: {
            id: string;
            name: string;
        };
        author: string;
        title: string;
        description: string;
        url: string;
        urlToImage: string;
        publishedAt: string;
        content: string;
    }[];
};

const API_KEY = 'c3ecb426dbc045cb9638716ce9dd0f51';
const BASE_URL = 'https://newsapi.org/v2/';

function fetchNews(
    query: string, 
    page = 1, 
    useMockData = false, 
    category?: string,   // New parameter for category
    sort?: string, 
    filter?: string
) {
    if (useMockData) {
        return Promise.resolve(newsData);
    } else {
        let endpoint;
        if (category) {
            endpoint = `${BASE_URL}top-headlines?category=${category}&apiKey=${API_KEY}&page=${page}`;
        } else {
            endpoint = `${BASE_URL}everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}&page=${page}`;
        }

        if (sort) {
            endpoint += `&sortBy=${sort}`;
        }

        if (filter) {
            endpoint += `&sources=${filter}`;
        }

        return fetch(endpoint, {
            headers: {
                'X-Api-Key': API_KEY
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }
            return response.json();
        });
    }
}

export { fetchNews };
