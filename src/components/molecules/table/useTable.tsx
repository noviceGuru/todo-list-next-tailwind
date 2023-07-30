import { useEffect, useState } from 'react'

import { Id, Todo } from "@/features/types/todos"

import { useFetch } from '@/utils/fetchHooks/useFetch'

export default function useTable(initialData: Todo[]) {
	const [tableRows, setTableRows] = useState<Todo[]>(initialData)
	const [editingKey, setEditingKey] = useState<Id | null>(null)
	const [isNewRow, setIsNewRow] = useState<boolean>(false)
	const [error, setError] = useState<Error>()

	const [taskText, setTaskText] = useState<string | undefined>()

	const [getAll, { data: getAllData, isLoading: getAllIsLoading, error: getAllError }] = useFetch('GET_ALL')
	const [postOne, { data: postOneData, isLoading: postOneIsLoading, error: postOneIsError, resetChache: postOneResetCache }] = useFetch('POST')
	const [putOne, { data: putOneData, isLoading: putOneIsLoading, error: putOneError, resetChache: putOneResetCache }] = useFetch('PUT')
	const [deleteOne, { isSuccessful: deleteOneIsSuccessful, isLoading: deleteOneIsLoading, error: deleteOneError, resetChache: deletOneResetCache }] = useFetch('DELETE')

	useEffect(() => {
		if (postOneData || putOneData || deleteOneIsSuccessful) {
			getAll({})

			postOneResetCache()
			putOneResetCache()
			deletOneResetCache()

			setIsNewRow(false)
		}
	}, [postOneData, putOneData, deleteOneIsSuccessful])

	useEffect(() => {
		if (getAllData) {
			setTableRows(getAllData)
			setEditingKey(null)
			setError(undefined)
		}
	}, [getAllData])

	useEffect(() => {
		if (postOneIsError || putOneError || deleteOneError || getAllError) {
			setError(postOneIsError || putOneError || deleteOneError || getAllError)
		}
	}, [postOneIsError, putOneError, deleteOneError, getAllError])

	const save = async (id: Id) => {
		isNewRow ?
			await postOne({ task: { task: taskText || "" } })
			:
			await putOne({ todo: { id: id, task: taskText || "" } })
	}

	const deleteRow = async (id: Id) => {
		await deleteOne({ id: id })
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