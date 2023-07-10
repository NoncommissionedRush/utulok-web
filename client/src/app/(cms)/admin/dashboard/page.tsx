"use client";

import Dash from "./Dash";

async function getDogs() {
  const res = await fetch("https://dummyjson.com/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  return data.users as any[];
}

export default async function Dashboard() {
  const users = await getDogs();

  return (
    <div className="container overflow-x-auto">
      <h1 className="my-3 text-2xl font-bold">Dashboard</h1>
      <Dash users={users} />
    </div>
  );
}
