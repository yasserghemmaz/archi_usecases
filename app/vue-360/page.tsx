"use client"

import { Header } from "@/components/lakehouse/header"
import { Vue360Section } from "@/components/architecture/vue-360-section"

export default function Vue360Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header activePage="vue360" />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Use Case Vue 360</h1>
          <p className="mt-2 text-muted-foreground">
            Projet FAIR - Supervision FTTH et migration vers Dataiku
          </p>
        </div>

        <Vue360Section />
      </main>
    </div>
  )
}
