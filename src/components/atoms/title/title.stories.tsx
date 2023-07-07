import { Meta, StoryObj } from '@storybook/react'
import Title from './title'

const meta: Meta<typeof Title> = {
	title: "Atoms/Title",
	component: Title,
	tags: ['title', 'autodocs'],
	args: {
		title: "string"
	}
}

export default meta

type TitleStory = StoryObj<typeof Title>

/**
 * Standard Table Title
 */

export const StandardTableTitle: TitleStory = {
	args: {
		title: 'Standard title'
	}
}