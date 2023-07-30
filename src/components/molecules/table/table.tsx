"use client"

import useTable from "./useTable"

// #region components
import Button from "@/components/atoms/button"
import Cell from "@/components/atoms/cell"
import Input from "@/components/atoms/input"
import Title from "@/components/atoms/title"
import ErrorBanner from "@/components/atoms/error-banner/error-banner"
import LoadingSpinner from "@/components/atoms/loading-spinner/loading-spinner"
// #endregion components

import { Todo } from "@/features/types/todos"

export default function Table({ initialData }: { initialData: Todo[] }) {
	const {
		add,
		edit,
		save,
		discard,
		deleteRow,
		tableRows,
		editingKey,
		taskText,
		setTaskText,
		isLoading,
		errorSaving
	} = useTable(initialData)

	return (
		<>
			{errorSaving &&
				<ErrorBanner
					size="medium"
					text="Something went wrong. Try again please."
				/>}
			<table className="border-2 w-96">
				<thead>
					<tr className="border-2 border-black rounded">
						<Title title="a todo table" />
						<td className="border-l-2 border-black flex justify-center">
							<Button
								type="add"
								onClick={add}
							/>
						</td>
					</tr>
				</thead>
				<tbody>
					{initialData.length < 1 ?
						<tr>
							<td>
								No data provided
							</td>
						</tr> :
						tableRows.map(row =>
							editingKey === row.id ?
								isLoading ?
									<tr>
										<LoadingSpinner />
									</tr> :
									<tr className="border-2 border-indigo-400" key={row.id}>
										<td className="border-4 border-pink-900 pl-2">
											<Input
												onChange={e => setTaskText(e.target.value)}
												value={taskText}
											/>
										</td>
										<td className="border-4 border-pink-800 bg-slate-300 w-32">
											<Button type="save" onClick={() => save(row.id)} disabled={!taskText} />
											<Button type="discard" onClick={discard} />
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
		</>
	)
}