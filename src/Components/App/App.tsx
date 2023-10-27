import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleList from '../ArticleList/ArticleList';
import ArticleDetail from '../ArticleDetail/ArticleDetail';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
