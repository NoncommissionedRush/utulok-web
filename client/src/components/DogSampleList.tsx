import Link from "next/link";
import Carousel from "./Carousel";

async function getSampleDogs() {
  const res = await fetch("https://dummyjson.com/users?limit=8", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log(data);
  return data.users as any[];
}

export default async function DogSampleList() {
  const users = await getSampleDogs();

  return (
    <div className="flex flex-col justify-center items-center my-10">
      <Carousel users={users} />
      <Link
        href={"/psiky"}
        className="max-w-fit my-5 px-4 py-2 rounded-3xl text-theme-light border-2 border-theme-light hover:bg-theme-light hover:text-theme-pink"
      >
        Zobraziť všestky psíky
      </Link>
    </div>
  );
}
