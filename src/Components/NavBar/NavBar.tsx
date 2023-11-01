import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/TuringSchool_LogoMark_Gray.png';
import '../NavBar/NavBar.css';

interface NavBarProps {
  searchTerm: string;
  selectedCategory: string;
  onSearchTermChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
  onSearch: (term: string, category: string) => void;
}

// Define a type for the function that debounce will receive
type Func = (...args: any[]) => void;

// Debounce utility function with types
const debounce = (func: Func, wait: number): Func => {
  let timeout: NodeJS.Timeout | null;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout as NodeJS.Timeout);
      func(...args);
    };
    clearTimeout(timeout as NodeJS.Timeout);
    timeout = setTimeout(later, wait);
  };
};

const NavBar: React.FC<NavBarProps> = ({
  searchTerm,
  selectedCategory,
  onSearchTermChange,
  onCategoryChange,
  onSearch,

}) => {

  const categories = ['All', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];
  const [dayMessage, setDayMessage] = useState('');

  const handleSearchTermChange = (term: string) => {
    console.log('Search term changed:', term);//delete
    onSearchTermChange(term);
  };

  const handleCategoryChange = (category: string) => {
    console.log('Category changed:', category);//delete
    onCategoryChange(category);
  };

  useEffect(() => {
    const time = new Date();
    const hour = time.getHours();
    const day = time.toLocaleString('en-US', { weekday: 'long' });

    let timeOfDay;
    if (hour >= 6 && hour < 12) {
      timeOfDay = 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
      timeOfDay = 'Good Afternoon';
    } else if (hour >= 18 && hour < 21) {
      timeOfDay = 'Good Evening';
    } else {
      timeOfDay = 'Good Night';
    }

    let message;
    if (day.toLowerCase() === 'monday') {
      message = `Welcome to ${day}. Begin your week informed with today's essential news.`;
    } else if (day.toLowerCase() === 'tuesday') {
      message = `This ${day}, delve into comprehensive analyses and reports from our dedicated team.`;
    } else if (day.toLowerCase() === 'wednesday') {
      message = `On this ${day}, explore in-depth coverage of current events and global affairs.`;
    } else if (day.toLowerCase() === 'thursday') {
      message = `${day}'s edition offers expert insights on national and international developments.`;
    } else if (day.toLowerCase() === 'friday') {
      message = `As we approach the weekend, stay updated with ${day}'s critical news and updates.`;
    } else if (day.toLowerCase() === 'saturday') {
      message = `This ${day}, reflect on the week's events with comprehensive reviews and commentaries.`;
    } else {
      message = `Sunday's edition provides a reflective look at the past week's most impactful stories.`;
    }


    setDayMessage(`${timeOfDay}! ${message}`);
  }, []);

  // Update useCallback to remove the debounce dependency
  const debouncedOnSearch = useCallback(
    debounce((newTerm, newCategory) => {
      onSearch(newTerm, newCategory);
    }, 500),
    [onSearch] 
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search button clicked'); // dont fofget to delete
    onSearch(searchTerm, selectedCategory);
  };

  const clearSearch = () => {
    onSearchTermChange('');
    onCategoryChange('All');
    onSearch('', 'All');
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </Link>
      <span className="navbar-name">News Reader</span>
      <div className="day-message">{dayMessage}</div>
      <form className="navbar-search" onSubmit={handleSearch}>
        <select
          id="categorySelect"
          name="categorySelect"
          onChange={(e) => {
            handleCategoryChange(e.target.value);
            debouncedOnSearch(searchTerm, e.target.value); // Perform debounced search when category changes
          }}
          value={selectedCategory}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          id="searchInput"
          name="searchInput"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            handleSearchTermChange(e.target.value); 
            debouncedOnSearch(e.target.value, selectedCategory); // Optionally debouncing the search as the user types
          }}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={clearSearch}>Clear</button>
      </form>
    </div>
  );
};

export default NavBar;