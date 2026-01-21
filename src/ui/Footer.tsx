"use client";

import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="py-8 section-padding border-t border-text-primary w-full px-16">
      <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-text-primary text-sm"
        >
          © {new Date().getFullYear()} — Crafted by H o r u s
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-primary text-sm"
        >
          Available for opportunities
        </motion.p>
      </div>
    </footer>
  );
}

export default Footer;
