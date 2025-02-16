let URL = 'http://localhost:5173/create';

describe('template spec', () => {
  it('Revisa que la pagina de crear materia ( /create ) sea accesible', () => {
    cy.visit(URL)
  })
})