import { useQuery, useMutation, useInfiniteQuery, UseQueryOptions, UseMutationOptions, UseInfiniteQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import { vendorAPI, reviewAPI, authAPI } from '../services/api';
import type { Vendor, Review, User } from '../types';

