"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Zpoždění v sekundách — pro stagger efekt v gridu (index * 0.08). */
  delay?: number;
  /** Směr příletu. Default zdola. */
  from?: "bottom" | "left" | "right" | "none";
}

const OFFSET = 28;

/**
 * Scroll-reveal animace (fade + posun). Animuje jen transform/opacity,
 * takže je plynulá i na telefonech; respektuje prefers-reduced-motion.
 */
export function Reveal({ children, className, delay = 0, from = "bottom" }: RevealProps) {
  const reduce = useReducedMotion();

  const initial =
    reduce || from === "none"
      ? { opacity: 0 }
      : from === "left"
        ? { opacity: 0, x: -OFFSET }
        : from === "right"
          ? { opacity: 0, x: OFFSET }
          : { opacity: 0, y: OFFSET };

  return (
    <motion.div
      data-reveal
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
