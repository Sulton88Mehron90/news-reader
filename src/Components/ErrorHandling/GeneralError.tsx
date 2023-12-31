import React from 'react';
import { NavLink } from 'react-router-dom';
import Superman from '../Images/superman.png';
import './GeneralError.css';

type GeneralErrorProps = {
  message?: string;
};

const GeneralError: React.FC<GeneralErrorProps> = ({ message }) => {
  return (
    <div className="general-error-msg">
      <h1>Oops! We're looking for it!</h1>
      <img src={Superman} alt="superman" />
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <button className="general-error-go-home-button" aria-label="Go back to the home page">
          Back to Main Page
        </button>
      </NavLink>
      {message && <h2 className="general-error-message">{message}</h2>}
      {!message && <h2 className="general-error-message">Something went wrong.</h2>}
    </div>
  );
}


export default GeneralError;



// navigate to the URL http://localhost:3000/general-error, you should see the "General Error" page