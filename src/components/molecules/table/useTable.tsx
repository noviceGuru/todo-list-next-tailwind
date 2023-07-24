import { useEffect, useState } from 'react'

import { Id, PostAndPutResponse, Todo } from "@/features/types/todos"

import { deleteATodo, getTodos, postATodo, putATodo } from "@/utils/queryFunctions/todos"
import { useFetch } from '@/utils/fetchHooks/useFetch'

const TODOS_BASE_URL = new URL(process.env.NEXT_PUBLIC_BASE || "")

export default function useTable(initialData: Todo[]) {
	const [tableRows, setTableRows] = useState<Todo[]>(initialData)
	const [editingKey, setEditingKey] = useState<Id | null>(null)
	const [isNewRow, setIsNewRow] = useState<boolean>(false)
	const [error, setError] = useState<Error>()

	const [taskText, setTaskText] = useState<string | undefined>()

	const [getAll, { data: getAllData, isLoading: getAllIsLoading, error: getAllError }] = useFetch('GET_ALL')
	const [postOne, { data: postOneData, isLoading: postOneIsLoading, error: postOneIsError }] = useFetch('POST')
	const [putOne, { data: putOneData, isLoading: putOneIsLoading, error: putOneError }] = useFetch('PUT')
	const [deleteOne, { isSuccessful: deleteOneIsSuccessful, isLoading: deleteOneIsLoading, error: deleteOneError }] = useFetch('DELETE')

	useEffect(() => {
		if (postOneData || putOneData || deleteOneIsSuccessful) {
			getAll()
		}
	}, [postOneData, putOneData, deleteOneIsSuccessful])

	useEffect(() => {
		if (getAllData) {
			setTableRows(getAllData)
		}
	}, [getAllData])

	useEffect(() => {
		if(postOneIsError || putOneError || deleteOneError || getAllError) {
			setError(postOneIsError || putOneError || deleteOneError || getAllError)
		}
	}, [postOneIsError, putOneError, deleteOneError, getAllError])

	const save = async (id: Id) => {
		let postOrPutRes: PostAndPutResponse
		if (isNewRow) {
			postOrPutRes = await postATodo(TODOS_BASE_URL, { task: taskText || "" })
		} else {
			postOrPutRes = await putATodo(TODOS_BASE_URL, { id: id, task: taskText || "" })
		}
		if (postOrPutRes.isOk) {
			const newTodos = await getTodos(TODOS_BASE_URL)
			if (newTodos) {
				setTableRows(newTodos.data || [])
				setEditingKey(null)
				setIsNewRow(false)
			}
		}
	}

	const deleteRow = async (id: Id) => {
		await deleteOne(id)
		// const deleteOk = await deleteATodo(TODOS_BASE_URL, id)
		// if (deleteOk) {
		// 	const newTodos = await getTodos(TODOS_BASE_URL)
		// 	if (newTodos) {
		// 		setTableRows(newTodos.data || [])
		// 		setEditingKey(null)
		// 		setIsNewRow(false)
		// 	}
		// }
	}

	const edit = (row: Todo) => {
		setEditingKey(row.id)
		setTaskText(row.task)
	}

	const discard = () => {
		if (isNewRow) {
			setTableRows(rows => {
				const newRows = structuredClone(rows)
				newRows.pop()
				return newRows
			})
		}

		setEditingKey(null)
	}

	const add = () => {
		const newKey = `${new Date()}`
		setTaskText("")
		setTableRows(rows => [...rows, { id: newKey, task: "" }])
		setEditingKey(newKey)
		setIsNewRow(true)
	}

	return {
		add,
		edit,
		save,
		discard,
		deleteRow,
		tableRows,
		editingKey,
		taskText,
		setTaskText,
		errorSaving: error,
		isLoading: getAllIsLoading || postOneIsLoading || putOneIsLoading || deleteOneIsLoading
	}
}