describe('Category page', () => {
  
  it('display errors when submitting empty quizz config form', () => {
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

    cy.get('[data-testid="quizz-config-form"]').should('exist');

    cy.get('[data-testid="start-quizz-button"]').should('exist');
    cy.get('[data-testid="start-quizz-button"]').click();

    cy.get('[data-testid="category-error"]').should('exist').contains('Please select a category');
    cy.get('[data-testid="difficulty-error"]').should('exist').contains('Please select difficulty');
  });
  
  it('redirects to quizz after selecting quizz config', () => {
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

    // Quizz Config
    cy.get('[data-testid="quizz-config-form"]').should('exist');
    cy.get('[data-testid="category-select"]').click();
    cy.get('[data-testid="category-item-0"]').click();

    cy.get('[data-testid="difficulty-select"]').click();
    cy.get('[data-testid="difficulty-item-easy"]').click();

    cy.get('[data-testid="start-quizz-button"]').should('exist');
    cy.get('[data-testid="start-quizz-button"]').click();
    cy.url().should('include', '/quizz/start');
  });
})