"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Database, FileCode2, HardDrive, ArrowRight, Code, Server, Sparkles } from "lucide-react"

export function UseCaseComexSection() {
    const flows = [
        { source: "CF_D_SERVICE", target: "test_cf_d_service" },
        { source: "CF_F_BUDGET_I_OPEX", target: "cf_f_budget_i_opex_copy" },
        { source: "CF_F_BUDGET_CAPEX", target: "cf_f_budget_capex_copy" },
        { source: "CF_F_PROFIT", target: "GOLD_F_PROFIT" },
        { source: "CF_F_LOSS", target: "CF_F_LOSS_COPY" },
        { source: "CF_F_BUDGET_OPEX", target: "CF_F_BUDGET_OPEX_copy" },
        { source: "CF_F_BUDGET_I_CAPEX", target: "CF_F_BUDGET_I_CAPEX_copy" },
        { source: "CF_D_LOSS", target: "CF_D_LOSS_copy" },
    ]

    return (
        <div className="space-y-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                    Use case dashboard Comex
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30">GOLD</Badge>
                </h2>
                <p className="text-muted-foreground mt-1">
                    Architecture d'intégration d'Oracle vers Iceberg pour le dashboard Comex (Use case CX).
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Visual Architecture */}
                <Card className="border-amber-500/20 shadow-sm bg-gradient-to-br from-background to-amber-500/5">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-amber-500" />
                            Ingestion Schématique (Zone Gold)
                        </CardTitle>
                        <CardDescription>
                            Transformation des données depuis la source Oracle vers les tables Iceberg via Dataiku PySpark.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
                            {/* Global Legend / Conceptual Header */}
                            <div className="flex justify-between items-center mb-6 px-4 py-3 bg-secondary/30 rounded-lg border border-border/50">
                                <span className="text-xs font-semibold text-red-500/80 uppercase tracking-widest flex items-center gap-1">
                                    <Server className="w-4 h-4" /> Source Oracle
                                </span>
                                <span className="text-xs font-semibold text-orange-500/80 uppercase tracking-widest flex items-center gap-1">
                                    <FileCode2 className="w-4 h-4" /> PySpark Dataiku
                                </span>
                                <span className="text-xs font-semibold text-sky-500/80 uppercase tracking-widest flex items-center gap-1">
                                    <HardDrive className="w-4 h-4" /> Datalake Iceberg
                                </span>
                            </div>

                            {flows.map((flow, idx) => (
                                <div key={idx} className="flex justify-between items-center group">
                                    <DataNode
                                        icon={<Server className="w-5 h-5 text-red-500" />}
                                        title={flow.source}
                                        type="Source Oracle"
                                        color="red"
                                    />

                                    <div className="flex-1 flex items-center justify-center relative px-2">
                                        <div className="h-[2px] w-full bg-border absolute z-0 overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-red-500/20 via-orange-500/50 to-sky-500/20 w-full"></div>
                                        </div>
                                        <div className="z-10 bg-background rounded-full p-2 border border-orange-500/40 shadow-sm shadow-orange-500/10 group-hover:scale-110 group-hover:bg-orange-500/10 transition-all">
                                            <FileCode2 className="w-4 h-4 text-orange-500" />
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-muted-foreground absolute right-2 z-10 bg-background" />
                                    </div>

                                    <DataNode
                                        icon={<HardDrive className="w-5 h-5 text-sky-500" />}
                                        title={flow.target}
                                        type="Table Iceberg"
                                        color="sky"
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* PySpark Script */}
                <Card className="border-border/50 shadow-sm flex flex-col">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Code className="w-5 h-5 text-orange-500" />
                            Recette PySpark Type
                        </CardTitle>
                        <CardDescription>
                            Script d'ingestion standardisé de Dataiku vers le Datalake Iceberg.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col gap-4">
                        <div className="bg-zinc-950 rounded-lg p-4 w-full flex-1 overflow-x-auto text-sm font-mono text-zinc-300 border border-zinc-800">
                            <pre className="text-xs leading-relaxed"><code className="language-python">{`from dataiku import spark as dkuspark
from pyspark import SparkContext
from pyspark.sql import SQLContext
from pyspark.sql import SparkSession

# Configuration de la session Spark avec Iceberg
spark = SparkSession.builder \\
    .appName("Iceberg") \\
    .config("spark.sql.catalog.iceberg_catalog", "org.apache.iceberg.spark.SparkCatalog") \\
    .config("spark.sql.catalog.iceberg_catalog.type", "hive") \\
    .config("spark.sql.catalog.iceberg_catalog.warehouse", "/user/dataiku/dataiku2/lakehouse/prd/gold/comex/dashboard_comex") \\
    .enableHiveSupport() \\
    .getOrCreate()

sc = spark.sparkContext
sqlContext = SQLContext(sc)

# Lecture des données (via la connexion Oracle dans Dataiku)
CF_F_PROFIT = dataiku.Dataset("CF_D_SERVICE")
CF_F_PROFIT_df = dkuspark.get_dataframe(sqlContext, CF_F_PROFIT)

# Écriture dans la table Iceberg en utilisant le nom complet de la table
CF_F_PROFIT_df.writeTo("iceberg_catalog.dku_dataiku2.GOLD_CF_D_SERVICE") \\
    .using("iceberg") \\
    .overwritePartitions()`}</code></pre>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function DataNode({ icon, title, type, color }: { icon: React.ReactNode, title: string, type: string, color: 'blue' | 'sky' | 'red' | 'orange' }) {
    const colorMap = {
        blue: "border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40 text-blue-700 dark:text-blue-400",
        sky: "border-sky-500/20 bg-sky-500/5 hover:border-sky-500/40 text-sky-700 dark:text-sky-400",
        red: "border-red-500/20 bg-red-500/5 hover:border-red-500/40 text-red-700 dark:text-red-400",
        orange: "border-orange-500/20 bg-orange-500/5 hover:border-orange-500/40 text-orange-700 dark:text-orange-400",
    }

    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={`flex flex-col items-center justify-center p-3 rounded-lg border w-28 md:w-36 text-center cursor-default transition-all duration-300 shadow-sm hover:shadow ${colorMap[color]}`}>
                        <div className="mb-2">
                            {icon}
                        </div>
                        <span className="text-[10px] md:text-xs font-semibold truncate w-full" title={title}>
                            {title}
                        </span>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                    <p className="font-semibold">{title}</p>
                    <p className="text-muted-foreground">{type}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
