import React, { useState } from 'react';
import '../NavBar/NavBar.css'
import logo from '../../TuringSchool_LogoMark_Gray.png';
import { Link } from 'react-router-dom';

interface NavBarProps {
  onSearch: (term: string) => void;
  onCategoryChange: (category: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSearch, onCategoryChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['All', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </Link>
      <span className="navbar-name">News Reader</span>
      <form className="navbar-search" onSubmit={handleFormSubmit}>
        <select
          onChange={(e) => {
            onCategoryChange(e.target.value);
          }}
        >
          <option value="">Search or select a category...</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
        {searchTerm && <button type="button" onClick={() => setSearchTerm('')}>Clear</button>}
      </form>
    </div>
  );
}

export default NavBar;
