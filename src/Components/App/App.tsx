import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleList from '../ArticleList/ArticleList';
import ArticleDetail from '../ArticleDetail/ArticleDetail';
import NavBar from '../NavBar/NavBar';
import { fetchNews } from '../../apiCalls';
import '../App/App.css';

function App() {
  const [useMockData, setUseMockData] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchNews("bitcoin", 1, useMockData)
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, [useMockData]);

  const handleSearch = (term: string) => {
    console.log("Using mock data:", useMockData);
    // You can add logic to search articles based on the term here
    console.log("Searching for:", term);
  };

  return (
    <Router>
      <NavBar onSearch={handleSearch} />
      <div className="app-container">
        <button 
          onClick={() => setUseMockData(!useMockData)}
          className="switch-button"
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
