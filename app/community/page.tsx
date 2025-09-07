"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  MessageCircle,
  Share2,
  Trophy,
  Users,
  Target,
  Calendar,
  Clock,
  Medal,
  Crown,
  Star,
  Plus,
  Search,
  Filter,
  TrendingUp,
} from "lucide-react"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [joinedChallenges, setJoinedChallenges] = useState<Set<string>>(new Set())

  const toggleLike = (postId: string) => {
    const newLiked = new Set(likedPosts)
    if (newLiked.has(postId)) {
      newLiked.delete(postId)
    } else {
      newLiked.add(postId)
    }
    setLikedPosts(newLiked)
  }

  const toggleChallenge = (challengeId: string) => {
    const newJoined = new Set(joinedChallenges)
    if (newJoined.has(challengeId)) {
      newJoined.delete(challengeId)
    } else {
      newJoined.add(challengeId)
    }
    setJoinedChallenges(newJoined)
  }

  const feedPosts = [
    {
      id: "1",
      user: { name: "Sarah Chen", avatar: "/fitness-woman.png", level: "Advanced" },
      type: "workout",
      content: "Just crushed my PR on deadlifts! 185lbs x 5 reps 💪",
      workout: { name: "Push Day", duration: "1h 15m", exercises: 8 },
      likes: 24,
      comments: 7,
      timestamp: "2h ago",
      achievement: "New PR!",
    },
    {
      id: "2",
      user: { name: "Mike Rodriguez", avatar: "/fitness-man.png", level: "Intermediate" },
      type: "progress",
      content: "6 months transformation! Consistency is everything 🔥",
      beforeAfter: true,
      likes: 89,
      comments: 23,
      timestamp: "4h ago",
    },
    {
      id: "3",
      user: { name: "Emma Wilson", avatar: "/fitness-woman-blonde.jpg", level: "Beginner" },
      type: "milestone",
      content: "Completed my first 30-day challenge! Thanks for all the support 🙏",
      milestone: "30 Day Consistency",
      likes: 45,
      comments: 12,
      timestamp: "6h ago",
    },
  ]

  const challenges = [
    {
      id: "1",
      title: "30-Day Push-Up Challenge",
      description: "Build upper body strength with progressive push-up training",
      participants: 1247,
      duration: "30 days",
      difficulty: "Beginner",
      reward: "Push-Up Master Badge",
      progress: 67,
      daysLeft: 10,
    },
    {
      id: "2",
      title: "10K Steps Daily",
      description: "Walk 10,000 steps every day for better cardiovascular health",
      participants: 892,
      duration: "21 days",
      difficulty: "Easy",
      reward: "Step Counter Badge",
      progress: 45,
      daysLeft: 12,
    },
    {
      id: "3",
      title: "Plank Master",
      description: "Increase your plank hold time from 30 seconds to 5 minutes",
      participants: 634,
      duration: "28 days",
      difficulty: "Intermediate",
      reward: "Core Strength Badge",
      progress: 23,
      daysLeft: 22,
    },
  ]

  const leaderboard = [
    { rank: 1, name: "Alex Thompson", points: 2847, streak: 45, badge: "Champion" },
    { rank: 2, name: "Sarah Chen", points: 2634, streak: 38, badge: "Elite" },
    { rank: 3, name: "Mike Rodriguez", points: 2521, streak: 42, badge: "Elite" },
    { rank: 4, name: "Emma Wilson", points: 2398, streak: 29, badge: "Advanced" },
    { rank: 5, name: "David Kim", points: 2287, streak: 33, badge: "Advanced" },
    { rank: 6, name: "Lisa Park", points: 2156, streak: 25, badge: "Intermediate" },
    { rank: 7, name: "You", points: 1987, streak: 18, badge: "Intermediate" },
    { rank: 8, name: "John Smith", points: 1876, streak: 22, badge: "Intermediate" },
  ]

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Community</h1>
          <p className="text-muted-foreground">Connect, compete, and grow together</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Share Workout
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Your Workout</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea placeholder="Tell the community about your workout..." />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select workout type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Strength Training</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">Share Workout</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feed" className="gap-2">
            <Users className="h-4 w-4" />
            Feed
          </TabsTrigger>
          <TabsTrigger value="challenges" className="gap-2">
            <Target className="h-4 w-4" />
            Challenges
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="gap-2">
            <Trophy className="h-4 w-4" />
            Leaderboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search posts..." className="pl-10" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {feedPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {post.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{post.user.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {post.user.level}
                          </Badge>
                          {post.achievement && (
                            <Badge className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500">
                              <Trophy className="h-3 w-3 mr-1" />
                              {post.achievement}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-pretty">{post.content}</p>

                  {post.workout && (
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium">{post.workout.name}</h5>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.workout.duration}
                              </span>
                              <span>{post.workout.exercises} exercises</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Workout
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {post.beforeAfter && (
                    <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
                      <img
                        src="/fitness-progress-photo-front-view.jpg"
                        alt="Before"
                        className="w-full h-48 object-cover"
                      />
                      <img
                        src="/fitness-progress-photo-front-view-after-2-weeks.jpg"
                        alt="After"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}

                  {post.milestone && (
                    <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Medal className="h-5 w-5 text-green-500" />
                          <span className="font-medium">Milestone Achieved: {post.milestone}</span>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`gap-2 ${likedPosts.has(post.id) ? "text-red-500" : ""}`}
                        onClick={() => toggleLike(post.id)}
                      >
                        <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                        {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Active Challenges</h2>
              <p className="text-muted-foreground">Join challenges to stay motivated and earn rewards</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Challenge
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Challenge</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Challenge title" />
                  <Textarea placeholder="Challenge description" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Difficulty level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Duration (days)" type="number" />
                  <Button className="w-full">Create Challenge</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            challenge.difficulty === "Easy"
                              ? "secondary"
                              : challenge.difficulty === "Beginner"
                                ? "default"
                                : challenge.difficulty === "Intermediate"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {challenge.difficulty}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{challenge.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {challenge.participants}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground text-pretty">{challenge.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{challenge.daysLeft} days left</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs">{challenge.reward}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    variant={joinedChallenges.has(challenge.id) ? "secondary" : "default"}
                    onClick={() => toggleChallenge(challenge.id)}
                  >
                    {joinedChallenges.has(challenge.id) ? "Joined" : "Join Challenge"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Global Leaderboard</h2>
              <p className="text-muted-foreground">See how you rank against other fitness enthusiasts</p>
            </div>
            <Select defaultValue="weekly">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">This Week</SelectItem>
                <SelectItem value="monthly">This Month</SelectItem>
                <SelectItem value="alltime">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
              <CardContent className="p-4 text-center">
                <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <h3 className="font-semibold">Your Rank</h3>
                <p className="text-2xl font-bold">#7</p>
                <p className="text-sm text-muted-foreground">1,987 points</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold">Weekly Change</h3>
                <p className="text-2xl font-bold text-green-500">+3</p>
                <p className="text-sm text-muted-foreground">positions up</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold">Current Streak</h3>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-muted-foreground">days active</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${user.name === "You" ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          user.rank === 1
                            ? "bg-yellow-500 text-white"
                            : user.rank === 2
                              ? "bg-gray-400 text-white"
                              : user.rank === 3
                                ? "bg-orange-600 text-white"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.rank <= 3 ? (
                          user.rank === 1 ? (
                            <Crown className="h-4 w-4" />
                          ) : user.rank === 2 ? (
                            <Medal className="h-4 w-4" />
                          ) : (
                            <Trophy className="h-4 w-4" />
                          )
                        ) : (
                          user.rank
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${user.name === "You" ? "text-primary" : ""}`}>
                            {user.name}
                          </span>
                          <Badge
                            variant={
                              user.badge === "Champion"
                                ? "default"
                                : user.badge === "Elite"
                                  ? "secondary"
                                  : user.badge === "Advanced"
                                    ? "outline"
                                    : "secondary"
                            }
                            className="text-xs"
                          >
                            {user.badge}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{user.streak} day streak</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{user.points.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
