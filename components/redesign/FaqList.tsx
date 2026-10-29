"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import animation from "@/lib/redesign/data/motion.data";
import Eyebrow from "./Eyebrow";
import Lines from "./Lines";

type Props = {
  index: string;
  label: string;
  title: string | readonly string[];
  items: readonly { question: string; answer: string }[];
};

export default function FaqList({ index, label, title, items }: Props) {
  const [active, setActive] = useState<number | null>(0);
  const id = useId();
  const reduced = useReducedMotion();
  const transition = { duration: reduced ? 0 : 0.55, ease: animation.ease };
  return (
    <section aria-label="Frequently asked questions" className="flex flex-col justify-between gap-20 bg-black px-7 pt-35 pb-40 font-body font-normal text-white lg:flex-row">
      <div className="flex shrink-0 flex-col gap-7 lg:w-120">
        <Eyebrow index={index}>{label}</Eyebrow>
        <h2 className="font-display text-headline text-studio-orange uppercase">
          <Lines text={typeof title === "string" ? title : title.join("\n")} />
        </h2>
      </div>
      <div className="flex flex-col lg:w-205">
        {items.map((item, itemIndex) => {
          const open = active === itemIndex;
          return (
            <div data-motion="row" key={item.question} className="border-b border-rule">
              <h3>
                <button
                  type="button"
                  id={`${id}-q${itemIndex}`}
                  aria-expanded={open}
                  aria-controls={`${id}-a${itemIndex}`}
                  onClick={() => setActive(open ? null : itemIndex)}
                  className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-6 py-7 text-left text-question focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {item.question}
                  {/* The vertical bar folds away so "+" morphs into "−". */}
                  <span
                    aria-hidden="true"
                    className={`relative size-4 shrink-0 transition-all duration-500 ease-spring motion-reduce:transition-none ${open ? "rotate-180 text-studio-orange" : "text-white"}`}
                  >
                    <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current" />
                    <span className={`absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-current transition-transform duration-500 ease-spring motion-reduce:transition-none ${open ? "scale-y-0" : "scale-y-100"}`} />
                  </span>
                </button>
              </h3>
              <motion.div
                id={`${id}-a${itemIndex}`}
                role="region"
                aria-labelledby={`${id}-q${itemIndex}`}
                inert={!open}
                initial={false}
                animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                transition={transition}
                className="overflow-hidden"
              >
                <motion.p
                  initial={false}
                  animate={{ y: open ? 0 : -12 }}
                  transition={transition}
                  className="max-w-170 pb-7 text-lg leading-6.5 text-ash"
                >
                  {item.answer}
                </motion.p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
