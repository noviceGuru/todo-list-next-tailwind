export default function Title({ title, className }: { title: string, className: string }) {
	return (
		<th className={`${className? className : ""}`}>
			{title}
		</th>
	)
}