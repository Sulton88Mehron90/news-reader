import React from 'react';
import { useParams } from 'react-router-dom';
import '../ArticleDetail/ArticleDetail.css';
import newsData from '../../mockData.json';

interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const articleIndex = parseInt(id || "0", 10);
  const article: Article = newsData.articles[articleIndex];

  if (!article) return <div>Article not found</div>;

  return (
    <div className="article-detail-wrapper">
      <div className="article-container">
          <img className="article-image" src={article.urlToImage || undefined} alt={article.title || "No Title"} />
          <h2>{article.title}</h2>
          <p>{article.description || "No Description"}</p>
          <p>Author: {article.author || "Unknown"}</p>
          <p>Source: {article.source.name}</p>
          <p>Published At: {new Date(article.publishedAt).toLocaleDateString()}</p>
          
          {article.url && (
            <p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read Full Article</a>
            </p>
          )}
      </div>
    </div>
  );
}

export default ArticleDetail;
