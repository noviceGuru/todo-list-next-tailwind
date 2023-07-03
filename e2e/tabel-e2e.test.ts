import { test, expect } from '@playwright/test'

test('Adds a task successfully', async ({ page }) => {
	await page.goto('http://localhost:3000/pages/table')

	const addButton = page.getByRole('button', { name: /add new/i })
	await expect(addButton).toBeVisible()

	addButton.click()

	const inputTextArea = await page.getByRole('textbox')

	await expect(inputTextArea).toBeVisible()

	await inputTextArea.clear()
	await inputTextArea.fill(`world of wonder`)

	const saveButton = await page.getByRole('button', { name: /save/i })

	await expect(saveButton).toBeVisible()

	await saveButton.click()

	const cell = await page.getByRole('cell', {name: /world of wonder/i })
	
	await expect(cell).toBeVisible()
})