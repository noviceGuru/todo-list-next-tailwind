import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Button from "../button"

import { ButtonTypes } from '@/features/types/todos'

const buttonsTypesAndExpectedTexts: ButtonTypes[] = ['add', 'delete', 'save', 'discard', 'edit']

buttonsTypesAndExpectedTexts.forEach(type => {
	it('renders the add button with the correct name and looks', () => {
		render(
			<Button
				type={type}
			/>)
		const button = screen.getByTestId(`button-${type}`)

		expect(button).toBeInTheDocument()
		expect(button).toMatchSnapshot()
	})
})