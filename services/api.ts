import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query<{ id: number; name: string }[], void>({
      query: () => 'users',
    }),
  }),
});

export const { useGetUsersQuery } = api;
