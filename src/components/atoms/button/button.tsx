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
			className="border-2 border-indigo-300 bg-indigo-300 rounded-md m-1"
		>
			{buttonText[type]}
		</button>
	)
}