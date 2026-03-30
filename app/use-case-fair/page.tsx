"use client"

import { Header } from "@/components/lakehouse/header"
import { FairSection } from "@/components/architecture/fair-section"

export default function UseCaseFairPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header activePage="fair" />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Use Case FAIR</h1>
          <p className="mt-2 text-muted-foreground">
            Projet FAIR - Supervision FTTH et migration vers Dataiku
          </p>
        </div>

        <FairSection />
      </main>
    </div>
  )
}
