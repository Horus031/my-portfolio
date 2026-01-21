"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-0 px-16 max-w-360 top-0 h-fit flex justify-between mx-auto z-50 transition-all duration-500 ${
        isScrolled ? "glass py-4" : "py-6"
      }`}
    >
      <nav className="section-padding w-full flex items-center justify-between container-wide text-text-primary">
        <motion.a
          href="#"
          className="font-display text-xl font-semibold tracking-tight text-foreground"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="bg-linear-to-r from-primary to-text-primary text-transparent bg-clip-text">H o r u s</span>
        </motion.a>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative font-body text-sm tracking-wide transition-colors duration-300 ${
                  activeSection === item.href.slice(1)
                    ? "text-text-primary"
                    : "text-text-primary hover:text-primary"
                }`}
              >
                {item.label}
                <AnimatePresence>
                  {activeSection === item.href.slice(1) && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
              </a>
            </li>
          ))}
        </ul>

        <motion.a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="hidden md:block px-5 py-2.5 text-sm font-medium rounded-full bg-secondary text-secondary-foreground border border-border hover:border-primary/30 hover:bg-secondary/80 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get in touch
        </motion.a>
      </nav>
    </motion.header>
  );
}

export default Navigation;
