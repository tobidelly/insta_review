import { useQuery, useMutation, useInfiniteQuery, UseQueryOptions, UseMutationOptions, UseInfiniteQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import { vendorAPI, reviewAPI, authAPI } from '../services/api';
import type { Vendor, Review, User } from '../types';

// Vendors
export const useVendors = (options?: UseQueryOptions<Vendor[], AxiosError>) => {
  return useQuery<Vendor[], AxiosError>(
    ['vendors'],
    () => vendorAPI.getAll(),
    options
  );
};

export const useVendor = (username: string, options?: UseQueryOptions<Vendor, AxiosError>) => {
  return useQuery<Vendor, AxiosError>(
    ['vendor', username],
    () => vendorAPI.getByUsername(username),
    options
  );
};

export const useCreateVendor = (
  options?: UseMutationOptions<Vendor, AxiosError, Partial<Vendor>>
) => {
  return useMutation<Vendor, AxiosError, Partial<Vendor>>(
    (data) => vendorAPI.create(data),
    options
  );
};
