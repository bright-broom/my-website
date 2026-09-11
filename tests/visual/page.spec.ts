import { expect, test, type Page } from '@playwright/test';

const languages = ['en', 'ja'] as const;
type Language = (typeof languages)[number];

async function openPage(page: Page, language: Language, colorScheme: 'light' | 'dark') {
  await page.addInitScript((lang) => localStorage.setItem('language', lang), language);
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const html = page.locator('html');
  await expect(html).toHaveAttribute('lang', language);
  await expect(html).toHaveAttribute('data-theme', colorScheme);
}

for (const language of languages) {
  test(`full page (${language})`, async ({ page, colorScheme }) => {
    await openPage(page, language, colorScheme === 'dark' ? 'dark' : 'light');
    await expect(page).toHaveScreenshot(`page-${language}.png`, { fullPage: true });
  });

  test(`mobile menu open (${language})`, async ({ page, colorScheme, isMobile }) => {
    test.skip(!isMobile, 'The menu button only exists below the md breakpoint');

    await openPage(page, language, colorScheme === 'dark' ? 'dark' : 'light');
    await page.locator('header button[aria-expanded]').click();
    await expect(page.locator('header button[aria-expanded]')).toHaveAttribute('aria-expanded', 'true');
    await expect(page).toHaveScreenshot(`menu-${language}.png`);
  });
}
