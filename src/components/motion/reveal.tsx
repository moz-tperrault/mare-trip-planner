"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE_OUT_LUXE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Fades + rises children when they enter the viewport.
 * Pairs slow easing with a generous duration to feel cinematic, not "snappy."
 */
export function Reveal({
  children,
  delay = 0,
  className,
  duration = 1.1,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-72px" }}
      variants={variants}
      transition={{ duration, delay, ease: EASE_OUT_LUXE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
