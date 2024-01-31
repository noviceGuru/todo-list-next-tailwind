import { Id, Todo } from "@/features/types/todos"

export async function getTodos(url: URL) {
	let response : {
		data : Todo[] | undefined
		error : Error | undefined
	} = {
		data : undefined,
		error : undefined
	}

	try {
		const res = await fetch(url, {cache: 'no-store'})
		if (!res.ok) {
			throw new Error('Failed to fetch todos')
		}
		const todos = (await res.json()) as Todo[]
		response.data = todos
	} catch (err) {
		response.error = err as Error
	}

	return response
}

export async function deleteATodo(url: URL, id: Id) {
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