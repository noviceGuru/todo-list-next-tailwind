import LinkButton from "@/components/atoms/link-button"

export default function Home() {
	return (
		<>
			<title>Simple todo app</title>
			<main className="h-screen-dynamic grid place-items-center">
				<LinkButton
					to="pages/table"
					text="Go To the Table"
				/>
			</main>
		</>
	)
}