/// <reference types="cypress" />

describe('Error Handling', () => {
  // Test for 500 - Internal Server Error
  it('should display the 500 error page when visiting /500-test', () => {
    cy.visit('http://localhost:3000/500-test');
    cy.url().should('include', '/500-test');
    cy.contains('500 - Internal Server Error').should('be.visible');
    cy.contains("Oops! Something went wrong on our end.").should('be.visible');
    cy.get('.error500-go-home-button').should('be.visible');
  });

  // Test for General Error
  it('Should display appropriate error message at /general-error', () => {
    cy.visit('http://localhost:3000/general-error');
    cy.get('h1').contains("Oops! We're looking for it!").should('be.visible');
    cy.get('img').should('be.visible');
    cy.get('h2').contains('Something went wrong.').should('be.visible');
    cy.get('.general-error-go-home-button').should('be.visible');
  });

  // Test for 404 - Page Not Found
  it('should display a 404 error message when the page is not found', () => {
    cy.visit('http://localhost:3000/nonexistentpage');

    cy.contains('404 - Page Not Found').should('be.visible');
    cy.contains("Sorry! That page doesn't seem to exist. Try going back to the Home page.").should('be.visible');
    cy.get('.error404-go-home-button').should('be.visible');
    cy.get('.ref-fact').should('be.visible');
    cy.get('.old-news-paper').should('be.visible');
  });
});
