describe('Signup, Signout and Login flow', () => {
  it('signup, signout and login successfully', () => {
    const email = `test-${Date.now()}@example.com`;
    const password = 'password123';
    const username = 'testuser';

    cy.visit('http://localhost:3000/signup');
    cy.task('resetDB');

    // Signup
    cy.get('[data-testid="submit-form"]').should('exist');

    cy.findAllByLabelText(/password/i).type(password);
    cy.findAllByLabelText(/email/i).type(email);
    cy.findAllByLabelText(/user name/i).type(username);
    cy.get('[data-testid="submit-form"]').submit();
    cy.url().should('include', '/quizz');

    // Signout
    cy.visit('http://localhost:3000/signout');
    cy.findByTestId('signout-button-test').click();
    cy.url().should('include', '/');

    // Login
    cy.get('[data-testid="login-form"]').should('exist');

    cy.findAllByLabelText(/email/i).type(email);
    cy.findAllByLabelText(/password/i).type(password);
    cy.get('[data-testid="login-form"]').submit();
    cy.url().should('include', '/quizz');

    cy.task('resetDB');
  });
});