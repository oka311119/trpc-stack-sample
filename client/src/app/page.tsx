"use client";

import { trpc } from "../utils/trpc";
import { User } from "../../../server/src/router";
import { useState } from "react";

export default function Home() {
  let { data, isLoading, error } = trpc.getUserById.useQuery<User>({
    id: "1",
  });
  const userCreator = trpc.createUser.useMutation();
  const [name, setName] = useState("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error !== null) {
    return (
      <div>
        <p>An error occurred: {error?.message}</p>
      </div>
    );
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    userCreator.mutate({ name: name });
  };

  return (
    <div>
      {data && <p>{data.name}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" disabled={userCreator.status === "pending"}>
          Create User
        </button>
      </form>
      {userCreator.isError && (
        <p>Error creating user: {userCreator.error.message}</p>
      )}
      {userCreator.isSuccess && (
        <p>
          Created: {userCreator.data.id}: {userCreator.data.name}
        </p>
      )}
    </div>
  );
}
