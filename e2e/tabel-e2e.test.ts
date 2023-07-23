import { test, expect } from '@playwright/test'
import { testTodos } from '../src/utils/testApis/testApiHandlers'

const BASE_ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL as string
const BASE_FETCH_URL = process.env.NEXT_PUBLIC_BASE as string

test('Adds a task successfully', async ({ page }) => {
	await page.goto(`${BASE_ROOT_URL}pages/table`)

	await page.route(BASE_FETCH_URL, route => {
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

	const addButton = await page.getByRole('button', { name: /add new/i })
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

test('Edits a task successfully', async ({ page }) => {
	await page.goto(`${BASE_ROOT_URL}/pages/table`)

	await page.route('http://localhost:3001/todos', route => {
		if (route.request().method() === 'GET') {
			return route.fulfill({
				body: JSON.stringify(testTodos.todosAfterModifiedRow1)
			})
		}
	})

	await page.route(`${BASE_FETCH_URL}/*`, route => {
		if (route.request().method() === 'PUT') {
			return route.fulfill({
				body: JSON.stringify(testTodos.todosAfterModifiedRow1)
			})
		}
	})

	const edit = await page.getByRole('table')
		.getByRole('row', { name: 'write tests' })
		.getByRole('button', { name: /edit/i })


	await edit.click()

	const save = await page.getByRole('button', {name: /save/i})
	const input = page.getByRole('textbox')
	await input.fill(testTodos.todosAfterModifiedRow1[0].task)


	await save.click()
	const cell = await page.getByRole('table')
		.getByRole('row', { name: new RegExp(testTodos.todosAfterModifiedRow1[0].task, 'i') })
		.getByRole('cell', { name: testTodos.todosAfterModifiedRow1[0].task })

	await expect(cell).toHaveText(testTodos.todosAfterModifiedRow1[0].task)
})

test('Deletes a task successfully', async ({ page }) => {
	await page.goto(`${BASE_ROOT_URL}pages/table`)

	await page.route(BASE_FETCH_URL, route => {
		if (route.request().method() === 'GET') {
			return route.fulfill({
				body: JSON.stringify(testTodos.todosAfterDeleteTodo1)
			})
		}
	})
	
	await page.route(`${BASE_FETCH_URL}/*`, route => {
		if (route.request().method() === 'DELETE') {
			return route.fulfill()
		}
	})

	const delete_button1 = await page.getByRole("button", { name: /delete/i }).first()
	await expect(await delete_button1).toBeVisible()
	
	await delete_button1.click()

	const cell1 = await page.getByRole('table')
		.filter({ hasText: testTodos.initalTodos[0].task })

	await expect(cell1).not.toBeVisible()
})