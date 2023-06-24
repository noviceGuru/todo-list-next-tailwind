import LinkButton from "@/components/atoms/link-button/link-button";
import Link from "next/link";

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