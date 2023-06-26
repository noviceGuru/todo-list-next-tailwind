import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'

import Table from "../table"
import { initialData } from "./table-functions.test"
import { mswServer } from "@/utils/testApis/server"


beforeEach(() => mswServer.listen())
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())


test("Table is rendered with fetched data", () => {
	render(<Table
		initialData={initialData}
		/>)
		
		const table = screen.getByRole("table")

		expect(table).toBeInTheDocument()
})

	// test('deletes a row correctly')
	// test('edits a row correctly')
	// test('adds a row correctly')