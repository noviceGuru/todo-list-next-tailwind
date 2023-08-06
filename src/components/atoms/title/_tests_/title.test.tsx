import { render, screen } from '@testing-library/react'

import Title from '../title'

it('renderes title correctly with the correct looks', () => {

	const tableRow = document.createElement('tr')
	render(
		<Title
			title='dummy text title to test'
		/>
		, { container: document.body.appendChild(tableRow) })
	
	const title = screen.getByRole('row')
	expect(title.textContent).toBe('dummy text title to test')
	expect(title).toMatchSnapshot()
})