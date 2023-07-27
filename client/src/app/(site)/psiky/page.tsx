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
    <section className="relative min-h-screen w-full scroll-mt-14">
      <div className="container flex flex-col mb-20">
        <h1 className="my-5 text-3xl font-titan text-stroke-bold-yellow text-theme-pink">
          Naše psíky
        </h1>
        <DogList users={users} />
      </div>
      <div className="custom-shape-divider-bottom-footer">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
  );
}
