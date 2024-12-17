import { useQuery, useMutation, useInfiniteQuery, UseQueryOptions, UseMutationOptions, UseInfiniteQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import { vendorAPI, reviewAPI, authAPI } from '../services/api';
import type { Vendor, Review, User } from '../types';

// Vendors Hooks
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

// Reviews Hooks
export const useVendorReviews = (
    vendorId: string,
    initialPage = 1,
    options?: UseInfiniteQueryOptions<{
      reviews: Review[];
      pagination: { total: number; pages: number; currentPage: number };
    }, AxiosError>
  ) => {
    return useInfiniteQuery<
      { reviews: Review[]; pagination: { total: number; pages: number; currentPage: number } },
      AxiosError
    >(
      ['reviews', vendorId],
      ({ pageParam = initialPage }) => reviewAPI.getByVendor(vendorId, pageParam),
      {
        ...options,
        getNextPageParam: (lastPage) => {
          if (lastPage.pagination.currentPage < lastPage.pagination.pages) {
            return lastPage.pagination.currentPage + 1;
          }
          return undefined;
        },
      }
    );
  };