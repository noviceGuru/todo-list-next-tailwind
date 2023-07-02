import { test, expect } from '@playwright/test'

test('Root to have the right title', async ({ page }) => {
	await page.goto('http://localhost:3000/')
	await expect(page).toHaveTitle('Simple todo app')
})

test('Clicking on the button, takes to the table\'s page', async ({ page }) => {
	await page.goto('http://localhost:3000/')
	const button = page.getByRole('link', { name: /go to table/i })
	button.click()

	await expect(page).toHaveURL('http://localhost:3000/pages/table')
})