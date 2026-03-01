"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Database,
  ArrowRight,
  Server,
  Activity,
  AlertTriangle,
  BarChart3,
  Users,
  HardDrive,
  Workflow,
  RefreshCw,
  Eye,
  Layers
} from "lucide-react"

import { ArchitectureSection } from "@/components/architecture/architecture-section"

export function Vue360Section() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-3 bg-secondary">
        <TabsTrigger value="overview" className="text-xs sm:text-sm">
          Overview du Projet
        </TabsTrigger>
        <TabsTrigger value="architecture" className="text-xs sm:text-sm">
          Schéma d'Architecture
        </TabsTrigger>
        <TabsTrigger value="migration" className="text-xs sm:text-sm">
          Schema de Migration
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <OverviewSection />
      </TabsContent>

      <TabsContent value="architecture">
        <ArchitectureSection />
      </TabsContent>

      <TabsContent value="migration">
        <MigrationSection />
      </TabsContent>
    </Tabs>
  )
}

function OverviewSection() {
  return (
    <div className="space-y-8">
      {/* Project Description */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-foreground">
            <Eye className="h-5 w-5 text-primary" />
            Projet FAIR - FTTH Supervision
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            Le systeme FAIR est base sur une <strong className="text-foreground">architecture decouplee</strong> ou
            des scripts Python persistants en arriere-plan effectuent le traitement lourd des donnees,
            tandis qu{"'"}une application web allegee (Flask) ne fait que lire les bases de donnees pre-calculees
            pour assurer une vitesse maximale.
          </p>
        </CardContent>
      </Card>

      {/* Architecture Flow Diagram */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Architecture Globale et Flux de Donnees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px] space-y-6">
              {/* Layer Labels */}
              <div className="grid grid-cols-5 gap-4 text-center">
                <div className="rounded-lg bg-blue-500/10 p-2 text-xs font-medium text-blue-400 flex items-center justify-between">
                  <span>Sources & Ingestion</span>
                  <ArrowRight className="h-4 w-4 opacity-50 hidden xl:block" />
                </div>
                <div className="rounded-lg bg-orange-500/10 p-2 text-xs font-medium text-orange-400 flex items-center justify-between">
                  <span>Traitement Primaire</span>
                  <ArrowRight className="h-4 w-4 opacity-50 hidden xl:block" />
                </div>
                <div className="rounded-lg bg-red-500/10 p-2 text-xs font-medium text-red-400 flex items-center justify-between">
                  <span>Analyse d{"'"}Incidents</span>
                  <ArrowRight className="h-4 w-4 opacity-50 hidden xl:block" />
                </div>
                <div className="rounded-lg bg-purple-500/10 p-2 text-xs font-medium text-purple-400 flex items-center justify-between">
                  <span>Agregation & Caches</span>
                  <ArrowRight className="h-4 w-4 opacity-50 hidden xl:block" />
                </div>
                <div className="rounded-lg bg-green-500/10 p-2 text-xs font-medium text-green-400">
                  <span>Presentation Web</span>
                </div>
              </div>

              {/* Flow Diagram */}
              <div className="grid grid-cols-5 gap-4 items-start">
                {/* Column 1: Sources */}
                <div className="space-y-3">
                  <FlowBox
                    icon={<Server className="h-4 w-4" />}
                    title="Serveurs AAA"
                    subtitle="Logs"
                    color="blue"
                  />
                  <FlowBox
                    icon={<Database className="h-4 w-4" />}
                    title="fetch_aaa.py"
                    subtitle="SSH / Logs → Parsing"
                    color="blue"
                    isScript
                  />
                  <FlowBox
                    icon={<HardDrive className="h-4 w-4" />}
                    title="fichiers CSV"
                    subtitle="Lecture incrementale"
                    color="blue"
                  />
                </div>

                {/* Column 2: Traitement Primaire */}
                <div className="space-y-3">
                  <FlowBox
                    icon={<Activity className="h-4 w-4" />}
                    title="fair_agent.py"
                    subtitle="Etat de session (Start/Stop)"
                    color="orange"
                    isScript
                  />
                  <FlowBox
                    icon={<Database className="h-4 w-4" />}
                    title="master_client_database.db"
                    subtitle="Topologie reseau"
                    color="orange"
                  />
                  <FlowBox
                    icon={<Database className="h-4 w-4" />}
                    title="client_status.db"
                    subtitle="Etat live clients"
                    color="orange"
                  />
                </div>

                {/* Column 3: Analyse */}
                <div className="space-y-3">
                  <FlowBox
                    icon={<AlertTriangle className="h-4 w-4" />}
                    title="fair_detector.py"
                    subtitle="Creation tickets"
                    color="red"
                    isScript
                  />
                  <FlowBox
                    icon={<RefreshCw className="h-4 w-4" />}
                    title="fair_tracker.py"
                    subtitle="Cloture (Recovered)"
                    color="red"
                    isScript
                  />
                  <FlowBox
                    icon={<Database className="h-4 w-4" />}
                    title="fair_ftth_incidents.db"
                    subtitle="Journal des incidents"
                    color="red"
                  />
                </div>

                {/* Column 4: Agregation */}
                <div className="space-y-3">
                  <FlowBox
                    icon={<Workflow className="h-4 w-4" />}
                    title="alarm_manager.py"
                    subtitle="Alarmes groupees"
                    color="purple"
                    isScript
                  />
                  <FlowBox
                    icon={<BarChart3 className="h-4 w-4" />}
                    title="aggregator.py"
                    subtitle="Tendances Villes/GPON"
                    color="purple"
                    isScript
                  />
                  <FlowBox
                    icon={<Database className="h-4 w-4" />}
                    title="live_alarms.db"
                    subtitle="advanced_analytics.db"
                    color="purple"
                  />
                </div>

                {/* Column 5: Presentation */}
                <div className="space-y-3">
                  <FlowBox
                    icon={<Eye className="h-4 w-4" />}
                    title="app.py / Flask"
                    subtitle="Calcule KPIs"
                    color="green"
                    isScript
                  />
                  <FlowBox
                    icon={<Users className="h-4 w-4" />}
                    title="users.db"
                    subtitle="Authentification"
                    color="green"
                  />
                  <FlowBox
                    icon={<Database className="h-4 w-4" />}
                    title="dashboard_analytics.db"
                    subtitle="Metriques globales"
                    color="green"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scripts Details - Detection */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Partie 1 : Detection (Workflow Temps Reel)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScriptDetail
            name="fetch_aaa.py"
            role="Ingestion"
            description="Se connecte aux serveurs AAA pour recuperer les logs d'accounting incrementaux."
            input="Fichiers logs bruts sur serveurs distants via SSH"
            logic="Suit le numero de la derniere ligne lue ('last read line') pour eviter les doublons. Gere la taille variable des lignes, notamment pour les 'DISCONNECT NOTIFICATION'."
            output="Fichiers CSV normalises avec les colonnes Event_Timestamp, Acct_Status_Typ, User_Name, NAS_IP, Acct_Session_Id"
          />
          <ScriptDetail
            name="fair_agent.py"
            role="Maintien d'etat"
            description="Met a jour en temps reel le statut individuel de chaque client FTTH."
            input="Fichiers CSV generes par fetch_aaa.py"
            logic="Gere un 'Live State'"
            output="Met a jour la base client_status.db (table user_status avec etats Start/Stop/TIMEOUT et historique ftth_disconnection_events)"
          />
          <ScriptDetail
            name="fair_detector.py"
            role="Creation d'Incidents"
            description="Detecte les anomalies de masse ou les pannes materielles (hardware failures) basees sur les deconnexions."
            input="client_status.db (etat live) + master_client_database.db (referentiel topology)"
            logic="Analyse les flux pour grouper les pannes par equipement (ex: PON_PORT_FAILURE)"
            output="Ecrit les incidents detectes dans fair_ftth_incidents.db (table incidents)"
          />
          <ScriptDetail
            name="fair_tracker.py"
            role="Gestion du cycle de vie"
            description="Verifie l'etat des clients impactes par un incident ouvert pour le cloturer s'ils se reconnectent."
            input="client_status.db (live) + fair_ftth_incidents.db (incidents ouverts)"
            logic="Scrutateur de 'Recovered'"
            output="Met a jour la table incidents (statut = RECOVERED, ResolutionTimestamp et downtime)"
          />
        </CardContent>
      </Card>

      {/* Scripts Details - Dashboard */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Partie 2 : Dashboard (Agregateurs et UI)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Les scripts suivants tournent en arriere-plan comme services systemd pour peupler des &quot;caches&quot;
            ultra-rapides, evitant a l{"'"}app web de faire des calculs complexes.
          </p>
          <ScriptDetail
            name="alarm_manager.py"
            role="Alarmes Live"
            description="Construit les objets complexes des alarmes live pour les afficher."
            input="client_status.db et master_client_database.db"
            logic="Croise l'etat actuel des utilisateurs pour grouper les deconnexions par zone geographique ou de plaque, et calcule des disponibilites/KPI"
            output="Genere la table alarms dans live_alarms.db"
          />
          <ScriptDetail
            name="aggregator.py"
            role="Graphiques temporels"
            description="Alimente les donnees des graphiques temporels (Vues Avancees)."
            input="Donnees brutes de statut"
            logic="Agrege minute par minute, par site (ville / site GPON), les compteurs online/offline"
            output="advanced_analytics.db (tables city_trends, gpon_trends)"
          />
          <ScriptDetail
            name="app.py"
            role="Application Web Flask"
            description="Serveur web Gunicorn (avec eventlet) presentant le Dashboard."
            input="Lit toutes les bases SQLite preparees (caches et bases raw) et gere l'authentification avec users.db"
            logic="Possede un 'background thread' interne pour calculer minute par minute les KPIs globaux (clients down, offline > 30min, etc.)"
            output="Interfaces HTML (clients par Websocket JS) et ecriture des logs dans dashboard_analytics.db"
          />
        </CardContent>
      </Card>

      {/* SQLite Topology */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Topologie des Donnees (SQLite)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Le choix de SQLite est judicieux car segmente par responsabilite pour minimiser le &quot;locking&quot; :
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <h4 className="font-medium text-foreground mb-2">Raw Data (Inputs directs)</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><code className="text-primary">master_client_database.db</code> - Topologie reseau statique</li>
                <li><code className="text-primary">client_status.db</code> - Etat de session immediat (volatile)</li>
                <li><code className="text-primary">fair_ftth_incidents.db</code> - Journal des anomalies</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <h4 className="font-medium text-foreground mb-2">Caches de Visualisation</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><code className="text-primary">live_alarms.db</code> - Alarmes structurees</li>
                <li><code className="text-primary">advanced_analytics.db</code> - Donnees historiques</li>
                <li><code className="text-primary">dashboard_analytics.db</code> - Metriques Top Level</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <h4 className="font-medium text-foreground mb-2">Systeme (Admin)</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><code className="text-primary">users.db</code> - Utilisateurs et audit</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MigrationSection() {
  return (
    <div className="space-y-8">
      {/* Migration Header */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-foreground">
            <Layers className="h-5 w-5 text-primary" />
            Adaptation des Scripts FAIR pour Dataiku (Spark / Microbatch)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            Ce document detaille la demarche pour transposer les anciens scripts Python natifs vers des
            <strong className="text-foreground"> Recettes PySpark dans Dataiku</strong>. L{"'"}objectif est de produire
            les memes resultats finaux (les bases d{"'"}alarmes et de KPIs) qui viendront alimenter directement
            le nouveau Dashboard, en <strong className="text-foreground">eliminant completement l{"'"}application Flask et SQLite</strong>.
          </p>
        </CardContent>
      </Card>

      {/* Migration Flow Visual */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">La Pipeline Dataiku (Flow)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Dans Dataiku, la pipeline sera divisee en <strong className="text-foreground">Recettes PySpark</strong> (ou recettes visuelles Spark SQL)
            fonctionnant en <strong className="text-foreground">Micro-batch</strong> (ex: declenchees toutes les 1 ou 5 minutes via le Scenario Dataiku).
          </p>

          {/* Visual Migration Diagram */}
          <div className="rounded-lg border border-border bg-secondary/20 p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Ancien */}
              <div className="flex-1 rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                <h4 className="text-sm font-medium text-red-400 mb-3">Ancien Systeme</h4>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30">Python</Badge>
                    <span>Scripts natifs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30">SQLite</Badge>
                    <span>Bases locales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30">Flask</Badge>
                    <span>Application web</span>
                  </div>
                </div>
              </div>

              <ArrowRight className="h-8 w-8 text-primary rotate-90 lg:rotate-0" />

              {/* Nouveau */}
              <div className="flex-1 rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                <h4 className="text-sm font-medium text-green-400 mb-3">Nouveau Systeme</h4>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">PySpark</Badge>
                    <span>Recettes Dataiku</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">Iceberg/HDFS</Badge>
                    <span>Stockage distribue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">Exalead</Badge>
                    <span>Vue 360 Supervision</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bronze Layer - Ingestion */}
      <MigrationCard
        layer="Bronze"
        layerColor="bronze"
        title="A. Ingestion Micro-batch (Couche Bronze)"
        ancienScript="fetch_aaa.py"
        description="Puisque vous effectuez l'ingestion avec Spark en microbatch sur Dataiku, l'idee est de lire les nouveaux logs (fichiers plats deposes sur HDFS ou via Kafka/Syslog) et utiliser une Recette Spark pour parser les lignes (separateur |), aligner les colonnes manquantes (Padding)."
        datasetSortie="bronze_aaa_logs (sur Iceberg/HDFS), configure en ajout uniquement (Append)"
        codeExample={`# Lecture des logs et parsing
df_logs = spark.read.text("hdfs://path/to/logs")
df_parsed = df_logs.select(
    F.split(F.col("value"), "\\|").alias("cols")
).select(
    F.col("cols")[0].alias("Event_Timestamp"),
    F.col("cols")[1].alias("Acct_Status_Typ"),
    F.col("cols")[2].alias("User_Name"),
    F.col("cols")[3].alias("NAS_IP"),
    F.col("cols")[4].alias("Acct_Session_Id")
)`}
      />

      {/* Silver Layer - Agent */}
      <MigrationCard
        layer="Silver"
        layerColor="silver"
        title="B. Remplacement de fair_agent.py (Couche Silver)"
        ancienScript="fair_agent.py"
        description="C'est ici que s'effectue la gestion d'etat ('Live State') et la reconstitution des durees de sessions. La gestion d'etat (connaitre l'etat 'actuel' de chaque utilisateur) se fait tres bien en Spark en calculant la toute 'derniere' ligne recue par utilisateur."
        datasetSortie="silver_user_status (mise a jour) et silver_disconnection_events_history (Append)"
        codeExample={`# 1. On lit les nouvelles donnees Bronze + l'ancien etat Silver
windowSpec = Window.partitionBy("User_Name").orderBy(F.col("Event_Timestamp").desc())

# 2. Fenetrage : On prend le dernier evenement par utilisateur
df_latest_events = df_logs.withColumn("row_number", F.row_number().over(windowSpec)) \\
                          .filter(F.col("row_number") == 1) \\
                          .drop("row_number")

# 3. Logique de Sticky Suspension
df_latest_events = df_latest_events.withColumn(
    "Account_State", 
    F.when(F.col("Acct_Status_Typ") == "DISCONNECT NOTIFICATION", "SUSPENDED")
     .otherwise("ACTIVE")
)

# Calcul de la duree de session (Tracker de Deconnexion)
window_sess = Window.partitionBy("User_Name").orderBy("Event_Timestamp")
df_sessions = df_logs.withColumn(
    "Previous_Start", 
    F.lag("Event_Timestamp", 1).over(window_sess)
).filter(F.col("Acct_Status_Typ") == "Stop")

df_sessions = df_sessions.withColumn(
    "duration_seconds", 
    F.unix_timestamp("Event_Timestamp") - F.unix_timestamp("Previous_Start")
)`}
      />

      {/* Gold Layer - Detector */}
      <MigrationCard
        layer="Gold"
        layerColor="gold"
        title="C. Remplacement de fair_detector.py (Couche Gold - Alarmes)"
        ancienScript="fair_detector.py"
        description="Ce composant est le plus gourmand. Le passer sur Spark (Dataiku) accelerera massivement le calcul de correlations sur de grands volumes. Ancien comportement: GroupBy Python Pandas + Double boucle iterative + Calcul Haversine pur Python + XOR ML."
        datasetSortie="gold_incidents (tickets qui s'afficheront dans le Dashboard)"
        codeExample={`# Rejet des Reboots Normaux (filtrer deconnexions de ~24h)
df_anomalies = df_sessions.filter(
    (F.col("duration_seconds") < 86340) | (F.col("duration_seconds") > 90060)
)

# Detection par Seuils (Spark GroupBy)
# Trouver les cartes (SLOTS) en rade (> 15 clients off simultanes)
window_slot = Window.partitionBy("OLT_ID", "SLOT_ID")
df_slot_outages = df_anomalies.withColumn("count_offline", F.count("*").over(window_slot)) \\
                              .filter(F.col("count_offline") >= 15)

# Enrichissement Topologique : jointure "Broadcast" avec master_clients
# pour ramener OLT_ID, SLOT_ID et Coordonnees GPS

# Integration du Modele ML (XGBoost) via Saved Models Dataiku
# ou Pandas UDF pour appliquer le modele sur DataFrame distribuee`}
      />

      {/* Gold Layer - KPIs */}
      <MigrationCard
        layer="Gold"
        layerColor="gold"
        title="D. Pre-calcul des KPIs pour le Dashboard (Couche Gold - Analytics)"
        ancienScript="aggregator.py + alarm_manager.py"
        description="Avant, c'est l'application Flask et l'aggregator qui pré-calculaient tout pour les graphiques. Dans Dataiku, vous ferez des Recettes de Fenêtrage Visuel (Group recipe) pour sortir exactement les tables agrégées que Exalead Vue 360 va consommer/indexer pour l'affichage."
        datasetSortie="gold_city_trends, gold_gpon_trends, gold_live_alarms"
        codeExample={`# KPI Minute par Minute par Ville (gpon_trends et city_trends)
df_trends = df_latest_events.withColumn(
    "minute", F.date_trunc("minute", F.col("Event_Timestamp"))
).groupBy("minute", "GEOGRAPHIC_AREA", "Acct_Status_Typ").count()

# Les "Live Alarms" du Dashboard
# L'ancien script alarm_manager.py fusionnait les utilisateurs 
# hors-lignes proches pour en faire une alarme unifiee.
# Dans Dataiku: recette visuelle "Group" sur gold_incidents 
# par problem_id ou GEOGRAPHIC_AREA + Heure, 
# en sommant les utilisateurs impactes.`}
      />

      {/* Summary Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Resume de la Migration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Script Ancien</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Couche</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Recette Dataiku</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Dataset Sortie</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4"><code className="text-primary">fetch_aaa.py</code></td>
                  <td className="py-3 px-4"><Badge className="bg-[#CD7F32]/20 text-[#CD7F32] border-[#CD7F32]/30">Bronze</Badge></td>
                  <td className="py-3 px-4">PySpark / Spark Scala</td>
                  <td className="py-3 px-4">bronze_aaa_logs</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4"><code className="text-primary">fair_agent.py</code></td>
                  <td className="py-3 px-4"><Badge className="bg-[#C0C0C0]/20 text-[#C0C0C0] border-[#C0C0C0]/30">Silver</Badge></td>
                  <td className="py-3 px-4">PySpark (Windowing)</td>
                  <td className="py-3 px-4">silver_user_status, silver_disconnection_events</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4"><code className="text-primary">fair_detector.py</code></td>
                  <td className="py-3 px-4"><Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Gold</Badge></td>
                  <td className="py-3 px-4">PySpark + ML (XGBoost)</td>
                  <td className="py-3 px-4">gold_incidents</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4"><code className="text-primary">fair_tracker.py</code></td>
                  <td className="py-3 px-4"><Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Gold</Badge></td>
                  <td className="py-3 px-4">PySpark (Join + Update)</td>
                  <td className="py-3 px-4">gold_incidents (mise a jour)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4"><code className="text-primary">aggregator.py</code></td>
                  <td className="py-3 px-4"><Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Gold</Badge></td>
                  <td className="py-3 px-4">Recette Group visuelle</td>
                  <td className="py-3 px-4">gold_city_trends, gold_gpon_trends</td>
                </tr>
                <tr>
                  <td className="py-3 px-4"><code className="text-primary">alarm_manager.py</code></td>
                  <td className="py-3 px-4"><Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Gold</Badge></td>
                  <td className="py-3 px-4">Recette Group visuelle</td>
                  <td className="py-3 px-4">gold_live_alarms</td>
                </tr>
                <tr>
                  <td className="py-3 px-4"><code className="text-primary">app.py (Flask)</code></td>
                  <td className="py-3 px-4"><Badge className="bg-green-500/20 text-green-400 border-green-500/30">Exalead</Badge></td>
                  <td className="py-3 px-4">Indexation directe</td>
                  <td className="py-3 px-4">Vue 360 Supervision</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper Components
function FlowBox({
  icon,
  title,
  subtitle,
  color,
  isScript = false
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  color: "blue" | "orange" | "red" | "purple" | "green"
  isScript?: boolean
}) {
  const colorClasses = {
    blue: "border-blue-500/30 bg-blue-500/10",
    orange: "border-orange-500/30 bg-orange-500/10",
    red: "border-red-500/30 bg-red-500/10",
    purple: "border-purple-500/30 bg-purple-500/10",
    green: "border-green-500/30 bg-green-500/10",
  }

  const iconColorClasses = {
    blue: "text-blue-400",
    orange: "text-orange-400",
    red: "text-red-400",
    purple: "text-purple-400",
    green: "text-green-400",
  }

  return (
    <div className={`rounded-lg border p-3 ${colorClasses[color]}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={iconColorClasses[color]}>{icon}</span>
        <span className={`text-xs font-medium ${isScript ? "font-mono" : ""} text-foreground`}>{title}</span>
      </div>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  )
}

function ScriptDetail({
  name,
  role,
  description,
  input,
  logic,
  output,
}: {
  name: string
  role: string
  description: string
  input: string
  logic: string
  output: string
}) {
  return (
    <div className="rounded-lg border border-border bg-secondary/20 p-4">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <code className="text-sm font-medium text-primary">{name}</code>
        <Badge variant="outline" className="text-xs">{role}</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <div className="grid gap-2 text-xs">
        <div><span className="font-medium text-foreground">Input:</span> <span className="text-muted-foreground">{input}</span></div>
        <div><span className="font-medium text-foreground">Logique:</span> <span className="text-muted-foreground">{logic}</span></div>
        <div><span className="font-medium text-foreground">Output:</span> <span className="text-muted-foreground">{output}</span></div>
      </div>
    </div>
  )
}

function MigrationCard({
  layer,
  layerColor,
  title,
  ancienScript,
  description,
  datasetSortie,
  codeExample,
}: {
  layer: string
  layerColor: "bronze" | "silver" | "gold"
  title: string
  ancienScript: string
  description: string
  datasetSortie: string
  codeExample: string
}) {
  const colorClasses = {
    bronze: "border-[#CD7F32]/30 bg-[#CD7F32]/5",
    silver: "border-[#C0C0C0]/30 bg-[#C0C0C0]/5",
    gold: "border-amber-500/30 bg-amber-500/5",
  }

  const badgeClasses = {
    bronze: "bg-[#CD7F32]/20 text-[#CD7F32] border-[#CD7F32]/30",
    silver: "bg-[#C0C0C0]/20 text-[#C0C0C0] border-[#C0C0C0]/30",
    gold: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  }

  return (
    <Card className={`border ${colorClasses[layerColor]}`}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Badge className={badgeClasses[layerColor]}>{layer}</Badge>
          <CardTitle className="text-lg text-foreground">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Ancien Script:</span>
          <code className="text-primary">{ancienScript}</code>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="text-sm">
          <span className="font-medium text-foreground">Dataset de Sortie Dataiku:</span>{" "}
          <code className="text-primary">{datasetSortie}</code>
        </div>
        <div className="rounded-lg bg-secondary/50 p-4 overflow-x-auto">
          <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">{codeExample}</pre>
        </div>
      </CardContent>
    </Card>
  )
}
