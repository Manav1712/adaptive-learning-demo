"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GraphDemo from "@/components/GraphDemo"
import {
  Brain,
  Network,
  BookOpen,
  Target,
  TrendingUp,
  Users,
  Lightbulb,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react"

export default function AdaptiveLearningPlatform() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">AdaptiveLearn</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background/40 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-foreground mb-6 text-balance">
              AI-Powered Adaptive Learning
              <span className="text-primary"> Knowledge Graph</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Experience personalized education with our intelligent knowledge graph platform. 138 learning objectives,
              270 content items, and AI tutoring agents working together to accelerate your learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="graph">Knowledge Graph</TabsTrigger>
            <TabsTrigger value="dashboard">Learning Dashboard</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Learning Objectives</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">138</div>
                  <p className="text-xs text-muted-foreground">From OpenStax Calculus</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Content Items</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">270</div>
                  <p className="text-xs text-muted-foreground">Interactive materials</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Graph Edges</CardTitle>
                  <Network className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-3">577</div>
                  <p className="text-xs text-muted-foreground">Relationship connections</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Agents</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-5">4</div>
                  <p className="text-xs text-muted-foreground">Coach, Tutor, Retrieval, Grader</p>
                </CardContent>
              </Card>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-primary" />
                    Interactive Knowledge Graph
                  </CardTitle>
                  <CardDescription>
                    Visualize learning relationships and prerequisites in an interactive network
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Concepts</Badge>
                      <Badge variant="outline">Examples</Badge>
                      <Badge className="bg-chart-5/10 text-chart-5 hover:bg-chart-5/20">Exercises</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Navigate through 138 learning objectives with color-coded nodes showing your mastery level.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI-Powered Tutoring
                  </CardTitle>
                  <CardDescription>Multiple AI agents working together to personalize your learning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Coach Agent</span>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Retrieval Agent</span>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tutor Agent</span>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Grader Agent</span>
                      <Badge>Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Knowledge Graph Tab */}
          <TabsContent value="graph" className="space-y-6">
            <GraphDemo />
          </TabsContent>

          {/* Learning Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Progress Overview */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Your personalized learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">72%</div>
                        <div className="text-sm text-muted-foreground">Overall Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-secondary">15</div>
                        <div className="text-sm text-muted-foreground">Topics Mastered</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-chart-5">8</div>
                        <div className="text-sm text-muted-foreground">In Progress</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Current Learning Path</h4>
                      <div className="space-y-3">
                        {[
                          { topic: "Limits and Continuity", progress: 100, status: "completed" },
                          { topic: "Derivatives", progress: 85, status: "current" },
                          { topic: "Chain Rule Applications", progress: 60, status: "current" },
                          { topic: "Integration Techniques", progress: 0, status: "locked" },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 rounded-lg border">
                            <div className="flex-shrink-0">
                              {item.status === "completed" ? (
                                <CheckCircle className="h-5 w-5 text-primary" />
                              ) : item.status === "current" ? (
                                <Clock className="h-5 w-5 text-secondary" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium">{item.topic}</span>
                                <span className="text-sm text-muted-foreground">{item.progress}%</span>
                              </div>
                              <Progress value={item.progress} className="h-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription>Personalized next steps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Review Chain Rule</p>
                          <p className="text-xs text-muted-foreground">
                            Practice more examples to strengthen understanding
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/20">
                      <div className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-secondary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Ready for Integration</p>
                          <p className="text-xs text-muted-foreground">
                            Your derivative skills are strong enough to proceed
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-chart-5/5 border border-chart-5/20">
                      <div className="flex items-start gap-2">
                        <Users className="h-4 w-4 text-chart-5 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Study Group</p>
                          <p className="text-xs text-muted-foreground">Join others working on similar topics</p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" size="sm">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      View All Recommendations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">AdaptiveLearn</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Revolutionizing education through AI-powered adaptive learning and knowledge graphs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Knowledge Graph</li>
                <li>AI Tutoring</li>
                <li>Analytics</li>
                <li>Progress Tracking</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Research Papers</li>
                <li>Case Studies</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 AdaptiveLearn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
