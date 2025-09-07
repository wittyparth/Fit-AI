"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { BlurFade } from "@/components/magicui/blur-fade";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navigation = [
        { name: "Features", href: "#features" },
        { name: "Analytics", href: "#analytics" },
        { name: "Community", href: "#community" },
        { name: "Pricing", href: "#pricing" },
    ];

    return (
        <BlurFade delay={0.1}>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                        ? "bg-background/80 backdrop-blur-md border-b border-border/50"
                        : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Dumbbell className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xl font-bold">
                                <AnimatedShinyText className="text-foreground">
                                    FitAI
                                </AnimatedShinyText>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <Link href="/auth/login">
                                <Button variant="ghost" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button size="sm" className="relative overflow-hidden group">
                                    <span className="relative z-10">Get Started</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-accent/50 transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
                            <div className="px-4 py-6 space-y-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block text-muted-foreground hover:text-foreground transition-colors text-base font-medium"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="pt-4 space-y-2 border-t border-border/50">
                                    <Link href="/auth/login" className="block">
                                        <Button variant="ghost" size="sm" className="w-full justify-start">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/auth/register" className="block">
                                        <Button size="sm" className="w-full">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>
        </BlurFade>
    );
}
