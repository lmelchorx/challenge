describe('Benefits Page Tests', () => {
  const baseUrl = Cypress.env('baseURL');
  const username = Cypress.env('username');
  const password = Cypress.env('password');

  describe('Authentication and User Session', () => {
    it('should allow user login with valid credentials', () => {
      cy.visit(baseUrl);
      cy.get('input[id="Username"]')
        .first()
        .should('be.visible')
        .type(username);
      cy.get('input[id="Password"]')
        .first()
        .should('be.visible')
        .type(password);
      cy.get('button[type="submit"]')
        .first()
        .should('be.visible')
        .click();
      cy.url().should('not.include', '/LogIn');
    });

    it('should log out succesfully', () => {
      cy.login(username, password);
      cy.get('a[href="/Prod/Account/LogOut"]').click();
      cy.url().should('include', '/LogIn');
    });
  });

  describe('Benefits Page Functionality', () => {
    it('Should be able to add an employee', () => {
      cy.login(username, password);
      cy.get('#add').click();
      cy.get('input[name="firstName"]').type('Mark');
      cy.get('input[name="lastName"]').type('Smith');
      cy.get('#dependants').type('2');
      cy.get('#addEmployee').click();
      cy.get('td').contains('Mark').should('exist');
    });

    it('Should be able to update and validate net pay info', () => {
      cy.login(username, password);
      cy.contains('tr', 'Mark').find('i.fas.fa-edit').click();
      cy.get('input[name="firstName"]').clear().type('Marcus');
      cy.get('input[name="lastName"]').clear().type('Smithson');
      cy.get('#dependants').clear().type('3');
      cy.get('#updateEmployee').click();
      cy.get('td').contains('Marcus').should('exist');
      cy.get
    });
    it('Should be able to delete employee info', () => {
      cy.login(username, password);
      cy.contains('tr', 'Marcus').find('i.fas.fa-times').click();
      cy.get('#deleteEmployee').click();
      cy.get('td').contains('Marcus').should('not.exist');
      cy.get('a[href="/Prod/Account/LogOut"]').click();
      cy.url().should('include', '/LogIn');
    });
  });
});