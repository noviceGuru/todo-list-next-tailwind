import { Id, Task, Todo } from "@/features/types/todos"

const BASE_URL = process.env.NEXT_PUBLIC_BASE as string

export const getAll = () => fetch(BASE_URL)

export const getOne = (id: Id) => fetch(`${BASE_URL}/${id}`)

export const deleteOne = (id: Id) => fetch(`${BASE_URL}/${id}`, { method: "DELETE" })

export const putOne = (body: Todo) => fetch(`${BASE_URL}/${body.id}`, {
	method: "PUT",
	body: JSON.stringify(body),
	headers: {
		"Content-Type": "application/json",
	}
})

export const postOne = (body: Task) => fetch(BASE_URL, {
	method: "POST",
	body: JSON.stringify(body),
	headers: {
		"Content-Type": "application/json",
	}
})