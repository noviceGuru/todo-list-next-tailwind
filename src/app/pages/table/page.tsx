import Table from "@/components/molecules/table"
import { getTodos } from "@/utils/queryFunctions/todos"

export default async function TablePage() {
  const response = await getTodos(new URL(process.env.NEXT_PUBLIC_BASE || ""))

  return (<>
    <title>Todo list</title>
    <main className="flex h-screen w-screen items-center justify-center">
      {(response.data && !response.error) ?
      <Table initialData={response && response.data || []} /> :
      <h3>Failed to get the data</h3>
    }
    </main>
  </>
  )
}