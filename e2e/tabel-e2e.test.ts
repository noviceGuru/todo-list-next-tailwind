import { test, expect } from '@playwright/test'
import { testTodos } from '../src/utils/testApis/testApiHandlers'

test('Adds a task successfully', async ({ page }) => {
	await page.goto('http://localhost:3000/pages/table')

	await page.route('http://localhost:3001/todos', route => {
		if (route.request().method() === 'GET') {
			return route.fulfill({
				body: JSON.stringify(testTodos.todosAfterOneRowAdded)
			})
		} else if (route.request().method() === 'POST') {
			return route.fulfill({
				body: JSON.stringify({})
			})
		}
	})

	const addButton = page.getByRole('button', { name: /add new/i })
	await expect(addButton).toBeVisible()

	addButton.click()

	const inputTextArea = await page.getByRole('textbox')

	await expect(inputTextArea).toBeVisible()

	await inputTextArea.clear()
	await inputTextArea.fill(testTodos.todosAfterOneRowAdded[2].task)

	const saveButton = await page.getByRole('button', { name: /save/i })

	await expect(saveButton).toBeVisible()

	await saveButton.click()

	const cell = await page.getByRole('cell', { name: new RegExp(testTodos.todosAfterOneRowAdded[2].task, 'i') })

	await expect(cell).toBeVisible()
})