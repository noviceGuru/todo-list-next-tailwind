export default function Cell({text} : {text: string}) {
	return (
		<span className="truncate block">
			{text}
		</span>
	)
}