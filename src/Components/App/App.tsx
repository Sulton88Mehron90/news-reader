import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleList from '../ArticleList/ArticleList';
import ArticleDetail from '../ArticleDetail/ArticleDetail';
import NavBar from '../NavBar/NavBar';
import { fetchNews, fetchTopHeadlines } from '../../apiCalls';
import '../ArticleList/ArticleList.css'

function App() {
  const [useMockData, setUseMockData] = useState(true);
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchTopHeadlines('us', selectedCategory)
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((error: Error) => {
        console.error("Error fetching articles:", error.message);
      });

  }, [useMockData, selectedCategory]);

  const fetchArticles = (category: string, searchTerm: string = "") => {
    if (!category && !searchTerm) {
      console.warn("Empty search term and category. Not fetching articles.");
      return;
    }
    const query = category === 'All' ? searchTerm : `${category} ${searchTerm}`.trim();
    fetchNews(query, 1, useMockData)
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  };

  const handleSearch = (term: string) => {
    fetchArticles(selectedCategory, term);
  };

  return (
    <Router>
      <NavBar onSearch={handleSearch} onCategoryChange={setSelectedCategory} />
      <div className="app-container">
        <button
          onClick={() => setUseMockData(!useMockData)}
          className={`switch-button ${useMockData ? "switch-button-mock" : "switch-button-live"}`}
        >
          {useMockData ? "Switch to Live Data" : "Switch to Mock Data"}
        </button>
        <Routes>
        <Route path="/" element={<ArticleList useMockData={useMockData} />} />
          <Route path="/article/:id" element={<ArticleDetail articles={articles} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
