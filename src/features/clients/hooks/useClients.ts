import { useQuery, useQueryClient } from '@tanstack/react-query';
import { clientsApi } from '../api/clientsApi.ts';
import type { CompanyListParams } from '../types/company.ts';

const CLIENTS_QUERY_KEY = ['clients'] as const;
const CLIENT_QUERY_KEY = (id: number) => [...CLIENTS_QUERY_KEY, id] as const;
const CLIENT_IMAGE_QUERY_KEY = (fileId: number) => [...CLIENTS_QUERY_KEY, 'image', fileId] as const;

export function useClients(params?: CompanyListParams) {
  return useQuery({
    queryKey: [...CLIENTS_QUERY_KEY, params],
    queryFn: () => clientsApi.getAll(params),
  });
}

export function useClient(id: number, enabled: boolean = true) {
  return useQuery({
    queryKey: CLIENT_QUERY_KEY(id),
    queryFn: () => clientsApi.getById(id),
    enabled: enabled && !!id,
  });
}

export function useClientImage(fileId?: number) {
  return useQuery({
    queryKey: CLIENT_IMAGE_QUERY_KEY(fileId ?? 0),
    queryFn: ({ signal }) => clientsApi.getImage(fileId ?? 0, signal),
    enabled: fileId !== undefined,
  });
}

export function invalidateClient(queryClient: ReturnType<typeof useQueryClient>, id: number) {
  return queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEY(id) });
}
