"use client";

import { trpc } from "../utils/trpc";

export default function Home() {
  let {
    data: user,
    isLoading,
    isError,
    error,
  } = trpc.getUserById.useQuery({ id: "1" });
  const userCreator = trpc.createUser.useMutation();

  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle the error state
  if (isError) {
    return (
      <div>
        <p>An error occurred: {error?.message}</p>
      </div>
    );
  }

  // Now we can safely assume `user` is defined
  return (
    <div>
      {user && <p>{user.name}</p>}{" "}
      {/* Check if user is defined before rendering */}
      <button
        onClick={() => userCreator.mutate({ name: "Frodo", bio: "aaaaa" })}
      >
        Create Frodo
      </button>
      <p>aaaa: {userCreator.data?.name}</p>
    </div>
  );
}
