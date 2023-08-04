export default function Cell({text} : {text: string}) {
	return (
		<span className="truncate block min-w-0">
			{text}
		</span>
	)
}