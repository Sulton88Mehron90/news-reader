import React, { useState } from 'react';

interface NavBarProps {
  onSearch: (term: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="navbar">
      <img src="path_to_your_logo.png" alt="Logo" className="navbar-logo" />
      <span className="navbar-name">Your Newspaper Name</span>
      <form className="navbar-search" onSubmit={handleSearch}>
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
