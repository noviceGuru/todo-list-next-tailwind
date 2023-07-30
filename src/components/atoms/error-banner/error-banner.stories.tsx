import { Meta, StoryObj } from "@storybook/react"
import ErrorBanner from './error-banner'

const meta: Meta<typeof ErrorBanner> = {
	title: 'Atoms/ErrorBanner',
	component: ErrorBanner,
	tags: ['error-banner', 'autodocs']
}

export default meta

type ErrorBannerStory = StoryObj<typeof ErrorBanner>

/* 
 * Error Banner when the table doesn't load initailly 
 */

export const TableErrorBanner: ErrorBannerStory = {
	args: {
		size: "big",
		text: "Table didn't load",
	}
}

/* 
 * Error Banner when the table doesn't load initailly 
 */

export const TableOperationErrorBanner: ErrorBannerStory = {
	args: {
		size: "medium",
		text: "Ups! It didn't go. Please try again",
	}
}