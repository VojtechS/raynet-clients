import { useQuery } from '@tanstack/react-query';
import { companyApi } from '../api/companyApi.ts';
import type { CompanyListParams } from '../api/companyApi.types.ts';
import { useDataToast } from '../../../shared/hooks/useDataToast.ts';

const COMPANIES_QUERY_KEY = ['companies'] as const;
const COMPANY_QUERY_KEY = (id: number) => [...COMPANIES_QUERY_KEY, id] as const;
const COMPANY_CATEGORIES_QUERY_KEY = [...COMPANIES_QUERY_KEY, 'categories'] as const;

export function useCompanyCategoriesQuery() {
  const query = useQuery({
    queryKey: COMPANY_CATEGORIES_QUERY_KEY,
    queryFn: () => companyApi.getCategories(),
  });

  useDataToast(query.isError, 'Nepodařily se načíst kategorie.');

  return query;
}

export function useCompaniesQuery(params?: CompanyListParams) {
  const query = useQuery({
    queryKey: [...COMPANIES_QUERY_KEY, params],
    queryFn: () => companyApi.getAll(params),
  });

  useDataToast(query.isError, 'Nepodařil se načíst seznam společností.');

  return query;
}

export function useCompanyQuery(id: number, enabled: boolean = true) {
  const query = useQuery({
    queryKey: COMPANY_QUERY_KEY(id),
    queryFn: () => companyApi.getById(id),
    enabled: enabled && !!id,
  });

  useDataToast(query.isError, 'Nepodařil se načíst detail společnosti.');

  return query;
}
