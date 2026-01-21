"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 md:py-48 section-padding relative text-text-primary">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-linear-to-t from-primary/5 to-transparent" />
      </div>

      <div ref={ref} className="container-narrow relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4">
            Contact
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
            Let&apos;s create
            <br />
            <span className="text-gradient-warm">something together</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto leading-relaxed mb-12">
            Whether it&apos;s a collaboration, a question, or just to say hello
            — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <a
            href="mailto:vominhnghia1878@gmail.com"
            className="inline-block font-display text-2xl md:text-3xl text-text-primary hover:text-primary transition-colors duration-300"
          >
            vominhnghia1878@gmail.com
          </a>

          <div className="flex items-center justify-center gap-8 pt-8">
            {[
              { name: "Github", link: "https://github.com/Horus031" },
              {
                name: "LinkedIn",
                link: "https://www.linkedin.com/in/nghiavm/",
              },
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href={social.link}
                target="_blank"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="text-text-primary hover:text-primary border-1 p-2 rounded-md transition-colors duration-300 text-sm tracking-wide"
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;
