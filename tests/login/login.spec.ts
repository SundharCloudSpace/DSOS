import { test, expect } from '../../src/fixtures/test-fixtures';
import { validUser, invalidUser } from '../../src/data/users';

test.describe('Login', () => {
  test('@smoke user can sign in with valid credentials', async ({ loginPage }) => {
    const { email, password } = validUser();

    await test.step('Given the user navigates to the login page', async () => {
      await loginPage.open();
      await loginPage.expectLoginPageLoaded();
    });

    await test.step('Then the user provides the email', async () => {
      await loginPage.enterEmail(email);
    });

    await test.step('And the user provides the password', async () => {
      await loginPage.enterPassword(password);
    });

    await test.step('And the user clicks Sign In', async () => {
      await loginPage.clickSignIn();
    });

    await test.step('Then the user is taken away from the login page', async () => {
      await loginPage.expectLoginSuccessful();
    });
  });

  test('@smoke login page shows all required elements', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.expectLoginPageLoaded();
  });

  test('user stays on login page with invalid credentials', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(invalidUser.email, invalidUser.password);
    await loginPage.expectStillOnLoginPage();
  });
});
