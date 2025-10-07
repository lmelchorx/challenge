HI! to start running this testcases, open your terminal and install cypres 

npm install cypress --save-dev 

create a cypress.env.json file to save your credentials in this format:

{
  "username": 
  "password":
  "authCode":
  "baseURL": 
}



To start run the test cases you can use this commands 

    "cy:open": "cypress open" - Opens the cypress tool for running the testcases
    "cy:run": "cypress run" - run all the testcases in headless mode
    "cy:run-benefits": "cypress run --spec cypress/e2e/benefits-page.cy.js" - runs the ui testcases
    "cy:run-api" - runs all the api testcases
    "cy:run-headed": "cypress run --headed" runs all the test with the webbrowser

The bug report is included in this repo as "QA bug report"