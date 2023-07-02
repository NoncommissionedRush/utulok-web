"use client";

import { useState } from "react";
import Link from "next/link";

export default function DogList({ users }: any) {
  const DOGS_SHOWN = 10;

  const [next, setNext] = useState(DOGS_SHOWN);

  const handleMoreDogs = () => {
    setNext(next + DOGS_SHOWN);
  };

  return (
    <>
      {" "}
      {users?.slice(0, next).map((user: any) => {
        return (
          <Link
            href={`/psiky/${user.id}`}
            key={user.id}
            className="py-2 hover:bg-gray-300"
          >
            {" "}
            <h2>{user.firstName}</h2>{" "}
          </Link>
        );
      })}
      {next < users.length && (
        <button
          onClick={handleMoreDogs}
          className="max-w-fit my-5 px-5 py-1 rounded-3xl border-2 border-theme-pink hover:bg-theme-pink hover:text-theme-light"
        >
          Show more
        </button>
      )}
    </>
  );
}
