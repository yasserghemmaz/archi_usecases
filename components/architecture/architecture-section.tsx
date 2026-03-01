"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
    Server, Database, Activity, AlertTriangle, RefreshCw, BarChart3, Users, Eye, ArrowRight, ArrowDown, Sparkles, LayoutDashboard
} from "lucide-react"
import React, { useState } from "react"

export function ArchitectureSection() {
    const [activeView, setActiveView] = useState("legacy")

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Schémas d'Architecture</h2>
                    <p className="text-muted-foreground mt-1">
                        Visualisez le flux d'informations du système actuel (Legacy) et l'architecture modernisée (Cible).
                    </p>
                </div>

                <Tabs value={activeView} onValueChange={setActiveView} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="legacy">Architecture Actuelle</TabsTrigger>
                        <TabsTrigger value="cible">Architecture Cible</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="relative border border-border/50 bg-secondary/10 rounded-xl p-8 overflow-x-auto min-h-[800px]">
                {activeView === "legacy" ? <LegacyArchitecture /> : <TargetArchitecture />}
            </div>
        </div>
    )
}

function LegacyArchitecture() {
    return (
        <div className="min-w-[800px] flex flex-col items-center max-w-5xl mx-auto space-y-4 animate-in fade-in zoom-in-95 duration-500">

            <div className="absolute top-0 right-0 p-4">
                <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">Ingestion</Badge>
                    <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20">Traitement</Badge>
                    <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">Anomalies</Badge>
                    <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">Agrégation</Badge>
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">Web UI</Badge>
                </div>
            </div>

            {/* Layer 1: Source */}
            <div className="w-full flex justify-center pb-2">
                <PipelineNode
                    icon={<Server className="w-5 h-5 text-blue-400" />}
                    title="Serveurs AAA / Radius"
                    type="Source Externe"
                    color="blue"
                    description="Ingestion continue des logs d'authentification et de comptabilité réseau depuis les routeurs centraux."
                />
            </div>

            <FlowArrow />

            {/* Layer 2: Ingestion */}
            <div className="w-full flex items-center justify-center gap-12">
                <PipelineNode
                    icon={<Activity className="w-5 h-5 text-blue-400" />}
                    title="fetch_aaa.py"
                    type="Script Python (Daemon)"
                    color="blue"
                    isScript
                    description="Script démon continu qui se connecte aux serveurs pour parser et extraire les lignes de log pertinentes."
                />
                <FlowArrow horizontal />
                <PipelineNode
                    icon={<Database className="w-5 h-5 text-slate-400" />}
                    title="Logs Parsés (CSV)"
                    type="Fichiers Locaux"
                    color="slate"
                    description="Fichiers locaux temporaires servant de tampon avant l'intégration en base."
                />
            </div>

            <FlowArrow />

            {/* Layer 3: Live State */}
            <div className="w-full border-t border-b border-border/50 py-8 relative">
                <div className="absolute left-4 top-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    Coeur du Système (Temps Réel)
                </div>

                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center justify-center gap-12 w-full">
                        <PipelineNode
                            icon={<Database className="w-5 h-5 text-slate-400" />}
                            title="master_client_database.db"
                            type="SQLite (Topologie)"
                            color="slate"
                            description="Base de données topologique de référence contenant l'arbre OLT > SLOT > PORT et coordonnées GPS."
                        />
                        <FlowArrow horizontal direction="both" />
                        <PipelineNode
                            icon={<RefreshCw className="w-5 h-5 text-orange-400" />}
                            title="fair_agent.py"
                            type="Script Python (Session Live)"
                            color="orange"
                            isScript
                            description="Agent central en mémoire gérant le cycle de vie de chaque connexion client (Start/Stop)."
                        />
                        <FlowArrow horizontal />
                        <PipelineNode
                            icon={<Database className="w-5 h-5 text-orange-400" />}
                            title="client_status.db"
                            type="SQLite (État immédiat)"
                            color="orange"
                            description="État immédiat en direct de chaque client FTTH et registre temporel des déconnexions."
                        />
                    </div>
                </div>
            </div>

            <FlowArrow />

            {/* Layer 4: Intelligence & Analytics */}
            <div className="w-full grid grid-cols-2 gap-16 pt-4">

                {/* Col 1: Detection */}
                <div className="flex flex-col items-center space-y-4">
                    <Badge variant="secondary" className="mb-2">Moteur de Détection</Badge>
                    <PipelineNode
                        icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
                        title="fair_detector.py & fair_tracker.py"
                        type="Scripts Multi-Thread"
                        color="red"
                        isScript
                        description="Moteur identifiant les pannes de groupe (SPLITTER/OLT) par seuils statistiques sur fenêtres de temps."
                    />
                    <FlowArrow />
                    <PipelineNode
                        icon={<Database className="w-5 h-5 text-red-400" />}
                        title="fair_ftth_incidents.db"
                        type="SQLite (Journal pannes)"
                        color="red"
                        description="Base listant les tickets ouverts pour chaque panne root-cause détectée."
                    />
                </div>

                {/* Col 2: Aggregation */}
                <div className="flex flex-col items-center space-y-4">
                    <Badge variant="secondary" className="mb-2">Agrégation de Données</Badge>
                    <PipelineNode
                        icon={<BarChart3 className="w-5 h-5 text-purple-400" />}
                        title="alarm_manager.py & aggregator.py"
                        type="Scripts Analytiques"
                        color="purple"
                        isScript
                        description="Scripts croisant les événements bruts avec la topologie pour générer les KPIs globaux par ville."
                    />
                    <FlowArrow />
                    <div className="flex gap-4">
                        <PipelineNode
                            icon={<Database className="w-5 h-5 text-purple-400" />}
                            title="advanced_analytics.db"
                            type="SQLite"
                            color="purple"
                            description="Base contenant les KPIs minutes par minute (Trends)."
                        />
                        <PipelineNode
                            icon={<Database className="w-5 h-5 text-purple-400" />}
                            title="live_alarms.db"
                            type="SQLite"
                            color="purple"
                            description="Base contenant les alarmes actives (KPI Live)."
                        />
                    </div>
                </div>

            </div>

            <div className="w-full flex justify-around mt-4">
                <FlowArrow className="ml-24" />
                <FlowArrow className="mr-24" />
            </div>

            {/* Layer 5: Web UI */}
            <div className="w-full border border-green-500/20 bg-green-500/5 rounded-xl p-8 relative mt-8">
                <div className="absolute left-4 top-4 text-xs font-semibold text-green-500/70 uppercase tracking-widest">
                    Couche de Présentation
                </div>

                <div className="flex flex-col items-center gap-6 mt-4">
                    <div className="flex justify-center gap-12 w-full">
                        <PipelineNode
                            icon={<Database className="w-5 h-5 text-slate-400" />}
                            title="users.db"
                            type="SQLite (Auth)"
                            color="slate"
                            description="Base de rôles et habilitations des utilisateurs de la plateforme."
                        />
                        <FlowArrow horizontal />
                        <PipelineNode
                            icon={<Activity className="w-5 h-5 text-green-400" />}
                            title="app.py (Flask + Eventlet)"
                            type="Serveur Web Gunicorn"
                            color="green"
                            isScript
                            description="Serveur Backend exposant API REST JSON et Websockets."
                        />
                        <FlowArrow horizontal direction="both" />
                        <PipelineNode
                            icon={<Users className="w-5 h-5 text-green-400" />}
                            title="Clients Web (Browsers)"
                            type="Websockets / HTTP"
                            color="green"
                            description="Postes de supervision affichant Graphes et Cartes géographiques React."
                        />
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded text-sm text-muted-foreground w-full justify-center text-center">
                        <Eye className="w-4 h-4 text-primary" />
                        <span>Le backend Flask expose de multiples endpoints JSON et synchronise l'UI React via Socket.io</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

function TargetArchitecture() {
    return (
        <div className="min-w-[800px] flex flex-col items-center max-w-5xl mx-auto space-y-4 animate-in fade-in zoom-in-95 duration-500">

            <div className="absolute top-0 right-0 p-4">
                <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline" className="bg-[#CD7F32]/10 text-[#CD7F32] border-[#CD7F32]/30">Bronze</Badge>
                    <Badge variant="outline" className="bg-[#C0C0C0]/10 text-[#C0C0C0] border-[#C0C0C0]/40">Silver</Badge>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30">Gold</Badge>
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">Dashboard</Badge>
                </div>
            </div>

            {/* Layer 1: Source */}
            <div className="w-full flex justify-center pb-2">
                <PipelineNode
                    icon={<Server className="w-5 h-5 text-blue-400" />}
                    title="Serveurs AAA / Radius"
                    type="Source Externe (Logs)"
                    color="blue"
                    description="Fichiers de logs poussés dynamiquement ou collectés vers le stockage de base."
                />
            </div>

            <FlowArrow />

            {/* Layer 2: Bronze (Ingestion) */}
            <div className="w-full border-t border-b border-border/50 py-8 relative bg-[#CD7F32]/5 rounded-xl">
                <div className="absolute left-4 top-4 text-xs font-semibold text-[#CD7F32] uppercase tracking-widest flex items-center gap-2">
                    Couche Bronze <Badge variant="outline" className="ml-2 bg-[#CD7F32]/20 border-[#CD7F32]/30">Ingestion Raw</Badge>
                </div>

                <div className="flex items-center justify-center gap-12 w-full mt-4">
                    <PipelineNode
                        icon={<Sparkles className="w-5 h-5 text-[#CD7F32]" />}
                        title="Recettes Spark (Parsage)"
                        type="Micro-batch Dataiku"
                        color="bronze"
                        isScript
                        description="Extraction, nettoyage structuré et ajout de colonnes de partitionnement."
                    />
                    <FlowArrow horizontal />
                    <PipelineNode
                        icon={<Database className="w-5 h-5 text-[#CD7F32]" />}
                        title="bronze_aaa_logs"
                        type="Table Iceberg (Append)"
                        color="bronze"
                        description="Historique brut intégral sans modification. Single source of truth."
                    />
                </div>
            </div>

            <FlowArrow />

            {/* Layer 3: Silver (Session Live) */}
            <div className="w-full border-t border-b border-border/50 py-8 relative bg-[#C0C0C0]/5 rounded-xl">
                <div className="absolute left-4 top-4 text-xs font-semibold text-[#C0C0C0] uppercase tracking-widest flex items-center gap-2">
                    Couche Silver <Badge variant="outline" className="ml-2 bg-[#C0C0C0]/20 border-[#C0C0C0]/30">Raffinage & État</Badge>
                </div>

                <div className="flex items-center justify-center gap-6 w-full mt-4">
                    <PipelineNode
                        icon={<Database className="w-5 h-5 text-[#C0C0C0]" />}
                        title="master_client_db"
                        type="Table Iceberg (Statique)"
                        color="silver"
                        description="Référentiel client importé périodiquement (Topologie OLT)."
                    />
                    <FlowArrow horizontal />
                    <div className="flex flex-col gap-4">
                        <PipelineNode
                            icon={<Sparkles className="w-5 h-5 text-[#C0C0C0]" />}
                            title="Recettes de Fenêtrage (Window)"
                            type="PySpark (Calcul Session)"
                            color="silver"
                            isScript
                            description="PySpark Window functions partitionBy(SessionId) pour calculer durées et logs d'état."
                        />
                    </div>
                    <FlowArrow horizontal />
                    <div className="flex flex-col gap-4">
                        <PipelineNode
                            icon={<Database className="w-5 h-5 text-[#C0C0C0]" />}
                            title="silver_user_status"
                            type="Table Iceberg (Snapshot)"
                            color="silver"
                            description="État final ou en cours de tous les clients (Upsert/Snapshot)."
                        />
                        <PipelineNode
                            icon={<Database className="w-5 h-5 text-[#C0C0C0]" />}
                            title="silver_events_hist"
                            type="Table Iceberg (Append)"
                            color="silver"
                            description="Historique complet et qualifié de toutes les sessions utilisateurs."
                        />
                    </div>
                </div>
            </div>

            <FlowArrow />

            {/* Layer 4: Gold (Analytique et Anomalies) */}
            <div className="w-full border-t border-b border-border/50 py-8 relative bg-amber-500/5 rounded-xl">
                <div className="absolute left-4 top-4 text-xs font-semibold text-amber-500 uppercase tracking-widest flex items-center gap-2">
                    Couche Gold <Badge variant="outline" className="ml-2 bg-amber-500/20 border-amber-500/30">Métier & BI</Badge>
                </div>

                <div className="w-full grid grid-cols-2 gap-16 pt-8">

                    {/* Col 1: Detection */}
                    <div className="flex flex-col items-center space-y-4">
                        <PipelineNode
                            icon={<Sparkles className="w-5 h-5 text-amber-500" />}
                            title="Recettes Group & ML"
                            type="Détection Dataiku (Python/Spark)"
                            color="gold"
                            isScript
                            description="Algorithmes fonctionnant sur les fenêtres temporelles pour détecter les pannes de masse (OLT/SPLITTER)."
                        />
                        <FlowArrow />
                        <PipelineNode
                            icon={<Database className="w-5 h-5 text-amber-500" />}
                            title="gold_incidents"
                            type="Table Iceberg (Tickets)"
                            color="gold"
                            description="Table Iceberg finale (Métier) consignant les incidents qualifiés/tickets à ouvrir."
                        />
                    </div>

                    {/* Col 2: Aggregation */}
                    <div className="flex flex-col items-center space-y-4">
                        <PipelineNode
                            icon={<Sparkles className="w-5 h-5 text-amber-500" />}
                            title="Recettes Visuelles (Join/Group)"
                            type="Agregation Dataiku"
                            color="gold"
                            isScript
                            description="Préparation automatisée des jointures temporelles et agrégations spatiales."
                        />
                        <FlowArrow />
                        <div className="flex gap-4">
                            <PipelineNode
                                icon={<Database className="w-5 h-5 text-amber-500" />}
                                title="gold_city_trends"
                                type="Table Iceberg"
                                color="gold"
                                description="Séries temporelles prégénérées : agrégats d'état de connexion par ville."
                            />
                            <PipelineNode
                                icon={<Database className="w-5 h-5 text-amber-500" />}
                                title="gold_live_alarms"
                                type="Table Iceberg"
                                color="gold"
                                description="Vue filtrée des alarmes actives à l'instant T prêtes à être ingérées."
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-around mt-4">
                <FlowArrow className="ml-24" />
                <FlowArrow className="mr-24" />
            </div>

            {/* Layer 5: Exalead Vue 360 */}
            <div className="w-full border border-green-500/20 bg-green-500/5 rounded-xl p-8 relative mt-4">
                <div className="absolute left-4 top-4 text-xs font-semibold text-green-500/70 uppercase tracking-widest">
                    Couche de Présentation (Exalead)
                </div>

                <div className="flex flex-col items-center gap-6 mt-4">
                    <div className="flex justify-center gap-12 w-full">
                        <PipelineNode
                            icon={<LayoutDashboard className="w-5 h-5 text-green-400" />}
                            title="Connexion Starburst"
                            type="Exposition Iceberg"
                            color="green"
                            isScript
                            description="Couche d'exposition requêtant Iceberg massivement en parallèle sans charge Backend."
                        />
                        <FlowArrow horizontal />
                        <a href="https://vue360.byfrontline.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <PipelineNode
                                icon={<Eye className="w-5 h-5 text-green-400" />}
                                title="Exalead Vue 360"
                                type="Visualisation & Supervision"
                                color="green"
                                description="Application Frontline connectée nativement au Datalake pour une vue 360 temps réel."
                            />
                        </a>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded text-sm text-muted-foreground w-full justify-center text-center">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span>Plus de Flask intermédiaire : les données "Gold" sont ingérées ou exposées directement pour <a href="https://vue360.byfrontline.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">vue360.byfrontline.com</a>.</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

function PipelineNode({
    icon,
    title,
    type,
    color,
    isScript = false,
    description
}: {
    icon: React.ReactNode,
    title: string,
    type: string,
    color: "blue" | "orange" | "red" | "purple" | "green" | "slate" | "bronze" | "silver" | "gold",
    isScript?: boolean,
    description?: React.ReactNode
}) {
    const colorMap = {
        blue: "border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-500/60",
        orange: "border-orange-500/40 bg-orange-500/10 hover:bg-orange-500/20 hover:border-orange-500/60",
        red: "border-red-500/40 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/60",
        purple: "border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500/60",
        green: "border-green-500/40 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500/60",
        slate: "border-slate-500/40 bg-slate-500/10 hover:bg-slate-500/20 hover:border-slate-500/60",
        bronze: "border-[#CD7F32]/40 bg-[#CD7F32]/10 hover:bg-[#CD7F32]/20 hover:border-[#CD7F32]/60",
        silver: "border-[#C0C0C0]/40 bg-[#C0C0C0]/10 hover:bg-[#C0C0C0]/20 hover:border-[#C0C0C0]/60",
        gold: "border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-500/60",
    }

    const NodeContent = (
        <div className={`transition-all duration-300 rounded-xl border-2 shadow-sm p-4 w-[220px] flex flex-col items-center text-center gap-2 cursor-help ${colorMap[color]}`}>
            <div className={`p-2 rounded-full ${isScript ? 'bg-background/80 shadow-inner' : 'bg-background shadow-sm'} ${isScript ? 'animate-pulse duration-3000' : ''}`}>
                {icon}
            </div>
            <h3 className={`font-semibold text-sm ${isScript ? 'font-mono tracking-tight text-primary' : 'text-foreground'}`}>
                {title}
            </h3>
            <p className="text-xs text-muted-foreground">{type}</p>
        </div>
    )

    if (!description) return NodeContent

    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {NodeContent}
                </TooltipTrigger>
                <TooltipContent
                    side="bottom"
                    sideOffset={15}
                    className="max-w-[320px] text-sm leading-relaxed p-4 border border-border/50 shadow-2xl bg-zinc-950/95 backdrop-blur-md text-zinc-50 dark:bg-zinc-900/95 dark:text-zinc-50 z-50 rounded-xl"
                >
                    {description}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

function FlowArrow({ horizontal = false, direction = "forward", className = "" }: { horizontal?: boolean, direction?: "forward" | "both", className?: string }) {
    if (horizontal) {
        if (direction === "both") {
            return (
                <div className={`flex items-center text-muted-foreground/40 ${className}`}>
                    <ArrowRight className="w-4 h-4 rotate-180 animate-pulse delay-75 text-primary/50" />
                    <div className="w-8 h-[2px] bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 mx-1"></div>
                    <ArrowRight className="w-4 h-4 animate-pulse text-primary/50" />
                </div>
            )
        }
        return (
            <div className={`flex items-center space-x-1 text-muted-foreground/40 ${className}`}>
                <div className="w-8 h-[2px] bg-gradient-to-r from-muted-foreground/20 to-primary/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/20 w-1/2 animate-pulse"></div>
                </div>
                <ArrowRight className="w-4 h-4 animate-pulse text-primary/70" />
            </div>
        )
    }

    return (
        <div className={`flex flex-col items-center space-y-1 text-muted-foreground/40 py-2 ${className}`}>
            <div className="w-[2px] h-8 bg-gradient-to-b from-muted-foreground/20 to-primary/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 h-1/2 animate-pulse"></div>
            </div>
            <ArrowDown className="w-4 h-4 animate-pulse text-primary/70" />
        </div>
    )
}
