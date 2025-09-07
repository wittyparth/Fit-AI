"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Play,
  Pause,
  Clock,
  CheckCircle,
  ChevronLeft,
  SkipForward,
  Timer,
  Edit3,
  ArrowRight,
  Plus,
  Minus,
  Trophy,
  TrendingUp,
  Settings,
  BarChart3,
  Target
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Sample workout data with enhanced details
const sampleWorkout = [
  {
    id: "1",
    name: "Bench Press (Barbell)",
    sets: 4,
    muscle: "Chest",
    equipment: "Barbell",
    personalRecord: { weight: 225, reps: 8 },
    lastWorkout: {
      sets: [
        { weight: 135, reps: 12, rpe: 7, restTime: 90 },
        { weight: 155, reps: 10, rpe: 8, restTime: 120 },
        { weight: 175, reps: 8, rpe: 9, restTime: 120 },
        { weight: 185, reps: 6, rpe: 9.5, restTime: 90 }
      ]
    },
    tips: ["Keep core engaged", "Control the negative", "Full range of motion"],
    targetMuscles: ["Chest", "Triceps", "Anterior Deltoids"]
  },
  {
    id: "2",
    name: "Incline Dumbbell Press",
    sets: 3,
    muscle: "Chest",
    equipment: "Dumbbells",
    personalRecord: { weight: 80, reps: 10 },
    lastWorkout: {
      sets: [
        { weight: 60, reps: 12, rpe: 7, restTime: 90 },
        { weight: 65, reps: 10, rpe: 8, restTime: 90 },
        { weight: 70, reps: 8, rpe: 8.5, restTime: 90 }
      ]
    },
    tips: ["Squeeze chest at top", "45-degree angle", "Control the weight"],
    targetMuscles: ["Upper Chest", "Triceps", "Anterior Deltoids"]
  },
  {
    id: "3",
    name: "Push-ups",
    sets: 3,
    muscle: "Chest",
    equipment: "Bodyweight",
    personalRecord: { weight: 0, reps: 25 },
    lastWorkout: {
      sets: [
        { weight: 0, reps: 15, rpe: 6, restTime: 60 },
        { weight: 0, reps: 12, rpe: 7, restTime: 60 },
        { weight: 0, reps: 10, rpe: 8, restTime: 60 }
      ]
    },
    tips: ["Perfect form over speed", "Full extension", "Engage core"],
    targetMuscles: ["Chest", "Triceps", "Core"]
  }
]

