import Table from "@/components/molecules/table/table"
import { getTodos } from "@/utils/queryFunctions/todos"

export default async function TablePage(props: any) {
  const data = await getTodos(new URL(process.env.NEXT_PUBLIC_BASE || ""))

  return (<>
    <title>Todo list</title>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table initialData={data} />
    </main>
  </>
  )
}