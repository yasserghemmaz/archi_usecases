"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Database, FileCode2, HardDrive, ArrowRight, Code } from "lucide-react"

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
                    Architecture d'intégration Dataiku vers Iceberg pour le dashboard Comex (Use case CX).
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Visual Architecture */}
                <Card className="border-amber-500/20 shadow-sm bg-gradient-to-br from-background to-amber-500/5">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Database className="w-5 h-5 text-amber-500" />
                            Flux de Données Dataiku (Zone Gold)
                        </CardTitle>
                        <CardDescription>
                            Transformation des datasets source vers les tables Iceberg via des recettes PySpark.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full aspect-[1/2] rounded-lg overflow-hidden border shadow-sm bg-white/50 flex items-center justify-center">
                            {/* We use an img tag pointing to the public folder where the user should drop the screen */}
                            <img
                                src="/gold-ingestion.png"
                                alt="Gold Ingestion Layer"
                                className="object-contain w-full h-full"
                                onError={(e) => {
                                    // Fallback for when the image isn't saved yet
                                    e.currentTarget.style.display = 'none';
                                    const parent = e.currentTarget.parentElement;
                                    if (parent) {
                                        const fallback = document.createElement('div');
                                        fallback.className = 'flex flex-col items-center text-center p-6 text-muted-foreground';
                                        fallback.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image mb-4 opacity-50"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg><p>Veuillez sauvegarder la capture d\'écran sous <br/><code class="text-xs bg-muted p-1 rounded mt-2">public/gold-ingestion.png</code></p>';
                                        parent.appendChild(fallback);
                                    }
                                }}
                            />
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
                    <CardContent className="flex-1 flex">
                        <div className="bg-zinc-950 rounded-lg p-4 w-full overflow-x-auto text-sm font-mono text-zinc-300 border border-zinc-800">
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

# Lecture des données
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

function DataNode({ icon, title, type, color }: { icon: React.ReactNode, title: string, type: string, color: 'blue' | 'sky' }) {
    const colorMap = {
        blue: "border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40",
        sky: "border-sky-500/20 bg-sky-500/5 hover:border-sky-500/40",
    }

    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={`flex flex-col items-center justify-center p-3 rounded-lg border w-32 md:w-40 text-center cursor-default transition-colors ${colorMap[color]}`}>
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
