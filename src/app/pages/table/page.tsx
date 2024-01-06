import GitHubLink from "@/components/atoms/github-link/github-link"
import Table from "@/components/molecules/table"
import { getTodos } from "@/utils/queryFunctions/todos"

export default async function TablePage() {
  const response = await getTodos(new URL(process.env.NEXT_PUBLIC_BASE || ""))

  return (<>
    <title>Todo list</title>
    <main className="flex items-center justify-center flex-col gap-3">
      <GitHubLink/>
      {(response.data && !response.error) ?
        <Table initialData={response && response.data || []} /> :
        <span className="p-8 bg-red-300 rounded-2xl mt-44">
          Failed to get the data
        </span>
      }
    </main>
  </>
  )
}