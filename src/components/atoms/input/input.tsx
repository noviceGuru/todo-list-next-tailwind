import { InputProps } from "@/features/types/todos"

export default function Input({ onChange, value, defaultValue, placeholder }: InputProps) {
	return (
		<input
			placeholder={placeholder}
			onChange={onChange}
			value={value}
			defaultValue={defaultValue}
		/>
	)
}