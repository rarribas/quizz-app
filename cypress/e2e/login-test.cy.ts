describe('Login page', () => {
  it('shows loading and then login page on the first visit', () => {
    cy.visit('http://localhost:3000');

    // Render loading state
    cy.get('p').contains('Loading...').should('exist');;

    // wait for the login form to appear
    cy.get('[data-testid="login-form"]').should('exist');

    cy.get('h1').contains('Welcome Back!');
  });

  it('shows proper errors if input values are empty', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="login-form"]').should('exist');

    cy.get('[data-testid="login-form"]').submit();

    cy.get('[data-testid="error-list"]').should('exist')
    cy.get('[data-testid="error-list"] li').should('have.length', 2);
    cy.get('[data-testid="error-list"] li').eq(0).contains('Please enter a valid email address');
    cy.get('[data-testid="error-list"] li').eq(1).contains('Password must be at least 8 characters long');
  });

  it('shows password error when empty password or too short', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="login-form"]').should('exist');
    cy.get('#email').type('user@example.com');
    cy.get('[data-testid="login-form"]').submit();

    cy.get('[data-testid="error-list"]').should('exist')
    cy.get('[data-testid="error-list"] li').should('have.length', 1);
    cy.get('[data-testid="error-list"] li').eq(0).contains('Password must be at least 8 characters long');

    cy.get('#password').type('12');
    cy.get('#email').type('user@example.com');
    cy.get('[data-testid="login-form"]').submit();
    cy.get('[data-testid="error-list"]').should('exist');
    cy.get('[data-testid="error-list"] li').should('have.length', 1);
    cy.get('[data-testid="error-list"] li').eq(0).contains('Password must be at least 8 characters long');
  })

  it('shows email error when wrong email', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="login-form"]').should('exist');
    cy.get('#password').type('12345678');
    cy.get('#email').type('user.com');
    cy.get('[data-testid="login-form"]').submit();

    cy.get('[data-testid="error-list"]').should('exist')
    cy.get('[data-testid="error-list"] li').should('have.length', 1);
    cy.get('[data-testid="error-list"] li').eq(0).contains('Please enter a valid email address');
  });

  it('shows error when try to login with a user that does not exist', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="login-form"]').should('exist');
    cy.get('#password').type('12345678');
    cy.get('#email').type('user@example.com');
    cy.get('[data-testid="login-form"]').submit();

    cy.get('[data-testid="error-list"]').should('exist')
    cy.get('[data-testid="error-list"] li').should('have.length', 1);
    cy.get('[data-testid="error-list"] li').eq(0).contains('Invalid email or password');
  });

  it('navigate to signup after clicked link', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="login-form"]').should('exist');
    cy.contains('Sign Up here').click();

    cy.url().should('include', '/signup');
  });

})