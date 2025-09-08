"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, TrendingUp, Dumbbell, Target, Users, Activity } from "lucide-react"

// Import our analytics components
import { AnalyticsHeader } from "./components/AnalyticsHeader"
import { AnalyticsOverview } from "./components/AnalyticsOverview"
import { StrengthProgressionChart } from "./components/charts/StrengthProgressionChart"
import { BodyWeightChart } from "./components/charts/BodyWeightChart"
import { VolumeProgressionChart } from "./components/charts/VolumeProgressionChart"
import { WorkoutFrequencyChart } from "./components/charts/WorkoutFrequencyChart"
import { CaloriesBurnedChart } from "./components/charts/CaloriesBurnedChart"
import { ConsistencyHeatmap } from "./components/charts/ConsistencyHeatmap"
import { ExerciseSelector } from "./components/ExerciseSelector"
import { ProgressPhotos } from "./components/ProgressPhotos"

// Import our mock data
import {
  exerciseProgressData,
  exerciseSpecificProgress,
  bodyWeightData,
  volumeData,
  calorieData,
  consistencyData,
  progressPhotos,
  personalRecords,
  monthlyStats,
  workoutSessions,
  streakData
} from "./data/mockData"

export default function AnalyticsPage() {
  const [selectedExercise, setSelectedExercise] = useState("Bench Press")

  // Get the selected exercise data
  const selectedExerciseData = exerciseSpecificProgress.find(
    exercise => exercise.exerciseName === selectedExercise
  )

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 space-y-8">
        <AnalyticsHeader />
        
        <AnalyticsOverview 
          strengthData={exerciseSpecificProgress}
          bodyWeightData={bodyWeightData}
          streakData={streakData}
          recentSessions={workoutSessions}
        />

        <Tabs defaultValue="strength" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="strength" className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              Strength
            </TabsTrigger>
            <TabsTrigger value="body" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Body
            </TabsTrigger>
            <TabsTrigger value="volume" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Volume
            </TabsTrigger>
            <TabsTrigger value="frequency" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Frequency
            </TabsTrigger>
            <TabsTrigger value="calories" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Calories
            </TabsTrigger>
            <TabsTrigger value="consistency" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Consistency
            </TabsTrigger>
          </TabsList>

          <TabsContent value="strength" className="space-y-6">
            {/* Exercise Selector */}
            <Card>
              <CardHeader>
                <CardTitle>Exercise Selection</CardTitle>
                <CardDescription>Choose an exercise to view detailed progression</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-3">
                  {exerciseSpecificProgress.map((exercise) => (
                    <Button
                      key={exercise.exerciseName}
                      variant={selectedExercise === exercise.exerciseName ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setSelectedExercise(exercise.exerciseName)}
                    >
                      <Dumbbell className="h-4 w-4 mr-2" />
                      {exercise.exerciseName}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Exercise Chart */}
            {selectedExerciseData && (
              <StrengthProgressionChart 
                data={[selectedExerciseData]} 
                selectedExercise={selectedExercise}
              />
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>Personal Records</CardTitle>
                <CardDescription>Your recent achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {personalRecords.slice(0, 6).map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                      <div>
                        <p className="font-medium">{record.exerciseName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(record.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{record.weight}lbs</div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          +{record.improvement}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="body" className="space-y-6">
            <BodyWeightChart data={bodyWeightData} />
          </TabsContent>

          <TabsContent value="volume" className="space-y-6">
            <VolumeProgressionChart data={volumeData} />
          </TabsContent>

          <TabsContent value="frequency" className="space-y-6">
            <WorkoutFrequencyChart sessions={workoutSessions} monthlyStats={monthlyStats} />
          </TabsContent>

          <TabsContent value="calories" className="space-y-6">
            <CaloriesBurnedChart data={calorieData} />
          </TabsContent>

          <TabsContent value="consistency" className="space-y-6">
            <ConsistencyHeatmap data={consistencyData} streakData={streakData} />
          </TabsContent>

          <TabsContent value="photos" className="space-y-6">
            <ProgressPhotos photos={progressPhotos} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
