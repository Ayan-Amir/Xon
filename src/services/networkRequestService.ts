import { useQuery, useMutation, useQueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import {
  performGetRequest,
  performPostRequest,
  performPutRequest,
  performPatchRequest,
  performDeleteRequest,
} from './apiClient';
import { AxiosError, AxiosResponse } from 'axios';

type RequestOptions = {
  refetchOnWindowFocus?: boolean;
  retry?: boolean;
  enabled?: boolean;
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError) => void;
};

export const useGetRequest = (key: string, data: object, url: string, options?: UseQueryOptions) => {
  const requestOptions: RequestOptions = options
    ? options as RequestOptions
    : { refetchOnWindowFocus: false, retry: true };
  return useQuery([key, data], () => performGetRequest(url), requestOptions);
};

export const usePostMutation = (key: string, url: string, payload: object | null, onSuccess: (data: AxiosResponse) => void, onError: (error: AxiosError) => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return performPostRequest(url, payload);
    },
    {
      onSuccess: (data: AxiosResponse) => onSuccess(data),
      onError: (error: AxiosError) => onError(error),
      onSettled: () => {
        queryClient.invalidateQueries([key]);
      },
    } as UseMutationOptions
  );
};

export const usePutMutation = (key: string, url: string, payload: AxiosResponse, onSuccess: () => void, onError: (error: AxiosError) => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return performPutRequest(url, payload);
    },
    {
      onSuccess: () => onSuccess(),
      onError: (error: AxiosError) => onError(error),
      onSettled: () => {
        queryClient.invalidateQueries([key]);
      },
    } as UseMutationOptions
  );
};

export const usePatchMutation = (key: string, url: string, payload: object, onSuccess: (data: AxiosResponse) => void, onError: (error: AxiosError) => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return performPatchRequest(url, payload);
    },
    {
      onSuccess: (data: AxiosResponse) => onSuccess(data),
      onError: (error: AxiosError) => onError(error),
      onSettled: () => {
        queryClient.invalidateQueries([key]);
      },
    } as UseMutationOptions
  );
};

export const useDeleteMutation = (key: string, url: string, onSuccess: () => void, onError: (error: AxiosError) => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return performDeleteRequest(url);
    },
    {
      onSuccess: () => onSuccess(),
      onError: (error: AxiosError) => onError(error),
      onSettled: () => {
        queryClient.invalidateQueries([key]);
      },
    } as UseMutationOptions
  );
};
