// Import commands.js if you have custom commands
import './commands';

// Global beforeEach hook
beforeEach(() => {
  // Handle uncaught exceptions
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    console.log('Uncaught exception:', err);
    return false;
  });
});