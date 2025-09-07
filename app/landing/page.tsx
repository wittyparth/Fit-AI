"use client";

import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <HeroSection />
            <FeaturesSection />
            <TestimonialsSection />
            <CTASection />
            <Footer />
        </div>
    );
}
