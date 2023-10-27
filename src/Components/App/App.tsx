import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ArticleList} />
        <Route path="/article/:id" component={ArticleDetail} />
      </Switch>
    </Router>
  );
}

export default App;
