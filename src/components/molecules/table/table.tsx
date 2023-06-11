"use client"

import { useState } from "react"

// #region components
import Button from "@/components/atoms/button/button";
import Cell from "@/components/atoms/cell/cell";
import Input from "@/components/atoms/input/input"
import Title from "@/components/atoms/title/title"
// #endregion components

import { Id, PostAndPutResponse, Todo } from "@/features/types/todos"

import { deleteATodo, getTodos, postATodo, putATodo } from "@/utils/queryFunctions/todos";

const TODOS_BASE_URL = new URL(process.env.NEXT_PUBLIC_BASE || "")

export default function Table({ initialData }: { initialData: Todo[] }) {
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

	return (
		<table className="border-2 w-96">
			<thead>
				<tr className="border-2 border-black rounded-md">
					<Title title="a todo table" />
				</tr>
			</thead>
			<tbody>
				{tableRows.map(row =>
					editingKey === row.id ?
						<tr className="border-2 border-indigo-400" key={row.id}>
							<td className="border-4 border-pink-900 pl-2">
								<Input
									onChange={e => setTaskText(e.target.value)}
									value={taskText}
								/>
							</td>
							<td className="border-4 border-pink-800 bg-slate-300 w-32">
								<Button type="save" onClick={() => save(row.id)} disabled={!taskText} />
								<Button type="discard" onClick={() => setEditingKey(null)} />
							</td>
						</tr> :
						<tr className="border-2 border-indigo-400 " key={row.id}>
							<td className="border-4 border-pink-900 pl-2">
								<Cell text={row.task} />
							</td>
							<td className="border-4 border-pink-800 bg-slate-300 w-32" >
								<Button type="delete" onClick={() => deleteRow(row.id)} />
								<Button type="edit" onClick={() => edit(row)} />
							</td>
						</tr>
				)}
			</tbody>
		</table>
	)
}