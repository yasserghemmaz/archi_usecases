"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataPipeline } from "@/components/lakehouse/data-pipeline"
import { FileExplorer } from "@/components/lakehouse/file-explorer"
import { ComparisonTable } from "@/components/lakehouse/comparison-table"

export function LakehouseCXSection() {
  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Stockage Lakehouse (Bronze / Silver / Gold)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            Le stockage est organise en <strong className="text-foreground">trois couches semantiques</strong>, qui structurent le cycle de vie des donnees :
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border-2 border-bronze bg-bronze/10 p-4">
              <h4 className="mb-2 font-semibold text-bronze-foreground">Bronze</h4>
              <p className="text-xs">Donnees brutes, non transformees, historisees. Zone de landing.</p>
            </div>
            <div className="rounded-lg border-2 border-silver bg-silver/10 p-4">
              <h4 className="mb-2 font-semibold text-silver-foreground">Silver</h4>
              <p className="text-xs text-foreground">Donnees nettoyees, typees, partitionnees. Zone de reference.</p>
            </div>
            <div className="rounded-lg border-2 border-primary bg-primary/10 p-4">
              <h4 className="mb-2 font-semibold text-primary">Gold</h4>
              <p className="text-xs">Donnees agregees, metier-ready. Zone d{"'"}exposition.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline CX Data */}
      <DataPipeline />
      <FileExplorer />
      <ComparisonTable />
    </div>
  )
}
