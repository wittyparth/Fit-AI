import { useState, useEffect, useRef, useCallback } from "react"
import { Exercise, WorkoutSet, WorkoutSession, RestTimerSettings, PlateCalculation } from "../types/workout"

export function useWorkoutTimer(exercises: Exercise[]) {
  // Core workout state
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const [workoutSets, setWorkoutSets] = useState<Record<string, WorkoutSet[]>>({})
  const [currentWeight, setCurrentWeight] = useState(0)
  const [currentReps, setCurrentReps] = useState(8)
  const [currentRPE, setCurrentRPE] = useState(7)
  const [currentNotes, setCurrentNotes] = useState("")

  // Timer state
  const [isResting, setIsResting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [restWarning, setRestWarning] = useState(false)
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0)

  // UI state
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showCompleted, setShowCompleted] = useState(false)
  const [isWarmupSet, setIsWarmupSet] = useState(false)
  const [isDropSet, setIsDropSet] = useState(false)
  const [autoProgressionEnabled, setAutoProgressionEnabled] = useState(true)

  // Settings
  const [restTimerSettings, setRestTimerSettings] = useState<RestTimerSettings>({
    defaultRestTime: 120,
    warningTime: 10,
    soundEnabled: true,
    vibrationEnabled: true,
    smartRest: true,
    backgroundMusic: false,
    customRestTimes: {},
  })

  const [workoutSession, setWorkoutSession] = useState<WorkoutSession>({
    startTime: new Date(),
    totalVolume: 0,
    completedSets: 0,
    totalRestTime: 0,
    exercisesCompleted: 0,
    personalRecords: 0,
  })

  const [quickRestTimes] = useState([60, 90, 120, 180, 300])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentExercise = exercises[currentExerciseIndex]
  const totalExercises = exercises.length

  // Initialize workout sets
  useEffect(() => {
    const initialSets: Record<string, WorkoutSet[]> = {}
    for (let i = 0; i < exercises.length; i++) {
      const exercise = exercises[i]
      initialSets[exercise.id] = Array.from({ length: exercise.sets }, (_, index) => {
        const lastWorkoutSet = exercise.lastWorkout?.sets[index]
        return {
          weight: lastWorkoutSet?.weight || exercise.weight || 0,
          reps: lastWorkoutSet?.reps || exercise.reps,
          completed: false,
          rpe: lastWorkoutSet?.rpe || 7,
        }
      })
    }
    setWorkoutSets(initialSets)
    setCurrentWeight(currentExercise.weight || 0)
    setCurrentReps(currentExercise.reps)
  }, [exercises, currentExercise])

  // Audio setup
  useEffect(() => {
    audioRef.current = new Audio('/notification-sound.mp3')
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && isResting && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsResting(false)
            setIsRunning(false)
            if (!isMuted && restTimerSettings.soundEnabled) {
              playNotificationSound()
            }
            if (restTimerSettings.vibrationEnabled) {
              triggerVibration()
            }
            return 0
          }
          if (prev <= restTimerSettings.warningTime && !restWarning) {
            setRestWarning(true)
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, isResting, timeLeft, isMuted, restTimerSettings, restWarning])

  // Total workout time
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setTotalWorkoutTime(prev => prev + 1)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [isPaused])

  const playNotificationSound = useCallback(() => {
    if (audioRef.current && !isMuted) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(console.error)
    }
  }, [isMuted])

  const triggerVibration = useCallback(() => {
    if (navigator.vibrate && restTimerSettings.vibrationEnabled) {
      navigator.vibrate([200, 100, 200])
    }
  }, [restTimerSettings.vibrationEnabled])

  // Utility functions
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getRestTime = () => {
    const customTime = restTimerSettings.customRestTimes[currentExercise.id]
    if (customTime) return customTime
    if (restTimerSettings.smartRest) {
      return getSmartRestTime(currentExercise.difficulty, currentRPE)
    }
    return currentExercise.restTime || restTimerSettings.defaultRestTime
  }

  const getSmartRestTime = (difficulty: string, rpe: number) => {
    const baseTime = {
      "Beginner": 60,
      "Intermediate": 90,
      "Advanced": 120
    }[difficulty] || 90

    const rpeMultiplier = rpe >= 8 ? 1.5 : rpe >= 6 ? 1.2 : 1.0
    return Math.round(baseTime * rpeMultiplier)
  }

  const calculatePlateLoading = (weight: number): PlateCalculation => {
    const barWeight = 45
    const weightPerSide = (weight - barWeight) / 2
    const availablePlates = [45, 35, 25, 10, 5, 2.5]
    
    const plates: number[] = []
    let remaining = weightPerSide
    
    for (const plate of availablePlates) {
      while (remaining >= plate) {
        plates.push(plate)
        remaining -= plate
      }
    }
    
    return { plates, remaining: Math.round(remaining * 4) / 4 }
  }

  const checkPersonalRecord = (weight: number, reps: number) => {
    if (!currentExercise.personalRecord) return true
    const currentMax = currentExercise.personalRecord.weight * currentExercise.personalRecord.reps
    const newMax = weight * reps
    return newMax > currentMax
  }

  const getLastWorkoutComparison = () => {
    const lastSet = workoutSets[currentExercise.id]?.[currentSetIndex - 1]
    if (!lastSet || !currentExercise.lastWorkout) return null
    
    const lastWorkoutSet = currentExercise.lastWorkout.sets[currentSetIndex]
    if (!lastWorkoutSet) return null
    
    const currentVolume = currentWeight * currentReps
    const lastVolume = lastWorkoutSet.weight * lastWorkoutSet.reps
    
    return {
      weight: lastWorkoutSet.weight,
      reps: lastWorkoutSet.reps,
      performance: currentVolume > lastVolume ? 'better' : 
                  currentVolume === lastVolume ? 'same' : 'worse'
    }
  }

  const getRPEDescription = (rpe: number) => {
    const descriptions = {
      1: "Very Easy", 2: "Easy", 3: "Moderate", 4: "Somewhat Hard",
      5: "Hard", 6: "Harder", 7: "Very Hard", 8: "Very Very Hard",
      9: "Extremely Hard", 10: "Maximum Effort"
    }
    return descriptions[rpe as keyof typeof descriptions] || "Unknown"
  }

  const getWeightSuggestion = () => {
    const lastSet = workoutSets[currentExercise.id]?.[currentSetIndex - 1]
    if (!lastSet) return currentWeight
    
    if (lastSet.rpe && lastSet.rpe <= 6) {
      return lastSet.weight + 5
    } else if (lastSet.rpe && lastSet.rpe >= 9) {
      return Math.max(lastSet.weight - 5, 45)
    }
    return lastSet.weight
  }

  // Action functions
  const completeSet = () => {
    const newSet: WorkoutSet = {
      weight: currentWeight,
      reps: currentReps,
      rpe: currentRPE,
      completed: true,
      notes: currentNotes,
      completedAt: new Date(),
      isWarmup: isWarmupSet,
      isDropSet: isDropSet,
    }

    setWorkoutSets(prev => ({
      ...prev,
      [currentExercise.id]: prev[currentExercise.id].map((set, index) =>
        index === currentSetIndex ? newSet : set
      )
    }))

    // Update session stats
    setWorkoutSession(prev => ({
      ...prev,
      totalVolume: prev.totalVolume + (currentWeight * currentReps),
      completedSets: prev.completedSets + 1,
      personalRecords: prev.personalRecords + (checkPersonalRecord(currentWeight, currentReps) ? 1 : 0)
    }))

    // Progress to next set or exercise
    if (currentSetIndex < currentExercise.sets - 1) {
      setCurrentSetIndex(prev => prev + 1)
      startRestTimer()
    } else if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(prev => prev + 1)
      setCurrentSetIndex(0)
      const nextExercise = exercises[currentExerciseIndex + 1]
      setCurrentWeight(nextExercise.weight || 0)
      setCurrentReps(nextExercise.reps)
      startRestTimer()
    } else {
      setShowCompleted(true)
    }

    // Reset form
    setCurrentNotes("")
    setIsWarmupSet(false)
    setIsDropSet(false)
  }

  const skipSet = () => {
    if (currentSetIndex < currentExercise.sets - 1) {
      setCurrentSetIndex(prev => prev + 1)
    } else if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(prev => prev + 1)
      setCurrentSetIndex(0)
      const nextExercise = exercises[currentExerciseIndex + 1]
      setCurrentWeight(nextExercise.weight || 0)
      setCurrentReps(nextExercise.reps)
    }
  }

  const previousSet = () => {
    if (currentSetIndex > 0) {
      setCurrentSetIndex(prev => prev - 1)
    } else if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1)
      setCurrentSetIndex(exercises[currentExerciseIndex - 1].sets - 1)
      const prevExercise = exercises[currentExerciseIndex - 1]
      setCurrentWeight(prevExercise.weight || 0)
      setCurrentReps(prevExercise.reps)
    }
  }

  const nextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1)
      setCurrentSetIndex(0)
      const nextEx = exercises[currentExerciseIndex + 1]
      setCurrentWeight(nextEx.weight || 0)
      setCurrentReps(nextEx.reps)
    }
  }

  const previousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1)
      setCurrentSetIndex(0)
      const prevEx = exercises[currentExerciseIndex - 1]
      setCurrentWeight(prevEx.weight || 0)
      setCurrentReps(prevEx.reps)
    }
  }

  const skipExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      nextExercise()
    } else {
      setShowCompleted(true)
    }
  }

  const startRestTimer = () => {
    const restTime = getRestTime()
    setTimeLeft(restTime)
    setIsResting(true)
    setIsRunning(true)
    setRestWarning(false)
  }

  const pauseWorkout = () => {
    setIsPaused(true)
    setIsRunning(false)
  }

  const resumeWorkout = () => {
    setIsPaused(false)
    if (isResting && timeLeft > 0) {
      setIsRunning(true)
    }
  }

  const adjustWeight = (delta: number) => {
    setCurrentWeight(Math.max(0, currentWeight + delta))
  }

  const adjustReps = (delta: number) => {
    setCurrentReps(Math.max(1, currentReps + delta))
  }

  return {
    // State
    currentExercise,
    currentExerciseIndex,
    currentSetIndex,
    totalExercises,
    workoutSets,
    currentWeight,
    currentReps,
    currentRPE,
    currentNotes,
    isResting,
    timeLeft,
    isRunning,
    restWarning,
    totalWorkoutTime,
    isPaused,
    isMuted,
    showCompleted,
    isWarmupSet,
    isDropSet,
    autoProgressionEnabled,
    restTimerSettings,
    workoutSession,
    quickRestTimes,

    // Setters
    setCurrentWeight,
    setCurrentReps,
    setCurrentRPE,
    setCurrentNotes,
    setIsWarmupSet,
    setIsDropSet,
    setAutoProgressionEnabled,
    setRestTimerSettings,
    setIsMuted,
    setShowCompleted,
    setTimeLeft,
    setRestWarning,
    setIsRunning,
    setIsResting,

    // Actions
    completeSet,
    skipSet,
    previousSet,
    nextExercise,
    previousExercise,
    skipExercise,
    startRestTimer,
    pauseWorkout,
    resumeWorkout,
    adjustWeight,
    adjustReps,

    // Utilities
    formatTime,
    getRestTime,
    calculatePlateLoading,
    checkPersonalRecord,
    getLastWorkoutComparison,
    getRPEDescription,
    getWeightSuggestion,
  }
}
