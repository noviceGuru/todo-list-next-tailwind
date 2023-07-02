import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import '@testing-library/jest-dom'

import Table from "../table"
import { mockApiCallHandlers, testTodos } from '@/utils/testApis/testApiHandlers'
import { mswServer } from "@/utils/testApis/server"


beforeEach(() => mswServer.listen())
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())


test("Table is rendered with presumedly fetched data", () => {
	render(<Table
		initialData={testTodos.initalTodos}
	/>)

	const table = screen.getByRole("table")

	expect(table).toBeInTheDocument()
})

test('deletes a row correctly', async () => {
	mswServer.use(mockApiCallHandlers.deleteFirstRow)

	//@ts-expect-error: TypeScript doesn't consider typing of calculated objects
	mswServer.use(mockApiCallHandlers.todosAfterDeleteTodo1)

	render(<Table
		initialData={testTodos.initalTodos}
	/>)

	const table = screen.getByRole("table")
	const row1 = within(table).getByRole('row', {
		name: new RegExp(`${testTodos.initalTodos[0].task} delete edit`, "i")
	})
	const delete_button1 = within(row1).getByRole('button', {
		name: /delete/i
	})

	fireEvent.click(delete_button1)

	const newRow1 = within(table).queryByRole('row', {
		name: new RegExp(`${testTodos.initalTodos[0].task} delete edit`, "i")
	})
	await waitFor(() => expect(newRow1).not.toBeInTheDocument())
})
// test('edits a row correctly')
// test('adds a row correctly')