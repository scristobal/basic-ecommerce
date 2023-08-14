import { expect, test } from '@playwright/test';

test('index page shows products', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('Products')).toBeVisible();
});
