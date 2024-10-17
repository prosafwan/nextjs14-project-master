import axios, { AxiosError } from 'axios';
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
  { url: string; method: 'GET' | 'POST' | 'PUT' | 'DELETE'; data?: unknown; params?: Record<string, unknown> },
  unknown,
  { status: number; data: unknown }
> = async ({ url, method, data, params }) => {
  try {
    const result = await axiosInstance({ url, method, data, params });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError; // Cast to AxiosError to get specific properties
    return { error: { status: err.response?.status || 500, data: err.response?.data || err.message } };
  }
};
