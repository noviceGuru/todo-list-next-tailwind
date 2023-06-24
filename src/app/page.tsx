import LinkButton from "@/components/atoms/link-button"

export default function Home() {
	return (
		<>
			<title>Simple todo app</title>
			<LinkButton
				to="pages/table"
				text="Go To Table"
			/>
		</>
	)
}