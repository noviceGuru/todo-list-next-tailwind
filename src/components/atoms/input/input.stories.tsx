import { Meta, StoryObj } from "@storybook/react"
import Input from './input'

const meta: Meta<typeof Input> = {
	title: 'Atoms/Input',
	component: Input,
	tags: ['input', 'autodocs'],
	args: {
		value: "string",
		placeholder: "string"
	}
}

export default meta

type InputStory = StoryObj<typeof Input>

/**
 * Standard Cell
 */

export const InputStandard: InputStory = {
	args: {
		value: "Edit me",
		placeholder: "Placeholder"
	}
}