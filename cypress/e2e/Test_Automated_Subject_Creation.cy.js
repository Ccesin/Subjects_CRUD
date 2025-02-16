let URL = 'http://localhost:5173/create';

describe('template spec', () => {
  
  it('Rellena cada campo del formulario con data de prueba y genera un alta de materia', () => {

    cy.visit(URL);

    cy.get('[data-testid="cypress-input-name" ]').type('Automated Test [CyPress]');
    cy.get('[data-testid="cypress-input-uc" ]').type('3');
    cy.get('[data-testid="cypress-input-profesor" ]').type('Test Profesor');
    cy.get('[data-testid="cypress-input-descripcion" ]').type('Test Descripcion');
    cy.get('[data-testid="cypress-input-horario" ]').type('[9am -> 10am]');
    cy.get('[data-testid="cypress-input-aula" ]').type('9');
    cy.get('[data-testid="cypress-input-prelacion" ]').type('123654,456321,124532');
    cy.get('[data-testid="cypress-input-cupomax" ]').type('21');
    cy.get('[data-testid="cypress-input-image" ]').type('https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    cy.get('[data-testid="cypress-submit"]').click();
  
  })


})