import { test, expect } from '@playwright/test'

const BASE_ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL as string

test('Root to have the right title', async ({ page }) => {
	await page.goto(BASE_ROOT_URL)
	await expect(page).toHaveTitle('Simple todo app')
})

test('Clicking on the button, takes to the table\'s page', async ({ page }) => {
	await page.goto(BASE_ROOT_URL)
	const button = page.getByRole('link', { name: /go to the table/i })
	button.click()

	await expect(page).toHaveURL(`${BASE_ROOT_URL}pages/table`)
})