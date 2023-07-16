"use client";

import { useRouter } from "next/navigation";

export default function BackBtn() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="relative max-w-fit my-5 px-4 py-2 rounded-3xl text-theme-pink border-2 border-theme-pink hover:bg-theme-pink hover:text-theme-light before:block before:absolute before:top-1/2 before:right-full before:w-screen before:h-0.5 before:bg-theme-pink"
    >
      Naspäť
    </button>
  );
}
