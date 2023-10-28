import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleList from '../ArticleList/ArticleList';
import ArticleDetail from '../ArticleDetail/ArticleDetail';
import NavBar from '../NavBar/NavBar';
import '../App/App.css';

function App() {
  const [useMockData, setUseMockData] = useState(true);

  const handleSearch = (term: string) => {
    // You can add logic to search articles based on the term here
    console.log("Searching for:", term);
  };

  return (
    <Router>
      <NavBar onSearch={handleSearch} />  {/* <-- Add NavBar here */}
      <div className="app-container">
        <button 
          onClick={() => setUseMockData(!useMockData)}
          className="switch-button"
        >
          {useMockData ? "Switch to Live Data" : "Switch to Mock Data"}
        </button>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
