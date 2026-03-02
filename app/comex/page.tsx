"use client"

import { Header } from "@/components/lakehouse/header"
import { UseCaseComexSection } from "@/components/architecture/use-case-comex-section"

export default function UseCasesComexPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header activePage="comex" />
            <main className="mx-auto max-w-7xl px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Use case dashboard Comex</h1>
                    <p className="mt-2 text-muted-foreground">
                        Architecture d'intégration Dataiku vers Iceberg pour le dashboard Comex (Zone Gold)
                    </p>
                </div>

                <UseCaseComexSection />
            </main>
        </div>
    )
}
