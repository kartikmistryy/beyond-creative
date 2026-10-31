"use client";

import { motion, useReducedMotion } from "framer-motion";

// From md up each bubble floats at one corner of the orb, its pointed corner aimed at the orb.
const placement = [
  "md:top-0 md:left-0 rounded-br-md",
  "md:top-10 md:right-0 rounded-bl-md",
  "md:bottom-10 md:left-0 rounded-tr-md",
  "md:bottom-0 md:right-0 rounded-tl-md",
];

export default function BotQuestions({ questions }: { questions: readonly string[] }) {
  const still = useReducedMotion() ?? false;
  return (
    <>
      <p id="bot-questions" className="sr-only">
        Try asking
      </p>
      <ul aria-labelledby="bot-questions" className="flex flex-wrap justify-center gap-3 md:contents">
        {questions.map((question, index) => (
          <motion.li
            key={question}
            className={`z-10 max-w-56 rounded-3xl bg-white px-5 py-3 text-sm leading-5 text-black shadow-lg shadow-black/10 md:absolute ${placement[index % placement.length]}`}
            animate={still ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 4 + index * 0.7, repeat: Infinity, ease: "easeInOut" }}
          >
            {question}
          </motion.li>
        ))}
      </ul>
    </>
  );
}
