"use client"

import { Database, ArrowRight, Layers, Table2 } from "lucide-react"

const datasets = [
  "VMS_BOUTIQUE",
  "CSAT_TV_OUT_CALLS",
  "CSAT_INSTALL_FTTH_DBOX",
  "CSAT_FIX_ADSL",
  "CSAT_BOUTIQUE",
  "CSAT_AGENT_INB_CALLS",
]

interface PipelineStageProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  color: "landing" | "bronze" | "silver"
  details: string[]
  techBadge?: { label: string; color: string }
}

function PipelineStage({ title, subtitle, icon, color, details, techBadge }: PipelineStageProps) {
  const colorClasses = {
    landing: "border-dataiku/50 bg-dataiku/10",
    bronze: "border-bronze/50 bg-bronze/10",
    silver: "border-silver/50 bg-silver/10",
  }

  const iconClasses = {
    landing: "text-dataiku",
    bronze: "text-bronze",
    silver: "text-silver",
  }

  return (
    <div className={`flex-1 rounded-lg border p-4 ${colorClasses[color]} transition-all duration-300 hover:scale-[1.02]`}>
      <div className="mb-3 flex items-center gap-3">
        <div className={`${iconClasses[color]}`}>{icon}</div>
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <ul className="mb-3 space-y-1.5">
        {details.map((detail, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
            {detail}
          </li>
        ))}
      </ul>
      {techBadge && (
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ backgroundColor: `${techBadge.color}20`, color: techBadge.color }}
        >
          {techBadge.label}
        </span>
      )}
    </div>
  )
}

export function DataPipeline() {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Data Pipeline Flow</h2>
        <p className="text-sm text-muted-foreground">Medallion Architecture for CX Data</p>
      </div>

      {/* Dataset Badges */}
      <div className="mb-6 flex flex-wrap gap-2">
        {datasets.map((dataset) => (
          <span
            key={dataset}
            className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-foreground"
          >
            {dataset}
          </span>
        ))}
      </div>

      {/* Pipeline Flow */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        <PipelineStage
          title="Landing Zone"
          subtitle="Source Database"
          icon={<Database className="h-5 w-5" />}
          color="landing"
          details={[
            "Genesys Database (Oracle)",
            "Raw operational data",
            "Tables: BIGDATA_*",
          ]}
          techBadge={{ label: "Oracle", color: "#f80000" }}
        />

        <div className="flex items-center justify-center lg:px-2">
          <ArrowRight className="h-5 w-5 rotate-90 text-muted-foreground lg:rotate-0" />
        </div>

        <PipelineStage
          title="Bronze Layer"
          subtitle="Raw Storage on HDFS"
          icon={<Layers className="h-5 w-5" />}
          color="bronze"
          details={[
            "Storage: HDFS",
            "Format Varchar 1:1 mapping",
            "Non-partitioned tables",
            "Visualized via Iceberg",
          ]}
          techBadge={{ label: "PySpark + Iceberg", color: "#e8a838" }}
        />

        <div className="flex items-center justify-center lg:px-2">
          <ArrowRight className="h-5 w-5 rotate-90 text-muted-foreground lg:rotate-0" />
        </div>

        <PipelineStage
          title="Silver Layer"
          subtitle="Typed & Partitioned on HDFS"
          icon={<Table2 className="h-5 w-5" />}
          color="silver"
          details={[
            "Storage: HDFS",
            "Strong types (Int, Date)",
            "Partitioned by CALL_TIME",
            "Visualized via Iceberg",
          ]}
          techBadge={{ label: "PySpark + Iceberg", color: "#4a90d9" }}
        />
      </div>
    </section>
  )
}
