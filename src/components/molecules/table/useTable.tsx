import React, { useState } from 'react';

import { Id, PostAndPutResponse, Todo } from "@/features/types/todos"

import { deleteATodo, getTodos, postATodo, putATodo } from "@/utils/queryFunctions/todos"

const TODOS_BASE_URL = new URL(process.env.NEXT_PUBLIC_BASE || "")

export default function useTable(initialData: Todo[]) {
	const [tableRows, setTableRows] = useState<Todo[]>(initialData)
	const [editingKey, setEditingKey] = useState<Id | null>(null)
	const [isNewRow, setIsNewRow] = useState<boolean>(false)

	const [taskText, setTaskText] = useState<string | undefined>()

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
				setTableRows(newTodos)
				setEditingKey(null)
				setIsNewRow(false)
			}
		}
	}

	const deleteRow = async (id: Id) => {
		const deleteOk = await deleteATodo(TODOS_BASE_URL, id)
		if (deleteOk) {
			const newTodos = await getTodos(TODOS_BASE_URL)
			if (newTodos) {
				setTableRows(newTodos)
				setEditingKey(null)
				setIsNewRow(false)
			}
		}
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
		setTaskText
	}
}