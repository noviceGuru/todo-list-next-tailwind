import { render, screen, within } from "@testing-library/react"
import '@testing-library/jest-dom'

import { mswServer } from "@/utils/testApis/server"
import { fetchTodos_fail, initalTodos, initial_fetchTodos_success } from "@/utils/testApis/testApiHandlers"
import TablePage from "../page"

beforeEach(() => mswServer.listen())
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())

test('after successful fetch, renders the table correctly', async () => {
	mswServer.use(initial_fetchTodos_success)

	render(
		await (async () => await TablePage())()
	)
	
	const pageTable = screen.getByRole('table')
	
	const cell1 = within(pageTable).getByRole('cell', {
		name: initalTodos[0].task
	})
	const cell1TextSpan = within(cell1).getByText(initalTodos[0].task)
	
	const cell2 = within(pageTable).getByRole('cell', {
		name: initalTodos[1].task
	})
	const cell2TextSpan = within(cell2).getByText(initalTodos[1].task)
	
	expect(pageTable).toBeInTheDocument()
	expect(cell1TextSpan.innerHTML).toBe(initalTodos[0].task)
	expect(cell2TextSpan.innerHTML).toBe(initalTodos[1].task)
})

test('after failed fetch, doesn\'t render empty table and renders the error element', async () => {
	mswServer.use(fetchTodos_fail)

	render(
		await (async () => await TablePage())()
	)

	const pageTable = screen.queryByRole('table')
	const failedNote = screen.getByRole('heading', {
		name: /failed to get the data/i
	  })

	expect(pageTable).not.toBeInTheDocument()
	expect(failedNote).toBeInTheDocument()
})