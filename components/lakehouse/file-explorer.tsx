"use client"

import { useState } from "react"
import { ChevronRight, Folder, FolderOpen, File } from "lucide-react"
import { cn } from "@/lib/utils"

interface TreeNode {
  name: string
  type: "folder" | "file"
  children?: TreeNode[]
  highlight?: "bronze" | "silver"
}

const bronzeTree: TreeNode = {
  name: "hdfs://lakehouse",
  type: "folder",
  children: [
    {
      name: "env=prd",
      type: "folder",
      children: [
        {
          name: "bronze",
          type: "folder",
          highlight: "bronze",
          children: [
            {
              name: "domain=cx",
              type: "folder",
              children: [
                {
                  name: "product=dashboard_cx",
                  type: "folder",
                  children: [
                    {
                      name: "dataset=vms_boutique",
                      type: "folder",
                      children: [
                        { name: "data_0001.parquet", type: "file" },
                        { name: "data_0002.parquet", type: "file" },
                      ],
                    },
                    {
                      name: "dataset=csat_tv_out_calls",
                      type: "folder",
                      children: [
                        { name: "data_0001.parquet", type: "file" },
                      ],
                    },
                    {
                      name: "dataset=csat_install_ftth_dbox",
                      type: "folder",
                      children: [
                        { name: "data_0001.parquet", type: "file" },
                      ],
                    },
                    {
                      name: "dataset=csat_fix_adsl",
                      type: "folder",
                      children: [
                        { name: "data_0001.parquet", type: "file" },
                      ],
                    },
                    {
                      name: "dataset=csat_boutique",
                      type: "folder",
                      children: [
                        { name: "data_0001.parquet", type: "file" },
                      ],
                    },
                    {
                      name: "dataset=csat_agent_inb_calls",
                      type: "folder",
                      children: [
                        { name: "data_0001.parquet", type: "file" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const silverTree: TreeNode = {
  name: "hdfs://lakehouse",
  type: "folder",
  children: [
    {
      name: "env=prd",
      type: "folder",
      children: [
        {
          name: "silver",
          type: "folder",
          highlight: "silver",
          children: [
            {
              name: "domain=cx",
              type: "folder",
              children: [
                {
                  name: "product=dashboard_cx",
                  type: "folder",
                  children: [
                    {
                      name: "dataset=vms_boutique",
                      type: "folder",
                      children: [
                        {
                          name: "CALL_TIME=2026-02-01",
                          type: "folder",
                          children: [
                            { name: "part-0001.parquet", type: "file" },
                          ],
                        },
                        {
                          name: "CALL_TIME=2026-02-02",
                          type: "folder",
                          children: [
                            { name: "part-0001.parquet", type: "file" },
                          ],
                        },
                        {
                          name: "CALL_TIME=2026-02-03",
                          type: "folder",
                          children: [
                            { name: "part-0001.parquet", type: "file" },
                          ],
                        },
                      ],
                    },
                    {
                      name: "dataset=csat_tv_out_calls",
                      type: "folder",
                      children: [
                        {
                          name: "CALL_TIME=2026-02-01",
                          type: "folder",
                          children: [
                            { name: "part-0001.parquet", type: "file" },
                          ],
                        },
                      ],
                    },
                    {
                      name: "dataset=csat_install_ftth_dbox",
                      type: "folder",
                      children: [
                        {
                          name: "CALL_TIME=2026-02-01",
                          type: "folder",
                          children: [
                            { name: "part-0001.parquet", type: "file" },
                          ],
                        },
                      ],
                    },
                    {
                      name: "dataset=csat_fix_adsl",
                      type: "folder",
                      children: [
                        {
                          name: "CALL_TIME=2026-02-01",
                          type: "folder",
                          children: [
                            { name: "part-0001.parquet", type: "file" },
                          ],
                        },
                      ],
                    },
                    {
                      name: "dataset=csat_boutique",
                      type: "folder",
                      children: [
                        {
                          name: "CALL_TIME=2026-02-01",
                          type: "folder",
                          children: [
                            { name: "part-0001.parquet", type: "file" },
                          ],
                        },
                      ],
                    },
                    {
                      name: "dataset=csat_agent_inb_calls",
                      type: "folder",
                      children: [
                        {
                          name: "CALL_TIME=2026-02-01",
                          type: "folder",
                          children: [
                            { name: "part-0001.parquet", type: "file" },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

interface TreeItemProps {
  node: TreeNode
  depth: number
  defaultOpen?: boolean
}

function TreeItem({ node, depth, defaultOpen = false }: TreeItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen || depth < 3)

  const highlightClasses = {
    bronze: "text-bronze font-medium",
    silver: "text-silver font-medium",
  }

  return (
    <div>
      <div
        className={cn(
          "flex cursor-pointer items-center gap-1.5 rounded px-1.5 py-1 transition-colors hover:bg-secondary",
          node.highlight && highlightClasses[node.highlight]
        )}
        style={{ paddingLeft: `${depth * 12 + 6}px` }}
        onClick={() => node.type === "folder" && setIsOpen(!isOpen)}
      >
        {node.type === "folder" && (
          <ChevronRight
            className={cn(
              "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-90"
            )}
          />
        )}
        {node.type === "folder" ? (
          isOpen ? (
            <FolderOpen className={cn("h-4 w-4 shrink-0", node.highlight ? highlightClasses[node.highlight] : "text-pyspark")} />
          ) : (
            <Folder className={cn("h-4 w-4 shrink-0", node.highlight ? highlightClasses[node.highlight] : "text-pyspark")} />
          )
        ) : (
          <File className="ml-4 h-4 w-4 shrink-0 text-muted-foreground" />
        )}
        <span className={cn("font-mono text-xs", !node.highlight && "text-foreground")}>
          {node.name}
        </span>
      </div>
      {node.type === "folder" && isOpen && node.children && (
        <div className="overflow-hidden transition-all duration-200">
          {node.children.map((child, i) => (
            <TreeItem key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function FileExplorer() {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">File System Hierarchy</h2>
        <p className="text-sm text-muted-foreground">
          HDFS path structure: <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">hdfs://lakehouse/env=prd/</code>
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bronze Layer */}
        <div className="rounded-lg border border-bronze/30 bg-bronze/5 p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-bronze" />
            <h3 className="font-semibold text-bronze">Bronze Layer</h3>
            <span className="rounded bg-bronze/20 px-2 py-0.5 text-xs text-bronze">Raw Files</span>
          </div>
          <div className="max-h-64 overflow-auto rounded bg-background/50 p-2">
            <TreeItem node={bronzeTree} depth={0} defaultOpen />
          </div>
        </div>

        {/* Silver Layer */}
        <div className="rounded-lg border border-silver/30 bg-silver/5 p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-silver" />
            <h3 className="font-semibold text-silver">Silver Layer</h3>
            <span className="rounded bg-silver/20 px-2 py-0.5 text-xs text-silver-foreground">Partitioned</span>
          </div>
          <div className="max-h-64 overflow-auto rounded bg-background/50 p-2">
            <TreeItem node={silverTree} depth={0} defaultOpen />
          </div>
        </div>
      </div>
    </section>
  )
}
