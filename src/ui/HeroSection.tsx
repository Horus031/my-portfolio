"use client";
import { motion, useScroll, useTransform } from "framer-motion";
// import { Suspense, lazy } from "react";

// const FloatingGeometry = lazy(() => import("./FloatingGeometry"));

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative z-50 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-glow-primary/20 rounded-full blur-[120px] animate-glow-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-glow-accent/15 rounded-full blur-[100px] animate-glow-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center section-padding"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground text-sm md:text-base tracking-widest uppercase mb-6"
        >
          Welcome to my world
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8"
        >
          A developer with
          <br />
          <span className="text-gradient-warm font-medium">
            an artist&apos;s soul
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
        >
          Crafting digital experiences where technology and creativity quietly
          coexist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <span className="text-sm tracking-wide">Explore</span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
