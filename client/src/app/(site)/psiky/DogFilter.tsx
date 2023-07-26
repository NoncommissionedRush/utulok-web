"use client";

import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Checkbox from "@/components/Checkbox";
import { filterOptions } from "@/lib/filterOptions";

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
      <div
        onClick={() => !isExpanded && setIsExpanded(true)}
        className={`${
          !isExpanded
            ? "cursor-pointer max-w-fit px-4 py-2 hover:bg-theme-pink hover:text-theme-light"
            : ""
        } my-5 rounded-3xl text-theme-pink border-2 border-theme-pink`}
      >
        <header
          className={`flex justify-between ${
            isExpanded ? "bg-theme-yellow p-3 rounded-t-3xl" : ""
          }`}
        >
          <h2>{!isExpanded ? "Filter >>>" : "Psíčí filter"} </h2>
          {isExpanded && (
            <span
              onClick={() => setIsExpanded(false)}
              className="cursor-pointer text-2xl text-theme-pink"
            >
              <AiFillCloseCircle />
            </span>
          )}
        </header>
        {isExpanded && (
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3 my-3 ">
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
        )}
      </div>
    </div>
  );
}
