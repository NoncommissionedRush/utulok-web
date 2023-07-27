"use client";

import { useState } from "react";
import { accordionData } from "@/lib/accordionData";
import AccordionItem from "./AccordionItem";

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleToggleOpen = (id: number) =>
    id !== activeIndex ? setActiveIndex(id) : setActiveIndex(-1);

  return (
    <div className="mt-5 mb-10">
      {accordionData.map(({ title, content, id }) => {
        return (
          <AccordionItem
            key={id}
            id={id}
            title={title}
            content={content}
            handleToggleOpen={handleToggleOpen}
            activeIndex={activeIndex}
          />
        );
      })}
    </div>
  );
}
