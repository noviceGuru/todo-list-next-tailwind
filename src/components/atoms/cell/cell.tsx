export default function Cell({text} : {text: string}) {
	return (
		<span title={text} className="truncate block min-w-0">
			{text}
		</span>
	)
}