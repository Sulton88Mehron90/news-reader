import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article } from '../ArticleList/ArticleList'; 
import '../ArticleDetail/ArticleDetail.css';

interface ArticleDetailProps {
  articles: Article[];
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ articles }) => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Invalid article ID.</div>;
  }

  const articleIndex = parseInt(id, 10);
  const article = articles[articleIndex];

  if (!article) return <div>Article not found.</div>;

  // Debugging logs
  console.log("Articles:", articles);
  console.log("Route ID:", id);
  console.log("Matched Article:", article);

  return (
    <div className="article-detail-container">
      <Link to="/" className="back-button">Back to Main Page</Link>
      <h1>{article.title}</h1>
      <img src={article.urlToImage || "path/to/default/image.jpg"} alt={article.title || "No Title"} className="detail-image" />
      <p><strong>Source:</strong> {article.source.name}</p>
      <p><strong>Date:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
      <p>{article.content}</p>
    </div>
  );
}

export default ArticleDetail;
