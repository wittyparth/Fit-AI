"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
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
  Trophy,
  BarChart3,
  PieChartIcon,
  LineChartIcon,
  Download,
  Share,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Link from "next/link"

const sidebarItems = [
  { icon: Activity, label: "Dashboard", href: "/" },
  { icon: Dumbbell, label: "Workouts", href: "/workouts" },
  { icon: Clock, label: "Timer", href: "/timer" },
  { icon: TrendingUp, label: "Progress", href: "/analytics", active: true },
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
        <Card className="premium-gradient dark:premium-gradient-dark border-primary/20">
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
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-sm text-muted-foreground">Track your fitness progress and insights</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Select defaultValue="30days">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 3 months</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon">
          <Share className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}

const workoutData = [
  { date: "Mon", workouts: 3, calories: 450, duration: 65, intensity: 75 },
  { date: "Tue", workouts: 2, calories: 320, duration: 45, intensity: 60 },
  { date: "Wed", workouts: 4, calories: 580, duration: 85, intensity: 90 },
  { date: "Thu", workouts: 1, calories: 180, duration: 25, intensity: 40 },
  { date: "Fri", workouts: 3, calories: 420, duration: 60, intensity: 70 },
  { date: "Sat", workouts: 2, calories: 350, duration: 50, intensity: 65 },
  { date: "Sun", workouts: 5, calories: 650, duration: 95, intensity: 85 },
]

const monthlyProgressData = [
  { month: "Jan", workouts: 18, calories: 5400, prs: 2 },
  { month: "Feb", workouts: 22, calories: 6200, prs: 3 },
  { month: "Mar", workouts: 25, calories: 7100, prs: 4 },
  { month: "Apr", workouts: 28, calories: 7800, prs: 5 },
  { month: "May", workouts: 24, calories: 6900, prs: 3 },
  { month: "Jun", workouts: 30, calories: 8500, prs: 6 },
]

const muscleGroupData = [
  { name: "Legs", value: 30, fill: "hsl(var(--chart-1))" },
  { name: "Chest", value: 25, fill: "hsl(var(--chart-2))" },
  { name: "Back", value: 20, fill: "hsl(var(--chart-3))" },
  { name: "Arms", value: 15, fill: "hsl(var(--chart-4))" },
  { name: "Core", value: 10, fill: "hsl(var(--chart-5))" },
]

const workoutTypeData = [
  { type: "Strength", sessions: 45, percentage: 45 },
  { type: "Cardio", sessions: 25, percentage: 25 },
  { type: "Flexibility", sessions: 15, percentage: 15 },
  { type: "Sports", sessions: 15, percentage: 15 },
]

const personalRecords = [
  { exercise: "Bench Press", current: 185, previous: 175, improvement: 10, date: "2024-01-05" },
  { exercise: "Squat", current: 225, previous: 215, improvement: 10, date: "2024-01-03" },
  { exercise: "Deadlift", current: 275, previous: 265, improvement: 10, date: "2024-01-01" },
  { exercise: "Pull-ups", current: 12, previous: 10, improvement: 2, date: "2024-01-04" },
]

