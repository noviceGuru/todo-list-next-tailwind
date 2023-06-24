import Link from "next/link"

export default function LinkButton({ to, text }: { to: string, text: string }) {
	return <button>
		<Link href={to}>
			{text}
		</Link>
	</button>
}