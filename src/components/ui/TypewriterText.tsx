"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  words: string[];
  className?: string;
  cursorClassName?: string;
}

export function TypewriterText({ words, className = "", cursorClassName = "" }: TypewriterTextProps) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    if (index >= words.length) {
      const resetTimer = setTimeout(() => setIndex(0), 10);
      return () => clearTimeout(resetTimer);
    }

    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => {
        setReverse(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      const timeout = setTimeout(() => {
        setReverse(false);
        setIndex((prev) => prev + 1);
      }, 10);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 70);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      {`${words[index]?.substring(0, subIndex) || ""}`}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: "linear",
        }}
        className={`inline-block w-[3px] h-[1em] ml-1 bg-current translate-y-1 ${cursorClassName}`}
      />
    </span>
  );
}
