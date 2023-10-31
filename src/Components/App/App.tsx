import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleList from '../ArticleList/ArticleList';
import ArticleDetail from '../ArticleDetail/ArticleDetail';
import NavBar from '../NavBar/NavBar';
import { fetchNews } from '../../apiCalls';
import '../ArticleList/ArticleList.css';
import { Article } from '../ArticleList/ArticleList';


function App() {
  const [useMockData, setUseMockData] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
  }, [useMockData]);

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  }


  const handleSearch = () => {
    const filteredArticles = articles.filter(article => 
      (selectedCategory === 'All' || article.source.name === selectedCategory) && 
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setArticles(filteredArticles);
  }
  
  // const handleSearch = () => {
  //   // Call the API or filter the articles here based on searchTerm and selectedCategory
  //   // For now, we'll filter the articles
  //   const filteredArticles = articles.filter(article => 
  //     (selectedCategory === 'All' || article.category === selectedCategory) && 
  //     article.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setArticles(filteredArticles);
  // }

  if (loading) return <div>Loading...</div>;
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
