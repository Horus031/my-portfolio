"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 md:py-48 section-padding relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-glow-accent/10 rounded-full blur-[100px]" />
      </div>

      <div ref={ref} className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4">
            About
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-tight mb-12">
            Where logic meets
            <br />
            <span className="text-muted-foreground">imagination</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <p className="text-foreground/90 text-lg leading-relaxed">
              I&apos;m a student developer with a deep appreciation for both the
              precision of code and the fluidity of art. My journey began with
              curiosity about how beautiful digital experiences are crafted.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Now, I spend my time exploring the intersection of web development
              and artificial intelligence, driven by the belief that technology
              should feel as natural as breathing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <h3 className="font-display text-xl text-foreground">
                Philosophy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Every line of code is an opportunity for elegance. I believe in
                thoughtful design, quiet confidence, and creating work that
                speaks for itself.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-xl text-foreground">Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                Building towards a future where AI amplifies human creativity,
                making complex technology feel intuitive and accessible.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