export default function WorkoutTimer() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [restTime, setRestTime] = useState(90)
  const [customRestTime, setCustomRestTime] = useState(90)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [workoutSets, setWorkoutSets] = useState<Record<string, any[]>>({})
  const [editingSet, setEditingSet] = useState<number | null>(null)
  const [workoutStartTime] = useState(Date.now())
  const [showStats, setShowStats] = useState(false)
  const [showExerciseDetails, setShowExerciseDetails] = useState(false)

  const currentExercise = sampleWorkout[currentExerciseIndex]
  const exerciseSets = workoutSets[currentExercise.id] || []

  // Calculate workout stats
  const completedSets = Object.values(workoutSets).flat().filter(set => set.completed)
  const totalVolume = completedSets.reduce((total, set) => total + (set.weight * set.reps), 0)
  const averageRPE = completedSets.length > 0
    ? completedSets.reduce((total, set) => total + (set.rpe || 0), 0) / completedSets.length
    : 0
  const workoutDuration = Math.floor((Date.now() - workoutStartTime) / 1000)

  // Initialize sets with last workout data
  useEffect(() => {
    if (!workoutSets[currentExercise.id]) {
      const initialSets = Array.from({ length: currentExercise.sets }, (_, i) => ({
        weight: currentExercise.lastWorkout?.sets[i]?.weight || 0,
        reps: currentExercise.lastWorkout?.sets[i]?.reps || 10,
        rpe: 7,
        completed: false,
        restTime: 0
      }))
      setWorkoutSets(prev => ({
        ...prev,
        [currentExercise.id]: initialSets
      }))
    }
  }, [currentExercise.id])

  // Timer effect
  useEffect(() => {
    if (isTimerRunning && restTime > 0) {
      const timer = setInterval(() => {
        setRestTime(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (restTime === 0) {
      setIsTimerRunning(false)
      setIsResting(false)
    }
  }, [isTimerRunning, restTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const completeSet = (setIndex: number) => {
    const updatedSets = [...exerciseSets]
    updatedSets[setIndex] = { ...updatedSets[setIndex], completed: true, completedAt: Date.now() }
    setWorkoutSets(prev => ({
      ...prev,
      [currentExercise.id]: updatedSets
    }))

    if (setIndex < currentExercise.sets - 1) {
      setCurrentSetIndex(setIndex + 1)
      setIsResting(true)
      setRestTime(customRestTime)
      setIsTimerRunning(true)
    } else {
      nextExercise()
    }
    setEditingSet(null)
  }

  const skipSet = () => {
    if (currentSetIndex < currentExercise.sets - 1) {
      setCurrentSetIndex(currentSetIndex + 1)
    } else {
      nextExercise()
    }
  }

  const nextExercise = () => {
    if (currentExerciseIndex < sampleWorkout.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
      setCurrentSetIndex(0)
      setIsResting(false)
      setIsTimerRunning(false)
    }
  }

  const skipExercise = () => {
    nextExercise()
  }

  const updateSetValue = (setIndex: number, field: 'weight' | 'reps' | 'rpe', value: number) => {
    const updatedSets = [...exerciseSets]
    updatedSets[setIndex] = { ...updatedSets[setIndex], [field]: value }
    setWorkoutSets(prev => ({
      ...prev,
      [currentExercise.id]: updatedSets
    }))
  }

  const setRestTimer = (seconds: number) => {
    setCustomRestTime(seconds)
    setRestTime(seconds)
    setIsResting(true)
    setIsTimerRunning(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto max-w-6xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-xl font-semibold truncate">{currentExercise.name}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {currentExercise.muscle} • Exercise {currentExerciseIndex + 1}/{sampleWorkout.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={showStats} onOpenChange={setShowStats}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Workout Stats</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{completedSets.length}</div>
                        <div className="text-xs text-muted-foreground">Sets</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{totalVolume.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Volume (lbs)</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{formatTime(workoutDuration)}</div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{averageRPE.toFixed(1)}</div>
                        <div className="text-xs text-muted-foreground">Avg RPE</div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Badge variant="outline" className="text-xs">
                Set {currentSetIndex + 1}/{currentExercise.sets}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl p-4 space-y-4 sm:space-y-6">

        {/* Exercise Demo */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <div className="text-center text-muted-foreground">
                <Play className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2" />
                <p className="text-sm sm:text-lg font-medium">{currentExercise.name}</p>
                <p className="text-xs sm:text-sm">Exercise demonstration</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3">
              <Badge variant="secondary" className="text-xs">{currentExercise.muscle}</Badge>
              <Badge variant="outline" className="text-xs">{currentExercise.equipment}</Badge>
            </div>

            <Dialog open={showExerciseDetails} onOpenChange={setShowExerciseDetails}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full" size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  Exercise Details
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{currentExercise.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Target Muscles</h4>
                    <div className="flex flex-wrap gap-1">
                      {currentExercise.targetMuscles.map(muscle => (
                        <Badge key={muscle} variant="secondary" className="text-xs">{muscle}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Form Tips</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {currentExercise.tips.map((tip, i) => (
                        <li key={i}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Personal Record</h4>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium">
                          {currentExercise.personalRecord.weight > 0
                            ? `${currentExercise.personalRecord.weight}lbs × ${currentExercise.personalRecord.reps}`
                            : `${currentExercise.personalRecord.reps} reps`
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Enhanced Rest Timer */}
        {isResting && (
          <Card className="border-orange-500 bg-orange-50 dark:bg-orange-950/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-orange-500">{formatTime(restTime)}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Rest Time</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="h-8 w-8 p-0 sm:h-auto sm:w-auto sm:px-3"
                  >
                    {isTimerRunning ? <Pause className="h-3 w-3 sm:h-4 sm:w-4" /> : <Play className="h-3 w-3 sm:h-4 sm:w-4" />}
                    <span className="hidden sm:inline ml-2">{isTimerRunning ? 'Pause' : 'Play'}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsResting(false)
                      setIsTimerRunning(false)
                    }}
                    className="text-xs sm:text-sm"
                  >
                    Skip Rest
                  </Button>
                </div>
              </div>

              {/* Quick Timer Options */}
              <div className="flex gap-1 sm:gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground self-center">Quick set:</span>
                {[30, 60, 90, 120, 180].map(seconds => (
                  <Button
                    key={seconds}
                    variant="ghost"
                    size="sm"
                    onClick={() => setRestTimer(seconds)}
                    className="h-7 sm:h-8 px-2 text-xs"
                  >
                    {formatTime(seconds)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sets Log */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg">Sets</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRestTimer(customRestTime)}
                className="text-xs h-8 px-2"
              >
                <Timer className="h-3 w-3 mr-1" />
                Start Timer
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 pt-0">
            {Array.from({ length: currentExercise.sets }, (_, i) => {
              const set = exerciseSets[i] || {
                weight: currentExercise.lastWorkout?.sets[i]?.weight || 0,
                reps: currentExercise.lastWorkout?.sets[i]?.reps || 10,
                rpe: 7,
                completed: false
              }
              const isCurrentSet = i === currentSetIndex
              const isCompleted = set.completed
              const lastWorkoutSet = currentExercise.lastWorkout?.sets[i]
              const isPersonalRecord = set.weight >= (currentExercise.personalRecord?.weight || 0) &&
                set.reps >= (currentExercise.personalRecord?.reps || 0)

              return (
                <div
                  key={i}
                  className={cn(
                    "p-3 sm:p-4 rounded-lg border transition-all",
                    isCompleted ? "bg-green-50 dark:bg-green-950/20 border-green-200" :
                      isCurrentSet ? "bg-primary/5 border-primary/20 ring-1 ring-primary/20" :
                        "bg-muted/30"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className={cn(
                      "w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium",
                      isCompleted ? "bg-green-500 text-white" :
                        isCurrentSet ? "bg-primary text-primary-foreground" :
                          "bg-muted-foreground/20"
                    )}>
                      {i + 1}
                    </div>

                    {lastWorkoutSet && (
                      <div className="text-xs text-muted-foreground">
                        Last: {lastWorkoutSet.weight > 0 ? `${lastWorkoutSet.weight}×` : ''}{lastWorkoutSet.reps}
                      </div>
                    )}

                    {isPersonalRecord && !isCompleted && (
                      <Trophy className="h-4 w-4 text-yellow-600 ml-auto" />
                    )}

                    {isCompleted && (
                      <div className="flex items-center gap-1 text-green-600 ml-auto">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-xs sm:text-sm">Done</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {/* Weight Input */}
                    {currentExercise.equipment !== "Bodyweight" && (
                      <div>
                        <Label className="text-xs text-muted-foreground">Weight</Label>
                        <div className="flex items-center gap-1 mt-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateSetValue(i, 'weight', Math.max(0, set.weight - 5))}
                            className="h-7 w-7 p-0"
                            disabled={isCompleted}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            value={set.weight}
                            onChange={(e) => updateSetValue(i, 'weight', Number(e.target.value))}
                            className="text-center h-7 text-sm flex-1"
                            disabled={isCompleted}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateSetValue(i, 'weight', set.weight + 5)}
                            className="h-7 w-7 p-0"
                            disabled={isCompleted}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Reps Input */}
                    <div>
                      <Label className="text-xs text-muted-foreground">Reps</Label>
                      <div className="flex items-center gap-1 mt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateSetValue(i, 'reps', Math.max(0, set.reps - 1))}
                          className="h-7 w-7 p-0"
                          disabled={isCompleted}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="number"
                          value={set.reps}
                          onChange={(e) => updateSetValue(i, 'reps', Number(e.target.value))}
                          className="text-center h-7 text-sm flex-1"
                          disabled={isCompleted}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateSetValue(i, 'reps', set.reps + 1)}
                          className="h-7 w-7 p-0"
                          disabled={isCompleted}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* RPE Input */}
                    <div>
                      <Label className="text-xs text-muted-foreground">RPE</Label>
                      <div className="flex items-center gap-1 mt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateSetValue(i, 'rpe', Math.max(1, set.rpe - 0.5))}
                          className="h-7 w-7 p-0"
                          disabled={isCompleted}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="number"
                          value={set.rpe}
                          onChange={(e) => updateSetValue(i, 'rpe', Number(e.target.value))}
                          className="text-center h-7 text-sm flex-1"
                          disabled={isCompleted}
                          step="0.5"
                          min="1"
                          max="10"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateSetValue(i, 'rpe', Math.min(10, set.rpe + 0.5))}
                          className="h-7 w-7 p-0"
                          disabled={isCompleted}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Complete Button */}
                  {!isCompleted && isCurrentSet && (
                    <Button
                      onClick={() => completeSet(i)}
                      size="sm"
                      className="w-full h-8"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Complete Set
                    </Button>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Custom Rest Timer Setting */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">Default Rest Time</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCustomRestTime(Math.max(30, customRestTime - 30))}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  value={customRestTime}
                  onChange={(e) => setCustomRestTime(Number(e.target.value))}
                  className="w-20 text-center h-8"
                  min="30"
                  max="300"
                />
                <span className="text-xs text-muted-foreground">sec</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCustomRestTime(Math.min(300, customRestTime + 30))}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[60, 90, 120, 180, 240].map(seconds => (
                <Button
                  key={seconds}
                  variant={customRestTime === seconds ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCustomRestTime(seconds)}
                  className="h-8 px-3 text-xs"
                >
                  {formatTime(seconds)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={skipSet}
            className="h-12"
          >
            <SkipForward className="h-4 w-4 mr-2" />
            Skip Set
          </Button>
          <Button
            variant="outline"
            onClick={skipExercise}
            className="h-12"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Skip Exercise
          </Button>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{currentExerciseIndex + 1} / {sampleWorkout.length} exercises</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${((currentExerciseIndex + 1) / sampleWorkout.length) * 100}%` }}
              />
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-4 gap-4 mt-4 text-center">
              <div>
                <div className="text-lg font-bold text-primary">{completedSets.length}</div>
                <div className="text-xs text-muted-foreground">Sets</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">{Math.round(totalVolume / 1000)}k</div>
                <div className="text-xs text-muted-foreground">Volume</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">{formatTime(workoutDuration)}</div>
                <div className="text-xs text-muted-foreground">Time</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">{averageRPE.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">RPE</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Exercise Button */}
        {currentExerciseIndex < sampleWorkout.length - 1 && (
          <Button
            onClick={nextExercise}
            className="w-full h-12"
            disabled={!exerciseSets.every(set => set.completed)}
          >
            Next Exercise: {sampleWorkout[currentExerciseIndex + 1]?.name}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}

        {/* Finish Workout */}
        {currentExerciseIndex === sampleWorkout.length - 1 && exerciseSets.every(set => set.completed) && (
          <Button
            className="w-full h-12"
            asChild
          >
            <Link href="/">
              🎉 Finish Workout
            </Link>
          </Button>
        )}

      </div>
    </div>
  )
}
