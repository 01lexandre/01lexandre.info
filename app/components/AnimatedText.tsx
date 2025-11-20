"use client";

import { motion } from "framer-motion";

export default function AnimatedText({ text }: { text: string }) {
  const words = text.split(" ");
  
  return (
    <>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block cursor-default"
          style={{ transformOrigin: "center", display: "inline-block" }}
          whileHover={{ scale: 1.25 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {word}
          {index < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </>
  );
}

