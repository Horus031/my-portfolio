"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Neural Canvas",
    category: "AI + Creative",
    description:
      "An experimental platform exploring the boundaries between human creativity and machine learning. Generating art through conversation.",
    year: "2024",
    tech: ["React", "Python", "TensorFlow"],
  },
  {
    id: 2,
    title: "Ephemeral",
    category: "Web Experience",
    description:
      "An immersive storytelling experience that responds to user emotions. Built with WebGL and real-time audio analysis.",
    year: "2024",
    tech: ["Three.js", "Web Audio API", "GSAP"],
  },
  {
    id: 3,
    title: "Synthesis",
    category: "Full-Stack",
    description:
      "A minimal productivity tool designed for creatives. Clean interfaces, thoughtful interactions, zero distractions.",
    year: "2023",
    tech: ["Next.js", "PostgreSQL", "Prisma"],
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <div className="relative p-8 md:p-12 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500">
        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-linear-to-br from-primary/5 to-transparent" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-primary text-xs tracking-widest uppercase mb-2">
                {project.category}
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground group-hover:text-gradient-warm transition-all duration-300">
                {project.title}
              </h3>
            </div>
            <span className="text-muted-foreground text-sm">
              {project.year}
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs tracking-wide rounded-full bg-secondary text-secondary-foreground border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* View project indicator */}
        <motion.div
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <span className="text-primary text-sm flex items-center gap-2">
            View project <span className="text-lg">→</span>
          </span>
        </motion.div>
      </div>
    </motion.article>
  );
}

function ProjectsSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 md:py-48 section-padding relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-glow-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container-wide relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light">
            Projects as
            <br />
            <span className="text-muted-foreground">artworks</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
