import { api } from '../../../services/api/axios.ts';
import type {
  CompanyDetailResponse,
  CompanyListParams,
  CompanyListResponse,
} from '../types/company.ts';

export const clientsApi = {
  getAll: async (params?: CompanyListParams): Promise<CompanyListResponse> => {
    const response = await api.get<CompanyListResponse>('/company/', { params });
    return response.data;
  },

  getById: async (id: number): Promise<CompanyDetailResponse> => {
    const response = await api.get<CompanyDetailResponse>(`/company/${id}/`);
    return response.data;
  },
};
