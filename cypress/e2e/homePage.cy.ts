/// <reference types="cypress" />

import newsData from '../fixtures/example.json';

describe('Homepage Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://newsapi.org/v2/top-headlines*', { fixture: 'example.json' }).as('getTopHeadlines');
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
});