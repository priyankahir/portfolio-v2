"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalTypingProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
}

export function TerminalTyping({
  text,
  delay = 0,
  speed = 50,
  className = "",
  onComplete,
  showCursor = true,
}: TerminalTypingProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!isTyping && !isComplete) {
      timeoutId = setTimeout(() => {
        setIsTyping(true);
      }, delay);
    }

    return () => clearTimeout(timeoutId);
  }, [delay, isTyping, isComplete]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isTyping && displayedText.length < text.length) {
      intervalId = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
    } else if (isTyping && displayedText.length === text.length) {
      setTimeout(() => {
        setIsTyping(false);
        setIsComplete(true);
        if (onComplete) onComplete();
      }, 0);
    }

    return () => clearTimeout(intervalId);
  }, [displayedText, isTyping, text, speed, onComplete]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {displayedText}
      {showCursor && (!isComplete || isComplete) && (
        <span className="inline-block w-2.5 h-5 bg-primary align-middle ml-1 animate-blink" />
      )}
    </motion.span>
  );
}
