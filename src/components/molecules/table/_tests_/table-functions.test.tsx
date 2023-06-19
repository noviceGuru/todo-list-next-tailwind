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

test('by clicking edit, cell becomes an input', () => {
	render(<Table
		initialData={initialData}
	/>)

	const table = screen.getByRole('table')
	const row1 = within(table).getByRole('row', {
		name: 'write tests Delete Edit'
	})
	const button_edit1 = within(row1).getByRole('button', {
		name: /edit/i
	})

	fireEvent.click(button_edit1)
	const input1 = within(row1).getByRole('textbox')

	expect(row1).toContainElement(input1)
})