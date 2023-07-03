import DogList from "./DogList";

async function getDogs() {
  const res = await fetch("https://dummyjson.com/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log(data);
  return data.users as any[];
}

export default async function Dogs() {
  const users = await getDogs();

  return (
    <section className="min-h-screen w-full scroll-mt-10">
      <div className="container flex flex-col">
        <h1 className="my-3 text-2xl font-bold">Naše psíky</h1>
        <button className="max-w-fit my-5 px-4 py-2 rounded-3xl text-theme-pink border-2 border-theme-pink hover:bg-theme-pink hover:text-theme-light">
          Filter &gt;&gt;&gt;
        </button>
        <DogList users={users} />
      </div>
    </section>
  );
}
