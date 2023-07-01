import { fireEvent, render, screen, within } from "@testing-library/react"
import '@testing-library/jest-dom'
import Table from "../table"

import { testTodos } from '@/utils/testApis/testApiHandlers'


test('by clicking edit, cell becomes an input, save and discard buttons appear in the row, and delete and edit buttons disappear', () => {
	render(<Table
		initialData={testTodos.initalTodos}
	/>)

	const table = screen.getByRole('table')
	const row1 = within(table).getByRole('row', {
		name: 'write tests Delete Edit'
	})

	const delete_button_1 = within(row1).getByRole('button', {
		name: /Delete/i
	})
	
	const edit_button_1 = within(row1).getByRole('button', {
		name: /edit/i
	})

	const textCell = within(row1).getByRole('cell', {
		name: /write tests/i
	})

	const cellTextContent = within(textCell).getByText(/write tests/i)

	fireEvent.click(edit_button_1)

	const input1 = within(row1).getByRole('textbox')

	const discard_button1 = within(row1).getByRole('button', {
		name: /discard/i
	})

	const save_button1 = within(row1).getByRole('button', {
		name: /save/i
	})

	expect(row1).toContainElement(input1)
	expect(row1).toContainElement(discard_button1)
	expect(row1).toContainElement(save_button1)

	expect(row1).not.toContainEqual(cellTextContent)
	expect(row1).not.toContainEqual(edit_button_1)
	expect(row1).not.toContainEqual(delete_button_1)
})

test('by clicking edit, the other row does not change', () => {
	render(<Table
		initialData={testTodos.initalTodos}
	/>)

	const table = screen.getByRole('table')
	const row1 = within(table).getByRole('row', {
		name: 'write tests Delete Edit'
	})

	const edit_button_1 = within(row1).getByRole('button', {
		name: /edit/i
	})

	fireEvent.click(edit_button_1)

	const row2 = screen.getByRole('row', {
		name: /make the storybook delete edit/i
	})

	const textCell = within(row2).getByRole('cell', {
		name: /make the storybook/i
	})

	const edit_button_2 = within(row2).getByRole('button', {
		name: /edit/i
	})
	
	const delete_button_2 = within(row2).getByRole('button', {
		name: /delete/i
	})

	const input2 = within(row2).queryByRole('textbox')

	const discard_button2 = within(row2).queryByRole('button', {
		name: /discard/i
	})

	const save_button2 = within(row2).queryByRole('button', {
		name: /save/i
	})

	expect(row2).toContainElement(textCell)
	expect(row2).toContainElement(edit_button_2)
	expect(row2).toContainElement(delete_button_2)

	expect(row2).not.toContainEqual(input2)
	expect(row2).not.toContainEqual(discard_button2)
	expect(row2).not.toContainEqual(save_button2)
})