"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuroraText } from "@/components/magicui/aurora-text";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { ShineBorder } from "@/components/magicui/shine-border";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BentoCard } from "./bento-grid";

export function CTASection() {
    return (
        <section className="py-24 px-4">
            <div className="container mx-auto">
                <BlurFade delay={0.25}>
                    <BentoCard
                        size="xl"
                        spotlight
                        meteors
                        className="p-16 text-center bg-gradient-to-br from-primary/10 via-background to-accent/10"
                    >
                        <div className="relative z-10">
                            <Badge variant="outline" className="mb-6">
                                <AnimatedShinyText>🚀 Ready to Transform?</AnimatedShinyText>
                            </Badge>

                            <h2 className="text-4xl md:text-6xl font-bold mb-6">
                                <AuroraText>Start Your Fitness Revolution Today</AuroraText>
                            </h2>

                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                                Join thousands of users who have already transformed their lives with FitAI.
                                Your perfect workout is just one click away.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <ShineBorder>
                                    <Button size="lg" className="px-8 py-4 text-lg font-semibold">
                                        Get Started Free
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </ShineBorder>
                                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                                    Learn More
                                </Button>
                            </div>

                            <div className="mt-8 text-sm text-muted-foreground">
                                <p>✅ No credit card required • ✅ 14-day free trial • ✅ Cancel anytime</p>
                            </div>
                        </div>
                    </BentoCard>
                </BlurFade>
            </div>
        </section>
    );
}
