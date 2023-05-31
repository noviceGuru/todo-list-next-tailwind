"use client"

import { useState } from "react"

// #region components
import Button from "@/components/atoms/button/button";
import Cell from "@/components/atoms/cell/cell";
import Input from "@/components/atoms/input/input"
import Title from "@/components/atoms/title/title"
// #endregion components

import { Todo } from "@/features/types/todos"

export default function Table({ initialData }: { initialData: Todo[] }) {
	const [tableRows, setTableRows] = useState<Todo[]>(initialData)
	const [editingKey, setEditingKey] = useState<string | number | null>(null)

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
							<td className="border-4 border-pink-900">
								<Input />
							</td>
							<td className="border-4 border-pink-800 bg-slate-300 w-32">
								<Button type="save" /* onClick={() => console.log('clicked')} */ />
								<Button type="discard" onClick={() => setEditingKey(null)} />
							</td>
						</tr> :
						<tr className="border-2 border-indigo-400 " key={row.id}>
							<td className="border-4 border-pink-900">
								<Cell text={row.task} />
							</td>
							<td className="border-4 border-pink-800 bg-slate-300 w-32" >
								<Button type="delete" /* onClick={() => console.log('clicked')} */ />
								<Button type="edit" onClick={() => setEditingKey(row.id)} />
							</td>
						</tr>
				)}
			</tbody>
		</table>
	)
}