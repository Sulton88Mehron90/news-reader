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
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchArticles(selectedCategory, ""); 
  }, [useMockData, selectedCategory]);

  const fetchArticles = (category: string, searchTerm: string = "") => {
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
    console.log("Using mock data:", useMockData);
    console.log("Searching for:", term);
    fetchArticles(selectedCategory, term);
  };

  return (
    <Router>
      <NavBar onSearch={handleSearch} onCategoryChange={setSelectedCategory} />
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
