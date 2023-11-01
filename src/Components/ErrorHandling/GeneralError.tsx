import React from 'react';
import { NavLink } from 'react-router-dom';
import Superman from '../Images/superman.png';
import './GeneralError.css';

const GeneralError: React.FC = () => {
  return (
    <div className="general-error-msg">
      <h1>Oops! We're looking for it!</h1>
      <img src={Superman} alt="Picture of a supperman" />
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <button className="general-error-go-home-button" aria-label="Go back to the home page">
          Back to Main Page
        </button>
      </NavLink>
      <h2 className="general-error-message">Something went wrong.</h2>
    </div>
  );
}

export default GeneralError;


// navigate to the URL http://localhost:3000/general-error, you should see the "General Error" page