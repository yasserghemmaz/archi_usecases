"use client"

import { Check, X, Zap, Archive, BarChart3 } from "lucide-react"

interface ComparisonRow {
  feature: string
  bronze: { value: string; icon?: "check" | "cross" | "neutral" }
  silver: { value: string; icon?: "check" | "cross" | "neutral" }
}

const comparisons: ComparisonRow[] = [
  {
    feature: "Schema Type",
    bronze: { value: "Flexible (Varchar)", icon: "neutral" },
    silver: { value: "Strict (Typed)", icon: "check" },
  },
  {
    feature: "Partitioning",
    bronze: { value: "No Partitioning", icon: "cross" },
    silver: { value: "Partitioned by Date", icon: "check" },
  },
  {
    feature: "Write Strategy",
    bronze: { value: "Full Overwrite", icon: "neutral" },
    silver: { value: "Partition Pruning", icon: "check" },
  },
  {
    feature: "Optimization",
    bronze: { value: "Minimal", icon: "cross" },
    silver: { value: "Query Optimized", icon: "check" },
  },
  {
    feature: "Primary Role",
    bronze: { value: "Historisation", icon: "neutral" },
    silver: { value: "Analytique / Dashboards", icon: "check" },
  },
]

function StatusIcon({ icon }: { icon?: "check" | "cross" | "neutral" }) {
  if (icon === "check") return <Check className="h-4 w-4 text-green-500" />
  if (icon === "cross") return <X className="h-4 w-4 text-red-400" />
  return null
}

export function ComparisonTable() {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Technical Comparison</h2>
        <p className="text-sm text-muted-foreground">Bronze vs Silver Layer Characteristics</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 text-left font-medium text-muted-foreground">Feature</th>
              <th className="px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <Archive className="h-4 w-4 text-bronze" />
                  <span className="font-semibold text-bronze">Bronze</span>
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-silver" />
                  <span className="font-semibold text-silver">Silver</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((row, i) => (
              <tr
                key={i}
                className="border-b border-border/50 transition-colors hover:bg-secondary/50"
              >
                <td className="py-3 pr-4 font-medium text-foreground">{row.feature}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <StatusIcon icon={row.bronze.icon} />
                    <span className="text-muted-foreground">{row.bronze.value}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <StatusIcon icon={row.silver.icon} />
                    <span className="text-muted-foreground">{row.silver.value}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Technology Badges */}
      <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-6">
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5">
          <Zap className="h-4 w-4 text-pyspark" />
          <span className="text-xs font-medium text-foreground">PySpark</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5">
          <svg className="h-4 w-4 text-iceberg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="text-xs font-medium text-foreground">Apache Iceberg</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5">
          <svg className="h-4 w-4 text-dataiku" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
          </svg>
          <span className="text-xs font-medium text-foreground">Dataiku</span>
        </div>
      </div>
    </section>
  )
}
