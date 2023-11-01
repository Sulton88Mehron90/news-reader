// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ArticleList from '../ArticleList/ArticleList';
// import ArticleDetail from '../ArticleDetail/ArticleDetail';
// import NavBar from '../NavBar/NavBar';
// import { fetchNews } from '../../apiCalls';
// import '../ArticleList/ArticleList.css';
// import { Article } from '../ArticleList/ArticleList';
// import Spinner from '../Spinner/Spinner';
// import Error404 from '../ErrorHandling/Error404';
// import Error500 from '../ErrorHandling/Error500';
// import GeneralError from '../ErrorHandling/GeneralError';



// function App() {
//   const [useMockData, setUseMockData] = useState(true);
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');

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
//   }, [useMockData, searchTerm, selectedCategory]);

//   const handleSearchTermChange = (term: string) => {
//     setSearchTerm(term);
//   }

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//   }

//   const handleSearch = () => {
//     setLoading(true);
//     fetchNews(searchTerm, 1, useMockData, selectedCategory)
//         .then((data: any) => {
//             setArticles(data.articles);
//             setLoading(false);
//         })
//         .catch((error: any) => {
//             console.error("Error fetching articles:", error);
//             setError('Failed to fetch articles. Please try again later.');
//             setLoading(false);
//         });
// }

//   if (loading) return <Spinner />;
//   if (error) return <div>{error}</div>;

//   return (
//     <Router>
//       <NavBar 
//         searchTerm={searchTerm}
//         selectedCategory={selectedCategory}
//         onSearchTermChange={handleSearchTermChange}
//         onCategoryChange={handleCategoryChange}
//         onSearch={handleSearch}
//       />
//       <div className="app-container">
//         <div className="controls-container">
//           <button
//             onClick={() => setUseMockData(!useMockData)}
//             className={`switch-button ${useMockData ? "switch-button-mock" : "switch-button-live"}`}
//           >
//             {useMockData ? "Switch to Live Data" : "Switch to Mock Data"}
//           </button>
//         </div>
//         <Routes>
//           <Route path="/" element={<ArticleList articles={articles} useMockData={useMockData} />} />
//           <Route path="/article/:id" element={<ArticleDetail articles={articles} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleList from '../ArticleList/ArticleList';
import ArticleDetail from '../ArticleDetail/ArticleDetail';
import NavBar from '../NavBar/NavBar';
import { fetchNews } from '../../apiCalls';
import '../ArticleList/ArticleList.css';
import { Article } from '../ArticleList/ArticleList';
import Spinner from '../Spinner/Spinner';
import Error404 from '../ErrorHandling/Error404';
import Error500 from '../ErrorHandling/Error500';
import GeneralError from '../ErrorHandling/GeneralError';
import Error500Test from '../ErrorHandling/Error500Test'


function App() {
  const [useMockData, setUseMockData] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  }

  useEffect(() => {
    handleSearch();
}, []);

  const handleSearch = () => {
    setLoading(true);
    fetchNews(searchTerm, 1, useMockData, selectedCategory)
        .then((data: any) => {
            setArticles(data.articles);
            setLoading(false);
        })
        .catch((error: any) => {
            console.error("Error fetching articles:", error);
            setError('Failed to fetch articles. Please try again later.');
            setLoading(false);
        });
  }

   if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;

  return (
    <Router>
      <NavBar 
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onSearchTermChange={handleSearchTermChange}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch}
      />
      <div className="app-container">
        <div className="controls-container">
          <button
            onClick={() => setUseMockData(!useMockData)}
            className={`switch-button ${useMockData ? "switch-button-mock" : "switch-button-live"}`}
          >
            {useMockData ? "Switch to Live Data" : "Switch to Mock Data"}
          </button>
        </div>
        <Routes>
          <Route path="/" element={<ArticleList articles={articles} useMockData={useMockData} />} />
          <Route path="/article/:id" element={<ArticleDetail articles={articles} />} />
          <Route path='/error500' element={<Error500 />} />
        {window.location.pathname === '/500-test' && (
          <Route path="/500-test" element={<Error500 />} />
        )}
        <Route path="/general-error" element={<GeneralError />} />
        <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
