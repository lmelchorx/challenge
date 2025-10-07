describe('API Login Tests', () => {
  const baseUrl = Cypress.env('baseURL');
  const loginEndpoint = '/Account/Login';
  const authCode = Cypress.env('authCode');
  
  const validCredentials = {
    username: Cypress.env('username'),
    password: Cypress.env('password')
  };

  const invalidCredentials = {
    username: 'invaliduser',
    password: 'wrongpassword'
  };

  describe('POST /Account/Login - Successful Login', () => {
    it('should login successfully with valid credentials', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}${loginEndpoint}`,
        headers: {
          'Authorization': authCode,
          'Content-Type': 'application/json'
        },
        body: validCredentials,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201]);
        
        expect(response.body).to.exist;
        
        if (response.body.token) {
          expect(response.body.token).to.be.a('string');
          expect(response.body.token).to.not.be.empty;
        }
        
        if (response.body.message) {
          expect(response.body.message).to.be.a('string');
        }
        
        if (response.body.user) {
          expect(response.body.user).to.be.an('object');
        }
        expect(response.headers).to.exist;
        
        cy.log('Login successful response:', response.body);
      });
    });
  });

  describe('POST /Account/Login - Error Scenarios', () => {
    it('should return error for invalid credentials', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}${loginEndpoint}`,
        headers: {
          'Authorization': authCode,
          'Content-Type': 'application/json'
        },
        body: invalidCredentials,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([400, 401, 403, 404]);
        
        expect(response.body).to.exist;
        
        if (response.body.error) {
          expect(response.body.error).to.be.a('string');
        }
        
        if (response.body.message) {
          expect(response.body.message).to.include.oneOf([
            'invalid', 'error', 'unauthorized', 'forbidden', 'not found'
          ]);
        }
        
        cy.log('Error response:', response.body);
      });
    });

    it('should return error for missing authorization header', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}${loginEndpoint}`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: validCredentials,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([401, 403]);
        expect(response.body).to.exist;
      });
    });

    it('should return error for invalid authorization code', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}${loginEndpoint}`,
        headers: {
          'Authorization': 'Basic invalid_auth_code',
          'Content-Type': 'application/json'
        },
        body: validCredentials,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([401, 403]);
        expect(response.body).to.exist;
      });
    });

    it('should return error for malformed JSON', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}${loginEndpoint}`,
        headers: {
          'Authorization': authCode,
          'Content-Type': 'application/json'
        },
        body: {
          username: 'TestUser816'
        // password field is missing
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([400, 422]);
        expect(response.body).to.exist;
      });
    });
  });

  describe('POST /Account/Login - Performance Tests', () => {
    it('should respond within acceptable time limit', () => {
      const startTime = Date.now();
      
      cy.request({
        method: 'POST',
        url: `${baseUrl}${loginEndpoint}`,
        headers: {
          'Authorization': authCode,
          'Content-Type': 'application/json'
        },
        body: validCredentials,
        timeout: 10000,
        failOnStatusCode: false
      }).then((response) => {
        const responseTime = Date.now() - startTime;
        

        expect(responseTime).to.be.lessThan(5000); 
        
        cy.log(`Response time: ${responseTime}ms`);
        expect(response.status).to.exist;
        expect(response.body).to.exist;
      });
    });

    it('should handle concurrent requests', () => {
      const requests = [];
      
      for (let i = 0; i < 3; i++) {
        requests.push(
          cy.request({
            method: 'POST',
            url: `${baseUrl}${loginEndpoint}`,
            headers: {
              'Authorization': authCode,
              'Content-Type': 'application/json'
            },
            body: validCredentials,
            failOnStatusCode: false
          })
        );
      }
      cy.wrap(Promise.all(requests)).then((responses) => {
        responses.forEach((response) => {
          expect(response.status).to.exist;
          expect(response.body).to.exist;
        });
      });
    });
  });

  describe('Data Validation Tests', () => {
    it('should handle SQL injection attempts', () => {
      const sqlInjectionPayload = {
        username: "admin' OR '1'='1",
        password: "anything' OR 'x'='x"
      };
      
      cy.request({
        method: 'POST',
        url: `${baseUrl}${loginEndpoint}`,
        headers: {
          'Authorization': authCode,
          'Content-Type': 'application/json'
        },
        body: sqlInjectionPayload,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([400, 401, 403]);
      });
    });
  });
});