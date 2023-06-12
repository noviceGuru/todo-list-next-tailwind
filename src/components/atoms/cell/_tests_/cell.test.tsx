import { render, screen } from '@testing-library/react'

import Cell from '../cell'

it('renders cell with the correct text and looks', () => {
	render(
		<Cell
		text='cell fake text'
		/>)

	const cell = screen.getByText("cell fake text")
	
	expect(cell.textContent).toBe('cell fake text')
	expect(cell).toMatchSnapshot()
})