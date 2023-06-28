import Image from "next/image";
import BackBtn from "@/components/BackBtn";

async function getDog(id: string) {
  const res = await fetch(`https://dummyjson.com/users/${id}`, {
    next: { revalidate: 10 },
  });
  const data = await res.json();
  return data;
}

export default async function DogsPage({ params }: any) {
  const user = await getDog(params.id);
  return (
    <div className="container flex flex-col items-start">
      <BackBtn />
      <h1>dogs/{user.id}</h1>
      <div className="border border-black border-dotted rounded-xl text-center">
        <Image
          src={user.image}
          alt="user image"
          width={200}
          height={200}
          className="mx-auto"
        />
        <h1 className="text-xl mb-2">{user.firstName + user.lastName}</h1>
        <p className="mb-2">{user.email}</p>
      </div>
    </div>
  );
}
