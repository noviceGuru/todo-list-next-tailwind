'use client'

import Button from "@/components/atoms/button/button";
import Cell from "@/components/atoms/cell/cell";
import Input from "@/components/atoms/input/input"
import Title from "@/components/atoms/title/title"

export default function Table() {
	return (
		<table className="border-2">
			<thead>
				<tr className="border-2 border-black rounded-md">
					<Title title="a todo table" />
				</tr>
			</thead>
			<tbody>
				<tr className="border-2 border-indigo-400">
					<td className="border-4 border-pink-900">
						<Input />
					</td>
					<td className="border-4 border-pink-800 bg-slate-300 w-32">
						<Button type="save" onClick={()=>console.log('clicked')}/>
						<Button type="discard" onClick={()=>console.log('clicked')} />
					</td>
				</tr>
				<tr className="border-2 border-indigo-400 ">
					<td className="border-4 border-pink-900">
						<Cell text="it's a cell" />
					</td>
					<td className="border-4 border-pink-800 bg-slate-300 w-32" >
						<Button type="delete" onClick={()=>console.log('clicked')} />
					</td>
				</tr>
			</tbody>
		</table>
	);
}