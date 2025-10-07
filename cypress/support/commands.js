// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// ...existing code...
Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login?ReturnUrl=%2FProd%2F');
  cy.get('input[type="text"], input[type="email"], input[name="username"], #username')
    .first()
    .type(username);
  cy.get('input[type="password"], input[name="password"], #password')
    .first()
    .type(password);
  cy.get('button[type="submit"], input[type="submit"], .login-btn, #login')
    .first()
    .click();
});
// ...existing code...