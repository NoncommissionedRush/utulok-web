"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function DogList({ users }: any) {
  const DOGS_SHOWN = 4;

  const [next, setNext] = useState(DOGS_SHOWN);

  const handleMoreDogs = () => {
    setNext(next + DOGS_SHOWN);
  };

  return (
    <>
      <div className="grid grid-cols-dog-grid gap-4 my-10 justify-center text-center">
        {users?.slice(0, next).map((user: any) => {
          return (
            <div
              key={user.id}
              className="border-4 border-theme-yellow rounded-3xl hover:scale-105 transition"
            >
              <Link
                href={`/psiky/${user.id}`}
                className="py-2 hover:bg-gray-300"
              >
                <Image
                  src={user.image}
                  alt="user image"
                  width={200}
                  height={200}
                  className="mx-auto"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                />
                <h2 className="text-2xl font-bold">{user.firstName}</h2>
              </Link>
            </div>
          );
        })}
      </div>
      {next < users.length && (
        <button
          onClick={handleMoreDogs}
          className="max-w-fit mx-auto my-8 px-5 py-2 rounded-3xl border-2 text-theme-pink border-theme-pink hover:bg-theme-pink hover:text-theme-light"
        >
          Ukáž viac
        </button>
      )}
    </>
  );
}
