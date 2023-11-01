// NavBar.tsx
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

  const handleSearchTermChange = useCallback(debounce((term: string) => {
    onSearchTermChange(term);
  }, 500), [onSearchTermChange]);

  const handleCategoryChange = useCallback(debounce((category: string) => {
    onCategoryChange(category);
  }, 500), [onCategoryChange]);

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

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </Link>
      <span className="navbar-name">News Reader</span>
      <div className="day-message">{dayMessage}</div>
      <form className="navbar-search" onSubmit={(e) => {
        e.preventDefault();
        onSearch(searchTerm, selectedCategory);
      }}>
        <select
          id="categorySelect"
          name="categorySelect"
          onChange={(e) => {
            handleCategoryChange(e.target.value);
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
          }}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={() => {
          onSearchTermChange('');
          onCategoryChange('All');
          onSearch('', 'All');
        }}>Clear</button>
      </form>
    </div>
  );
};

export default NavBar;
