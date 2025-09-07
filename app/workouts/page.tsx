"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Activity,
  Clock,
  Dumbbell,
  Filter,
  Heart,
  Menu,
  Moon,
  Search,
  Star,
  Sun,
  Target,
  TrendingUp,
  Users,
  Zap,
  ChevronLeft,
  ChevronRight,
  Play,
  Bookmark,
  Share2,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"

const sidebarItems = [
  { icon: Activity, label: "Dashboard", active: false, href: "/" },
  { icon: Dumbbell, label: "Workouts", active: true, href: "/workouts" },
  { icon: Clock, label: "Timer", href: "/timer" },
  { icon: TrendingUp, label: "Progress", href: "/progress" },
  { icon: Users, label: "Community", href: "/community" },
  { icon: Target, label: "Goals", href: "/goals" },
  { icon: Zap, label: "AI Coach", href: "/ai-coach" },
]

const workoutCategories = [
  "All Workouts",
  "Strength Training",
  "Cardio",
  "HIIT",
  "Yoga",
  "Flexibility",
  "Bodyweight",
  "Powerlifting",
]

const workouts = [
  {
    id: 1,
    title: "Upper Body Strength",
    description: "Build muscle and strength in your chest, shoulders, and arms",
    duration: "45 min",
    difficulty: "Intermediate",
    exercises: 8,
    category: "Strength Training",
    rating: 4.8,
    reviews: 234,
    image: "/gym-upper-body-workout.jpg",
    isBookmarked: true,
  },
  {
    id: 2,
    title: "HIIT Cardio Blast",
    description: "High-intensity interval training for maximum calorie burn",
    duration: "30 min",
    difficulty: "Advanced",
    exercises: 6,
    category: "HIIT",
    rating: 4.9,
    reviews: 189,
    image: "/hiit-cardio-workout.png",
    isBookmarked: false,
  },
  {
    id: 3,
    title: "Morning Yoga Flow",
    description: "Gentle stretches and poses to start your day right",
    duration: "25 min",
    difficulty: "Beginner",
    exercises: 12,
    category: "Yoga",
    rating: 4.7,
    reviews: 156,
    image: "/morning-yoga-flow.jpg",
    isBookmarked: true,
  },
  {
    id: 4,
    title: "Full Body Bodyweight",
    description: "No equipment needed for this complete body workout",
    duration: "35 min",
    difficulty: "Intermediate",
    exercises: 10,
    category: "Bodyweight",
    rating: 4.6,
    reviews: 298,
    image: "/bodyweight-workout.png",
    isBookmarked: false,
  },
  {
    id: 5,
    title: "Leg Day Destroyer",
    description: "Intense lower body workout for strength and power",
    duration: "50 min",
    difficulty: "Advanced",
    exercises: 9,
    category: "Strength Training",
    rating: 4.8,
    reviews: 167,
    image: "/leg-day-workout.png",
    isBookmarked: false,
  },
  {
    id: 6,
    title: "Core & Abs Burner",
    description: "Target your core with these effective exercises",
    duration: "20 min",
    difficulty: "Intermediate",
    exercises: 7,
    category: "Bodyweight",
    rating: 4.5,
    reviews: 203,
    image: "/core-abs-workout.jpg",
    isBookmarked: true,
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
          <h1 className="text-2xl font-bold">Workouts</h1>
          <p className="text-sm text-muted-foreground">Discover and start your perfect workout</p>
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

        <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm" asChild>
          <Link href="/ai-coach">
            <Zap className="h-4 w-4" />
            Generate Workout
          </Link>
        </Button>
      </div>
    </header>
  )
}

function WorkoutCard({ workout }: { workout: (typeof workouts)[0] }) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="relative">
        <img
          src={workout.image || "/placeholder.svg"}
          alt={workout.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-700">
            <Bookmark className={cn("h-4 w-4", workout.isBookmarked && "fill-current")} />
          </Button>
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-700">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <Badge className={cn("absolute bottom-3 left-3", getDifficultyColor(workout.difficulty))}>
          {workout.difficulty}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">{workout.title}</CardTitle>
            <CardDescription className="text-sm">{workout.description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {workout.duration}
          </div>
          <div className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            {workout.exercises} exercises
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {workout.rating}
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 gap-2" asChild>
            <Link href="/timer">
              <Play className="h-4 w-4" />
              Start Workout
            </Link>
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function WorkoutsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All Workouts")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesCategory = selectedCategory === "All Workouts" || workout.category === selectedCategory
    const matchesSearch =
      workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search workouts..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {workoutCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{workouts.length}</p>
                      <p className="text-sm text-muted-foreground">Total Workouts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">Favorites</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">85%</p>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Workouts Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {selectedCategory === "All Workouts" ? "All Workouts" : selectedCategory}
                </h2>
                <p className="text-sm text-muted-foreground">{filteredWorkouts.length} workouts found</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredWorkouts.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </div>

              {filteredWorkouts.length === 0 && (
                <div className="text-center py-12">
                  <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No workouts found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                  <Button asChild>
                    <Link href="/ai-coach">Generate Custom Workout</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
