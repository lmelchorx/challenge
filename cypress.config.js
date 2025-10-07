const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  e2e: {
    setupNodeEvents(on, config) {
      // Load environment variables from .env file
      require('cypress-dotenv')();
      // implement node event listeners here
    },
  },
});

