export type Todo = {
	id: string | number
	task: string
}

export type Id = number | string

export type InputProps = {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	value?: string
	defaultValue?: string
	placeholder?: string
}

export type ButtonProps = {
	type: "delete" | "add" | "save" | "discard" | "edit"
	onClick?: () => void
	disabled?: boolean
}

export type PostAndPutResponse = {
	response : Todo
	isOk: boolean
}