"use client";

import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/magicui/border-beam";
import { MagicCard } from "@/components/magicui/magic-card";
import { Meteors } from "@/components/magicui/meteors";
import { Particles } from "@/components/magicui/particles";

interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div className={cn(
            "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-4 max-w-7xl mx-auto auto-rows-min",
            className
        )}>
            {children}
        </div>
    );
}

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    spotlight?: boolean;
    beam?: boolean;
    meteors?: boolean;
    particles?: boolean;
    size?: "sm" | "md" | "lg" | "xl";
}

export function BentoCard({
    children,
    className,
    spotlight = false,
    beam = false,
    meteors = false,
    particles = false,
    size = "md"
}: BentoCardProps) {
    const sizeClasses = {
        sm: "md:col-span-2 lg:col-span-2 row-span-1 min-h-[200px]",
        md: "md:col-span-3 lg:col-span-4 row-span-1 min-h-[250px]",
        lg: "md:col-span-4 lg:col-span-6 row-span-2 min-h-[400px]",
        xl: "md:col-span-6 lg:col-span-8 row-span-1 min-h-[300px]"
    };

    const baseClasses = "relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-border transition-all duration-300 group";

    const cardContent = (
        <div className={cn(baseClasses, sizeClasses[size], className)}>
            {children}
            {beam && <BorderBeam size={250} duration={12} delay={9} />}
            {meteors && <Meteors number={20} />}
            {particles && <Particles className="absolute inset-0" quantity={50} ease={80} color="#5E6AD2" />}
        </div>
    );

    if (spotlight) {
        return (
            <MagicCard className={cn("p-0 border-none", sizeClasses[size])}>
                <div className={cn("relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-border transition-all duration-300 group h-full", className)}>
                    {children}
                    {beam && <BorderBeam size={250} duration={12} delay={9} />}
                    {meteors && <Meteors number={20} />}
                    {particles && <Particles className="absolute inset-0" quantity={50} ease={80} color="#5E6AD2" />}
                </div>
            </MagicCard>
        );
    }

    return cardContent;
}
