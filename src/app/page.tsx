import Table from "@/components/molecules/table/table"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-md caret-lime-800">
        <Table/>
      </div>
    </main>
  )
}