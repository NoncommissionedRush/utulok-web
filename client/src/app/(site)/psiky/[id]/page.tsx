import Image from "next/image";
import BackBtn from "@/components/BackBtn";

async function getDog(id: string) {
  const res = await fetch(`https://dummyjson.com/users/${id}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export default async function DogsPage({ params }: any) {
  const user = await getDog(params.id);
  return (
    <section className="relative min-h-screen w-full scroll-mt-14">
      <div className="container flex flex-col mb-20">
        <BackBtn />
        <h1 className="mx-auto">psiky/{user.id}</h1>
        <div className="flex flex-col p-2 w-max mx-auto border-4 border-theme-yellow border-dotted rounded-xl text-center">
          <Image
            src={user.image}
            alt="user image"
            width={200}
            height={200}
            className="mx-auto"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />
          <h1 className="text-xl mb-2">{user.firstName + user.lastName}</h1>
          <p className="mb-2">{user.email}</p>
        </div>
      </div>
      <div className="wave-divider-bottom wave-yellow">
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
