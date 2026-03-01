"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Layers, 
  BarChart3, 
  Globe, 
  ArrowRight,
  Clock,
  CheckCircle2,
  Circle
} from "lucide-react"

const roadmapItems = [
  {
    title: "Couche Gold",
    description: "Donnees agregees et optimisees pour la consommation metier",
    icon: Layers,
    status: "planned",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    details: [
      "Agregations metier pre-calculees",
      "Tables denormalisees pour la performance",
      "KPIs CX prets a l'emploi",
      "Historisation des metriques",
      "Partitionnement optimise pour les requetes analytiques"
    ],
    techStack: ["PySpark", "Iceberg", "HDFS"]
  },
  {
    title: "Exposition Data Domain via Starburst",
    description: "Federation et exposition des donnees via Starburst pour la consommation enterprise",
    icon: Globe,
    status: "planned",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    details: [
      "Catalogue de donnees unifie",
      "Acces SQL federe aux couches Bronze/Silver/Gold",
      "Governance et controle d'acces centralise",
      "Data Products exposes en self-service",
      "Connecteurs vers outils BI (Tableau, Power BI)"
    ],
    techStack: ["Starburst", "Iceberg", "Data Mesh"]
  },
  {
    title: "Dashboard CX",
    description: "Tableau de bord interactif pour le suivi de l'experience client",
    icon: BarChart3,
    status: "planned",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    details: [
      "Visualisation des scores CSAT par canal",
      "Suivi NPS Boutique en temps reel",
      "Analyse des tendances temporelles",
      "Drill-down par segment client",
      "Alertes sur degradation des indicateurs"
    ],
    techStack: ["Dataiku", "Gold Layer"]
  }
]

