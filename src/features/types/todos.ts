export type Todo = {
	id: string | number
	task: string
}

export type Id = number | string

export type Task = {
	task: string
}

export type InputProps = {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	value?: string
	defaultValue?: string
	placeholder?: string
}

export type ButtonTypes = "delete" | "add" | "save" | "discard" | "edit"

export type ButtonProps = {
	type: ButtonTypes
	onClick?: () => void
	disabled?: boolean
	testId?: string
}

export type PostAndPutResponse = {
	response: Todo
	isOk: boolean
}