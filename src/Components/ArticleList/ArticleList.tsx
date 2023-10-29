import React, { useState, useEffect } from 'react';
import { fetchNews } from '../../apiCalls';
import '../ArticleList/ArticleList.css';
import { Link } from 'react-router-dom';

export type Article = {
  title: string;
  description: string;
  urlToImage: string | null;
  source: {
    id: string | null;
    name: string;
  };
  publishedAt: string; 
  content: string; 
};

interface Props {
  useMockData: boolean;
}

const ArticleList: React.FC<Props> = ({ useMockData }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    fetchNews("bitcoin", 1, useMockData)
      .then((data: any) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error("Error fetching articles:", error);
        setError('Failed to fetch articles. Please try again later.');
        setLoading(false);
      });
  }, [useMockData, retryCount]);

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div>
      {error}
      <button onClick={() => setRetryCount(retryCount + 1)}>Retry</button>
    </div>
  );

  return (
    <div className="article-list-container">
      <div className="search-container">
        <label htmlFor="searchInput" className="visually-hidden">Search Articles</label>
        <input
          id="searchInput"
          type="text"
          className="search-input"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="articles">
        {filteredArticles.map((article, index) => (
          <Link to={`/article/${index}`} key={index} className="article-link">
            <h2>{article.title}</h2>
            <img src={article.urlToImage || "path/to/default/image.jpg"} alt={article.title || "No Title"} />
            <p>{article.description}</p>
            <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
            <p>{article.source.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default React.memo(ArticleList);
