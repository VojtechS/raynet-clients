import { useQuery, useQueryClient } from '@tanstack/react-query';
import { companyApi } from '../api/companyApi.ts';
import type { CompanyListParams } from '../api/companyApi.types.ts';
import { useDataToast } from '../../../shared/hooks/useDataToast.ts';

const CLIENTS_QUERY_KEY = ['clients'] as const;
const CLIENT_QUERY_KEY = (id: number) => [...CLIENTS_QUERY_KEY, id] as const;
const CLIENT_IMAGE_QUERY_KEY = (fileId: number) => [...CLIENTS_QUERY_KEY, 'image', fileId] as const;
const CLIENT_CATEGORIES_QUERY_KEY = [...CLIENTS_QUERY_KEY, 'categories'] as const;

export function useClientCategoriesQuery() {
  const query = useQuery({
    queryKey: CLIENT_CATEGORIES_QUERY_KEY,
    queryFn: () => companyApi.getCategories(),
  });

  useDataToast(query.isError, 'Nepodařily se načíst kategorie.');

  return query;
}

export function useClientsQuery(params?: CompanyListParams) {
  const query = useQuery({
    queryKey: [...CLIENTS_QUERY_KEY, params],
    queryFn: () => companyApi.getAll(params),
  });

  useDataToast(query.isError, 'Nepodařil se načíst seznam klientů.');

  return query;
}

export function useClientQuery(id: number, enabled: boolean = true) {
  const query = useQuery({
    queryKey: CLIENT_QUERY_KEY(id),
    queryFn: () => companyApi.getById(id),
    enabled: enabled && !!id,
  });

  useDataToast(query.isError, 'Nepodařil se načíst detail klienta.');

  return query;
}

export function useClientImageQuery(fileId?: number) {
  const query = useQuery({
    queryKey: CLIENT_IMAGE_QUERY_KEY(fileId ?? 0),
    queryFn: ({ signal }) => companyApi.getImage(fileId ?? 0, signal),
    enabled: fileId !== undefined,
  });

  useDataToast(query.isError, 'Nepodařil se načíst obrázek.');

  return query;
}

export function invalidateClient(queryClient: ReturnType<typeof useQueryClient>, id: number) {
  return queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEY(id) });
}
