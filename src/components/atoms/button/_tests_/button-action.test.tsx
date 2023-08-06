import { fireEvent, render, screen } from '@testing-library/react'

import Button from '../button'

it('onClick performs correctly the dummy function passed to the button', () => {
	const logSpy = jest.spyOn(global.console, 'log')
	
	render(<Button
		type='add'
		onClick={() => console.log('The button is logging the onclick function')}
	/>)

	const button = screen.getByTestId('button-add')
	fireEvent.click(button)

	expect(logSpy).toHaveBeenCalledWith('The button is logging the onclick function')
})