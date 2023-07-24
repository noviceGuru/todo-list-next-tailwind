import { useState } from "react"

import { Id, Todo } from "@/features/types/todos"

import { getAll, getOne, deleteOne, postOne, putOne } from "../queryFunctions/queryFuncs"

export type UseFetchReturnType = [
	(bodyOrId?: Todo | Id) => Promise<void>,
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

	const fetchFunction = (idOrBody?: Id | Todo) => {
		if ("GET_ALL" && !idOrBody) {
			return getAll()
		} else if (type === "GET_ONE" && idOrBody) {
			return getOne(idOrBody as Id)
		} else if (type === "DELETE" && idOrBody) {
			return deleteOne(idOrBody as Id)
		} else if (type === "POST" && idOrBody) {
			return postOne(idOrBody as Todo)
		} else if (type === "PUT" && idOrBody) {
			return putOne(idOrBody as Todo)
		}
	}

	const callFetch = async (bodyOrId?: Id | Todo) => {
		try {
			const response = await fetchFunction(bodyOrId)
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