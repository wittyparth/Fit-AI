"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Play,
    Pause,
    Clock,
    ChevronLeft,
    Star,
    Calendar,
    Users,
    Target,
    Zap,
    Dumbbell,
    MoreVertical,
    Plus,
    Search,
    Filter,
    Sparkles,
    TrendingUp,
    Trophy,
    Activity,
    Heart,
    MessageCircle
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Sample AI-generated workout routines data
const aiRoutines = [
    {
        id: "1",
        name: "Chest-Triceps Routine 2023",
        description: "AI-generated chest and triceps workout optimized for muscle growth",
        duration: "45-60 min",
        difficulty: "Intermediate",
        muscleGroups: ["Chest", "Triceps", "Shoulders"],
        exercises: [
            {
                name: "Bench Press (Barbell)",
                sets: 4,
                reps: "8-12",
                muscle: "Chest",
                equipment: "Barbell",
                difficulty: "Intermediate"
            },
            {
                name: "Incline Dumbbell Press",
                sets: 3,
                reps: "10-15",
                muscle: "Chest",
                equipment: "Dumbbells",
                difficulty: "Beginner"
            },
            {
                name: "Chest Dips",
                sets: 3,
                reps: "8-12",
                muscle: "Chest",
                equipment: "Dip Station",
                difficulty: "Intermediate"
            },
            {
                name: "Close-Grip Bench Press",
                sets: 3,
                reps: "8-10",
                muscle: "Triceps",
                equipment: "Barbell",
                difficulty: "Intermediate"
            },
            {
                name: "Overhead Tricep Extension",
                sets: 3,
                reps: "12-15",
                muscle: "Triceps",
                equipment: "Dumbbells",
                difficulty: "Beginner"
            },
            {
                name: "Diamond Push-ups",
                sets: 2,
                reps: "10-15",
                muscle: "Triceps",
                equipment: "Bodyweight",
                difficulty: "Intermediate"
            }
        ],
        createdAt: "2023-12-15",
        rating: 4.8,
        completions: 1247,
        tags: ["Mass Building", "Upper Body", "Hypertrophy"]
    },
    {
        id: "2",
        name: "Back-Biceps Routine",
        description: "Complete back and biceps workout for strength and size",
        duration: "50-65 min",
        difficulty: "Intermediate",
        muscleGroups: ["Back", "Biceps", "Forearms"],
        exercises: [
            {
                name: "Deadlift",
                sets: 4,
                reps: "5-8",
                muscle: "Back",
                equipment: "Barbell",
                difficulty: "Advanced"
            },
            {
                name: "Pull-ups",
                sets: 3,
                reps: "8-12",
                muscle: "Back",
                equipment: "Pull-up Bar",
                difficulty: "Intermediate"
            },
            {
                name: "Barbell Rows",
                sets: 4,
                reps: "8-10",
                muscle: "Back",
                equipment: "Barbell",
                difficulty: "Intermediate"
            },
            {
                name: "Lat Pulldowns",
                sets: 3,
                reps: "10-12",
                muscle: "Back",
                equipment: "Cable Machine",
                difficulty: "Beginner"
            },
            {
                name: "Barbell Curls",
                sets: 3,
                reps: "10-12",
                muscle: "Biceps",
                equipment: "Barbell",
                difficulty: "Beginner"
            },
            {
                name: "Hammer Curls",
                sets: 3,
                reps: "12-15",
                muscle: "Biceps",
                equipment: "Dumbbells",
                difficulty: "Beginner"
            }
        ],
        createdAt: "2023-12-10",
        rating: 4.6,
        completions: 892,
        tags: ["Strength", "Pull Day", "Compound Movements"]
    },
    {
        id: "3",
        name: "Legs-Shoulders-Abs Routine",
        description: "Lower body focused with shoulders and core work",
        duration: "60-75 min",
        difficulty: "Advanced",
        muscleGroups: ["Legs", "Glutes", "Shoulders", "Abs"],
        exercises: [
            {
                name: "Squats",
                sets: 4,
                reps: "8-12",
                muscle: "Quads",
                equipment: "Barbell",
                difficulty: "Intermediate"
            },
            {
                name: "Romanian Deadlifts",
                sets: 3,
                reps: "10-12",
                muscle: "Hamstrings",
                equipment: "Barbell",
                difficulty: "Intermediate"
            },
            {
                name: "Bulgarian Split Squats",
                sets: 3,
                reps: "12-15",
                muscle: "Quads",
                equipment: "Dumbbells",
                difficulty: "Intermediate"
            },
            {
                name: "Overhead Press",
                sets: 4,
                reps: "8-10",
                muscle: "Shoulders",
                equipment: "Barbell",
                difficulty: "Intermediate"
            },
            {
                name: "Lateral Raises",
                sets: 3,
                reps: "12-15",
                muscle: "Shoulders",
                equipment: "Dumbbells",
                difficulty: "Beginner"
            },
            {
                name: "Plank",
                sets: 3,
                reps: "60s",
                muscle: "Abs",
                equipment: "Bodyweight",
                difficulty: "Beginner"
            }
        ],
        createdAt: "2023-12-08",
        rating: 4.9,
        completions: 756,
        tags: ["Full Body", "Functional", "Core Strength"]
    }
]

