import React, { useState } from 'react';
import '../NavBar/NavBar.css'
import logo from '../../TuringSchool_LogoMark_Gray.png';
import { Link } from 'react-router-dom';

interface NavBarProps {
  onSearch: (term: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

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
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default NavBar;
