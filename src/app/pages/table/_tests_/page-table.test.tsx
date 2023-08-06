import { render, screen, within } from "@testing-library/react"
import '@testing-library/jest-dom'

import { mswServer } from "@/utils/testApis/server"
import { mockApiCallHandlers, testTodos } from "@/utils/testApis/testApiHandlers"
import TablePage from "../page"

beforeEach(() => mswServer.listen())
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())

test('after successful fetch, renders the table correctly', async () => {
	//@ts-expect-error: TypeScript doesn't consider typing of calculated objects
	mswServer.use(mockApiCallHandlers.initalTodos)

	render(
		await (async () => await TablePage())()
	)
	
	const pageTable = screen.getByRole('table')
	
	const cell1 = within(pageTable).getByRole('cell', {
		name: testTodos.initalTodos[0].task
	})
	const cell1TextSpan = within(cell1).getByText(testTodos.initalTodos[0].task)
	
	const cell2 = within(pageTable).getByRole('cell', {
		name: testTodos.initalTodos[1].task
	})
	const cell2TextSpan = within(cell2).getByText(testTodos.initalTodos[1].task)
	
	expect(pageTable).toBeInTheDocument()
	expect(cell1TextSpan.innerHTML).toBe(testTodos.initalTodos[0].task)
	expect(cell2TextSpan.innerHTML).toBe(testTodos.initalTodos[1].task)
})

test('after failed fetch, doesn\'t render empty table and renders the error element', async () => {
	//@ts-expect-error: TypeScript doesn't consider typing of calculated objects
	mswServer.use(mockApiCallHandlers.fail_initialTodos)

	render(
		await (async () => await TablePage())()
	)

	const pageTable = screen.queryByRole('table')
	const failedNote = screen.getByText(/failed to get the data/i)

	expect(pageTable).not.toBeInTheDocument()
	expect(failedNote).toBeInTheDocument()
})