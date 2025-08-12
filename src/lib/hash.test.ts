import { hashUserPassword, verifyPassword } from "./hash";

describe('Hashing Functions', () => {
  it('should return salt and hash separated by a colon', () => {
    const result = hashUserPassword('mypassword');
    const parts = result.split(':');

    expect(parts.length).toBe(2);
  });

  it('should verify the password is correct', () => {
    const storedPassword = hashUserPassword('mypassword');
    const verifyResult = verifyPassword(storedPassword, 'mypassword');
    expect(verifyResult).toBe(true);
  })

  it('should verify the password is wrong', () => {
    const storedPassword = hashUserPassword('mypassword');
    const verifyResult = verifyPassword(storedPassword, 'mypassword2');
    expect(verifyResult).toBe(false);
  })
})