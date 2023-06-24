import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'

import LinkButton from "../link-button"

test('link-button renders correctly, reproduces correct link and text', () => {
	render(<LinkButton
		text="link button dummy text"
		to="pages/a-dummy-url"
	/>)

	const linkButton = screen.getByRole('link', {
		name: /link button dummy text/i
	  })

	expect(linkButton).toBeInTheDocument()
	expect(linkButton.textContent).toBe("link button dummy text")
	expect(linkButton).toMatchSnapshot()
})