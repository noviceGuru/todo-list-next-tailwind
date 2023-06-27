import Table from "@/components/molecules/table"
import { getTodos } from "@/utils/queryFunctions/todos"

export default async function TablePage() {
  const response = await getTodos(new URL(process.env.NEXT_PUBLIC_BASE || ""))

  return (<>
    <title>Todo list</title>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {(response.data && !response.error) ?
      <Table initialData={response && response.data || []} /> :
      <h3>Failed to get the data</h3>
    }
    </main>
  </>
  )
}