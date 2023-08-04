export default function ErrorBanner({ size, text }: { size?: "big" | "medium", text?: string }) {
	return <span className="self-center p-8 bg-red-300 rounded-2xl">{(size && size === "big") ?
		(text ? text : "Big Banner") :
		(text ? text : "small banner")}</span>
}