describe('Homepage Tests', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/');
  });

  it('should display the main elements of the homepage', () => {
      cy.get('.logo-image').should('be.visible')
      cy.get('[href="/provideAid"]').click()
      cy.url().should('include', '/provideAid')
      cy.get('.logo-image').click()
      cy.url().should('include', '/')
      cy.get('.home-header').should('be.visible');
      cy.get('.mission-content-section').should('be.visible');
      cy.get('.media-side').should('be.visible');
      cy.get('.text-side').should('be.visible');
      cy.get('.refugee-image-container img').should('have.attr', 'alt', 'Refugees');
      cy.get('h2').contains('Our Mission').should('be.visible');
      cy.get('p').should('have.length.at.least', 1);
      cy.viewport(1280, 720);
      cy.get('.play-video').should('be.visible');
  });

  it('should play video when "Play Video" button is clicked', () => {
      cy.viewport(1280, 720);
      cy.get('.play-video').should('be.visible');
      cy.get('.play-video').click();
      cy.get('.video-container').should('be.visible');
      cy.get('iframe').should('be.visible');
      cy.get('.hide-video').should('be.visible');
  });

  it('should hide video when "Hide Video" button is clicked', () => {
      cy.get('.play-video').click();
      cy.get('.hide-video').click();
      cy.get('.refugees-img').should('be.visible');
      cy.viewport(1280, 720);
      cy.get('.play-video').should('be.visible');
  });

  // Sad Path

  it('should handle missing images gracefully', () => {
      cy.intercept('GET', '**/refugees.png', { statusCode: 404 });
      cy.reload();
      cy.get('img[alt="Refugees"]').should('be.visible');
  });

  it('should handle missing video gracefully', () => {
      cy.intercept('GET', 'https://www.youtube.com/embed/*', { statusCode: 404 });
      cy.viewport(1280, 720);
      cy.get('.play-video').click();
      cy.get('iframe').then(($iframe) => {
          const iframeSrc = $iframe.attr('src');
          if (!iframeSrc) {
              cy.wrap($iframe).should('not.be.visible');
          }
      });
  });
});