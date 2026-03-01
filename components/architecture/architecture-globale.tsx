"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Server, HardDrive, Layers, ArrowRight, ArrowDown } from "lucide-react"

export function ArchitectureGlobale() {
  return (
    <div className="space-y-8">
      {/* Architecture Diagram - Main */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">Architecture Cible - Data Platform</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* High-level Architecture Blocks */}
          <div className="grid gap-4 lg:grid-cols-4">
            {/* Sources */}
            <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Database className="h-5 w-5 text-red-500" />
                <h3 className="font-semibold text-foreground">Sources</h3>
              </div>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>Oracle DWH (Genesys)</li>
                <li>Systemes operationnels</li>
                <li>Fichiers externes</li>
                <li>APIs partenaires</li>
              </ul>
            </div>

            {/* Ingestion */}
            <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
              <div className="mb-3 flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-orange-500" />
                <h3 className="font-semibold text-foreground">Ingestion</h3>
              </div>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>Dataiku Datasets</li>
                <li>PySpark Jobs</li>
                <li>Batch / Near Real-Time</li>
                <li>Schema Evolution</li>
              </ul>
            </div>

            {/* Lakehouse */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="mb-3 flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Lakehouse (HDFS)</h3>
              </div>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>Bronze Layer (Raw)</li>
                <li>Silver Layer (Curated)</li>
                <li>Gold Layer (Business)</li>
                <li>Format: Apache Iceberg</li>
              </ul>
            </div>

            {/* Consumption */}
            <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Layers className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold text-foreground">Consommation</h3>
              </div>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>Reporting / BI</li>
                <li>Data Science</li>
                <li>Machine Learning</li>
                <li>Applications Metier</li>
              </ul>
            </div>
          </div>

          {/* Flow Arrows */}
          <div className="flex items-center justify-center gap-2 py-2">
            <span className="text-xs text-muted-foreground">Oracle</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Dataiku/PySpark</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="rounded bg-[#CD7F32]/20 px-2 py-0.5 text-xs font-medium text-[#CD7F32]">Bronze</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="rounded bg-[#C0C0C0]/20 px-2 py-0.5 text-xs font-medium text-[#C0C0C0]">Silver</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="rounded bg-[#FFD700]/20 px-2 py-0.5 text-xs font-medium text-[#FFD700]">Gold</span>
          </div>
        </CardContent>
      </Card>

      {/* Medallion Architecture Detail */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">Architecture Medallion (Lakehouse)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            L{"'"}architecture Medallion structure les donnees en couches progressives de qualite et de transformation :
          </p>

          {/* Medallion Layers Visual */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Bronze */}
            <div className="relative rounded-lg border-2 border-[#CD7F32]/50 bg-[#CD7F32]/10 p-4">
              <div className="absolute -top-3 left-4 rounded bg-[#CD7F32] px-2 py-0.5 text-xs font-bold text-white">
                BRONZE
              </div>
              <div className="mt-2 space-y-2">
                <h4 className="font-semibold text-foreground">Couche Raw</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>Copie 1:1 des sources</li>
                  <li>Format VARCHAR uniforme</li>
                  <li>Non partitionne</li>
                  <li>Historisation complete</li>
                </ul>
                <div className="mt-3 flex flex-wrap gap-1">
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">HDFS</span>
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">Parquet</span>
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">Iceberg</span>
                </div>
              </div>
            </div>

            {/* Silver */}
            <div className="relative rounded-lg border-2 border-[#C0C0C0]/50 bg-[#C0C0C0]/10 p-4">
              <div className="absolute -top-3 left-4 rounded bg-[#C0C0C0] px-2 py-0.5 text-xs font-bold text-black">
                SILVER
              </div>
              <div className="mt-2 space-y-2">
                <h4 className="font-semibold text-foreground">Couche Curated</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>Types forts (Int, Date, etc.)</li>
                  <li>Partitionnement CALL_TIME</li>
                  <li>Transformations appliquees</li>
                  <li>Donnees nettoyees</li>
                </ul>
                <div className="mt-3 flex flex-wrap gap-1">
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">HDFS</span>
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">Parquet</span>
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">Iceberg</span>
                </div>
              </div>
            </div>

            {/* Gold */}
            <div className="relative rounded-lg border-2 border-[#FFD700]/50 bg-[#FFD700]/10 p-4">
              <div className="absolute -top-3 left-4 rounded bg-[#FFD700] px-2 py-0.5 text-xs font-bold text-black">
                GOLD
              </div>
              <div className="mt-2 space-y-2">
                <h4 className="font-semibold text-foreground">Couche Business</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>Agregations metier</li>
                  <li>Modeles dimensionnels</li>
                  <li>KPIs pre-calcules</li>
                  <li>Pret pour la BI</li>
                </ul>
                <div className="mt-3 flex flex-wrap gap-1">
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">HDFS</span>
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">Parquet</span>
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">Iceberg</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stack Technique */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">Stack Technique</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Stockage & Compute */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Stockage & Compute</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#ff7f00]/20">
                    <span className="text-lg font-bold text-[#ff7f00]">H</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Cloudera HDFS</p>
                    <p className="text-xs text-muted-foreground">Stockage distribue haute disponibilite</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#e8a838]/20">
                    <span className="text-lg font-bold text-[#e8a838]">S</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Apache Spark / PySpark</p>
                    <p className="text-xs text-muted-foreground">Moteur de traitement distribue</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#4a90d9]/20">
                    <span className="text-lg font-bold text-[#4a90d9]">I</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Apache Iceberg</p>
                    <p className="text-xs text-muted-foreground">Format de table ouvert avec ACID</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Orchestration & Outils */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Orchestration & Outils</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#00b4b4]/20">
                    <span className="text-lg font-bold text-[#00b4b4]">D</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Dataiku DSS</p>
                    <p className="text-xs text-muted-foreground">Plateforme Data Science & ML</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#f80000]/20">
                    <span className="text-lg font-bold text-[#f80000]">O</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Oracle DWH</p>
                    <p className="text-xs text-muted-foreground">Base source Genesys (Landing Zone)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-purple-500/20">
                    <span className="text-lg font-bold text-purple-500">H</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Apache Hive Metastore</p>
                    <p className="text-xs text-muted-foreground">Catalogue de metadonnees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Flow Diagram */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">Flux de Donnees - Pipeline CX</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Le pipeline CX (Customer Experience) illustre le flux typique des donnees depuis les sources Genesys
            jusqu{"'"}aux couches analytiques :
          </p>

          {/* Pipeline Diagram */}
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Pipeline CX Data - Vue Dataiku (BIGDATA → BRONZE → SILVER)</p>
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HwzCE7LhCk1ZGewC8VuRnYSz3KeLWG.png"
              alt="Pipeline CX Data - Vue Dataiku"
              className="w-full rounded-lg bg-white p-2"
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-[#00a0e0]" />
              <span className="text-xs text-muted-foreground">Oracle (BIGDATA_*)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-[#ff8c00]" />
              <span className="text-xs text-muted-foreground">PySpark Job</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded border-2 border-[#00a0e0] bg-white" />
              <span className="text-xs text-muted-foreground">Hadoop/Iceberg</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Principles */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">Principes Directeurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-secondary/50 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </div>
              <div>
                <h4 className="font-medium text-foreground">Decouplage donnees / infrastructure</h4>
                <p className="text-sm text-muted-foreground">
                  Les usages ne dependent pas d{"'"}un moteur ou d{"'"}un stockage specifique grace a Iceberg
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-secondary/50 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </div>
              <div>
                <h4 className="font-medium text-foreground">Schema-on-Read progressif</h4>
                <p className="text-sm text-muted-foreground">
                  Les donnees brutes sont conservees, les transformations appliquees couche par couche
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-secondary/50 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </div>
              <div>
                <h4 className="font-medium text-foreground">Time Travel & Auditabilite</h4>
                <p className="text-sm text-muted-foreground">
                  Iceberg permet de consulter les donnees a n{"'"}importe quel point dans le temps
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-secondary/50 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                4
              </div>
              <div>
                <h4 className="font-medium text-foreground">Cloud-Ready</h4>
                <p className="text-sm text-muted-foreground">
                  L{"'"}architecture est compatible avec une migration future vers le cloud (post-2028)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
