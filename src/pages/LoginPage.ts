import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../utils/env';

export class LoginPage extends BasePage {
  // ---------- Locators ----------
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('button[type="submit"]', { hasText: 'Sign In' });
  }

  // ---------- Actions ----------
  /** Given: user navigates to the login URL */
  async open(): Promise<void> {
    await this.goto(env.loginPath());
  }

  async enterEmail(email: string): Promise<void> {
    await this.fill(this.emailInput, email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password);
  }

  async clickSignIn(): Promise<void> {
    await this.click(this.signInButton);
  }

  /** Convenience flow: email -> password -> Sign In */
  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  // ---------- Assertions ----------
  async expectLoginPageLoaded(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  async expectLoginSuccessful(): Promise<void> {
    await this.waitForUrlNotToContain('/login');
  }

  async expectStillOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login/);
    await expect(this.signInButton).toBeVisible();
  }
}
