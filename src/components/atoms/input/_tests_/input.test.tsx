import { render, screen } from "@testing-library/react"

import Input from "../input"

it('renders Input with the correct text and looks', () => {
	render(<Input
		onChange={()=>{}}
		defaultValue="default dummy text for input"
	/>)
	
	const input = screen.getByRole('textbox')

	expect((input as HTMLInputElement).value).toBe("default dummy text for input")
	expect(input).toMatchSnapshot()
})