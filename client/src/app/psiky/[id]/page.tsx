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
    <section className="min-h-screen w-full scroll-mt-10">
      <div className="container flex flex-col items-start">
        <BackBtn />
        <h1>psiky/{user.id}</h1>
        <div className="flex flex-col p-2 border border-black border-dotted rounded-xl text-center">
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
    </section>
  );
}
