import { useState } from "react"

import { Id, Todo } from "@/features/types/todos"

import { getAll, getOne, deleteOne, postOne, putOne } from "../queryFunctions/queryFuncs"

export type UseFetchReturnType = [
	(bodyOrId?: Todo | Id) => Promise<void>,
	{
		data: Todo[] | undefined,
		isLoading: boolean | undefined,
		error: Error | undefined
	}
]

export const useFetch = (type: "GET_ALL" | "GET_ONE" | "DELETE" | "POST" | "PUT"): UseFetchReturnType => {
	const [data, setData] = useState<Todo[]>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<Error>()

	const fetchFunction = (idOrBody?: Id | Todo) => {
		if ("GET_ALL" && !idOrBody) {
			return getAll()
		} else if ("GET_ONE" && idOrBody) {
			getOne(idOrBody as Id)
		} else if (type === "DELETE" && idOrBody) {
			deleteOne(idOrBody as Id)
		} else if (type === "POST" && idOrBody) {
			postOne(idOrBody as Todo)
		} else if (type === "PUT" && idOrBody) {
			return putOne(idOrBody as Todo)
		}
	}

	const callFetch = async (bodyOrId?: Id | Todo) => {
		try {
			const response = await fetchFunction(bodyOrId)
			setIsLoading(true)
			setError(undefined)
			const responseData = await response!.json()
			setData(responseData)
		} catch (error) {
			setError(error as Error)
		} finally {
			setIsLoading(false)
		}
	}

	return [
		callFetch,
		{
			data: data,
			isLoading: isLoading,
			error: error
		}
	]
}