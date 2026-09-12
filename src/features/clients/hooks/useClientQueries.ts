import { useQuery, useQueryClient } from '@tanstack/react-query';
import { companyApi } from '../api/companyApi.ts';
import type { CompanyListParams } from '../api/companyApi.types.ts';

const CLIENTS_QUERY_KEY = ['clients'] as const;
const CLIENT_QUERY_KEY = (id: number) => [...CLIENTS_QUERY_KEY, id] as const;
const CLIENT_IMAGE_QUERY_KEY = (fileId: number) => [...CLIENTS_QUERY_KEY, 'image', fileId] as const;
const CLIENT_CATEGORIES_QUERY_KEY = [...CLIENTS_QUERY_KEY, 'categories'] as const;

export function useClientCategoriesQuery() {
  return useQuery({
    queryKey: CLIENT_CATEGORIES_QUERY_KEY,
    queryFn: () => companyApi.getCategories(),
  });
}

export function useClientsQuery(params?: CompanyListParams) {
  return useQuery({
    queryKey: [...CLIENTS_QUERY_KEY, params],
    queryFn: () => companyApi.getAll(params),
  });
}

export function useClientQuery(id: number, enabled: boolean = true) {
  return useQuery({
    queryKey: CLIENT_QUERY_KEY(id),
    queryFn: () => companyApi.getById(id),
    enabled: enabled && !!id,
  });
}

export function useClientImageQuery(fileId?: number) {
  return useQuery({
    queryKey: CLIENT_IMAGE_QUERY_KEY(fileId ?? 0),
    queryFn: ({ signal }) => companyApi.getImage(fileId ?? 0, signal),
    enabled: fileId !== undefined,
  });
}

export function invalidateClient(queryClient: ReturnType<typeof useQueryClient>, id: number) {
  return queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEY(id) });
}
