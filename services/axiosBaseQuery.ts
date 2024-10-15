// services/axiosBaseQuery.ts
import axios from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define the base query function
export const axiosBaseQuery: BaseQueryFn<
  { url: string; method: string; data?: any; params?: any },
  unknown,
  unknown
> = async ({ url, method, data, params }) => {
  try {
    const result = await axiosInstance({ url, method, data, params });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as any;
    return { error: { status: err.response?.status, data: err.response?.data } };
  }
};
