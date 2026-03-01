"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bot, 
  Shield, 
  ArrowRight, 
  CheckCircle2,
  Cpu,
  Database,
  MessageSquare,
  Workflow,
  Lock,
  Eye,
  Server,
  Layers,
  Zap
} from "lucide-react"

export function GenAIPlatformSection() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="executive" className="w-full">
        <TabsList className="mb-4 flex w-full flex-wrap justify-start gap-1 bg-secondary">
          <TabsTrigger value="executive" className="text-xs">Executive Summary</TabsTrigger>
          <TabsTrigger value="principes" className="text-xs">Principes</TabsTrigger>
          <TabsTrigger value="vue-ensemble" className="text-xs">Vue d{"'"}ensemble</TabsTrigger>
          <TabsTrigger value="composants" className="text-xs">Composants</TabsTrigger>
          <TabsTrigger value="gouvernance" className="text-xs">Gouvernance</TabsTrigger>
        </TabsList>

        {/* Executive Summary */}
        <TabsContent value="executive" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">B.1. Executive Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 text-sm text-muted-foreground">
                <h4 className="font-medium text-foreground">B.1.1. Contexte general</h4>
                <p>
                  La GenAI represente une rupture technologique majeure, avec un potentiel de transformation
                  profond des usages internes et de la relation client chez Orange Maroc.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-foreground">B.1.2. Problematique</h4>
                <p className="text-sm text-muted-foreground">
                  Sans cadre d{"'"}architecture clair, les initiatives GenAI risquent de :
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-destructive" />
                    rester a l{"'"}etat de POC non industrialises
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-destructive" />
                    creer des dependances non maitrisees a des fournisseurs externes
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-destructive" />
                    exposer l{"'"}entreprise a des risques de securite et de conformite
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <h4 className="mb-2 font-medium text-foreground">B.1.4. Proposition de valeur</h4>
                <p className="text-sm text-muted-foreground">
                  Definir une architecture GenAI industrielle, securisee, gouvernee et alignee sur la Data Platform,
                  permettant de passer du POC a la production de maniere maitrisee.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-foreground">B.1.5. Decisions attendues</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    "Validation de l'architecture GenAI cible",
                    "Alignement sur les principes proposes",
                    "Gouvernance des usages GenAI",
                    "Trajectoire d'industrialisation"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Principes */}
        <TabsContent value="principes" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">B.3. Principes d{"'"}architecture GenAI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <PrincipleCard
                  icon={<Layers className="h-5 w-5 text-primary" />}
                  title="Separation des responsabilites"
                  description="Data Platform, ML Platform et GenAI Platform clairement delimites"
                />
                <PrincipleCard
                  icon={<Zap className="h-5 w-5 text-primary" />}
                  title="Exploration libre, production maitrisee"
                  description="Sandbox pour l'experimentation, industrialisation controlee"
                />
                <PrincipleCard
                  icon={<Server className="h-5 w-5 text-primary" />}
                  title="API-first et decouplage"
                  description="Interfaces standardisees, composants independants"
                />
                <PrincipleCard
                  icon={<Workflow className="h-5 w-5 text-primary" />}
                  title="Mutualisation des capacites"
                  description="LLM Gateway, Embedding Service, Vector Store partages"
                />
                <PrincipleCard
                  icon={<Database className="h-5 w-5 text-primary" />}
                  title="Neutralite technologique"
                  description="Pas de lock-in fournisseur, reversibilite"
                />
                <PrincipleCard
                  icon={<Shield className="h-5 w-5 text-primary" />}
                  title="Securite by design"
                  description="Gouvernance integree, conformite OIV"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vue d'ensemble */}
        <TabsContent value="vue-ensemble" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">B.4. Architecture cible - Vue d{"'"}ensemble</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                L{"'"}architecture GenAI s{"'"}articule autour de trois plateformes interconnectees :
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-2 border-primary/50 bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm text-foreground">
                      <Database className="h-4 w-4 text-primary" />
                      Data Platform
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">Source de verite. Fournit les donnees de reference pour l{"'"}IA et la GenAI.</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-primary/50 bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm text-foreground">
                      <Cpu className="h-4 w-4 text-primary" />
                      ML Platform
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">Exploration et creation de valeur. Dataiku DSS pour ML et experimentation.</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-primary/50 bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm text-foreground">
                      <Bot className="h-4 w-4 text-primary" />
                      GenAI Platform
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">Execution industrielle. LLM Gateway, orchestration, serving.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <h4 className="mb-3 font-medium text-foreground">Logique de flux entre les plateformes</h4>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <div className="rounded bg-secondary px-3 py-1.5 text-xs font-medium text-foreground">Data Platform</div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="rounded bg-secondary px-3 py-1.5 text-xs font-medium text-foreground">ML Platform</div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="rounded bg-secondary px-3 py-1.5 text-xs font-medium text-foreground">GenAI Platform</div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="rounded bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">Applications</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Composants */}
        <TabsContent value="composants" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">B.5. Architecture GenAI - Composants detailles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <ComponentCard
                  title="B.5.2. LLM Gateway / Mesh"
                  description="Point d'entree unique pour les appels LLM. Gestion multi-modeles, routing, rate limiting."
                  icon={<Server className="h-5 w-5" />}
                />
                <ComponentCard
                  title="B.5.3. Orchestration GenAI"
                  description="Coordination des workflows GenAI complexes. Chaining, branching, error handling."
                  icon={<Workflow className="h-5 w-5" />}
                />
                <ComponentCard
                  title="B.5.4. Embedding Service"
                  description="Generation de vecteurs pour le RAG. Modeles d'embedding mutualises."
                  icon={<Cpu className="h-5 w-5" />}
                />
                <ComponentCard
                  title="B.5.5. Vector Store"
                  description="Stockage et recherche vectorielle. Base pour les usages RAG."
                  icon={<Database className="h-5 w-5" />}
                />
                <ComponentCard
                  title="B.5.6. Tool / Function Calling (MCP)"
                  description="Integration avec les systemes externes. Actions automatisees par les LLM."
                  icon={<Zap className="h-5 w-5" />}
                />
                <ComponentCard
                  title="B.5.7. Agents et memoire"
                  description="Agents autonomes avec gestion de la memoire conversationnelle."
                  icon={<Bot className="h-5 w-5" />}
                />
                <ComponentCard
                  title="B.5.8. Evaluation et LLM Jury"
                  description="Metriques de qualite, evaluation automatisee des outputs."
                  icon={<Eye className="h-5 w-5" />}
                />
                <ComponentCard
                  title="B.5.9. GenAI Serving APIs"
                  description="APIs de serving pour les applications consommatrices."
                  icon={<MessageSquare className="h-5 w-5" />}
                />
              </div>

              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <h4 className="mb-2 font-medium text-foreground">B.5.10. Integration avec la ML Platform</h4>
                <p className="text-sm text-muted-foreground">
                  La GenAI Platform s{"'"}integre nativement avec Dataiku DSS pour beneficier des capacites
                  d{"'"}exploration, de feature engineering et de model management.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gouvernance */}
        <TabsContent value="gouvernance" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">B.6. Gouvernance, securite et conformite GenAI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">B.6.1. Principes generaux</h4>
                  <ul className="space-y-2">
                    {[
                      "Responsabilite claire sur chaque composant",
                      "Tracabilite de bout en bout",
                      "Auditabilite des decisions IA"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">B.6.2. Securite des acces</h4>
                  <ul className="space-y-2">
                    {[
                      "Authentification centralisee (IDAM)",
                      "Autorisation fine-grained",
                      "Chiffrement des donnees"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-border bg-secondary/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-foreground">B.6.3. Tracabilite</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">Logging des prompts, responses, metadata. Lineage des donnees utilisees.</p>
                  </CardContent>
                </Card>
                <Card className="border-border bg-secondary/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-foreground">B.6.4. Gouvernance modeles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">Inventaire des modeles, versioning, politique de mise a jour.</p>
                  </CardContent>
                </Card>
                <Card className="border-border bg-secondary/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-foreground">B.6.5. Maitrise des couts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">Quotas par equipe, monitoring des consommations, alerting.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <h4 className="mb-2 font-medium text-foreground">B.6.7. Gestion des risques specifiques GenAI</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-destructive" />
                    Hallucinations et fiabilite des outputs
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-destructive" />
                    Fuite de donnees sensibles dans les prompts
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-destructive" />
                    Dependance aux fournisseurs externes
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <h4 className="mb-2 font-medium text-foreground">B.6.8. Gouvernance comme facilitateur</h4>
                <p className="text-sm text-muted-foreground">
                  La gouvernance GenAI n{"'"}est pas un frein mais un <strong className="text-foreground">accelerateur</strong> :
                  elle permet de passer du POC a la production en toute confiance.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PrincipleCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/50 p-4">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <h4 className="font-medium text-foreground">{title}</h4>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

function ComponentCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/30 p-4">
      <div className="mb-2 flex items-center gap-2 text-primary">
        {icon}
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}