const exerciseDatabase = [
    {
        name: "Dumbbell Standing Lateral Raise",
        muscle: "Shoulder",
        equipment: "Dumbbells",
        difficulty: "Beginner",
        rating: 4.5,
        image: "/placeholder-exercise.jpg"
    },
    {
        name: "Dumbbell Concentration Curl",
        muscle: "Biceps",
        equipment: "Dumbbells",
        difficulty: "Beginner",
        rating: 4.3,
        image: "/placeholder-exercise.jpg"
    },
    {
        name: "Dumbbell Standing Overhead Press",
        muscle: "Shoulder",
        equipment: "Dumbbells",
        difficulty: "Intermediate",
        rating: 4.6,
        image: "/placeholder-exercise.jpg"
    },
    {
        name: "Russian Twist",
        muscle: "Abs",
        equipment: "Bodyweight",
        difficulty: "Beginner",
        rating: 4.2,
        image: "/placeholder-exercise.jpg"
    },
    {
        name: "Push-up",
        muscle: "Chest",
        equipment: "Bodyweight",
        difficulty: "Beginner",
        rating: 4.8,
        image: "/placeholder-exercise.jpg"
    },
    {
        name: "Diamond Push-up",
        muscle: "Triceps",
        equipment: "Bodyweight",
        difficulty: "Intermediate",
        rating: 4.4,
        image: "/placeholder-exercise.jpg"
    },
    {
        name: "Pull-up",
        muscle: "Back",
        equipment: "Pull-up Bar",
        difficulty: "Advanced",
        rating: 4.9,
        image: "/placeholder-exercise.jpg"
    }
]

