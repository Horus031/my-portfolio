"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Three.js",
      "Framer Motion",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Python",
      "PostgreSQL",
      "Prisma",
      "REST APIs",
      "GraphQL",
    ],
  },
  {
    title: "AI & ML",
    skills: [
      "TensorFlow",
      "PyTorch",
      "LLM Integration",
      "Computer Vision",
      "NLP",
    ],
  },
  {
    title: "Design",
    skills: ["Figma", "UI/UX", "Motion Design", "Typography", "Color Theory"],
  },
];

function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      className="py-32 md:py-48 section-padding relative text-text-primary"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-glow-accent/10 rounded-full blur-[100px]" />
      </div>

      <div ref={ref} className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4">
            Expertise
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light">
            Tools of the
            <br />
            <span className="text-muted-foreground">trade</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: categoryIndex * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-6"
            >
              <h3 className="font-display text-xl text-text-primary border-b border-border pb-4">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    className="text-text-primary hover:text-primary transition-colors duration-300 flex items-center gap-3 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
