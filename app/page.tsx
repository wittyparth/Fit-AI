"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  Activity,
  Calendar as CalendarIcon,
  Clock,
  Dumbbell,
  Flame,
  Menu,
  TrendingUp,
  Users,
  Zap,
  ChevronLeft,
  ChevronRight,
  History,
  BarChart3,
  Settings,
  Bell,
  User,
  FileText,
  Weight,
  Target,
  CheckCircle,
  Play,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

const sidebarItems = [
  { icon: Activity, label: "Dashboard", active: true, href: "/" },
  { icon: Dumbbell, label: "Workouts", href: "/workouts" },
  { icon: FileText, label: "Templates", href: "/templates" },
  { icon: Clock, label: "Timer", href: "/timer" },
  { icon: BarChart3, label: "Progress", href: "/progress" },
  { icon: Users, label: "Community", href: "/community" },
  { icon: Zap, label: "AI Coach", href: "/ai-coach" },
]

function CleanSidebar({
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
      data-sidebar="sidebar"
    >
      {/* Logo Header */}
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        {!collapsed ? (
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Dumbbell className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg font-linear-heading">FitAI</span>
          </Link>
        ) : (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
            <Dumbbell className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors btn-linear",
              item.active
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {!collapsed && <span className="font-linear">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Collapse Toggle */}
      {onToggle && (
        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-full justify-center btn-linear"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      )}

      {/* Streak Card */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <Card className="card-linear">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium font-linear">Current Streak</span>
              </div>
              <div className="text-2xl font-bold text-primary font-linear-heading">7 days</div>
              <p className="text-xs text-muted-foreground font-linear">Keep going strong!</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

function CleanHeader({ onSidebarToggle, sidebarCollapsed }: { onSidebarToggle: () => void; sidebarCollapsed: boolean }) {
  return (
    <header className="flex h-16 items-center justify-between px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onSidebarToggle} className="hidden md:flex btn-linear">
          <Menu className="h-5 w-5" />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden btn-linear">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <CleanSidebar />
          </SheetContent>
        </Sheet>

        <div>
          <h1 className="text-2xl font-linear-heading font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground font-linear">Welcome back! Ready for today's workout?</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Button variant="ghost" size="icon" className="relative btn-linear">
          <Bell className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="btn-linear">
          <Settings className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="btn-linear">
          <User className="h-5 w-5" />
        </Button>

        <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground btn-linear font-linear" asChild>
          <Link href="/timer">
            <Zap className="h-4 w-4" />
            Start Workout
          </Link>
        </Button>
      </div>
    </header>
  )
}

function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  trend,
}: {
  title: string
  value: string
  change: string
  icon: any
  trend: "up" | "down"
}) {
  return (
    <Card className="card-linear">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium font-linear">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-linear-heading">{value}</div>
        <p className={cn(
          "text-xs flex items-center gap-1 font-linear",
          trend === "up" ? "text-green-600" : "text-red-600"
        )}>
          <TrendingUp className={cn("h-3 w-3", trend === "down" && "rotate-180")} />
          {change}
        </p>
      </CardContent>
    </Card>
  )
}

function WorkoutCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  
  // Mock workout data - dates with workouts
  const workoutDates = [
    new Date(2025, 8, 10),
    new Date(2025, 8, 11),
    new Date(2025, 8, 12),
    new Date(2025, 8, 13),
    new Date(2025, 8, 14),
    new Date(2025, 8, 15),
    new Date(2025, 8, 16),
    new Date(2025, 8, 17),
    new Date(2025, 8, 18), // Today (current streak)
  ]

  // Streak dates (consecutive workout days)
  const streakDates = [
    new Date(2025, 8, 12),
    new Date(2025, 8, 13),
    new Date(2025, 8, 14),
    new Date(2025, 8, 15),
    new Date(2025, 8, 16),
    new Date(2025, 8, 17),
    new Date(2025, 8, 18),
  ]

  return (
    <Card className="card-linear">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-linear-heading">
          <CalendarIcon className="h-5 w-5" />
          Workout Calendar
        </CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-600" />
            <span className="font-medium text-orange-600 font-linear">7 day streak!</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-full max-w-sm">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border w-full"
            classNames={{
              months: "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4 w-full flex flex-col",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex w-full",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] flex-1 text-center",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative flex-1 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 mx-auto",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
            modifiers={{
              workout: workoutDates,
              streak: streakDates,
            }}
            modifiersStyles={{
              workout: {
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                fontWeight: 'bold',
                position: 'relative',
              },
              streak: {
                backgroundColor: 'hsl(var(--orange))',
                color: 'white',
                fontWeight: 'bold',
                boxShadow: '0 0 0 2px hsl(var(--orange))',
              },
            }}
          />
        </div>
        <div className="flex items-center justify-between text-xs mt-4 w-full">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <span>Workout completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-500 ring-2 ring-orange-500"></div>
              <span>Streak day</span>
            </div>
          </div>
          <span className="text-muted-foreground">{workoutDates.length} workouts this month</span>
        </div>
      </CardContent>
    </Card>
  )
}

function WorkoutHistory() {
  const recentWorkouts = [
    {
      id: 1,
      name: "Upper Body Strength",
      date: "Today",
      duration: "45 min",
      exercises: 8,
      calories: 320,
      intensity: "high" as const,
    },
    {
      id: 2,
      name: "HIIT Cardio",
      date: "Yesterday",
      duration: "30 min",
      exercises: 6,
      calories: 280,
      intensity: "peak" as const,
    },
    {
      id: 3,
      name: "Lower Body Power",
      date: "2 days ago",
      duration: "50 min",
      exercises: 10,
      calories: 380,
      intensity: "high" as const,
    },
    {
      id: 4,
      name: "Recovery Yoga",
      date: "3 days ago",
      duration: "35 min",
      exercises: 12,
      calories: 150,
      intensity: "low" as const,
    },
    {
      id: 5,
      name: "Full Body Circuit",
      date: "4 days ago",
      duration: "40 min",
      exercises: 9,
      calories: 340,
      intensity: "medium" as const,
    },
  ]

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "low":
        return "bg-blue-500"
      case "medium":
        return "bg-green-500"
      case "high":
        return "bg-orange-500"
      case "peak":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="card-linear">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Workout History
        </CardTitle>
        <CardDescription>Your recent training sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={cn("h-3 w-3 rounded-full", getIntensityColor(workout.intensity))} />
                <div>
                  <p className="font-medium">{workout.name}</p>
                  <p className="text-sm text-muted-foreground">{workout.date}</p>
                </div>
              </div>
              <div className="text-right text-sm">
                <p className="font-medium">{workout.duration}</p>
                <p className="text-muted-foreground">{workout.calories} cal</p>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full mt-4 btn-linear" asChild>
            <Link href="/workouts">View All Workouts</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Workout Progress Component
function WorkoutProgress() {
  const workoutTypes = [
    { name: "Upper Body", completed: 3, target: 4, percentage: 75 },
    { name: "Lower Body", completed: 2, target: 3, percentage: 67 },
    { name: "Cardio", completed: 2, target: 2, percentage: 100 },
    { name: "Core", completed: 1, target: 2, percentage: 50 },
  ]

  return (
    <Card className="card-linear">
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
        <CardDescription>Workout type distribution this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workoutTypes.map((type) => (
            <div key={type.name} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">{type.name}</span>
                <span className="text-muted-foreground">{type.completed}/{type.target} workouts</span>
              </div>
              <Progress value={type.percentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{type.percentage}% complete</span>
                <span>{type.target - type.completed} remaining</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Progression Charts Component
function ProgressionCharts() {
  const [selectedPeriod, setSelectedPeriod] = useState("3months")
  
  // Mock data for different time periods
  const progressionData = {
    "3months": {
      weight: [
        { month: "Jun", value: 70 },
        { month: "Jul", value: 72 },
        { month: "Aug", value: 74 },
        { month: "Sep", value: 75 },
      ],
      volume: [
        { month: "Jun", value: 8500 },
        { month: "Jul", value: 9200 },
        { month: "Aug", value: 10100 },
        { month: "Sep", value: 11200 },
      ],
      duration: [
        { month: "Jun", value: 180 },
        { month: "Jul", value: 195 },
        { month: "Aug", value: 210 },
        { month: "Sep", value: 225 },
      ]
    },
    "6months": {
      weight: [
        { month: "Apr", value: 68 },
        { month: "May", value: 69 },
        { month: "Jun", value: 70 },
        { month: "Jul", value: 72 },
        { month: "Aug", value: 74 },
        { month: "Sep", value: 75 },
      ],
      volume: [
        { month: "Apr", value: 7200 },
        { month: "May", value: 7800 },
        { month: "Jun", value: 8500 },
        { month: "Jul", value: 9200 },
        { month: "Aug", value: 10100 },
        { month: "Sep", value: 11200 },
      ],
      duration: [
        { month: "Apr", value: 150 },
        { month: "May", value: 165 },
        { month: "Jun", value: 180 },
        { month: "Jul", value: 195 },
        { month: "Aug", value: 210 },
        { month: "Sep", value: 225 },
      ]
    },
    "1year": {
      weight: [
        { month: "Oct '24", value: 65 },
        { month: "Dec '24", value: 66 },
        { month: "Feb '25", value: 68 },
        { month: "Apr '25", value: 70 },
        { month: "Jun '25", value: 72 },
        { month: "Aug '25", value: 74 },
        { month: "Sep '25", value: 75 },
      ],
      volume: [
        { month: "Oct '24", value: 5500 },
        { month: "Dec '24", value: 6200 },
        { month: "Feb '25", value: 6800 },
        { month: "Apr '25", value: 7500 },
        { month: "Jun '25", value: 8500 },
        { month: "Aug '25", value: 10100 },
        { month: "Sep '25", value: 11200 },
      ],
      duration: [
        { month: "Oct '24", value: 120 },
        { month: "Dec '24", value: 135 },
        { month: "Feb '25", value: 150 },
        { month: "Apr '25", value: 165 },
        { month: "Jun '25", value: 180 },
        { month: "Aug '25", value: 210 },
        { month: "Sep '25", value: 225 },
      ]
    }
  }

  const data = progressionData[selectedPeriod as keyof typeof progressionData]

  return (
    <Card className="card-linear lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Progression Charts
            </CardTitle>
            <CardDescription>Track your fitness journey over time</CardDescription>
          </div>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weight" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weight" className="flex items-center gap-2">
              <Weight className="h-4 w-4" />
              Weight
            </TabsTrigger>
            <TabsTrigger value="volume" className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              Volume
            </TabsTrigger>
            <TabsTrigger value="duration" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Duration
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="weight" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Weight Progression</h4>
                <span className="text-sm text-muted-foreground">kg</span>
              </div>
              <ChartContainer
                config={{
                  value: {
                    label: "Weight",
                    color: "hsl(var(--primary))",
                  },
                }}
                className="h-64 w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.weight}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="volume" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Volume Progression</h4>
                <span className="text-sm text-muted-foreground">kg lifted</span>
              </div>
              <ChartContainer
                config={{
                  value: {
                    label: "Volume",
                    color: "hsl(var(--orange))",
                  },
                }}
                className="h-64 w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.volume}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--orange))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--orange))", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="duration" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Duration Progression</h4>
                <span className="text-sm text-muted-foreground">minutes/week</span>
              </div>
              <ChartContainer
                config={{
                  value: {
                    label: "Duration",
                    color: "hsl(var(--green))",
                  },
                }}
                className="h-64 w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.duration}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--green))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--green))", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default function CleanDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <CleanSidebar
        className="hidden md:flex"
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <CleanHeader
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard title="Weekly Goal" value="3/4" change="75% complete" icon={Target} trend="up" />
              <StatsCard title="Duration" value="8.5h" change="+2h this week" icon={Clock} trend="up" />
              <StatsCard title="Volume" value="2,450kg" change="+180kg" icon={Weight} trend="up" />
              <StatsCard title="Streak" value="7 days" change="🔥 Keep going!" icon={Flame} trend="up" />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Today's Workout */}
              <Card className="lg:col-span-2 card-linear">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Today's Workout
                  </CardTitle>
                  <CardDescription>Upper Body Strength - 45 minutes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">0 of 3 exercises</span>
                  </div>
                  <Progress value={0} className="h-2" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg gradient-primary text-white">
                      <div>
                        <p className="font-medium">Bench Press</p>
                        <p className="text-sm opacity-90">4 sets × 8 reps</p>
                      </div>
                      <Badge className="bg-white/20 text-white">Ready</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">Incline Dumbbell Press</p>
                        <p className="text-sm text-muted-foreground">3 sets × 10 reps</p>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">Cable Flyes</p>
                        <p className="text-sm text-muted-foreground">3 sets × 12 reps</p>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </div>

                  <Button className="w-full btn-linear font-linear" asChild>
                    <Link href="/timer">
                      <Play className="h-4 w-4 mr-2" />
                      Start Workout
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="card-linear">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 btn-linear"
                      asChild
                    >
                      <Link href="/progress">
                        <TrendingUp className="h-4 w-4" />
                        Track Progress
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 btn-linear"
                      asChild
                    >
                      <Link href="/workouts">
                        <Dumbbell className="h-4 w-4" />
                        Browse Workouts
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 btn-linear"
                      asChild
                    >
                      <Link href="/community">
                        <Users className="h-4 w-4" />
                        Join Community
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Weekly Progress */}
                <WorkoutProgress />
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <WorkoutCalendar />
              <WorkoutHistory />
            </div>

            {/* Progression Charts Section */}
            <div className="grid gap-6">
              <ProgressionCharts />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}