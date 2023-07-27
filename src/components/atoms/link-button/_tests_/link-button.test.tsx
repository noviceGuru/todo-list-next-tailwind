import { render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'

import LinkButton from "../link-button"

test('link-button renders correctly, reproduces correct link and text', async () => {
	render(<LinkButton
		text="link button dummy text"
		to="pages/a-dummy-url"
	/>)

	const linkButton = await waitFor(() => screen.getByRole('link', {
		name: /link button dummy text/i
	})
	)

	expect(linkButton).toBeInTheDocument()
	expect(linkButton.textContent).toBe("link button dummy text")
	expect(linkButton).toMatchSnapshot()
})