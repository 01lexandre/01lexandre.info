"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedProjectWrapperProps {
  children: ReactNode;
  delay?: number;
}

export default function AnimatedProjectWrapper({
  children,
  delay = 0,
}: AnimatedProjectWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

