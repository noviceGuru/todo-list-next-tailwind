export default function LoadingSpinner({ type }: { type?: "ping" | "spin" | "pulse" | "bounce" }) {
	const animationClass =`animate-${type? type : "ping"}`

	return <span className={`bg-indigo-300 self-center py-1 px-4 rounded-md ${animationClass}`}>
		Loading...
	</span>
}