const chartConfig = {
  workouts: {
    label: "Workouts",
    color: "hsl(var(--chart-1))",
  },
  calories: {
    label: "Calories",
    color: "hsl(var(--chart-2))",
  },
  duration: {
    label: "Duration",
    color: "hsl(var(--chart-3))",
  },
  intensity: {
    label: "Intensity",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export default function AnalyticsPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="hidden md:flex" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
                  <Dumbbell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
                  <Fire className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18,547</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +8% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Hours</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89.5</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +15% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Personal Records</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +4 this month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="workouts" className="flex items-center gap-2">
                  <LineChartIcon className="h-4 w-4" />
                  Workouts
                </TabsTrigger>
                <TabsTrigger value="muscle-groups" className="flex items-center gap-2">
                  <PieChartIcon className="h-4 w-4" />
                  Muscle Groups
                </TabsTrigger>
                <TabsTrigger value="records" className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Records
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader>
                      <CardTitle>Weekly Activity</CardTitle>
                      <CardDescription>Your workout frequency and intensity over the past week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig}>
                        <AreaChart
                          accessibilityLayer
                          data={workoutData}
                          margin={{
                            left: 12,
                            right: 12,
                          }}
                        >
                          <CartesianGrid vertical={false} />
                          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                          <defs>
                            <linearGradient id="fillWorkouts" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--color-workouts)" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="var(--color-workouts)" stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                          <Area
                            dataKey="workouts"
                            type="natural"
                            fill="url(#fillWorkouts)"
                            fillOpacity={0.4}
                            stroke="var(--color-workouts)"
                            stackId="a"
                          />
                        </AreaChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader>
                      <CardTitle>Muscle Group Distribution</CardTitle>
                      <CardDescription>Breakdown of your training focus</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                        <PieChart>
                          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                          <Pie data={muscleGroupData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
                            {muscleGroupData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card className="hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle>Monthly Progress Trends</CardTitle>
                    <CardDescription>Your fitness journey over the past 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig}>
                      <LineChart
                        accessibilityLayer
                        data={monthlyProgressData}
                        margin={{
                          left: 12,
                          right: 12,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                          dataKey="workouts"
                          type="monotone"
                          stroke="var(--color-workouts)"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          dataKey="prs"
                          type="monotone"
                          stroke="var(--color-intensity)"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                    <CardDescription>Your latest personal records and milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {personalRecords.slice(0, 3).map((record, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
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
                            <p className="font-bold text-lg">{record.current} lbs</p>
                            <p className="text-sm text-green-600">+{record.improvement} lbs</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="workouts" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader>
                      <CardTitle>Workout Intensity Trends</CardTitle>
                      <CardDescription>Track your workout intensity over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={workoutData}>
                          <CartesianGrid vertical={false} />
                          <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} />
                          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                          <Bar dataKey="intensity" fill="var(--color-intensity)" radius={8} />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader>
                      <CardTitle>Calories vs Duration</CardTitle>
                      <CardDescription>Relationship between workout length and calories burned</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig}>
                        <LineChart
                          accessibilityLayer
                          data={workoutData}
                          margin={{
                            left: 12,
                            right: 12,
                          }}
                        >
                          <CartesianGrid vertical={false} />
                          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                          <Line
                            dataKey="calories"
                            type="monotone"
                            stroke="var(--color-calories)"
                            strokeWidth={2}
                            dot={{
                              fill: "var(--color-calories)",
                            }}
                            activeDot={{
                              r: 6,
                            }}
                          />
                          <Line
                            dataKey="duration"
                            type="monotone"
                            stroke="var(--color-duration)"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={{
                              fill: "var(--color-duration)",
                            }}
                            activeDot={{
                              r: 6,
                            }}
                          />
                        </LineChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card className="hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle>Workout Types Distribution</CardTitle>
                    <CardDescription>How you spend your training time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig}>
                      <BarChart
                        accessibilityLayer
                        data={workoutTypeData}
                        layout="horizontal"
                        margin={{
                          left: 80,
                        }}
                      >
                        <CartesianGrid horizontal={false} />
                        <YAxis dataKey="type" type="category" tickLine={false} tickMargin={10} axisLine={false} />
                        <XAxis dataKey="sessions" type="number" hide />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="sessions" fill="var(--color-workouts)" radius={5} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="muscle-groups" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader>
                      <CardTitle>Muscle Group Focus</CardTitle>
                      <CardDescription>Training distribution across muscle groups</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
                        <PieChart>
                          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                          <Pie data={muscleGroupData} dataKey="value" nameKey="name" innerRadius={80} strokeWidth={5}>
                            {muscleGroupData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader>
                      <CardTitle>Training Balance</CardTitle>
                      <CardDescription>Ensure balanced muscle development</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {muscleGroupData.map((group, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: group.fill }} />
                              <span className="font-medium">{group.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress value={group.value} className="w-20 h-2" />
                              <span className="text-sm font-medium w-8">{group.value}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>AI-powered suggestions for balanced training</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start gap-3">
                          <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-900 dark:text-blue-100">Focus on Core Training</p>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              Your core training is at 10%. Consider adding more ab and stability exercises.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                        <div className="flex items-start gap-3">
                          <Trophy className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-900 dark:text-green-100">Great Leg Development</p>
                            <p className="text-sm text-green-700 dark:text-green-300">
                              Your leg training is well-balanced at 30%. Keep up the excellent work!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="records" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Records</CardTitle>
                    <CardDescription>Track your strength progression over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {personalRecords.map((record, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Trophy className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold">{record.exercise}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(record.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold">{record.current}</span>
                              <span className="text-sm text-muted-foreground">lbs</span>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            >
                              +{record.improvement} lbs
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Strength Progress</CardTitle>
                      <CardDescription>Your overall strength development</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary">+18%</div>
                          <p className="text-sm text-muted-foreground">Average strength increase</p>
                        </div>
                        <Progress value={72} className="h-3" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Beginner</span>
                          <span>Intermediate</span>
                          <span>Advanced</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Next Milestones</CardTitle>
                      <CardDescription>Upcoming strength goals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { exercise: "Bench Press", current: 185, target: 200, progress: 92 },
                          { exercise: "Squat", current: 225, target: 250, progress: 90 },
                          { exercise: "Deadlift", current: 275, target: 300, progress: 92 },
                        ].map((goal, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{goal.exercise}</span>
                              <span>
                                {goal.current}/{goal.target} lbs
                              </span>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
