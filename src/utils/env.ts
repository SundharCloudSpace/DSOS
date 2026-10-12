import * as dotenv from 'dotenv';

dotenv.config();

/** Reads a required environment variable or fails fast with a clear message. */
export function getEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${name}. Check your .env file.`);
  }
  return value;
}

export const env = {
  baseUrl: () => getEnv('BASE_URL'),
  loginPath: () => getEnv('LOGIN_PATH', '/ie/login'),
  userEmail: () => getEnv('USER_EMAIL'),
  userPassword: () => getEnv('USER_PASSWORD'),
};
