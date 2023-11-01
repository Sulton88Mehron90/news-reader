import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from '../ArticleList/ArticleList';
import ArticleDetail from '../ArticleDetail/ArticleDetail';
import NavBar from '../NavBar/NavBar';
import { fetchNews, fetchTopHeadlines } from '../../apiCalls';
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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
    handleSearch();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = useCallback(() => {
    setLoading(true);

    if (selectedCategory && selectedCategory !== 'All') {
      fetchTopHeadlines('us', selectedCategory, 1, useMockData)
        .then((data: any) => {
          setArticles(data.articles);
          setLoading(false);
        })
        .catch((error: any) => {
          console.error("Error fetching top headlines:", error);
          setError('Failed to fetch top headlines. Please try again later.');
          setLoading(false);
        });
    } else {
      fetchNews(searchTerm, 1, useMockData)
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
  }, [searchTerm, selectedCategory, useMockData]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

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
              onSearchTermChange={setSearchTerm}
              onCategoryChange={setSelectedCategory}
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
