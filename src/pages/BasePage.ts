import { Locator, Page, expect } from '@playwright/test';

/**
 * Parent of every page object. Holds reusable, page-agnostic helpers
 * so individual pages stay small and readable.
 */
export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  async goto(path: string): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  protected async click(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
    await locator.click();
  }

  protected async fill(locator: Locator, value: string): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.fill(value);
  }

  async waitForUrlNotToContain(fragment: string, timeout = 30_000): Promise<void> {
    await this.page.waitForURL((url) => !url.pathname.includes(fragment), { timeout });
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
