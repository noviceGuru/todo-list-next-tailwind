export default function ErrorBanner({ size, text }: { size?: "big" | "medium", text?: string }) {
	return (size && size === "big")?
			<p>{text? text : "Big Banner"}</p> :
			<p>{text? text : "small banner"}</p>
}