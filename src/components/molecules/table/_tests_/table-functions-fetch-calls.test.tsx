import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react"
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

// SUCCESSFUL OPERATIONS

test('deletes a row correctly', () => {
	mswServer.use(mockApiCallHandlers.deleteFirstRow)

	//@ts-expect-error: TypeScript doesn't consider typing of calculated objects
	mswServer.use(mockApiCallHandlers.todosAfterDeleteTodo1)

	render(<Table
		initialData={testTodos.initalTodos}
	/>)

	const table = screen.getByRole("table")
	const row1 = within(table).getByRole('row', {
		name: new RegExp(`${testTodos.initalTodos[0].task} delete\-button edit\-button`, "i")
	})
	const delete_button1 = within(row1).getByRole('button', {
		name: /delete\-button/i
	})

	act(()=>fireEvent.click(delete_button1))
	const newRow1 = within(table).queryByRole('row', {
		name: new RegExp(`${testTodos.initalTodos[0].task} delete edit`, "i")
	})

	// Spinner appears successfully
	const loadingSpinner = within(table).queryByText('Loading...')
	waitFor(() => expect(loadingSpinner).toBeInTheDocument())

	waitFor(() => expect(newRow1).not.toBeInTheDocument())
})

test('edits a row correctly', async () => {
	mswServer.use(mockApiCallHandlers.putFirstRow)

	//@ts-expect-error: TypeScript doesn't consider typing of calculated objects
	mswServer.use(mockApiCallHandlers.todosAfterModifiedRow1)

	render(<Table
		initialData={testTodos.initalTodos}
	/>)

	const table = screen.getByRole("table")
	const row1 = within(table).getByRole('row', {
		name: new RegExp(`${testTodos.initalTodos[0].task} delete\-button edit\-button`, "i")
	})

	const edit1 = within(row1).getByRole('button', {
		name: /edit/i
	})
	fireEvent.click(edit1)
	const input1 = within(row1).getByRole('textbox')
	fireEvent.change(input1, {target : {value: testTodos.todosAfterModifiedRow1[0].task}})

	// input works
	expect(input1).toHaveValue(testTodos.todosAfterModifiedRow1[0].task)

	
	const save_button1 = within(row1).getByRole('button', {
		name : /save\-button/i
	})
	fireEvent.click(save_button1)
	const cell1 = within(row1).findByRole('cell', {
		name: new RegExp(testTodos.todosAfterModifiedRow1[0].task)
	})

	// Spinner appears successfully
	const loadingSpinner = within(table).queryByText('Loading...')
	waitFor(() => expect(loadingSpinner).toBeInTheDocument())

	//edits successfully
	waitFor(() => expect(cell1).toBeInTheDocument())
})

test('adds a row correctly', () => {
	mswServer.use(mockApiCallHandlers.addARow)

	//@ts-expect-error: TypeScript doesn't consider typing of calculated objects
	mswServer.use(mockApiCallHandlers.todosAfterOneRowAdded)

	render(<Table
		initialData={testTodos.initalTodos}
	/>)

	const table = screen.getByRole("table")
	const addNewButton = within(table).getByRole('button', { name: /add\-button/i })
	fireEvent.click(addNewButton)

	const addedRow = within(table).getByRole('row', {  name: /discard\-button save\-button/i})

	// New row is rendered
	expect(addedRow).toBeInTheDocument()

	const addedInput = within(addedRow).getByRole('textbox')
	fireEvent.change(addedInput, { target: { value: testTodos.todosAfterOneRowAdded[2].task } })

	// Input works
	expect(addedInput).toHaveValue(testTodos.todosAfterOneRowAdded[2].task)

	const added_discard_button = within(addedRow).getByRole('button', {
		name: /discard/i
	})
	const added_save_button = within(addedRow).getByRole('button', {
		name: /save/i
	})
	fireEvent.click(added_save_button)

	const addedCell = within(addedRow).getByRole('cell', {
		name: new RegExp(testTodos.todosAfterOneRowAdded[2].task, 'i')
	})
	const added_delete_button = within(addedRow).queryByRole('button', {
		name: /delete/i
	})
	const added_edit_button = within(addedRow).queryByRole('button', {
		name: /edit/i
	})

	// Spinner appears successfully
	const loadingSpinner = within(table).queryByText('Loading...')
	waitFor(() => expect(loadingSpinner).toBeInTheDocument())

	waitFor(() => {
		expect(addedCell).toHaveTextContent(testTodos.todosAfterOneRowAdded[2].task)
		expect(added_save_button).not.toBeInTheDocument()
		expect(added_discard_button).not.toBeInTheDocument()
		expect(added_delete_button).toBeInTheDocument()
		expect(added_edit_button).toBeInTheDocument()
	})
})

// UNSUCCESSFUL OPERATIONS

test('If delete call fails, shows the fail banner, does not delete the row', () => {
	mswServer.use(mockApiCallHandlers.deleteFirstRowFail)

	render(<Table
		initialData={testTodos.initalTodos}
	/>)

	const table = screen.getByRole('table')
	const row1 = within(table).getByRole('row', {
		name: new RegExp(`${testTodos.initalTodos[0].task} delete\-button edit\-button`, "i")
	})
	const delete_button1 = within(row1).getByRole('button', {
		name: /delete/i
	})

	act(() => fireEvent.click(delete_button1))

	const failBanner = screen.getByText(/something went wrong\. try again please\./i)

	expect(failBanner).toBeInTheDocument()
	expect(row1).toBeInTheDocument()
})

test('If edit call fails, shows the fail banner, does not delete the row, stays in edit mode', () => {
	mswServer.use(mockApiCallHandlers.putFirstRowFail)
	
	render(<Table
		initialData={testTodos.initalTodos}
	/>)

	const table = screen.getByRole("table")
	const row1 = within(table).getByRole('row', {
		name: new RegExp(`${testTodos.initalTodos[0].task} delete\-button edit\-button`, "i")
	})

	const edit1 = within(row1).getByRole('button', {
		name: /edit/i
	})
	fireEvent.click(edit1)
	const input1 = within(row1).getByRole('textbox')
	fireEvent.change(input1, { target: { value: testTodos.todosAfterModifiedRow1[0].task } })

	const save_button1 = within(row1).getByRole('button', {
		name: /save/i
	})
	
	fireEvent.click(save_button1)

	const failBanner = screen.getByText(/something went wrong\. try again please\./i)
	
	expect(failBanner).toBeInTheDocument()
	expect(input1).toHaveValue(testTodos.todosAfterModifiedRow1[0].task)
})

test('If Add call fails, shows the fail banner, does not delete the row, stays in edit mode', () => {
	mswServer.use(mockApiCallHandlers.addARowFail)
	render(<Table
		initialData={testTodos.initalTodos}
	/>)

	const table = screen.getByRole("table")
	const addNewButton = within(table).getByRole('button', { name: /add\-button/i })
	fireEvent.click(addNewButton)

	const addedRow = within(table).getByRole('row', { name: /discard\-button save\-button/i })

	const addedInput = within(addedRow).getByRole('textbox')
	fireEvent.change(addedInput, { target: { value: testTodos.todosAfterOneRowAdded[2].task } })

	const added_save_button = within(addedRow).getByRole('button', {
		name: /save/i
	})
	
	fireEvent.click(added_save_button)

	const failBanner = screen.getByText(/something went wrong\. try again please\./i)
	
	expect(failBanner).toBeInTheDocument()
	expect(addedInput).toHaveValue(testTodos.todosAfterOneRowAdded[2].task)
})