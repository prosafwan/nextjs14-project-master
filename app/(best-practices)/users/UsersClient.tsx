'use client';

export default function UsersClient({ users }: { users: { id: number; name: string }[] }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
