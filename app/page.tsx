"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/lakehouse/header"
import { ArchitectureGlobale } from "@/components/architecture/architecture-globale"
import { LakehouseCXSection } from "@/components/architecture/lakehouse-cx-section"
import { ResteAFaireSection } from "@/components/architecture/reste-a-faire-section"

export default function UseCasesCXPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header activePage="cx" />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Use cases CX</h1>
          <p className="mt-2 text-muted-foreground">
            Documentation technique de l{"'"}architecture Data Lakehouse pour les donnees Customer Experience
          </p>
        </div>

        <Tabs defaultValue="architecture" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3 bg-secondary">
            <TabsTrigger value="architecture" className="text-xs sm:text-sm">
              Architecture Globale
            </TabsTrigger>
            <TabsTrigger value="arborescence" className="text-xs sm:text-sm">
              Vue arborescence
            </TabsTrigger>
            <TabsTrigger value="reste-a-faire" className="text-xs sm:text-sm">
              Reste a faire
            </TabsTrigger>
          </TabsList>

          <TabsContent value="architecture">
            <ArchitectureGlobale />
          </TabsContent>

          <TabsContent value="arborescence">
            <LakehouseCXSection />
          </TabsContent>

          <TabsContent value="reste-a-faire">
            <ResteAFaireSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
