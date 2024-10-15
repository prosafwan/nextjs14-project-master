
"use client"
import { useGetUsersQuery } from "@/services/api";

 // Client-side component to use hooks
export default function UsersPage() {
  const { data, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching users.</p>;

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}


