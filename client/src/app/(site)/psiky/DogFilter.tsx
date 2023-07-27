"use client";

import { useState } from "react";
import Checkbox from "@/components/Checkbox";
import { filterOptions } from "@/lib/filterOptions";
import { motion, AnimatePresence } from "framer-motion";

export default function DogFilter() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: string
  ) => {
    console.log(category + ": " + e.target.value);
  };

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer max-w-fit px-4 py-2 my-5 rounded-3xl text-theme-pink border-2 border-theme-pink hover:bg-theme-pink hover:text-theme-light"
      >
        {!isExpanded ? "Filter >>>" : "Filter <<<"}
      </button>
      <motion.div className="overflow-hidden">
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              layout
              key="filter"
              initial={{ x: -1000, opacity: 0, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ x: -1000, opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl text-theme-pink border-2 border-theme-pink"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3 my-3 overflow-hidden">
                {filterOptions.map((category) => {
                  return (
                    <div
                      key={category.id}
                      className="flex flex-col px-5 border-r-2 even:border-r-0 lg:even:border-r-2 border-b-2 xl:border-b-0 lg:[&:nth-child(4)]:border-r-0 xl:lg:[&:nth-child(4)]:border-r-2 border-theme-pink"
                    >
                      <h3 className="pt-3 text-center font-bold">
                        {category.displayTitle}
                        {category.options.map((o, idx) => (
                          <Checkbox
                            key={idx}
                            option={o.displayOption}
                            handleChange={(e) =>
                              handleChange(e, category.displayTitle)
                            }
                          />
                        ))}
                      </h3>
                    </div>
                  );
                })}
                <div className="flex flex-col justify-center items-center">
                  <button className="max-w-fit px-8 py-2 rounded-3xl text-theme-pink border-2 border-theme-pink hover:bg-theme-pink hover:text-theme-light">
                    Filtruj
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
