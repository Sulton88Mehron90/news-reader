import '../NavBar/NavBar.css';
import logo from '../Images/TuringSchool_LogoMark_Gray.png';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


interface NavBarProps {
  searchTerm: string;
  selectedCategory: string;
  onSearchTermChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
  onSearch: () => void;
}

// const NavBar: React.FC<NavBarProps> = ({ searchTerm, selectedCategory, onSearchTermChange, onCategoryChange, onSearch }) => {
// const categories = ['All', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

const NavBar: React.FC<NavBarProps> = ({ onSearchTermChange, onCategoryChange, onSearch }) => {
  const sources = ['Wired', 'Gizmodo.com', 'Business Insider'];
  const [localSearchTerm] = useState<string>('');
  const [localSelectedCategory, setLocalSelectedCategory] = useState<string>('All');
  const [dayMessage, setDayMessage] = useState('');

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
      <form className="navbar-search" onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
        {/* <select
          id="categorySelect"
          name="categorySelect"
          onChange={(e) => onCategoryChange(e.target.value)}
          value={selectedCategory}
        >
          <option value="">Search or select a category...</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select> */}
        <select
          id="categorySelect"
          name="categorySelect"
          onChange={(e) => setLocalSelectedCategory(e.target.value)}
          value={localSelectedCategory}
        >
          <option value="">Search or select a source...</option>
          {sources.map(source => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>

        <input
          id="searchInput"
          name="searchInput"
          type="text"
          placeholder="Search..."
          value={localSearchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
        <button type="submit">Search</button>
        {localSearchTerm && <button type="button" onClick={() => onSearchTermChange('')}>Clear</button>}
      </form>
    </div>
  );
}

export default NavBar;
