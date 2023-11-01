// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
// import Error500Test from '../ErrorHandling/Error500Test';

// function App() {
//   const [useMockData, setUseMockData] = useState(true);
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   useEffect(() => {
//     handleSearch();
//   }, [searchTerm, selectedCategory, useMockData]);

//   const handleSearchTermChange = (term: string) => {
//     setSearchTerm(term);
//   };

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//   };

//   const handleSearch = () => {
//     setLoading(true);
//     fetchNews(searchTerm, 1, useMockData, selectedCategory)
//       .then((data: any) => {
//         setArticles(data.articles);
//         setLoading(false);
//       })
//       .catch((error: any) => {
//         console.error("Error fetching articles:", error);
//         setError('Failed to fetch articles. Please try again later.');
//         setLoading(false);
//       });
//   };

//   const renderContent = () => {
//     if (loading) return <Spinner />;
//     if (error) return <div>{error}</div>;

//     return (
//       <div className="app-container">
//         <Routes>
//           <Route path="/" element={
//             <>
//               <NavBar
//                 searchTerm={searchTerm}
//                 selectedCategory={selectedCategory}
//                 onSearchTermChange={handleSearchTermChange}
//                 onCategoryChange={handleCategoryChange}
//                 onSearch={handleSearch}
//               />
//               <div className="controls-container">
//                 <button
//                   onClick={() => setUseMockData(!useMockData)}
//                   className={`switch-button ${useMockData ? "switch-button-mock" : "switch-button-live"}`}
//                 >
//                   {useMockData ? "Switch to Live Data" : "Switch to Mock Data"}
//                 </button>
//               </div>
//               <ArticleList articles={articles} useMockData={useMockData} />
//             </>
//           } />
//           <Route path="/article/:id" element={<ArticleDetail articles={articles} />} />
//           <Route path="/error500" element={<Error500 />} />
//           <Route path="/500-test" element={<Error500Test />} />
//           <Route path="/general-error" element={<GeneralError />} />
//           <Route path="*" element={<Error404 />} />
//         </Routes>
//       </div>
//     );
//   };

//   return (
//     <Router>
//       {renderContent()}
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Error500Test from '../ErrorHandling/Error500Test';

function App() {
  const [useMockData, setUseMockData] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedCategory, useMockData]);

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = () => {
    setLoading(true);
    const category = selectedCategory !== 'All' ? selectedCategory : undefined;
    fetchNews(searchTerm, 1, useMockData, category)
      .then((data: any) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error("Error fetching articles:", error);
        setError('Failed to fetch articles. Please try again later.');
        setLoading(false);
      });
  };  

    const renderContent = () => {
    if (loading) return <Spinner />;
    if (error) return <div>{error}</div>;
    }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <NavBar
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              onSearchTermChange={handleSearchTermChange}
              onCategoryChange={handleCategoryChange}
              onSearch={handleSearch}
            />
            <div className="controls-container">
              <button
                onClick={() => setUseMockData(!useMockData)}
                className={`switch-button ${useMockData ? "switch-button-mock" : "switch-button-live"}`}
              >
                {useMockData ? "Switch to Live Data" : "Switch to Mock Data"}
              </button>
            </div>
            <ArticleList articles={articles} useMockData={useMockData} />
          </>
        } />
        <Route path="/article/:id" element={
          <>
            <NavBar
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              onSearchTermChange={handleSearchTermChange}
              onCategoryChange={handleCategoryChange}
              onSearch={handleSearch}
            />
            <ArticleDetail articles={articles} />
          </>
        } />
        <Route path="/error500" element={<Error500 />} />
        <Route path="/500-test" element={<Error500Test />} />
        <Route path="/general-error" element={<GeneralError />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
