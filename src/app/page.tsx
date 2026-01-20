import AboutSection from "@/ui/AboutSection";
import ContactSection from "@/ui/ContactSection";
import Footer from "@/ui/Footer";
import HeroSection from "@/ui/HeroSection";
import Navigation from "@/ui/Navigation";
import ProjectsSection from "@/ui/ProjectsSection";
import SkillsSection from "@/ui/SkillSection";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background font-display">
      <Navigation />
      <main>
        <HeroSection />
        <div className="px-16">
          <AboutSection />
          <ProjectsSection />
          <SkillsSection/>
          <ContactSection/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
