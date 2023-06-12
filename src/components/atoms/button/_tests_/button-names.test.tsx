import { render, screen } from '@testing-library/react'

import Button from "../button"

import { ButtonTypes } from '@/features/types/todos'

const buttonsTypesAndExpectedTexts: { type: ButtonTypes, text: string }[] = [
	{
		type: 'add',
		text: 'Add new'
	},
	{
		type: 'delete',
		text: 'Delete'
	},
	{
		type: 'save',
		text: 'Save'
	},
	{
		type: 'discard',
		text: 'Discard'
	},
	{
		type: 'edit',
		text: 'Edit'
	}
]

buttonsTypesAndExpectedTexts.forEach(typeAndName => {
	it('renders the add button with the correct name and looks', () => {
		render(
			<Button
				type={typeAndName.type}
			/>)
		const button = screen.getByRole('button')

		expect(button.textContent).toBe(typeAndName.text)
		expect(button).toMatchSnapshot()
	})
})