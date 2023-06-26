import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'

import { mswServer } from "@/utils/testApis/server"
import { initial_fetchTodos_success } from "@/utils/testApis/testApiHandlers"
import TablePage from "../page"

beforeEach(() => mswServer.listen())
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())

test('after successful fetch, renders the table correctly', async () => {
	mswServer.use(initial_fetchTodos_success)

	render(
		await (async () => await TablePage())()
	)

	expect(screen.getByRole('table')).toBeInTheDocument()
})