import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'

import LoadingSpinner from "./loading-spinner"

test('With no type, will have "animate-ping" class', () => {
	render(<LoadingSpinner />)
	const spinner = screen.getByText(/loading.../i)
	expect(spinner).toHaveClass('animate-ping')
	expect(spinner).toMatchSnapshot()
})

test('If passed a "pulse" type, will have "animate-pulse" class', () => {
	render(
		<LoadingSpinner
			type="pulse" />
	)
	const spinner = screen.getByText(/loading.../i)
	expect(spinner).toHaveClass('animate-pulse')
	expect(spinner).toMatchSnapshot()
})