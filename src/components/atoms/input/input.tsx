import { InputProps } from "@/features/types/todos"

export default function Input({ onChange, value, defaultValue, placeholder, OnEnter }: InputProps) {
	const onEnterUp = (e: React.KeyboardEvent<HTMLInputElement>) =>{
		if(e.key === 'Enter'){
			OnEnter()
		}
	}
	
	return (
		<input
			placeholder={placeholder}
			onChange={onChange}
			onKeyUp={onEnterUp}
			value={value}
			defaultValue={defaultValue}
			className="block w-full border-solid border-2 border-orange-500 rounded box-border pl-1"
			autoFocus
		/>
	)
}