export default function LoadingSpinner({ type }: { type?: "ping" | "spin" | "pulse" | "bounce" }) {
	return <span className={`bg-indigo-300 p-2 rounded-md animate-${type? type : "pulse"}`}>
		Loading...
	</span>
}