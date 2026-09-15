import { useQuery } from '@tanstack/react-query';
import { fileApi } from '../api/fileApi.ts';
import { useDataToast } from './useDataToast.ts';

const FILE_IMAGE_QUERY_KEY = (fileId: number) => ['files', 'image', fileId] as const;

export function useFileImageQuery(fileId?: number) {
  const query = useQuery({
    queryKey: FILE_IMAGE_QUERY_KEY(fileId ?? 0),
    queryFn: () => fileApi.getImage(fileId ?? 0),
    enabled: fileId !== undefined,
  });

  useDataToast(query.isError, 'Nepodařilo se načíst obrázek.');

  return query;
}
