import { render, screen, within, cleanup } from "@testing-library/react/pure"
import '@testing-library/jest-dom'
import Table from "../table"

render(<Table
	initialData={[
		{
			"id": 1,
			"task": "write tests"
		},
		{
			"id": 2,
			"task": "make the storybook"
		}
	]}
/>)

it('the table renders row correctly with the data and correct looks', () => {
	const table = screen.getByRole('table')

	expect(table).toBeInTheDocument()
	expect(table).toMatchSnapshot()
})

it('renders initial buttons (delete and edit) correctly', () => {

	const table = screen.getByRole('table')
	const row1 = within(table).getByRole('row', {
		name: 'write tests Delete Edit'
	})

	const button_delete1 = within(row1).getByRole('button', {
		name: /delete/i
	})

	const button_edit1 = within(row1).getByRole('button', {
		name: /edit/i
	})

	expect(button_delete1).toBeInTheDocument()
	expect(button_edit1).toBeInTheDocument()

	
	const row2 = within(table).getByRole('row', {
		name: 'write tests Delete Edit'
	})

	const button_delete2 = within(row2).getByRole('button', {
		name: /delete/i
	})

	const button_edit2 = within(row2).getByRole('button', {
		name: /edit/i
	})

	expect(button_delete2).toBeInTheDocument()
	expect(button_edit2).toBeInTheDocument()
	cleanup()
})
