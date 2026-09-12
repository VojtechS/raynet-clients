import { api } from '../../../services/api/axios.ts';
import type {
  ClientImageResponse,
  CompanyDetailResponse,
  CompanyListParams,
  CompanyListResponse,
} from './companyApi.types.ts';

export const companyApi = {
  getAll: async (params?: CompanyListParams): Promise<CompanyListResponse> => {
    const response = await api.get<CompanyListResponse>('/company/', { params });
    return response.data;
  },

  getById: async (id: number): Promise<CompanyDetailResponse> => {
    const response = await api.get<CompanyDetailResponse>(`/company/${id}/`);
    return response.data;
  },

  getImage: async (fileId: number, signal?: AbortSignal): Promise<ClientImageResponse> => {
    const response = await api.get<ClientImageResponse>(`/image/${fileId}/`, { signal });
    return response.data;
  },
};
