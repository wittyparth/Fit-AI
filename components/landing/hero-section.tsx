"use client";

import { useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TextAnimate } from "@/components/magicui/text-animate";
import { AuroraText } from "@/components/magicui/aurora-text";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Particles } from "@/components/magicui/particles";

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
            ref={containerRef}
        >
            <Particles
                className="absolute inset-0"
                quantity={100}
                ease={80}
                color="#5E6AD2"
            />

            <div className="container mx-auto px-4 text-center relative z-10">
                <BlurFade delay={0.25}>
                    <div className="mb-8" ref={logoRef}>
                        <Badge variant="outline" className="mb-6 px-6 py-2">
                            <AnimatedShinyText className="text-sm">
                                ✨ Welcome to the Future of Fitness
                            </AnimatedShinyText>
                        </Badge>
                    </div>
                </BlurFade>

                <BlurFade delay={0.35}>
                    <div className="mb-8" ref={titleRef}>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                            <TextAnimate animation="blurInUp" by="word" className="inline-block">
                                Transform Your
                            </TextAnimate>
                            <br />
                            <AuroraText className="inline-block">Fitness Journey</AuroraText>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                            <TextAnimate animation="slideUp" delay={0.5}>
                                AI-powered coaching, personalized workouts, and real-time analytics
                                to help you achieve your fitness goals faster than ever before.
                            </TextAnimate>
                        </p>
                    </div>
                </BlurFade>

                <BlurFade delay={0.75}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <ShineBorder className="relative">
                            <Button size="lg" className="px-8 py-4 text-lg font-semibold">
                                Start Your Journey
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </ShineBorder>
                        <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                            <Play className="mr-2 h-5 w-5" />
                            Watch Demo
                        </Button>
                    </div>
                </BlurFade>

                {/* Animated Beams */}
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={logoRef}
                    toRef={titleRef}
                    curvature={-75}
                    endYOffset={-10}
                />
            </div>
        </section>
    );
}
