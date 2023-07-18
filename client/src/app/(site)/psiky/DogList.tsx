"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function DogList({ users }: any) {
  const DOGS_SHOWN = 8;

  const [next, setNext] = useState(DOGS_SHOWN);

  const handleDogsShown = () => {
    next < users.length ? setNext(next + DOGS_SHOWN) : setNext(DOGS_SHOWN);
  };

  // Preserve state between page changes in session storage (move to global state store?)
  useLayoutEffect(() => {
    if (sessionStorage.getItem("page")) {
      setNext(parseInt(sessionStorage.getItem("page") as string));
    } else {
      sessionStorage.setItem("page", next.toString());
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("page", next.toString());
  }, [next]);

  return (
    <>
      <div className="grid grid-cols-fit-grid gap-4 my-10 justify-center text-center">
        {users?.slice(0, next).map((user: any) => {
          return (
            <div
              key={user.id}
              className="relative mb-8 border-8 border-theme-yellow rounded-3xl hover:scale-105 transition"
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
                  className="mx-auto object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                />
                <h2 className="w-full absolute -bottom-10 text-4xl font-titan text-stroke-bold-transparent border-8 border-theme-yellow rounded-2xl bg-theme-pink">
                  {user.firstName}
                </h2>
              </Link>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleDogsShown}
        className="z-50 max-w-fit mx-auto mt-8 mb-12 px-5 py-2 rounded-3xl border-2 text-theme-pink border-theme-pink hover:bg-theme-pink hover:text-theme-light"
      >
        {next < users.length ? "Ukáž viac" : "Ukáž menej"}
      </button>
    </>
  );
}
