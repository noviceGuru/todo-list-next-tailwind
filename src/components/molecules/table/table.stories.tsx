import { Meta, StoryObj } from "@storybook/react"
import Table from "./table"

const meta: Meta<typeof Table> = {
	title: 'Molecules/Table',
	component: Table,
	tags: ['table', 'autodocs'],
}

export default meta

type TableStory = StoryObj<typeof Table>

export const FilledTable: TableStory = {
	args: {
		initialData: [
			{
				id: 1,
				task: "write tests"
			},
			{
				id: 2,
				task: "make the storybook"
			}
		]
	}
}