"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container">
      <h2 className="my-3 text-xl text-theme-pink">Something went wrong!</h2>
      <button
        className="relative my-5 px-4 py-2 rounded-3xl text-theme-pink border-2 border-theme-pink hover:bg-theme-pink hover:text-theme-light "
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
