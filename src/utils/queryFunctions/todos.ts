import { Id, Todo } from "@/features/types/todos"

export async function getTodos(url: URL) {
	const res = await fetch(url)
	if (!res.ok) {
		throw new Error('Failed to fetch todos')
	}
	const todos = (await res.json()) as Todo[]
	return todos
}

export async function deleteATodo(url: URL, id: string | number) {
	const res = await fetch(`${url}/${id}`, {
		method: "DELETE"
	})
	return res.ok
}

export async function putATodo(url: URL, body: Todo) {
	const res = await fetch(`${url}/${body.id}`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "PUT",
		body: JSON.stringify(body)
	})
	if (!res.ok) {
		throw new Error('Failed to fetch todos')
	}
	const todos = (await res.json()) as Todo
	return {
		response: todos,
		isOk: res.ok
	}
}

export async function postATodo(url: URL, body: Omit<Todo, "id">) {
	const res = await fetch(`${url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body)
	})
	if (!res.ok) {
		throw new Error('Failed to fetch todos')
	}
	const todos = (await res.json()) as Todo
	return {
		response: todos,
		isOk: res.ok
	}
}