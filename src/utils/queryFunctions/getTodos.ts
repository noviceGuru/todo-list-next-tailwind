import { Todo } from "@/features/types/todos"

export default async function getTodos(url: URL) {
	const res = await fetch(url)
	if(!res.ok) {
		throw new Error('Failed to fetch todos')
	}
	const todos = (await res.json()) as Todo[]
	return todos
}