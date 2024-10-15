
import { store } from '@/store/store';
import UsersClient from './UsersClient';
import { api } from '@/services/api';

// Server-side component to fetch data before rendering
export default async function UsersPage() {
  // Initiate the API call on the server
  const result = await store.dispatch(api.endpoints.getUsers.initiate());
  const users = result.data || [];

  console.log(users)

  return <UsersClient users={users} />;
}


// 'use client';

// import { useGetUsersQuery } from "@/services/api";


// export default function UsersPage() {
//   const { data, error, isLoading } = useGetUsersQuery();

//   if (isLoading) return <p>Loading users...</p>;
//   if (error) return <p>Failed to load users.</p>;

//   return (
//     <main>
//       <h1>Users List</h1>
//       <ul>
//         {data?.map((user) => (
//           <li key={user.id}>{user.name}</li>
//         ))}
//       </ul>
//     </main>
//   );
// }
