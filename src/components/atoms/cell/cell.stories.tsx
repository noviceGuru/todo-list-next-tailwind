import { Meta, StoryObj } from "@storybook/react"
import Cell from "./cell"

const meta: Meta<typeof Cell> = {
	title: 'Atoms/Cell',
	component: Cell,
	tags: ['button', 'autodocs'],
	argTypes: {
		text: {
			text: "string",
		}
	},
}

export default meta

type CellStory = StoryObj<typeof Cell>

/**
 * A table cell
 */

export const CellStandard : CellStory = {
	args: {
		text: 'A generic table cell'
	}
}