import { expect, test } from '@playwright/test';

test.describe('site behavior @behavior', () => {
  test('invalid saved preferences fall back to English and the system theme', async ({ page, colorScheme }) => {
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'invalid');
      localStorage.setItem('language', 'invalid');
    });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme === 'dark' ? 'dark' : 'light');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Toshiki Sakuta');
  });

  test('language and theme switches persist across reloads', async ({ page, isMobile, colorScheme }) => {
    await page.goto('/');
    const controls = page.locator(isMobile ? 'header .md\\:hidden' : 'header nav.md\\:flex');
    await controls.getByRole('button', { name: '日本語', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('作田 敏希');
    await controls.getByRole('button', { name: 'カラーテーマを切り替える' }).click();
    const expectedTheme = colorScheme === 'dark' ? 'light' : 'dark';
    await expect(page.locator('html')).toHaveAttribute('data-theme', expectedTheme);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
    await expect(page.locator('html')).toHaveAttribute('data-theme', expectedTheme);
    await controls.getByRole('button', { name: 'English', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('labels, search exclusion, and layout survive the migration', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.headers()['x-robots-tag']).toContain('noindex');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 2 })).toHaveCount(3);
    await page.getByLabel('Name', { exact: true }).fill('Test');
    await page.getByLabel('Message', { exact: true }).fill('Draft');
    await expect(page.getByLabel('Email', { exact: true })).toHaveAttribute('type', 'email');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    for (const link of await page.locator('a[target="_blank"]').all()) {
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  test('mobile navigation closes after choosing a section', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile navigation only');
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Toggle menu', exact: true });
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.locator('header nav').getByRole('link', { name: 'About', exact: true }).last().click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page).toHaveURL(/#about$/);
  });

  test('blocked storage still allows language and theme controls', async ({ page, isMobile }) => {
    await page.addInitScript(() => {
      Storage.prototype.getItem = () => {
        throw new Error('Storage unavailable');
      };
      Storage.prototype.setItem = () => {
        throw new Error('Storage unavailable');
      };
    });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');
    const controls = page.locator(isMobile ? 'header .md\\:hidden' : 'header nav.md\\:flex');
    await controls.getByRole('button', { name: '日本語', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
    await controls.getByRole('button', { name: 'カラーテーマを切り替える' }).click();
    // The existing boot script defaults to light if storage is unavailable.
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    expect(errors).toEqual([]);
  });
});