function StatusBadge({ status }: { status: string }) {
  if (status === "in-progress") {
    return (
      <Badge variant="outline" className="border-blue-500/50 bg-blue-500/10 text-blue-400">
        <Clock className="mr-1 h-3 w-3" />
        En cours
      </Badge>
    )
  }
  if (status === "done") {
    return (
      <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-400">
        <CheckCircle2 className="mr-1 h-3 w-3" />
        Termine
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="border-muted-foreground/50 bg-muted/30 text-muted-foreground">
      <Circle className="mr-1 h-3 w-3" />
      Planifie
    </Badge>
  )
}

export function ResteAFaireSection() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <p className="text-muted-foreground">
        Prochaines etapes pour completer l{"'"}architecture Data Lakehouse CX
      </p>

      {/* Roadmap Flow */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ArrowRight className="h-5 w-5 text-primary" />
            Feuille de route
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
            {/* Current State */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 ring-2 ring-green-500/50">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>
              <span className="text-sm font-medium text-green-400">Silver</span>
              <span className="text-xs text-muted-foreground">Complete</span>
            </div>

            <ArrowRight className="hidden h-6 w-6 text-muted-foreground lg:block" />
            <div className="h-6 w-px bg-muted-foreground lg:hidden" />

            {/* Gold */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/20 ring-2 ring-amber-500/50 ring-dashed">
                <Layers className="h-8 w-8 text-amber-400" />
              </div>
              <span className="text-sm font-medium text-amber-400">Gold</span>
              <span className="text-xs text-muted-foreground">Planifie</span>
            </div>

            <ArrowRight className="hidden h-6 w-6 text-muted-foreground lg:block" />
            <div className="h-6 w-px bg-muted-foreground lg:hidden" />

            {/* Starburst */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20 ring-2 ring-purple-500/50 ring-dashed">
                <Globe className="h-8 w-8 text-purple-400" />
              </div>
              <span className="text-sm font-medium text-purple-400">Starburst</span>
              <span className="text-xs text-muted-foreground">Planifie</span>
            </div>

            <ArrowRight className="hidden h-6 w-6 text-muted-foreground lg:block" />
            <div className="h-6 w-px bg-muted-foreground lg:hidden" />

            {/* Dashboard */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20 ring-2 ring-blue-500/50 ring-dashed">
                <BarChart3 className="h-8 w-8 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-blue-400">Dashboard</span>
              <span className="text-xs text-muted-foreground">Planifie</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        {roadmapItems.map((item) => (
          <Card key={item.title} className="border-border bg-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <StatusBadge status={item.status} />
              </div>
              <CardTitle className="mt-4 text-lg">{item.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Fonctionnalites
                </p>
                <ul className="space-y-2">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                      <Circle className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 fill-current text-primary" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Stack technique
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gold Layer Detail */}
      <Card className="border-amber-500/30 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-amber-400">
            <Layers className="h-5 w-5" />
            Focus: Couche Gold
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            La couche Gold represente le niveau le plus raffine du Lakehouse. Elle contient des donnees 
            agregees, denormalisees et optimisees pour la consommation directe par les equipes metier 
            et les outils de reporting.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <h4 className="mb-2 font-medium text-foreground">Caracteristiques</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>- Donnees pre-agregees par dimension metier</li>
                <li>- Schema fixe et documente</li>
                <li>- Performances optimisees pour les requetes</li>
                <li>- SLA de fraicheur garanti</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <h4 className="mb-2 font-medium text-foreground">Exemple CX</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>- GOLD_CX_DAILY_METRICS</li>
                <li>- GOLD_CX_CSAT_BY_CHANNEL</li>
                <li>- GOLD_CX_NPS_TRENDS</li>
                <li>- GOLD_CX_AGENT_PERFORMANCE</li>
              </ul>
            </div>
          </div>

          {/* Gold File Structure Preview */}
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Structure cible HDFS - Gold</p>
            <pre className="overflow-x-auto font-mono text-xs text-foreground">
{`hdfs://lakehouse/env=prd/gold/domain=cx/product=dashboard_cx/
  |-- dataset=cx_daily_metrics/
  |   |-- DATE=2026-02-01/
  |   |   |-- part-0001.parquet
  |   |-- DATE=2026-02-02/
  |       |-- part-0001.parquet
  |-- dataset=csat_by_channel/
  |   |-- CHANNEL=boutique/
  |   |-- CHANNEL=call_center/
  |   |-- CHANNEL=digital/
  |-- dataset=nps_trends/
      |-- PERIOD=monthly/
      |-- PERIOD=weekly/`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Starburst Integration */}
      <Card className="border-purple-500/30 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-purple-400">
            <Globe className="h-5 w-5" />
            Focus: Exposition via Starburst
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Starburst permet d'exposer le Data Domain CX comme un Data Product accessible en self-service. 
            Les consommateurs peuvent interroger les donnees via SQL sans connaitre la complexite sous-jacente.
          </p>
          
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <h4 className="mb-2 font-medium text-foreground">Architecture d'exposition</h4>
            <div className="flex flex-col items-center gap-4 py-4 md:flex-row md:justify-between">
              <div className="rounded-lg border border-border bg-card px-4 py-2 text-center">
                <p className="text-xs text-muted-foreground">Lakehouse</p>
                <p className="font-mono text-sm">HDFS + Iceberg</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
              <div className="rounded-lg border border-purple-500/50 bg-purple-500/10 px-4 py-2 text-center">
                <p className="text-xs text-purple-400">Federation</p>
                <p className="font-mono text-sm text-purple-400">Starburst</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
              <div className="rounded-lg border border-border bg-card px-4 py-2 text-center">
                <p className="text-xs text-muted-foreground">Consommateurs</p>
                <p className="font-mono text-sm">BI / Analytics</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-secondary/30 p-3">
              <h5 className="mb-1 text-sm font-medium text-foreground">Catalogue</h5>
              <p className="text-xs text-muted-foreground">
                Metadonnees centralisees et documentation automatique des datasets
              </p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3">
              <h5 className="mb-1 text-sm font-medium text-foreground">Securite</h5>
              <p className="text-xs text-muted-foreground">
                Controle d'acces par role et masquage des donnees sensibles
              </p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3">
              <h5 className="mb-1 text-sm font-medium text-foreground">Performance</h5>
              <p className="text-xs text-muted-foreground">
                Cache intelligent et optimisation des requetes distribuees
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
