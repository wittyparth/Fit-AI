"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlurFade } from "@/components/magicui/blur-fade"
import { AppHeader } from "@/components/app-header"
import { Sparkles, Clock, Target, Users, Search, Plus } from "lucide-react";
import Link from "next/link";

import { SAMPLE_TEMPLATES } from "@/data/templates/sample-templates";
import { MUSCLE_GROUP_COLORS } from "@/data/exercises/sample-exercises";
import type { WorkoutTemplate } from "@/lib/types/template";

const DIFFICULTY_COLORS = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const CATEGORY_OPTIONS = [
    { value: "all", label: "All Categories" },
    { value: "strength", label: "Strength Training" },
    { value: "cardio", label: "Cardio" },
    { value: "flexibility", label: "Flexibility" },
    { value: "bodyweight", label: "Bodyweight" },
    { value: "powerlifting", label: "Powerlifting" },
];

const DIFFICULTY_OPTIONS = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
];

function TemplateCard({ template, index }: { template: WorkoutTemplate; index: number }) {
    const primaryMuscles = template.metadata.primaryMuscles.slice(0, 3);
    const workoutDays = Object.values(template.weeklyPlan.days).filter(day => !day.isRestDay);
    const totalDays = workoutDays.length;
    const estimatedTime = workoutDays[0]?.estimatedDuration || 60;

    return (
        <BlurFade delay={0.1 + index * 0.05} inView>
            <Card className="group relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                {template.name}
                            </CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                                {template.description}
                            </CardDescription>
                        </div>
                        <Badge
                            variant="secondary"
                            className={`${DIFFICULTY_COLORS[template.metadata.difficulty]} font-medium`}
                        >
                            {template.metadata.difficulty}
                        </Badge>
                    </div>

                    {/* Muscle Groups */}
                    <div className="flex flex-wrap gap-1.5">
                        {primaryMuscles.map((muscle: string) => (
                            <Badge
                                key={muscle}
                                variant="outline"
                                className="text-xs"
                                style={{
                                    borderColor: (MUSCLE_GROUP_COLORS as any)[muscle] || "#6b7280",
                                    color: (MUSCLE_GROUP_COLORS as any)[muscle] || "#6b7280",
                                }}
                            >
                                {muscle}
                            </Badge>
                        ))}
                        {template.metadata.primaryMuscles.length > 3 && (
                            <Badge variant="outline" className="text-xs text-muted-foreground">
                                +{template.metadata.primaryMuscles.length - 3} more
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="relative z-10 space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{estimatedTime}min</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{totalDays} days</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{template.metadata.category}</span>
                        </div>
                    </div>

                    {/* Equipment */}
                    {template.metadata.equipment.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Equipment Needed
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {template.metadata.equipment.slice(0, 3).map((equipment: string) => (
                                    <Badge key={equipment} variant="secondary" className="text-xs bg-muted">
                                        {equipment}
                                    </Badge>
                                ))}
                                {template.metadata.equipment.length > 3 && (
                                    <Badge variant="secondary" className="text-xs bg-muted">
                                        +{template.metadata.equipment.length - 3}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                        <Button
                            asChild
                            variant="default"
                            size="sm"
                            className="flex-1 group/btn relative overflow-hidden"
                        >
                            <Link href={`/templates/${template.id}`}>
                                <span className="relative z-10">Use Template</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                            Preview
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </BlurFade>
    );
}

export default function TemplatesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");
    const [activeTab, setActiveTab] = useState("browse");

    const filteredTemplates = useMemo(() => {
        return SAMPLE_TEMPLATES.filter((template) => {
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.metadata.primaryMuscles.some((muscle: string) =>
                    muscle.toLowerCase().includes(searchQuery.toLowerCase())
                );

            const matchesCategory = selectedCategory === "all" ||
                template.metadata.category.toLowerCase() === selectedCategory.toLowerCase();

            const matchesDifficulty = selectedDifficulty === "all" ||
                template.metadata.difficulty === selectedDifficulty;

            return matchesSearch && matchesCategory && matchesDifficulty;
        });
    }, [searchQuery, selectedCategory, selectedDifficulty]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <AppHeader
                title="Workout Templates"
                description="Browse and create professional workout templates"
            />
            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Header */}
                <BlurFade delay={0} inView>
                    <div className="text-center space-y-4">
                        <div className="flex items-center justify-center space-x-2">
                            <Sparkles className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                Workout Templates
                            </h1>
                        </div>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Discover professionally designed workout templates to accelerate your fitness journey.
                            Choose from beginner-friendly routines to advanced training programs.
                        </p>
                    </div>
                </BlurFade>

                {/* Navigation Tabs */}
                <BlurFade delay={0.1} inView>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <div className="flex items-center justify-between">
                            <TabsList className="grid w-fit grid-cols-2 bg-muted/50">
                                <TabsTrigger value="browse" className="px-8">Browse Templates</TabsTrigger>
                                <TabsTrigger value="create" className="px-8">Create New</TabsTrigger>
                            </TabsList>

                            {activeTab === "browse" && (
                                <Button asChild variant="outline" className="ml-auto">
                                    <Link href="/templates/builder">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Create Template
                                    </Link>
                                </Button>
                            )}
                        </div>

                        <TabsContent value="browse" className="space-y-6 mt-6">
                            {/* Filters */}
                            <BlurFade delay={0.2} inView>
                                <Card className="border-dashed">
                                    <CardContent className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    placeholder="Search templates..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="pl-10"
                                                />
                                            </div>

                                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {CATEGORY_OPTIONS.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Difficulty" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {DIFFICULTY_OPTIONS.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                <span>{filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </BlurFade>

                            {/* Templates Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTemplates.map((template, index) => (
                                    <TemplateCard
                                        key={template.id}
                                        template={template}
                                        index={index}
                                    />
                                ))}
                            </div>

                            {/* Empty State */}
                            {filteredTemplates.length === 0 && (
                                <BlurFade delay={0.3} inView>
                                    <Card className="border-dashed">
                                        <CardContent className="p-12 text-center space-y-4">
                                            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                                                <Search className="h-8 w-8 text-muted-foreground" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-semibold">No templates found</h3>
                                                <p className="text-muted-foreground">
                                                    Try adjusting your search criteria or create a new template.
                                                </p>
                                            </div>
                                            <Button asChild>
                                                <Link href="/templates/builder">
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Create New Template
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </BlurFade>
                            )}
                        </TabsContent>

                        <TabsContent value="create" className="space-y-6 mt-6">
                            <BlurFade delay={0.2} inView>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Create New Template</CardTitle>
                                        <CardDescription>
                                            Build a custom workout template from scratch or start with a preset.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Button asChild size="lg" className="h-24 flex-col space-y-2">
                                                <Link href="/templates/builder">
                                                    <Plus className="h-6 w-6" />
                                                    <span>Start from Scratch</span>
                                                </Link>
                                            </Button>
                                            <Button asChild size="lg" variant="outline" className="h-24 flex-col space-y-2">
                                                <Link href="/templates/builder?preset=true">
                                                    <Sparkles className="h-6 w-6" />
                                                    <span>Use AI Assistant</span>
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </BlurFade>
                        </TabsContent>
                    </Tabs>
                </BlurFade>
            </div>
        </div>
    );
}
