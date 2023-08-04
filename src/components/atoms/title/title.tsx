export default function Title({ title, className }: { title: string, className: string }) {
	return (
		<span className={`${className ? className : ""} flex pt-2 pl-3`}>
			{title}
		</span>
	)
}