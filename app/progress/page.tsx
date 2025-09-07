"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Activity,
  Clock,
  Dumbbell,
  File as Fire,
  Menu,
  Moon,
  Sun,
  Target,
  TrendingUp,
  Users,
  Zap,
  ArrowLeft,
  Camera,
  Upload,
  Trophy,
  Plus,
  Edit,
  Eye,
  EyeOff,
  Download,
  Ruler,
  Weight,
  BarChart3,
  Award,
  Star,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Link from "next/link"

const sidebarItems = [
  { icon: Activity, label: "Dashboard", href: "/" },
  { icon: Dumbbell, label: "Workouts", href: "/workouts" },
  { icon: Clock, label: "Timer", href: "/timer" },
  { icon: TrendingUp, label: "Progress", href: "/progress", active: true },
  { icon: Users, label: "Community", href: "/community" },
  { icon: Target, label: "Goals", href: "/goals" },
  { icon: Zap, label: "AI Coach", href: "/ai-coach" },
]

function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border", className)}>
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Dumbbell className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-sidebar-foreground">FitFlow AI</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 h-11",
              item.active
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Fire className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Streak</span>
            </div>
            <div className="text-2xl font-bold text-primary">7 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex h-16 items-center justify-between px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Progress Tracking
            </h1>
            <p className="text-sm text-muted-foreground">Monitor your fitness journey and achievements</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>
    </header>
  )
}

// Mock data
const progressPhotos = [
  {
    id: 1,
    date: "2024-01-01",
    type: "front",
    url: "/fitness-progress-photo-front-view.jpg",
    isPrivate: false,
  },
  {
    id: 2,
    date: "2024-01-01",
    type: "side",
    url: "/fitness-progress-photo-side-view.jpg",
    isPrivate: false,
  },
  {
    id: 3,
    date: "2024-01-15",
    type: "front",
    url: "/fitness-progress-photo-front-view-after-2-weeks.jpg",
    isPrivate: true,
  },
  {
    id: 4,
    date: "2024-01-15",
    type: "side",
    url: "/fitness-progress-photo-side-view-after-2-weeks.jpg",
    isPrivate: true,
  },
]

const personalRecords = [
  { exercise: "Bench Press", weight: 185, date: "2024-01-15", previous: 175 },
  { exercise: "Squat", weight: 225, date: "2024-01-12", previous: 215 },
  { exercise: "Deadlift", weight: 275, date: "2024-01-10", previous: 265 },
  { exercise: "Pull-ups", weight: 12, date: "2024-01-08", previous: 10, isReps: true },
]

const bodyMeasurements = [
  { date: "2024-01-01", weight: 180, bodyFat: 15, muscle: 145 },
  { date: "2024-01-08", weight: 179, bodyFat: 14.5, muscle: 146 },
  { date: "2024-01-15", weight: 178, bodyFat: 14, muscle: 147 },
]

const achievements = [
  {
    id: 1,
    title: "First Workout",
    description: "Completed your first workout session",
    icon: "🎯",
    date: "2024-01-01",
    unlocked: true,
  },
  {
    id: 2,
    title: "Week Warrior",
    description: "Completed 7 consecutive days of workouts",
    icon: "🔥",
    date: "2024-01-07",
    unlocked: true,
  },
  {
    id: 3,
    title: "Strength Milestone",
    description: "Achieved a new personal record",
    icon: "💪",
    date: "2024-01-10",
    unlocked: true,
  },
  {
    id: 4,
    title: "Century Club",
    description: "Complete 100 total workouts",
    icon: "🏆",
    date: null,
    unlocked: false,
    progress: 47,
  },
]

