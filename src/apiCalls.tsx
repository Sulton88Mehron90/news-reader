import newsData from './mockData.json';

export type apiResponse = {
  status: string;
  totalResults: number;
  articles: {
    source: {
      id: string | null;
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

function fetchNews(query: string, page = 1, useMockData = false, sort?: string, filter?: string) {
  if (useMockData) {
    return Promise.resolve(newsData);
  } else {
    let endpoint = `${BASE_URL}everything`;
    let params = new URLSearchParams({
      apiKey: API_KEY,
      page: page.toString(),
      q: query || 'news' // Default to 'news' if the query is empty
    });

    // Only add sort and filter parameters if they are provided
    if (sort) {
      params.append('sortBy', sort);
    }
    if (filter) {
      params.append('sources', filter);
    }

    endpoint += `?${params.toString()}`;

    return fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        return response.json();
      });
  }
}

function fetchTopHeadlines(
  country: string = 'us',
  category?: string,
  page = 1,
  useMockData = false
) {
  if (useMockData) {
    return Promise.resolve(newsData);
  } else {
    let endpoint = `${BASE_URL}top-headlines`;
    let params = new URLSearchParams({
      country: country,
      apiKey: API_KEY,
      page: page.toString()
    });

    if (category) {
      params.append('category', category);
    }

    endpoint += `?${params.toString()}`;

    return fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch top headlines');
        }
        return response.json();
      });
  }
}

function fetchNewsSources() {
  const endpoint = `${BASE_URL}top-headlines/sources?apiKey=${API_KEY}`;

  return fetch(endpoint)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch news sources');
      }
      return response.json();
    });
}

export { fetchNews, fetchTopHeadlines, fetchNewsSources };
