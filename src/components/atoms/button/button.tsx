import Image from "next/image"
import { ButtonProps } from "@/features/types/todos"
import EditIcon from '@/assets/icons/edit-icon.svg'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
import SaveIcon from '@/assets/icons/save-icon.svg'
import DiscardIcon from '@/assets/icons/discard-icon.svg'
import AddIcon from '@/assets/icons/add-icon.svg'

export default function Button({ type, onClick, disabled }: ButtonProps) {
	const buttonText = {
		add: AddIcon,
		delete: DeleteIcon,
		save: SaveIcon,
		discard: DiscardIcon,
		edit: EditIcon
	}

	return (
		<button
			type="button"
			onClick={onClick}
			className={`p-2 rounded-full w-10 h-10 disabled:opacity-50 disabled:cursor-not-allowed
			 ${type === 'delete' ? `bg-red-400 border-red-400 hover:bg-red-600` :
					`bg-blue-300 hover:bg-blue-400`}`}
			disabled={disabled}
		>
			<Image
				className="w-full"
				src={buttonText[type]}
				alt={`${type}-button`}
			/>
		</button>
	)
}