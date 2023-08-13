// Filter test
"use client";

import { useState, useEffect } from "react";

import { filterOptions } from "@/lib/filterOptions";

const dogData = [
  {
    id: 1,
    name: "Lota",
    sex: "female",
    age: "teen",
    isVaccinated: true,
    isCastrated: true,
    isKidFriendly: true,
    size: "medium",
  },
  {
    id: 2,
    name: "Reggie",
    sex: "female",
    age: "puppy",
    isVaccinated: true,
    isCastrated: false,
    isKidFriendly: false,
    size: "small",
  },
  {
    id: 3,
    name: "Jozef",
    sex: "male",
    age: "adult",
    isVaccinated: false,
    isCastrated: false,
    isKidFriendly: false,
    size: "big",
  },
  {
    id: 4,
    name: "Yennefer",
    sex: "male",
    age: "adult",
    isVaccinated: false,
    isCastrated: true,
    isKidFriendly: false,
    size: "medium",
  },
];

interface FilterOptions {
  title: string;
  option: string | boolean;
}

interface Dog {
  id: number;
  name: string;
  sex: string;
  age: string;
  isVaccinated: boolean;
  isCastrated: boolean;
  isKidFriendly: boolean;
  size: string;
}

export default function Filter() {
  const dogs = dogData;

  const [filters, setFilters] = useState<FilterOptions[]>([]);
  const [filteredDogs, setFilteredDogs] = useState(dogs);

  const updateFilters = (checked: any, filter: any) => {
    setFilters((prevFilters) =>
      checked
        ? [...prevFilters, filter]
        : prevFilters.filter(
            (f) => !(f.title === filter.title && f.option === filter.option)
          )
    );
  };
  console.log(filters);

  //   useEffect(() => {
  //     // Match any filter within the same category (OR), and match all selected filters between categories (AND)
  //     const applyFilters = () => {
  //       if (filters.length === 0) {
  //         // No filters selected, show all dogs
  //         setFilteredDogs(dogData);
  //       } else {
  //         // Group filters by category
  //         const filtersByCategory: {
  //           [category: string]: FilterOptions[];
  //         } = {};
  //         filters.forEach((filter) => {
  //           const { title } = filter;
  //           if (!filtersByCategory[title]) {
  //             filtersByCategory[title] = [];
  //           }
  //           filtersByCategory[title].push(filter);
  //           console.log(filtersByCategory);
  //         });

  //         // Filter the dogs based on the selected filters
  //         const filteredResult = dogData.filter((dog) => {
  //           return Object.keys(filtersByCategory).every((category) => {
  //             const categoryFilters = filtersByCategory[category];
  //             return categoryFilters.some((filter) => {
  //               const { option } = filter;
  //               return dog[category] === option;
  //             });
  //           });
  //         });
  //         setFilteredDogs(filteredResult);
  //       }
  //     };

  //     // Call the applyFilters function whenever the filters array changes
  //     applyFilters();
  //   }, [filters]);

  useEffect(() => {
    // Match any filter within the same category (OR), and match all selected filters between categories (AND)
    const applyFilters = () => {
      if (filters.length === 0) {
        setFilteredDogs(dogData);
      } else {
        // Group filters by category
        const filtersByCategory: {
          [category: string]: (string | boolean)[];
        } = {};
        filters.forEach((filter) => {
          const { title, option } = filter;

          if (!filtersByCategory[title]) {
            filtersByCategory[title] = [];
          }
          filtersByCategory[title].push(option);
        });

        // Filter the dogs based on the selected filters
        const filteredResult = dogData.filter((dog) => {
          return Object.keys(filtersByCategory).every((category) => {
            const categoryFilters = filtersByCategory[category] as (
              | string
              | boolean
            )[];
            return categoryFilters.includes(
              dog[category as keyof Dog] as string
            );
          });
        });

        setFilteredDogs(filteredResult);
      }
    };

    applyFilters();
  }, [filters]);

  return (
    <div className="container my-12">
      <div className="flex">
        {filterOptions.map((category) => {
          return (
            <div key={category.id} className="flex flex-col gap-3 mx-auto">
              <h3 className="pt-3 text-center font-bold">
                {category.displayTitle}
              </h3>
              {category.options.map((opt, idx) => (
                <label key={idx} className="flex gap-3">
                  <input
                    type="checkbox"
                    //value={opt.option}
                    onChange={(e) =>
                      updateFilters(e.target.checked, {
                        title: category.title,
                        option: opt.option,
                      })
                    }
                  />
                  {opt.displayOption}
                </label>
              ))}
            </div>
          );
        })}
      </div>{" "}
      {!filteredDogs.length && <h2>No matching dogs found</h2>}
      {filteredDogs?.map((dog: any) => {
        return (
          <div key={dog.id} className="mb-4">
            <h2 className="text-xl border-4 border-theme-yellow bg-theme-pink">
              {dog.name}
            </h2>
            <ul>
              <li>Pohlavie: {dog.sex === "male" ? "Pes" : "Fenka"}</li>
              <li>
                Vek:{" "}
                {(() => {
                  switch (dog.age) {
                    case "puppy":
                      return "Stena";
                    case "teen":
                      return "Teen";
                    case "adult":
                      return "Dospely";
                  }
                })()}
              </li>
              <li>Ockovany: {dog.isVaccinated ? "Ano" : "Nie"}</li>
              <li>Kastrovany: {dog.isCastrated ? "Ano" : "Nie"}</li>
              <li>K detom: {dog.isKidFriendly ? "Ano" : "Nie"}</li>
              <li>
                Vzrast:{" "}
                {(() => {
                  switch (dog.size) {
                    case "small":
                      return "Maly";
                    case "medium":
                      return "Stredny";
                    case "big":
                      return "Velky";
                  }
                })()}
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
