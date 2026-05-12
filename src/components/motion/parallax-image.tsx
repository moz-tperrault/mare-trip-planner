"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Soft parallax: as the user scrolls past the hero, the image drifts
 * downward more slowly than the page, creating a sense of depth.
 *
 * The image is scaled slightly larger than its container so the
 * translation never exposes the background.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  /** Maximum pixels of vertical drift. */
  range = 120,
}: {
  src: string;
  alt: string;
  className?: string;
  range?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-range / 2, range / 2]);

  return (
    <div ref={containerRef} className={className}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.12 }}
        className="size-full object-cover"
      />
    </div>
  );
}
