import React, { useState, useEffect } from 'react';
import { fetchNews } from '../../apiCalls';
import '../ArticleList/ArticleList.css';
import { Link } from 'react-router-dom';
import missingImg from '../Images/missing-img.png';
import Spinner from '../Spinner/Spinner';

export type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  source: {
    id: string | null;
    name: string;
  };
  publishedAt: string;
  content: string;
  category?: string;
};

interface Props {
  useMockData: boolean;
  articles: Article[];
  searchTerm?: string;
  selectedCategory?: string;
}

const ArticleList: React.FC<Props> = ({ useMockData, searchTerm = "", selectedCategory = "All" }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Fetching news...");

    fetchNews(searchTerm, 1, useMockData, selectedCategory)
      .then((data: any) => {
        console.log("Data fetched:", data);
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error("Error fetching articles:", error);
        setError('Failed to fetch articles. Please try again later.');
        setLoading(false);
      });
  }, [useMockData, searchTerm, selectedCategory]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="article-list-container">
      {articles.map((article, index) => (
        <Link to={`/article/${index}`} key={index} className="article-link">
          <img
            src={article.urlToImage || missingImg}
            onError={(e) => {
              const imgElement = e.target as HTMLImageElement;
              imgElement.onerror = null;
              imgElement.src = missingImg;
            }}
            alt={article.title || "No Title"}
          />
          <div className="article-text-content">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
            <p>{article.source.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default React.memo(ArticleList);
