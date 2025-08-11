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

  console.log("verifyPassword=======================");
  console.log("Stored hash:", hashedPasswordBuf.toString('hex'));
  console.log("Supplied hash:", suppliedPasswordBuf.toString('hex'));
  console.log("Lengths:", hashedPasswordBuf.length, suppliedPasswordBuf.length);
  console.log("EQUAL??", crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf));
  return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}