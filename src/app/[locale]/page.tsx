"use client";

import Categories from "@/components/home/Categories";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import Testimonials from "@/components/home/Testimonials";
import UseCases from "@/components/home/UseCases";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Header />

      <Hero />

      <Categories />

      <Features />

      <HowItWorks />

      <UseCases />

      <Testimonials />

      <Pricing />

      <FAQ />

      <CTA />

      <Footer />
    </main>
  );
}
