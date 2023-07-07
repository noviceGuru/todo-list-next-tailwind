import { Meta, StoryObj } from "@storybook/react"
import LinkButton from "./link-button"

const meta: Meta<typeof LinkButton> = {
	title: 'Atoms/LinkButton',
	component: LinkButton,
	tags: ['LinkButton', 'autodocs'],
	args: {
		text: "string",
		to: "string"
	}
}

export default meta

type LinkButtonStory = StoryObj<typeof LinkButton>

/**
 * Standard Link Button
 */

export const StandardLinkButton: LinkButtonStory = {
	args: {
		text: "Standard Link",
		to: '/'
	}
}