import { fireEvent, render, screen, within } from "@testing-library/react"
import '@testing-library/jest-dom'
import Table from "../table"

const initialData = [
	{
		"id": 1,
		"task": "write tests"
	},
	{
		"id": 2,
		"task": "make the storybook"
	}
]

test('by clicking edit, cell becomes an input, save and discard buttons appear in the row, and delete and edit buttons disappear', () => {
	render(<Table
		initialData={initialData}
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