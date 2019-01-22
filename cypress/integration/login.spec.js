/// <reference types="Cypress" />

describe('Login Flow', () => {
  it('Correctly prompts on invalid credentials', () => {
    cy.visit('/login');

    cy.get('input[name=email]').type('invalid@example.com');
    cy.get('input[name=password]').type('invalid');
    cy.get('button[type=submit]').click();

    cy.url().should('include', '/login');
    cy.contains('password were incorrect');
    cy.get('input[name=email]').should('have.value', 'invalid@example.com');
    cy.get('input[name=password]').should('not.have.value');
  });

  it('Sets auth cookie when logging in', () => {
    cy.visit('/login');

    cy.get('input[name=email]').type('alicetester@example.com');
    cy.get('input[name=password]').type('password');
    cy.get('button[type=submit]').click();

    cy.url().should('include', '/trainings');
    cy.getCookie('auth').should(cookie => {
      expect(cookie.httpOnly).to.equal(true, 'httpOnly = true');
    });
  });
});
