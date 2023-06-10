import { ButtonProps } from "@/features/types/todos"

export default function Button({ type, onClick, disabled }: ButtonProps ) {
	const buttonText = {
		add: "Add new",
		delete: "Delete",
		save: "Save",
		discard: "Discard",
		edit: "Edit"
	}

	return (
		<button
			type="button"
			onClick={onClick}
			className={`border-2 rounded-md m-1 ${type==='delete'?  `bg-red-600 border-red-300` : `border-indigo-300 bg-indigo-300`}`}
			disabled={disabled}
		>
			{buttonText[type]}
		</button>
	)
}