import { useState } from "react"

import { Id, Task, Todo } from "@/features/types/todos"

import { getAll, getOne, deleteOne, postOne, putOne } from "../queryFunctions/queryFuncs"

export type BodyOrIdOrTaskType = { id: Id, todo: Todo, task: Task }

export type UseFetchReturnType = [
	(bodyOrIdOrTask: Partial<{ id: Id; todo: Todo; task: Task; }>) => Promise<void>,
	{
		data: Todo[] | undefined,
		isLoading: boolean | undefined,
		error: Error | undefined,
		isSuccessful: boolean | null,
		resetChache: () => void
	}
]

export type methodType = "GET_ALL" | "GET_ONE" | "DELETE" | "POST" | "PUT"

export const useFetch = (type: methodType): UseFetchReturnType => {
	const [data, setData] = useState<Todo[]>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<Error>()
	const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null)

	const fetchFunction = ({ id, todo, task }: (Partial<BodyOrIdOrTaskType>)) => 
		(type === "GET_ALL")?
			getAll() :
		(type === "GET_ONE" && id) ? 
			getOne(id) :
		(type === "DELETE" && id) ?
			deleteOne(id) :
		(type === "POST" && task) ?
			postOne(task) :
		(type === "PUT" && todo) ?
			putOne(todo) :
		undefined

	const callFetch = async (bodyOrIdOrTask: Partial<{ id: Id, todo: Todo, task: Task }>) => {
		try {
			const response = await fetchFunction(bodyOrIdOrTask)
			if (response!.ok) {
				setIsSuccessful(true)
			}
			setIsLoading(true)
			setError(undefined)
			const responseData = await response!.json()
			setData(responseData)
		} catch (error) {
			setError(error as Error)
			setIsSuccessful(false)
		} finally {
			setIsLoading(false)
		}
	}

	const resetChache = () => {
		setData(undefined)
		setIsLoading(false)
		setError(undefined)
		setIsSuccessful(null)
	}

	return [
		callFetch,
		{
			data: data,
			isLoading: isLoading,
			error: error,
			isSuccessful: isSuccessful,
			resetChache: resetChache
		}
	]
}