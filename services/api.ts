import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

// Create the API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<{ id: number; name: string }[], void>({
      query: () => ({ url: '/users', method: 'GET' }),
    }),
    getUserById: builder.query<{ id: number; name: string }, number>({
      query: (id) => ({ url: `/users/${id}`, method: 'GET' }),
    }),
  }),
});

// Export hooks for client components
export const { useGetUsersQuery, useGetUserByIdQuery } = api;
