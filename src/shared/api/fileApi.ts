import { api } from '../../services/api/axios.ts';
import type { ImageResponse } from './fileApi.types.ts';

export const fileApi = {
  getImage: async (fileId: number): Promise<ImageResponse> => {
    const response = await api.get<ImageResponse>(`/image/${fileId}/`);
    return response.data;
  },
};
