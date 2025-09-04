"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Brain,
  Network,
  BookOpen,
  Target,
  TrendingUp,
  Users,
  Search,
  Play,
  MessageCircle,
  Lightbulb,
  CheckCircle,
  Clock,
  ArrowRight,
  Zap,
} from "lucide-react"

// Mock data for the knowledge graph
const mockNodes = [
  { id: 1, label: "Limits", type: "concept", mastery: 85, x: 100, y: 100 },
  { id: 2, label: "Derivatives", type: "concept", mastery: 72, x: 200, y: 150 },
  { id: 3, label: "Chain Rule", type: "example", mastery: 90, x: 300, y: 100 },
  { id: 4, label: "Integration", type: "concept", mastery: 45, x: 250, y: 250 },
  { id: 5, label: "Practice Problem 1", type: "exercise", mastery: 60, x: 150, y: 200 },
]

const mockEdges = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
  { from: 1, to: 5 },
]

export default function AdaptiveLearningPlatform() {
  const [selectedNode, setSelectedNode] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">AdaptiveLearn</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost">Dashboard</Button>
              <Button variant="ghost">Knowledge Graph</Button>
              <Button variant="ghost">Analytics</Button>
              <Button variant="ghost">AI Tutor</Button>
            </nav>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/diverse-students-studying.png" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                <Play className="mr-2 h-5 w-5" />
                Try Interactive Demo
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                <BookOpen className="mr-2 h-5 w-5" />
                View Knowledge Graph
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="graph">Knowledge Graph</TabsTrigger>
            <TabsTrigger value="dashboard">Learning Dashboard</TabsTrigger>
            <TabsTrigger value="tutor">AI Tutor</TabsTrigger>
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
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Interactive Knowledge Graph</h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search concepts..."
                    className="pl-10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Graph Visualization */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Network Visualization</CardTitle>
                  <CardDescription>Click and drag nodes to explore relationships</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-96 bg-muted/20 rounded-lg overflow-hidden">
                    <svg className="w-full h-full">
                      {/* Render edges */}
                      {mockEdges.map((edge, index) => {
                        const fromNode = mockNodes.find((n) => n.id === edge.from)
                        const toNode = mockNodes.find((n) => n.id === edge.to)
                        if (!fromNode || !toNode) return null

                        return (
                          <line
                            key={index}
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke="hsl(var(--border))"
                            strokeWidth="2"
                          />
                        )
                      })}

                      {/* Render nodes */}
                      {mockNodes.map((node) => (
                        <g key={node.id}>
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="20"
                            fill={
                              node.type === "concept"
                                ? "hsl(var(--primary))"
                                : node.type === "example"
                                  ? "hsl(var(--secondary))"
                                  : "hsl(var(--chart-5))"
                            }
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setSelectedNode(node)}
                          />
                          <text
                            x={node.x}
                            y={node.y + 35}
                            textAnchor="middle"
                            className="text-xs fill-foreground font-medium"
                          >
                            {node.label}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </CardContent>
              </Card>

              {/* Node Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Node Details</CardTitle>
                  <CardDescription>
                    {selectedNode ? "Selected concept information" : "Click a node to view details"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedNode ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-lg">{selectedNode.label}</h4>
                        <Badge
                          className={
                            selectedNode.type === "concept"
                              ? "bg-primary/10 text-primary"
                              : selectedNode.type === "example"
                                ? "bg-secondary/10 text-secondary"
                                : "bg-chart-5/10 text-chart-5"
                          }
                        >
                          {selectedNode.type}
                        </Badge>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Mastery Level</span>
                          <span className="text-sm text-muted-foreground">{selectedNode.mastery}%</span>
                        </div>
                        <Progress value={selectedNode.mastery} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <Button size="sm" className="w-full">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Study This Topic
                        </Button>
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Ask AI Tutor
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Network className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a node to view detailed information and learning resources.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
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

          {/* AI Tutor Tab */}
          <TabsContent value="tutor" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chat Interface */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    AI Coach Chat
                  </CardTitle>
                  <CardDescription>Get personalized help and explanations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-64 border rounded-lg p-4 bg-muted/20 overflow-y-auto">
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                          </Avatar>
                          <div className="bg-card p-3 rounded-lg flex-1">
                            <p className="text-sm">
                              Hi! I'm your AI Coach. I can see you're working on derivatives. What specific concept
                              would you like help with?
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3 justify-end">
                          <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-xs">
                            <p className="text-sm">
                              I'm struggling with the chain rule. Can you explain it step by step?
                            </p>
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                        </div>

                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                          </Avatar>
                          <div className="bg-card p-3 rounded-lg flex-1">
                            <p className="text-sm">
                              Great question! The chain rule helps us find derivatives of composite functions. Let me
                              break it down: if you have f(g(x)), the derivative is f'(g(x)) × g'(x).
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Input placeholder="Ask your AI tutor..." className="flex-1" />
                      <Button size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Agents Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-secondary" />
                    AI Agents Status
                  </CardTitle>
                  <CardDescription>Multiple agents working together for you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                        <div>
                          <p className="font-medium">Coach Agent</p>
                          <p className="text-xs text-muted-foreground">Guiding your learning path</p>
                        </div>
                      </div>
                      <Badge className="bg-primary/10 text-primary">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-secondary rounded-full"></div>
                        <div>
                          <p className="font-medium">Retrieval Agent</p>
                          <p className="text-xs text-muted-foreground">Finding relevant content</p>
                        </div>
                      </div>
                      <Badge className="bg-secondary/10 text-secondary">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-chart-3 rounded-full"></div>
                        <div>
                          <p className="font-medium">Tutor Agent</p>
                          <p className="text-xs text-muted-foreground">Providing explanations</p>
                        </div>
                      </div>
                      <Badge className="bg-chart-3/10 text-chart-3">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-chart-5 rounded-full"></div>
                        <div>
                          <p className="font-medium">Grader Agent</p>
                          <p className="text-xs text-muted-foreground">Evaluating your work</p>
                        </div>
                      </div>
                      <Badge className="bg-chart-5/10 text-chart-5">Standby</Badge>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-medium mb-2">System Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Response Time</span>
                        <span className="text-primary">0.8s</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Accuracy Rate</span>
                        <span className="text-primary">94.2%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Content Coverage</span>
                        <span className="text-primary">98.5%</span>
                      </div>
                    </div>
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
