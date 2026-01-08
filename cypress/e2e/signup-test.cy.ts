describe('Signup page', () => {
  it('renders signup form', () => {
    cy.visit('http://localhost:3000/signup');

    // wait for the signup form to appear
    cy.get('[data-testid="submit-form"]').should('exist');

    cy.get('header h1').contains('Join The Quizz!');
  });

  it('shows proper errors if input values are empty', () => {
    cy.visit('http://localhost:3000/signup');

    cy.get('[data-testid="submit-form"]').should('exist');
    cy.get('[data-testid="submit-form"]').submit();

    cy.get('[data-testid="error-list"]').should('exist')
    cy.get('[data-testid="error-list"] li').should('have.length', 3);
    cy.get('[data-testid="error-list"] li')
      .eq(0)
      .contains('Please enter a valid email address');
    cy.get('[data-testid="error-list"] li')
      .eq(1)
      .contains('Password must be at least 8 characters long');
    cy.get('[data-testid="error-list"] li')
      .eq(2)
      .contains('Username is required');
  });

  it('shows password error when password is too short', () => {
    cy.visit('http://localhost:3000/signup');

    cy.get('[data-testid="submit-form"]').should('exist');

    cy.findAllByLabelText(/password/i).type('12');
    cy.get('[data-testid="submit-form"]').submit();
    cy.get('[data-testid="error-list"]').should('exist');
    cy.get('[data-testid="error-list"] li')
      .eq(1)
      .contains('Password must be at least 8 characters long');
  });

  it('signup and gets redirected to quizz', () => {
    const email = `test-${Date.now()}@example.com`;
    const password = 'password123';
    const username = 'testuser';
    cy.visit('http://localhost:3000/signup');
    cy.task('resetDB');

    cy.get('[data-testid="submit-form"]').should('exist');

    cy.findAllByLabelText(/password/i).type(password);
    cy.findAllByLabelText(/email/i).type(email);
    cy.findAllByLabelText(/user name/i).type(username);
    cy.get('[data-testid="submit-form"]').submit();
    cy.url().should('include', '/quizz');
    cy.task('resetDB');
  });
})