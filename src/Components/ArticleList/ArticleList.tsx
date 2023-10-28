import React, { useState, useEffect } from 'react';
import { fetchNews } from '../../apiCalls';
import '../ArticleList/ArticleList.css';
import { Link } from 'react-router-dom';

type Article = {
  title: string;
  description: string;
  urlToImage: string | null;
  source: {
    id: string | null;
    name: string;
  };
};

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNews("bitcoin")
      .then((data: any) => {
        setArticles(data.articles);
      })
      .catch((error: any) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  const filteredArticles = articles.filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()));
  
    return (
      <div className="article-list-container">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {filteredArticles.map((article, index) => (
            <Link to={`/article/${index}`} key={index}>
              <div className="article-item">
                  <img src={article.urlToImage || "path/to/default/image.jpg"} alt={article.title || "No Title"} />
                  <h2>{article.title}</h2>
                  <p>{article.source.name}</p>
              </div>
            </Link>
          ))}
      </div>
    );
  }
  

export default ArticleList;
