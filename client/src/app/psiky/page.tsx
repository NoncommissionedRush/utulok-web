import Link from "next/link";

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
    <section className="min-h-screen w-full scroll-mt-9">
      <div className="container flex flex-col">
        <h1 className="my-3 text-2xl font-bold">Naše psíky</h1>
        {users?.map((user) => {
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
      </div>
    </section>
  );
}
