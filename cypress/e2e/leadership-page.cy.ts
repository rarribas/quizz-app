describe('Questions workflow', () => {
    
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

    // Question 1
    cy.get('[data-testid^="answer-block-"]').first().click();
    cy.get('[data-testid="test-next-button"]').click();

    // Question 2
    cy.get('[data-testid^="answer-block-"]').first().click();
    cy.get('[data-testid="test-next-button"]').click();

 
    // Question 3
    cy.get('[data-testid^="answer-block-"]').first().click();
    cy.get('[data-testid="test-next-button"]').click();

    // Question 4
    cy.get('[data-testid^="answer-block-"]').first().click();
    cy.get('[data-testid="test-next-button"]').click();

    // Question 5
    cy.get('[data-testid^="answer-block-"]').first().click();
    cy.get('[data-testid="test-next-button"]').click();

    // Question 6
    cy.get('[data-testid^="answer-block-"]').first().click();
    cy.get('[data-testid="test-next-button"]').click();

    // Question 7
    cy.get('[data-testid^="answer-block-"]').first().click();
    cy.get('[data-testid="test-next-button"]').click();

    // Question 8
    cy.get('[data-testid^="answer-block-"]').first().click();
    cy.get('[data-testid="test-next-button"]').click();

    // Question 9
    cy.get('[data-testid^="answer-block-"]').first().click();
    cy.get('[data-testid="test-next-button"]').click();

    // Question 10
    cy.get('[data-testid^="answer-block-"]').first().click();
    cy.get('[data-testid="test-next-button"]').click();
    cy.url().should('include', '/quizz/completed');

    cy.get('[data-testid="view-leaderboard-link"]').click();

    cy.get('header p').contains('Ranking #1');
    cy.get('[data-testid^="panel-test-"]').should('have.length', 1);

    cy.get('[data-testid="play-again-test"]').click();
    cy.url().should('include', '/quizz');
    
    cy.task('resetDB');
  });
})