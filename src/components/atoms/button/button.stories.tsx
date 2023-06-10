import { Meta, StoryObj } from "@storybook/react"
import Button from "./button"

const meta: Meta<typeof Button> = {
	title: 'Atoms/Button',
	component: Button,
	tags: ['button', 'autodocs'],
	argTypes: {
		type: {
			type: "string",
		}
	},
}

export default meta

type Story = StoryObj<typeof Button>

/**
 * Button to add a new todo
 */
export const Add: Story = {
	args: {
		type: "add",
		disabled: false
	}
}

/**
 * Button to edit a todo
 */
export const Edit: Story = {
	args: {
		type: "edit",
		disabled: false
	}
}

/**
 * Button to save a todo
 */
export const Save: Story = {
	args: {
		type: "save",
		disabled: false
	}
}

/**
 * Button to discard an eiditing todo
 */
export const Discard: Story = {
	args: {
		type: "discard",
		disabled: false
	}
}

/**
 * Button to delete a todo
 */

export const Delete: Story = {
	args: {
		type: "delete",
		onClick: () => console.log('Amin')
	}
}