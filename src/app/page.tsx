import Link from "next/link";

export default function Home() {
	return (
		<>
			<title>Simple todo app</title>
			<button>
				<Link href='pages/table'>
					Go to table
				</Link>
			</button>
		</>
	)
}