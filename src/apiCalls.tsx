const API_KEY = 'c3ecb426dbc045cb9638716ce9dd0f51';
const BASE_URL = 'https://newsapi.org/v2/';

async function fetchNews(query: string, page = 1) {
    const endpoint = `${BASE_URL}everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}&page=${page}`;
    const response = await fetch(endpoint, {
        headers: {
            'X-Api-Key': API_KEY
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch news');
    }

    const data = await response.json();
    return data;
}