export default function ProgressPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [showPrivatePhotos, setShowPrivatePhotos] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="hidden md:flex" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Progress Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weight Change</CardTitle>
                  <Weight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">-2 lbs</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 rotate-180" />
                    Since last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Body Fat</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14.0%</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 rotate-180" />
                    -1% this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Muscle Mass</CardTitle>
                  <Dumbbell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">147 lbs</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +2 lbs this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Personal Records</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    This month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Progress Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
                <TabsTrigger value="records">Records</TabsTrigger>
                <TabsTrigger value="measurements">Measurements</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Recent Progress */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Progress</CardTitle>
                      <CardDescription>Your latest achievements and milestones</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {personalRecords.slice(0, 3).map((record, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Trophy className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{record.exercise}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(record.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">
                                {record.weight} {record.isReps ? "reps" : "lbs"}
                              </p>
                              <p className="text-sm text-green-600">
                                +{record.weight - record.previous} {record.isReps ? "reps" : "lbs"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Body Composition Trend */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Body Composition Trend</CardTitle>
                      <CardDescription>Weight, body fat, and muscle mass over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-blue-600">178 lbs</div>
                            <div className="text-xs text-muted-foreground">Weight</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-red-600">14.0%</div>
                            <div className="text-xs text-muted-foreground">Body Fat</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-600">147 lbs</div>
                            <div className="text-xs text-muted-foreground">Muscle</div>
                          </div>
                        </div>
                        <div className="h-32 bg-muted/20 rounded-lg flex items-center justify-center">
                          <p className="text-muted-foreground">Body composition chart would go here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Progress Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Progress Timeline</CardTitle>
                    <CardDescription>Key milestones in your fitness journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          date: "2024-01-15",
                          title: "New Bench Press PR",
                          description: "Achieved 185 lbs, up from 175 lbs",
                          type: "record",
                        },
                        {
                          date: "2024-01-12",
                          title: "Progress Photos Taken",
                          description: "2-week transformation photos uploaded",
                          type: "photo",
                        },
                        {
                          date: "2024-01-10",
                          title: "Weight Goal Milestone",
                          description: "Reached 178 lbs target weight",
                          type: "measurement",
                        },
                        {
                          date: "2024-01-07",
                          title: "Week Warrior Achievement",
                          description: "Completed 7 consecutive workout days",
                          type: "achievement",
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            {item.type === "record" && <Trophy className="h-5 w-5 text-primary" />}
                            {item.type === "photo" && <Camera className="h-5 w-5 text-primary" />}
                            {item.type === "measurement" && <Ruler className="h-5 w-5 text-primary" />}
                            {item.type === "achievement" && <Award className="h-5 w-5 text-primary" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{item.title}</h4>
                              <span className="text-sm text-muted-foreground">
                                {new Date(item.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="photos" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Progress Photos</h2>
                    <p className="text-muted-foreground">Track your visual transformation over time</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="private-photos" checked={showPrivatePhotos} onCheckedChange={setShowPrivatePhotos} />
                      <Label htmlFor="private-photos" className="text-sm">
                        Show private photos
                      </Label>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Camera className="h-4 w-4 mr-2" />
                          Add Photos
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Upload Progress Photos</DialogTitle>
                          <DialogDescription>
                            Add new photos to track your transformation. You can set privacy settings for each photo.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Front View</Label>
                              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Click to upload</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Side View</Label>
                              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Click to upload</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="photo-private" />
                            <Label htmlFor="photo-private">Make photos private</Label>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="photo-notes">Notes (optional)</Label>
                            <Textarea id="photo-notes" placeholder="Add any notes about this progress update..." />
                          </div>
                          <Button className="w-full">Upload Photos</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {progressPhotos
                    .filter((photo) => showPrivatePhotos || !photo.isPrivate)
                    .map((photo) => (
                      <Card key={photo.id} className="overflow-hidden">
                        <div className="aspect-[3/4] relative">
                          <img
                            src={photo.url || "/placeholder.svg"}
                            alt={`Progress photo ${photo.type}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            {photo.isPrivate && (
                              <Badge variant="secondary" className="text-xs">
                                <EyeOff className="h-3 w-3 mr-1" />
                                Private
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs bg-background/80">
                              {photo.type}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{new Date(photo.date).toLocaleDateString()}</span>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {progressPhotos.filter((photo) => showPrivatePhotos || !photo.isPrivate).length === 0 && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">No Progress Photos Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start tracking your transformation by uploading your first progress photos.
                      </p>
                      <Button>
                        <Camera className="h-4 w-4 mr-2" />
                        Add Your First Photos
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="records" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Personal Records</h2>
                    <p className="text-muted-foreground">Track your strength progression and achievements</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Record
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Personal Record</DialogTitle>
                        <DialogDescription>Log a new personal best for any exercise.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="exercise">Exercise</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select exercise" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bench-press">Bench Press</SelectItem>
                              <SelectItem value="squat">Squat</SelectItem>
                              <SelectItem value="deadlift">Deadlift</SelectItem>
                              <SelectItem value="pull-ups">Pull-ups</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="weight">Weight/Reps</Label>
                            <Input id="weight" type="number" placeholder="185" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="unit">Unit</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="lbs" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="lbs">lbs</SelectItem>
                                <SelectItem value="kg">kg</SelectItem>
                                <SelectItem value="reps">reps</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notes">Notes (optional)</Label>
                          <Textarea id="notes" placeholder="Any additional details about this PR..." />
                        </div>
                        <Button className="w-full">Save Record</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid gap-4">
                  {personalRecords.map((record, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Trophy className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{record.exercise}</h3>
                              <p className="text-muted-foreground">
                                {new Date(record.date).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">
                              {record.weight} {record.isReps ? "reps" : "lbs"}
                            </div>
                            <div className="text-sm text-green-600">
                              +{record.weight - record.previous} {record.isReps ? "reps" : "lbs"} improvement
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="measurements" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Body Measurements</h2>
                    <p className="text-muted-foreground">Track weight, body fat, and muscle mass changes</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Measurement
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Body Measurement</DialogTitle>
                        <DialogDescription>Log your current body composition metrics.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="weight">Weight (lbs)</Label>
                            <Input id="weight" type="number" placeholder="178" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="body-fat">Body Fat (%)</Label>
                            <Input id="body-fat" type="number" step="0.1" placeholder="14.0" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="muscle-mass">Muscle Mass (lbs)</Label>
                          <Input id="muscle-mass" type="number" placeholder="147" />
                        </div>
                        <Button className="w-full">Save Measurement</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Weight Trend</CardTitle>
                      <CardDescription>Your weight changes over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Weight trend chart would go here</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Body Composition</CardTitle>
                      <CardDescription>Body fat and muscle mass progression</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Body composition chart would go here</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Measurement History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bodyMeasurements.map((measurement, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                          <div>
                            <p className="font-medium">{new Date(measurement.date).toLocaleDateString()}</p>
                          </div>
                          <div className="grid grid-cols-3 gap-8 text-center">
                            <div>
                              <div className="font-bold">{measurement.weight} lbs</div>
                              <div className="text-xs text-muted-foreground">Weight</div>
                            </div>
                            <div>
                              <div className="font-bold">{measurement.bodyFat}%</div>
                              <div className="text-xs text-muted-foreground">Body Fat</div>
                            </div>
                            <div>
                              <div className="font-bold">{measurement.muscle} lbs</div>
                              <div className="text-xs text-muted-foreground">Muscle</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold">Achievements</h2>
                  <p className="text-muted-foreground">Celebrate your fitness milestones and unlock new badges</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {achievements.map((achievement) => (
                    <Card
                      key={achievement.id}
                      className={cn(
                        "transition-all duration-200",
                        achievement.unlocked
                          ? "bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20"
                          : "opacity-60",
                      )}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center text-2xl",
                              achievement.unlocked ? "bg-primary/10" : "bg-muted",
                            )}
                          >
                            {achievement.unlocked ? achievement.icon : "🔒"}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{achievement.title}</h3>
                              {achievement.unlocked && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                            {achievement.unlocked && achievement.date && (
                              <p className="text-xs text-primary">
                                Unlocked on {new Date(achievement.date).toLocaleDateString()}
                              </p>
                            )}
                            {!achievement.unlocked && achievement.progress !== undefined && (
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Progress</span>
                                  <span>{achievement.progress}%</span>
                                </div>
                                <Progress value={achievement.progress} className="h-2" />
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
