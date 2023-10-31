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
//     article.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return <div>Loading...</div>;
//   if (error) return (
//     <div>
//       {error}
//       <button onClick={() => setRetryCount(retryCount + 1)}>Retry</button>
//     </div>
//   );

//   return (
//     <div className="article-list-container">
//       <div className="search-container">
//         <label htmlFor="searchInput" className="visually-hidden">Search Articles</label>
//         <input
//           id="searchInput"
//           name="searchInput"
//           type="text"
//           className="search-input"
//           placeholder="Search articles..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <div className="articles">
//         {filteredArticles.map((article, index) => (
//           <Link to={`/article/${index}`} key={index} className="article-link">
//           <img 
//               src={article.urlToImage || missingImg} 
//               onError={(e) => {
//                   const imgElement = e.target as HTMLImageElement;
//                   imgElement.onerror = null;
//                   imgElement.src = missingImg;
//               }} 
//               alt={article.title || "No Title"} 
//           />
//           <div className="article-text-content">
//               <h2>{article.title}</h2>
//               <p>{article.description}</p>
//               <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
//               <p>{article.source.name}</p>
//           </div>
//       </Link>
      
//         ))}
//       </div>
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
};

interface Props {
  useMockData: boolean;
  articles: Article[];
}

const ArticleList: React.FC<Props> = ({ useMockData }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tempSearchTerm, setTempSearchTerm] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

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

  const handleSearch = () => {
    setSearchTerm(tempSearchTerm);
  };

  return (
    <div className="article-list-container">
      <div className="search-container">
        <select
          id="categorySelect"
          name="categorySelect"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Search or select a category...</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          id="searchInput"
          name="searchInput"
          type="text"
          className="search-input"
          placeholder="Search articles..."
          value={tempSearchTerm} // Use tempSearchTerm here
          onChange={(e) => setTempSearchTerm(e.target.value)} // Update tempSearchTerm as user types
        />
        <button onClick={handleSearch} className="search-button">Search</button> {/* New search button */}
      </div>
      <div className="articles">
        {filteredArticles.map((article, index) => (
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
    </div>
  );
}

export default React.memo(ArticleList);
