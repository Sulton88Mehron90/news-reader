import React from 'react';
import { Link } from 'react-router-dom';
import '../ArticleList/ArticleList.css';
import missingImg from '../Images/missing-img.png';

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
};

interface Props {
  articles: Article[];
}

const ArticleList: React.FC<Props> = ({ articles }) => {
  if (!articles.length) {
    return <div>No articles found.</div>;
  }

  return (
    <div className="article-list-container">
      {articles.map((article, index) => (
        <Link to={`/article/${index}`} key={index} className="article-link">
          <img
            src={article.urlToImage || missingImg}
            onError={(e) => {
              const imgElement = e.target as HTMLImageElement;
              imgElement.onerror = null; // to prevent endless loop if missing image also fails
              imgElement.src = missingImg;
            }}
            alt={article.title || "No title available"}
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
