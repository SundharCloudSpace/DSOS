import { env } from '../utils/env';

export interface Credentials {
  email: string;
  password: string;
}

/** Valid user - values come from .env so secrets never live in source control. */
export const validUser = (): Credentials => ({
  email: env.userEmail(),
  password: env.userPassword(),
});

/** Invalid user for negative tests. */
export const invalidUser: Credentials = {
  email: 'invalid.user@example.org',
  password: 'WrongPassword@123',
};
