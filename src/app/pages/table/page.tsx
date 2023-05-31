import Table from "@/components/molecules/table/table"
import getTodos from "@/utils/queryFunctions/getTodos"

export default async function TablePage(props: any) {
  const data = await getTodos(new URL(process.env.BASE || ""))

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <title>Todo list</title>
      <div className="text-md caret-lime-800">
        <Table initialData={data}/>
      </div>
    </main>
  )
}