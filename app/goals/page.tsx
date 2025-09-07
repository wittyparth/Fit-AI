"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Activity,
  Calendar,
  Clock,
  Dumbbell,
  Menu,
  Moon,
  Sun,
  Target,
  TrendingUp,
  Users,
  Zap,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trophy,
  CheckCircle,
  AlertCircle,
  CalendarIcon,
  Edit,
  Trash2,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"

const sidebarItems = [
  { icon: Activity, label: "Dashboard", active: false, href: "/" },
  { icon: Dumbbell, label: "Workouts", href: "/workouts" },
  { icon: Clock, label: "Timer", href: "/timer" },
  { icon: TrendingUp, label: "Progress", href: "/progress" },
  { icon: Users, label: "Community", href: "/community" },
  { icon: Target, label: "Goals", active: true, href: "/goals" },
  { icon: Zap, label: "AI Coach", href: "/ai-coach" },
]

const goals = [
  {
    id: 1,
    title: "Lose 10 pounds",
    description: "Reach my target weight of 165 lbs through consistent workouts and nutrition",
    category: "Weight Loss",
    targetValue: 10,
    currentValue: 6.5,
    unit: "lbs",
    deadline: "2024-06-01",
    status: "in-progress",
    priority: "high",
  },
  {
    id: 2,
    title: "Bench Press 200 lbs",
    description: "Increase my bench press max from 175 lbs to 200 lbs",
    category: "Strength",
    targetValue: 200,
    currentValue: 185,
    unit: "lbs",
    deadline: "2024-05-15",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: 3,
    title: "Run 5K under 25 minutes",
    description: "Improve my 5K running time from 28 minutes to under 25 minutes",
    category: "Cardio",
    targetValue: 25,
    currentValue: 26.5,
    unit: "min",
    deadline: "2024-04-30",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: 4,
    title: "Workout 5 days per week",
    description: "Maintain consistency with 5 workout sessions every week",
    category: "Consistency",
    targetValue: 5,
    currentValue: 4,
    unit: "days/week",
    deadline: "2024-12-31",
    status: "in-progress",
    priority: "high",
  },
  {
    id: 5,
    title: "Complete first marathon",
    description: "Train for and successfully complete a full 26.2 mile marathon",
    category: "Endurance",
    targetValue: 26.2,
    currentValue: 15,
    unit: "miles",
    deadline: "2024-10-15",
    status: "in-progress",
    priority: "low",
  },
]

function Sidebar({
  className,
  collapsed = false,
  onToggle,
}: { className?: string; collapsed?: boolean; onToggle?: () => void }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        {!collapsed ? (
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Dumbbell className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-sidebar-foreground">FitFlow AI</span>
          </Link>
        ) : (
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <Dumbbell className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "default" : "ghost"}
            className={cn(
              "h-11 transition-all duration-200",
              collapsed ? "w-8 px-0 justify-center" : "w-full justify-start gap-3",
              item.active
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
            asChild
          >
            <Link href={item.href} title={collapsed ? item.label : undefined}>
              <item.icon className="h-5 w-5" />
              {!collapsed && item.label}
            </Link>
          </Button>
        ))}
      </nav>

      {onToggle && (
        <div className="p-4 border-t border-sidebar-border">
          <Button variant="ghost" size="sm" onClick={onToggle} className="w-full justify-center">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      )}
    </div>
  )
}

function Header({ onSidebarToggle }: { onSidebarToggle: () => void }) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex h-16 items-center justify-between px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onSidebarToggle} className="hidden md:flex">
          <Menu className="h-5 w-5" />
        </Button>

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

        <div>
          <h1 className="text-2xl font-bold">Goals</h1>
          <p className="text-sm text-muted-foreground">Track and achieve your fitness objectives</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative overflow-hidden"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
              <Plus className="h-4 w-4" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>Set a new fitness goal to track your progress</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal-title">Goal Title</Label>
                <Input id="goal-title" placeholder="e.g., Lose 10 pounds" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal-description">Description</Label>
                <Textarea id="goal-description" placeholder="Describe your goal in detail..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="goal-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight-loss">Weight Loss</SelectItem>
                      <SelectItem value="strength">Strength</SelectItem>
                      <SelectItem value="cardio">Cardio</SelectItem>
                      <SelectItem value="consistency">Consistency</SelectItem>
                      <SelectItem value="endurance">Endurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-deadline">Deadline</Label>
                  <Input id="goal-deadline" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="goal-target">Target Value</Label>
                  <Input id="goal-target" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-unit">Unit</Label>
                  <Input id="goal-unit" placeholder="lbs, min, reps..." />
                </div>
              </div>
              <Button className="w-full">Create Goal</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}

function GoalCard({ goal }: { goal: (typeof goals)[0] }) {
  const progress = (goal.currentValue / goal.targetValue) * 100
  const isOverdue = new Date(goal.deadline) < new Date()
  const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Weight Loss":
        return <TrendingUp className="h-4 w-4" />
      case "Strength":
        return <Dumbbell className="h-4 w-4" />
      case "Cardio":
        return <Activity className="h-4 w-4" />
      case "Consistency":
        return <Calendar className="h-4 w-4" />
      case "Endurance":
        return <Trophy className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {getCategoryIcon(goal.category)}
              <CardTitle className="text-lg">{goal.title}</CardTitle>
            </div>
            <CardDescription>{goal.description}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge className={getPriorityColor(goal.priority)}>{goal.priority}</Badge>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>
              {goal.currentValue} / {goal.targetValue} {goal.unit}
            </span>
          </div>
          <Progress value={Math.min(progress, 100)} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{Math.round(progress)}% complete</span>
            <span>
              {Math.max(0, goal.targetValue - goal.currentValue)} {goal.unit} remaining
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className={isOverdue ? "text-red-600" : "text-muted-foreground"}>
              {isOverdue ? "Overdue" : `${daysLeft} days left`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {progress >= 100 ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : isOverdue ? (
              <AlertCircle className="h-4 w-4 text-red-600" />
            ) : (
              <Target className="h-4 w-4 text-primary" />
            )}
            <span className="text-xs font-medium">{goal.category}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 bg-transparent">
            Update Progress
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function GoalsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const completedGoals = goals.filter((goal) => (goal.currentValue / goal.targetValue) * 100 >= 100)
  const activeGoals = goals.filter((goal) => (goal.currentValue / goal.targetValue) * 100 < 100)
  const overdueGoals = goals.filter(
    (goal) => new Date(goal.deadline) < new Date() && (goal.currentValue / goal.targetValue) * 100 < 100,
  )

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        className="hidden md:flex"
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{goals.length}</p>
                      <p className="text-sm text-muted-foreground">Total Goals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{completedGoals.length}</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{activeGoals.length}</p>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-2xl font-bold">{overdueGoals.length}</p>
                      <p className="text-sm text-muted-foreground">Overdue</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Goals Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Goals</h2>
                <p className="text-sm text-muted-foreground">{goals.length} goals total</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {goals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>

              {goals.length === 0 && (
                <div className="text-center py-12">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No goals yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Set your first fitness goal to start tracking your progress
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Create Your First Goal</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create New Goal</DialogTitle>
                        <DialogDescription>Set a new fitness goal to track your progress</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="goal-title">Goal Title</Label>
                          <Input id="goal-title" placeholder="e.g., Lose 10 pounds" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="goal-description">Description</Label>
                          <Textarea id="goal-description" placeholder="Describe your goal in detail..." />
                        </div>
                        <Button className="w-full">Create Goal</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
