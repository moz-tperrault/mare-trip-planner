"use client";

import { Children, type ReactNode } from "react";
import { motion, type Variants } from "motion/react";

const EASE_OUT_LUXE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT_LUXE } },
};

/**
 * Wraps a grid (or any container of siblings) and animates each
 * direct child in one after another as the group enters the viewport.
 */
export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-72px" }}
      variants={container}
      className={className}
    >
      {Children.map(children, (child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
