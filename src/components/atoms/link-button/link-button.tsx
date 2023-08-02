import Link from "next/link"

export default function LinkButton(
	{ to, text, className }:
		{ to: string, text: string, className?: string }) {
	return <button className={`${className ? className : ""} bg-blue-300 p-2 rounded-lg`}>
		<Link href={to}>
			{text}
		</Link>
	</button>
}