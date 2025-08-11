import crypto from 'node:crypto';

export function hashUserPassword(password:string):string {
  const salt = crypto.randomBytes(16).toString('hex');

  const hashedPassword = crypto.scryptSync(password, salt, 64);
  return `${salt}:${hashedPassword.toString('hex')}`;
}

export function verifyPassword(storedPassword:string, suppliedPassword:string):boolean {
  const [salt, hashedPassword] = storedPassword.split(':');
  const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
  const suppliedPasswordBuf = crypto.scryptSync(suppliedPassword, salt, 64);
  return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}