// import React, { useState, useEffect } from 'react';
// import { fetchNews } from '../../apiCalls';
// import '../ArticleList/ArticleList.css';
// import { Link } from 'react-router-dom';
// import missingImg from '../Images/missing-img.png';

// export type Article = {
//   title: string;
//   description: string;
//   url: string;
//   urlToImage: string | null;
//   source: {
//     id: string | null;
//     name: string;
//   };
//   publishedAt: string;
//   content: string;
//   category: string;
// };

// interface Props {
//   useMockData: boolean;
//   articles: Article[];
// }

// const ArticleList: React.FC<Props> = ({ useMockData }) => {
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [retryCount, setRetryCount] = useState(0);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const categories = ['All', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

//   useEffect(() => {
//     fetchNews("bitcoin", 1, useMockData)
//       .then((data: any) => {
//         setArticles(data.articles);
//         setLoading(false);
//       })
//       .catch((error: any) => {
//         console.error("Error fetching articles:", error);
//         setError('Failed to fetch articles. Please try again later.');
//         setLoading(false);
//       });
//   }, [useMockData, retryCount]);
  
//   const filteredArticles = articles.filter(article => 
//     (selectedCategory === 'All' || article.category === selectedCategory) && 
//     (!searchTerm || article.title.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <div className="article-list-container">
//       <div className="search-container">
//         <select
//           id="categorySelect"
//           name="categorySelect"
//           onChange={handleSearchChange}
//           value={searchTerm}
//         >
//           <option value="">Type or select a category...</option>
//           {categories.map(category => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//         <input
//           id="searchInput"
//           name="searchInput"
//           type="text"
//           className="search-input"
//           placeholder="Type or select a category..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//         <button 
//           className={`clear-button ${searchTerm ? 'visible' : 'hidden'}`} 
//           onClick={() => setSearchTerm('')}
//         >
//           X
//         </button>
//       </div>
//       {filteredArticles.map((article, index) => (
//         <Link to={`/article/${index}`} key={index} className="article-link">
//           <img 
//             src={article.urlToImage || missingImg} 
//             onError={(e) => {
//               const imgElement = e.target as HTMLImageElement;
//               imgElement.onerror = null;
//               imgElement.src = missingImg;
//             }} 
//             alt={article.title || "No Title"} 
//           />
//           <div className="article-text-content">
//             <h2>{article.title}</h2>
//             <p>{article.description}</p>
//             <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
//             <p>{article.source.name}</p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default React.memo(ArticleList);


import React, { useState, useEffect } from 'react';
import { fetchNews } from '../../apiCalls';
import '../ArticleList/ArticleList.css';
import { Link } from 'react-router-dom';
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
  category: string;
};

interface Props {
  useMockData: boolean;
  articles: Article[];
}

const ArticleList: React.FC<Props> = ({ useMockData }) => {
  const [articles, setArticles] = useState<Article[]>([]);
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
