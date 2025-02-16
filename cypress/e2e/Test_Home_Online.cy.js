let URL = 'http://localhost:5173/';

describe('template spec', () => {
  it('Revisa que la pagina principal sea accesible', () => {
    cy.visit(URL)
  })
})