export default function AIRoutinesPage() {
    const [activeTab, setActiveTab] = useState("routines")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedDifficulty, setSelectedDifficulty] = useState("all")
    const [selectedMuscle, setSelectedMuscle] = useState("all")
    const [showAICreator, setShowAICreator] = useState(false)
    const [aiPrompt, setAiPrompt] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)

    const muscleGroups = ["all", "Chest", "Back", "Shoulders", "Arms", "Legs", "Core"]
    const difficultyLevels = ["all", "Beginner", "Intermediate", "Advanced"]

    const filteredRoutines = aiRoutines.filter(routine => {
        const matchesSearch = routine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            routine.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesDifficulty = selectedDifficulty === "all" || routine.difficulty === selectedDifficulty
        const matchesMuscle = selectedMuscle === "all" || routine.muscleGroups.includes(selectedMuscle)
        return matchesSearch && matchesDifficulty && matchesMuscle
    })

    const filteredExercises = exerciseDatabase.filter(exercise => {
        const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exercise.muscle.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesDifficulty = selectedDifficulty === "all" || exercise.difficulty === selectedDifficulty
        const matchesMuscle = selectedMuscle === "all" || exercise.muscle === selectedMuscle
        return matchesSearch && matchesDifficulty && matchesMuscle
    })

    const generateAIRoutine = async () => {
        setIsGenerating(true)
        // Simulate AI generation
        await new Promise(resolve => setTimeout(resolve, 3000))
        setIsGenerating(false)
        setShowAICreator(false)
        setAiPrompt("")
        // In a real app, this would create a new routine based on the prompt
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b bg-card sticky top-0 z-50">
                <div className="container mx-auto max-w-6xl p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                            <Button variant="ghost" size="icon" asChild className="shrink-0">
                                <Link href="/">
                                    <ChevronLeft className="h-5 w-5" />
                                </Link>
                            </Button>
                            <div className="min-w-0 flex-1">
                                <h1 className="text-lg sm:text-xl font-semibold truncate">My Routines</h1>
                                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                                    AI-generated workout routines & exercises
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Dialog open={showAICreator} onOpenChange={setShowAICreator}>
                                <DialogTrigger asChild>
                                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                        <Sparkles className="h-4 w-4 mr-2" />
                                        <span className="hidden sm:inline">AI Creator</span>
                                        <span className="sm:hidden">AI</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                    <DialogHeader>
                                        <DialogTitle className="flex items-center gap-2">
                                            <Sparkles className="h-5 w-5 text-blue-500" />
                                            AI Routine Creator
                                        </DialogTitle>
                                        <DialogDescription>
                                            Describe the workout you want and AI will create a personalized routine for you.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="ai-prompt">Describe your ideal workout</Label>
                                            <textarea
                                                id="ai-prompt"
                                                placeholder="e.g., I want a 30-minute upper body workout for beginners using only dumbbells..."
                                                value={aiPrompt}
                                                onChange={(e) => setAiPrompt(e.target.value)}
                                                className="w-full mt-2 p-3 border rounded-lg resize-none h-24 text-sm"
                                            />
                                        </div>
                                        <Button
                                            onClick={generateAIRoutine}
                                            disabled={!aiPrompt.trim() || isGenerating}
                                            className="w-full"
                                        >
                                            {isGenerating ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Generating...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="h-4 w-4 mr-2" />
                                                    Generate Routine
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl p-4">
                {/* Tabs Navigation */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="routines" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span className="hidden sm:inline">My Routines</span>
                            <span className="sm:hidden">Routines</span>
                        </TabsTrigger>
                        <TabsTrigger value="exercises" className="flex items-center gap-2">
                            <Dumbbell className="h-4 w-4" />
                            <span className="hidden sm:inline">Exercises</span>
                            <span className="sm:hidden">Exercises</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Search and Filters */}
                    <div className="space-y-4 mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={activeTab === "routines" ? "Search routines..." : "Search exercises..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-2">
                            <div className="flex items-center gap-2 shrink-0">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                            </div>

                            {/* Difficulty Filter */}
                            <div className="flex gap-1 shrink-0">
                                {difficultyLevels.map(level => (
                                    <Button
                                        key={level}
                                        variant={selectedDifficulty === level ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedDifficulty(level)}
                                        className="h-8 px-3 text-xs whitespace-nowrap"
                                    >
                                        {level === "all" ? "All Levels" : level}
                                    </Button>
                                ))}
                            </div>

                            {/* Muscle Group Filter */}
                            <div className="flex gap-1 shrink-0">
                                {muscleGroups.map(muscle => (
                                    <Button
                                        key={muscle}
                                        variant={selectedMuscle === muscle ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedMuscle(muscle)}
                                        className="h-8 px-3 text-xs whitespace-nowrap"
                                    >
                                        {muscle === "all" ? "All Muscles" : muscle}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Routines Tab */}
                    <TabsContent value="routines" className="space-y-4">
                        {filteredRoutines.length === 0 ? (
                            <Card className="p-8 text-center">
                                <div className="text-muted-foreground">
                                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <h3 className="text-lg font-medium mb-2">No routines found</h3>
                                    <p className="text-sm">Try adjusting your search or filters</p>
                                </div>
                            </Card>
                        ) : (
                            filteredRoutines.map((routine) => (
                                <Card key={routine.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4 sm:p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Target className="h-5 w-5 text-blue-500 shrink-0" />
                                                    <h3 className="font-semibold text-base sm:text-lg truncate">{routine.name}</h3>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                                    {routine.description}
                                                </p>

                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    <Badge className={getDifficultyColor(routine.difficulty)}>
                                                        {routine.difficulty}
                                                    </Badge>
                                                    <Badge variant="outline" className="text-xs">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        {routine.duration}
                                                    </Badge>
                                                    <Badge variant="outline" className="text-xs">
                                                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                                        {routine.rating}
                                                    </Badge>
                                                </div>

                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {routine.muscleGroups.map(muscle => (
                                                        <Badge key={muscle} variant="secondary" className="text-xs">
                                                            {muscle}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <Button size="sm" asChild className="shrink-0 ml-4">
                                                <Link href="/timer">
                                                    <Play className="h-4 w-4 mr-2" />
                                                    Start
                                                </Link>
                                            </Button>
                                        </div>

                                        {/* Exercise Preview */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-medium">Exercises ({routine.exercises.length})</h4>
                                                <span className="text-xs text-muted-foreground">
                                                    {routine.completions.toLocaleString()} completions
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                                                {routine.exercises.slice(0, 6).map((exercise, index) => (
                                                    <div key={index} className="p-2 bg-muted/50 rounded-lg text-center">
                                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-1">
                                                            <Dumbbell className="h-4 w-4 text-primary" />
                                                        </div>
                                                        <p className="text-xs font-medium truncate">{exercise.name}</p>
                                                        <p className="text-xs text-muted-foreground">{exercise.sets} sets</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {routine.tags.map(tag => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </TabsContent>

                    {/* Exercises Tab */}
                    <TabsContent value="exercises" className="space-y-4">
                        {/* Recent Exercises */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    Recent Exercises
                                </h2>
                                <Button variant="ghost" size="sm" className="text-xs">
                                    Clear Recent
                                </Button>
                            </div>

                            <div className="space-y-2">
                                {exerciseDatabase.slice(0, 4).map((exercise, index) => (
                                    <Card key={index} className="hover:shadow-sm transition-shadow">
                                        <CardContent className="p-3 sm:p-4">
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-lg flex items-center justify-center shrink-0">
                                                    <Dumbbell className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-sm sm:text-base truncate">{exercise.name}</h3>
                                                    <p className="text-xs sm:text-sm text-muted-foreground">{exercise.muscle}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge className={getDifficultyColor(exercise.difficulty)} variant="secondary">
                                                            {exercise.difficulty}
                                                        </Badge>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                            <span className="text-xs">{exercise.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button size="icon" variant="ghost" className="shrink-0">
                                                    <Star className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* All Exercises */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Dumbbell className="h-5 w-5" />
                                All Exercises
                            </h2>

                            {filteredExercises.length === 0 ? (
                                <Card className="p-8 text-center">
                                    <div className="text-muted-foreground">
                                        <Dumbbell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <h3 className="text-lg font-medium mb-2">No exercises found</h3>
                                        <p className="text-sm">Try adjusting your search or filters</p>
                                    </div>
                                </Card>
                            ) : (
                                <div className="space-y-2">
                                    {filteredExercises.map((exercise, index) => (
                                        <Card key={index} className="hover:shadow-sm transition-shadow">
                                            <CardContent className="p-3 sm:p-4">
                                                <div className="flex items-center gap-3 sm:gap-4">
                                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-lg flex items-center justify-center shrink-0">
                                                        <Dumbbell className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-medium text-sm sm:text-base truncate">{exercise.name}</h3>
                                                        <p className="text-xs sm:text-sm text-muted-foreground">{exercise.muscle}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Badge className={getDifficultyColor(exercise.difficulty)} variant="secondary">
                                                                {exercise.difficulty}
                                                            </Badge>
                                                            <div className="flex items-center gap-1">
                                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                                <span className="text-xs">{exercise.rating}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Button size="icon" variant="ghost" className="shrink-0">
                                                        <Star className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Bottom Navigation Simulation */}
            <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4 sm:hidden">
                <div className="flex justify-around">
                    <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span className="text-xs">Routines</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                        <Dumbbell className="h-4 w-4" />
                        <span className="text-xs">Exercises</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                        <Activity className="h-4 w-4" />
                        <span className="text-xs">Workout</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-xs">Progress</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span className="text-xs">Account</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
