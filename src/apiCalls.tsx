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

// function fetchNews(
//   query: string,
//   page = 1,
//   useMockData = false,
//   sort?: string,
//   filter?: string
// ) {
//   if (useMockData) {
//     return Promise.resolve(newsData);
//   } else {
//     let endpoint = `${BASE_URL}everything`;
//     let params = new URLSearchParams({
//       apiKey: API_KEY,
//       page: page.toString(),
//       q: query || 'news' // default to 'news' if query is empty
//     });

//     // Optionally add sorting and filter parameters
//     if (sort) {
//       params.append('sortBy', sort);
//     }
//     if (filter) {
//       params.append('sources', filter);
//     }

//     endpoint += `?${params.toString()}`;

//     return fetch(endpoint, {
//       headers: {
//         'X-Api-Key': API_KEY
//       }
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Failed to fetch news');
//       }
//       return response.json();
//     });
//   }
// }

function fetchNews(
  query: string,
  page = 1,
  useMockData = false,
  sort?: string,
  filter?: string
) {
  if (useMockData) {
    return Promise.resolve(newsData);
  } else {
    let endpoint = `${BASE_URL}everything`;
    let params = new URLSearchParams({
      apiKey: API_KEY,
      page: page.toString(),
      q: query || 'news' // default to 'news' if query is empty
    });

    // Optionally add sorting and filter parameters
    if (sort) {
      params.append('sortBy', sort);
    }
    if (filter) {
      params.append('sources', filter);
    }

    endpoint += `?${params.toString()}`;

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

function fetchTopHeadlines(
  country: string = 'us',
  category?: string,
  page = 1,
  useMockData = false
) {
  if (useMockData) {
    return Promise.resolve(newsData);
  } else {
    let endpoint = `${BASE_URL}top-headlines?country=${country}&apiKey=${API_KEY}&page=${page}`;

    if (category) {
      endpoint += `&category=${category}`;
    }

    return fetch(endpoint, {
      headers: {
        'X-Api-Key': API_KEY
      }
    })
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

  return fetch(endpoint, {
    headers: {
      'X-Api-Key': API_KEY
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch news sources');
    }
    return response.json();
  });
}

export { fetchNews, fetchTopHeadlines, fetchNewsSources };
