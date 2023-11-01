import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Error404.css";
import oldNewsPaper from "../Images/Paper-404-Error.png";

const newsPaperFacts = [
  "First Published: The first newspaper was publicly available in the early 17th century.",
  "Broadsheets: The traditional large format for newspapers is called a broadsheet.",
  "Tabloids: A smaller newspaper format, often with more sensational news, is known as a tabloid.",
  "Pulitzer Prizes: The Pulitzer Prizes are prestigious awards for achievements in newspaper, magazine, online journalism, and literature.",
  "Printing Speed: Modern newspaper presses can print up to 90,000 copies per hour!",
  "Comics: The Sunday newspaper comics section, or 'the funnies,' has been a staple in many households for over a century.",
  "Crossword Puzzles: The New York Times, famous for its challenging crossword puzzles, didn't print its first crossword until 1942, considering them 'a primitive form of mental exercise'.",
  "The 'Wall Street Journal' is one of the most widely circulated newspapers in the U.S. and is recognized globally.",
  "Evolution: With the rise of the internet, many newspapers have adapted by creating online versions and apps to reach wider audiences.",
  "Eco-Friendly: Over half of all newspapers are recycled, making it a very environmentally friendly medium."
];


const Error404: React.FC = () => {
  const [refFact, setRefFact] = useState<string>("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * newsPaperFacts.length);
    setRefFact(newsPaperFacts[randomIndex]);
  }, []);

  return (
    <div className="not-found-page-container">
      <h1 className="not-found-heading">404 - Page Not Found</h1>
      <div className="not-found-handling">
        <h3>
          Sorry! That page doesn't seem to exist. Try going back to the Home
          page.
        </h3>
      </div>
      <NavLink to="/" className="error404-navlink">
        <button className="error404-go-home-button">
          Return to Home Page
        </button>
      </NavLink>

      <div className="ref-fact-container" aria-live="polite">
        <h2 className="ref-fact-heading">
          Did you know?
        </h2>

        <p className="ref-fact">
          {refFact
            ? <>
              <strong>{refFact.split(":")[0]}:</strong>
              {refFact.split(":")[1]}
            </>
            : "No facts available at the moment."
          }
        </p>
      </div>
      <div className="image-container">
        <img src={oldNewsPaper} alt="old-news-paper" className="old-news-paper" />
      </div>
    </div>
  );
}

export default Error404;
