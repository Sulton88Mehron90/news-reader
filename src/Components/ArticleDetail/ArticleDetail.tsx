import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article } from '../ArticleList/ArticleList';
import '../ArticleDetail/ArticleDetail.css';
import missingImg from '../Images/missing-img.png';

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

  if (!article) return <div>Article not found. To go back to Main Page click on the Logo</div>;

  console.log("Articles:", articles); //dont forgert to delete
  console.log("Route ID:", id);
  console.log("Matched Article:", article);

  return (
    <div className="article-detail-container">
      <Link to="/" className="back-button">Back to Main Page</Link>
      <h1>{article.title}</h1>
      <img
        src={article.urlToImage || "path/to/default/image.jpg"}
        alt={article.title || "No Title"}
        className="detail-image"
        onError={(e) => {
          const imgElement = e.target as HTMLImageElement;
          imgElement.onerror = null;
          imgElement.src = missingImg;
        }}
      />
      <p><strong>Source:</strong> {article.source.name}</p>
      <p><strong>Date:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
      <p>{article.content}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="article-original-link">Read full article on original source</a>
    </div>
  );
}

export default ArticleDetail;
