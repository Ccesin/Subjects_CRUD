let URL = 'http://localhost:5173/create';

describe('template spec', () => {
  
  it('Revisa si todos los elementos del formulario existen ', () => {

    cy.visit(URL);

    cy.get('[data-testid="cypress-input-name" ]').should('exist');
    cy.get('[data-testid="cypress-input-uc" ]').should('exist');
    cy.get('[data-testid="cypress-input-profesor" ]').should('exist');
    cy.get('[data-testid="cypress-input-descripcion" ]').should('exist');
    cy.get('[data-testid="cypress-input-horario" ]').should('exist');
    cy.get('[data-testid="cypress-input-aula" ]').should('exist');
    cy.get('[data-testid="cypress-input-prelacion" ]').should('exist');
    cy.get('[data-testid="cypress-input-cupomax" ]').should('exist');
    cy.get('[data-testid="cypress-input-image" ]').should('exist');
    cy.get('[data-testid="cypress-submit"]').should('exist');
  
  })

})