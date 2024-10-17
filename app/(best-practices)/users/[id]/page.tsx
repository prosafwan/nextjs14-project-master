'use client';

import { useGetUserByIdQuery } from "@/services/api";

export default function UserDetail({ params }: { params: { id: string } }) {
  const { data, error, isLoading } = useGetUserByIdQuery(Number(params.id));

  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p>Failed to load user details.</p>;

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>User ID: {data?.id}</p>
    </div>
  );
}


// import { api } from "@/services/api"; // Import your API slice
// // import { User } from "@/types"; // Type for the user data
// import { notFound } from 'next/navigation';

// // Fetch user data during server-side rendering
// export default async function UserDetail({ params }: { params: { id: string } }) {
//   const userId = Number(params.id);


//   // Pre-fetch the user data using RTK Query
//   const user = await api.endpoints.getUserById.initiate(userId);
// //   const user = result.data || [];

//   console.log(user)


//   // Handle not found scenario
//   if (!user) {
//     notFound();
//   }

//   return (
//     <div>
//       <h1>{user.name}</h1>
//       {/* <p>User ID: {user.id}</p> */}
//       {/* <p>Email: {user.name}</p> */}
//     </div>
//   );
// }
