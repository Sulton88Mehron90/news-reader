// // import React, { useState } from 'react';
// // import '../NavBar/NavBar.css';
// // import logo from '../Images/TuringSchool_LogoMark_Gray.png';
// // import { Link } from 'react-router-dom';

// // interface NavBarProps {
// //   onSearch: (term: string, category: string) => void;
// //   onCategoryChange: (category: string) => void;
// // }

// // const NavBar: React.FC<NavBarProps> = ({ onSearch, onCategoryChange }) => {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const categories = ['All', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];
// //   const [selectedCategory, setSelectedCategory] = useState('All');

// //   // Handle the form submit event
// //   const handleFormSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     onSearch(searchTerm, selectedCategory); // pass both searchTerm and selectedCategory
// //   };

// //   // Handle category change
// //   const handleCategoryChange = (category: string) => {
// //     setSelectedCategory(category);  // Update the local state of the NavBar
// //     onSearch(searchTerm, category); // Perform search using the current searchTerm and new category
// //   };


// //   return (
// //     <div className="navbar">
// //       <Link to="/">
// //         <img src={logo} alt="Logo" className="navbar-logo" />
// //       </Link>
// //       <span className="navbar-name">News Reader</span>
// //       <form className="navbar-search" onSubmit={handleFormSubmit}>
// //         <select
// //           id="categorySelect"
// //           name="categorySelect"
// //           onChange={(e) => handleCategoryChange(e.target.value)}
// //         >
// //           <option value="">Search or select a category...</option>
// //           {categories.map(category => (
// //             <option key={category} value={category}>
// //               {category}
// //             </option>
// //           ))}
// //         </select>
// //         <input
// //           id="searchInput"
// //           name="searchInput"
// //           type="text"
// //           placeholder="Search..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //         />
// //         <button type="submit">Search</button>
// //         {searchTerm && <button type="button" onClick={() => setSearchTerm('')}>Clear</button>}
// //       </form>
// //     </div>
// //   );
// // }

// // export default NavBar;

// import React from 'react';
// import '../NavBar/NavBar.css';
// import logo from '../Images/TuringSchool_LogoMark_Gray.png';
// import { Link } from 'react-router-dom';

// const NavBar: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   // const [dayMessage, setDayMessage] = useState('');

//   // useEffect(() => {
//   //   const time = new Date();
//   //   const hour = time.getHours();
//   //   const day = time.toLocaleString('en-US', { weekday: 'long' });
    
//   //   let timeOfDay;
//   //   if (hour >= 6 && hour < 12) {
//   //     timeOfDay = 'Good Morning';
//   //   } else if (hour >= 12 && hour < 18) {
//   //     timeOfDay = 'Good Afternoon';
//   //   } else if (hour >= 18 && hour < 21) {
//   //     timeOfDay = 'Good Evening';
//   //   } else {
//   //     timeOfDay = 'Good Night';
//   //   }
  
//   //   let message;
//   //   if (day.toLowerCase() === 'monday') {
//   //     message = `Happy ${day}! How about a comedy to start the week?`;
//   //   } else if (day.toLowerCase() === 'tuesday') {
//   //     message = `${day}, huh? Perfect day for a thriller.`;
//   //   } else if (day.toLowerCase() === 'wednesday') {
//   //     message = `It's ${day}! Feeling adventurous? Try a new release.`;
//   //   } else if (day.toLowerCase() === 'thursday') {
//   //     message = `${day} vibes! Maybe a classic movie tonight?`;
//   //   } else if (day.toLowerCase() === 'friday') {
//   //     message = 'Woo-hoo, it\'s Friday! Movie night, anyone?';
//   //   } else if (day.toLowerCase() === 'saturday') {
//   //     message = 'Saturday binge-watching, here we come!';
//   //   } else {
//   //     message = 'Easy like Sunday morning... perfect for a film marathon!';
//   //   }
  
//   //   setDayMessage(`${timeOfDay}! ${message}`);
//   // }, []);
  
//   return (
//     <div className="navbar">
//       <Link to="/">
//         <img src={logo} alt="Logo" className="navbar-logo" />
//       </Link>
//       <span className="navbar-name">News Reader</span>
//     </div>
//   );
// }

// export default NavBar;

// NavBar.tsx

import React, { useState } from 'react';
import '../NavBar/NavBar.css';
import logo from '../Images/TuringSchool_LogoMark_Gray.png';
import { Link } from 'react-router-dom';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['All', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Handle the form submit event
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, selectedCategory);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </Link>
      <span className="navbar-name">News Reader</span>
      <form className="navbar-search" onSubmit={handleFormSubmit}>
        <select
          id="categorySelect"
          name="categorySelect"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">Search or select a category...</option>
          {categories.map(category => (
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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
        {searchTerm && <button type="button" onClick={() => setSearchTerm('')}>Clear</button>}
      </form>
    </div>
  );
}

export default NavBar;
