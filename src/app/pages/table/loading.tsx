"use client"
import LoadingSpinner from "@/components/atoms/loading-spinner/loading-spinner";

export default async function Loading() {
	return <main className="h-screen-dynamic grid place-items-center">
		<LoadingSpinner />
	</main>
}