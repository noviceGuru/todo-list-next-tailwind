import { Meta, StoryObj } from "@storybook/react"
import LoadingSpinner from "./loading-spinner"

const meta : Meta<typeof LoadingSpinner> = {
	title: 'Atoms/LoadingSpinner',
	component : LoadingSpinner,
	tags: ['loading-spinner', 'autodocs'],
}

export default meta

type LoadingSpinnerStory = StoryObj<typeof LoadingSpinner>

/**
 * Standard Loading Spinner
 */

export const StandardLoadingSpinner: LoadingSpinnerStory = {}