"use client";

import Navigation from "@/ui/Navigation";
import HeroSection from "@/ui/HeroSection";
import AboutSection from "@/ui/AboutSection";
import ProjectsSection from "@/ui/ProjectsSection";
import SkillsSection from "@/ui/SkillSection";
import ContactSection from "@/ui/ContactSection";
import Footer from "@/ui/Footer";
import { Suspense, useRef, useState, useEffect } from "react";
import ModelScene from "@/ui/ModelScene";
import { useScroll, useTransform } from "framer-motion";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [cameraAnim, setCameraAnim] = useState({
    zoomIn: 0,
  });

  // Define scroll ranges for each animation phase
  const CINEMATIC_HEIGHT = 1500; // Total scroll distance for animation
  const ZOOM_IN_END = 900;

  // Create transforms
  const zoomIn = useTransform(scrollY, [0, ZOOM_IN_END], [0, 1]);

  // Update camera animation state
  useEffect(() => {
    const unsubscribeZoom = zoomIn.on("change", (v) => {
      setCameraAnim((prev) => ({ ...prev, zoomIn: v }));
    });

    return () => {
      unsubscribeZoom();
    };
  }, [zoomIn]);

  return (
    <div ref={containerRef} className="relative font-display">
      <Navigation />

      {/* Fixed 3D Viewport */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Suspense fallback={null}>
          <ModelScene
            models={[
              {
                id: "core",
                modelPath: "/FloatingCore.glb",
                visible: true,
                cameraAnim: cameraAnim, // Pass dynamic values
              },
            ]}
          />
        </Suspense>
      </div>

      <div className="relative z-10">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <HeroSection />
        </div>
        <div style={{ height: `${CINEMATIC_HEIGHT}px` }} />
      </div>

      <div className="relative z-10">
        <div className="min-h-screen px-16">
          <AboutSection />
        </div>
        <div style={{ height: `${CINEMATIC_HEIGHT}px` }} />
      </div>

      {/* NORMAL CONTENT – appears after cinematic */}
      <main className="relative z-10">
        <div className="px-16">
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </div>
        <Footer />
      </main>
    </div>
  );
}
