/// <reference types="cypress" />

describe('Homepage Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });
  
    it('should display the main elements of the homepage', () => {
      cy.get('.navbar-logo').should('be.visible');
      cy.get('.navbar-logo').click();
      cy.url().should('include', '/');
      cy.get('.navbar-name').should('be.visible');
      cy.get('.day-message').should('be.visible');
      cy.get('#categorySelect').should('be.visible');
      cy.get('#searchInput').should('be.visible');
      cy.get('.navbar-search > button').should('be.visible');
      cy.get('.switch-button').should('be.visible');
      cy.get('[href="/article/0"] > img').should('be.visible');
      cy.get('[href="/article/0"] > img').click();
      cy.get('.detail-image').should('be.visible');
    });


  // it('should display the main elements of the homepage', () => {
  //   cy.get('.navbar-logo').should('be.visible')
  //   cy.get('.navbar-logo').click();
  //   cy.url().should('eq', 'http://localhost:3000/');
  //   cy.get('.navbar-name').should('be.visible');
  //   cy.get('.day-message').should('be.visible');
  //   cy.get('#categorySelect').should('be.visible');
  //   cy.get('#searchInput').should('be.visible').and('be.empty');
  //   cy.get('.navbar-search > button').should('be.visible');
  //   cy.get('.switch-button').should('be.visible');
  //   cy.get('[href="/article/0"] > img').should('be.visible')
  //   cy.get('[href="/article/0"] > img').click();
  //   cy.url().should('include', '/article/0'); 
  //   cy.get('h1').should('be.visible').and('contain', 'Apple finally kills off the 13-inch Touch Bar MacBook Pro');
  // });
  
    // Sad Path
  
    // it('should handle missing img', () => {
    //   cy.intercept('GET', 'http://localhost:3000/*', { statusCode: 404 }).as();
    //   cy.viewport(1280, 720);
    //   cy.get('.');
    //   cy.wait('');
    //   });
    // });
  });
  