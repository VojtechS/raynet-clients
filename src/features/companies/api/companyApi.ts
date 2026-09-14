import { api } from '../../../services/api/axios.ts';
import type {
  CompanyCategoryResponse,
  CompanyImageResponse,
  CompanyDetailResponse,
  CompanyListParams,
  CompanyListResponse,
} from './companyApi.types.ts';

export const companyApi = {
  getCategories: async (): Promise<CompanyCategoryResponse> => {
    const response = await api.get<CompanyCategoryResponse>('/companyCategory/');
    return response.data;
  },

  getAll: async (params?: CompanyListParams): Promise<CompanyListResponse> => {
    const response = await api.get<CompanyListResponse>('/company/', { params });
    return response.data;
  },

  getById: async (id: number): Promise<CompanyDetailResponse> => {
    const response = await api.get<CompanyDetailResponse>(`/company/${id}/`);
    return response.data;
  },

  getImage: async (fileId: number): Promise<CompanyImageResponse> => {
    const response = await api.get<CompanyImageResponse>(`/image/${fileId}/`);
    return response.data;
  },
};
