// Tell TypeScript that jest Matchers include jest-dom matchers
/// <reference types="@testing-library/jest-dom" />

declare global {
  namespace jest {
    // augment the existing Matchers interface
    interface Matchers<R> {
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeVisible(): R;
      toHaveTextContent(expected: string | RegExp): R;
      // add other matchers you need
    }
  }
}
