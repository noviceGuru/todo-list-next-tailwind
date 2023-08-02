import { InputProps } from "@/features/types/todos"

export default function Input({ onChange, value, defaultValue, placeholder }: InputProps) {
	return (
		<input
			placeholder={placeholder}
			onChange={onChange}
			value={value}
			defaultValue={defaultValue}
			className="block w-full border-solid border-2 border-orange-500 rounded box-border"
		/>
	)
}