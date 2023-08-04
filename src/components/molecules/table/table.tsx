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
			<table className="table-fixed min-w-360px w-96 sm:w-3/5 xl:w-2/5 ">
				<thead className="table-header-group">
					<tr>
						<th className="flex mb-4">
							<Title title="What you'll do today" className="bg-gradient-to-r from-indigo-500 rounded-lg grow text-white" />
							<div className="w-12">
								<Button
									type="add"
									disabled={!!editingKey}
									onClick={add}
								/>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{initialData.length < 1 ?
						<tr>
							<td>
								No data provided
							</td>
						</tr> :
						tableRows.map((row, index) =>
							editingKey === row.id ?
								isLoading ?
									<tr>
										<LoadingSpinner />
									</tr> :
									<tr className={`group w-full flex ${(index === tableRows.length - 1)? '' : 'border-b-2'}`} key={row.id}>
										<td className="group w-full flex">
											<Input
												onChange={e => setTaskText(e.target.value)}
												value={taskText}
											/>
										</td>
										<td className="w-22 flex gap-1 justify-around opacity-0 transition-opacity ease-in duration-200 group-hover:opacity-100">
											<Button type="discard" onClick={discard} />
											<Button type="save" onClick={() => save(row.id)} disabled={!taskText} />
										</td>
									</tr> :
								<tr className={`group w-full flex ${(index === tableRows.length - 1)? '' : 'border-b-2'}`} key={row.id}>
									<td className="pl-2 grow min-w-0 self-center">
										<Cell text={row.task} />
									</td>
									<td className="w-22 flex gap-1 justify-around opacity-0 transition-opacity ease-in duration-200 group-hover:opacity-100">
										<Button type="delete" onClick={() => deleteRow(row.id)} disabled={!!editingKey} />
										<Button type="edit" onClick={() => edit(row)} disabled={!!editingKey} />
									</td>
								</tr>
						)}
				</tbody>
			</table>
		</>
	)
}