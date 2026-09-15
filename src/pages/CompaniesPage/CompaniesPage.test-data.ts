import type {
  CompanyCategoryResponse,
  CompanyDetail as CompanyDetailApi,
  CompanyListItem as CompanyListItemApi,
  CompanyListResponse,
} from '../../features/companies/api/companyApi.types.ts';
import { companyApi } from '../../features/companies/api/companyApi.ts';
import { fileApi } from '../../shared/api/fileApi.ts';

const companies = [
  ['Company 1', 'Prague'],
  ['Company 2', 'Brno'],
  ['Company 3', 'Ostrava'],
  ['Company 4', 'Olomouc'],
] as const;

function createCompany(id: number, name: string, city: string) {
  return {
    id,
    name,
    role: 'B_PARTNER' as const,
    state: 'B_ACTUAL' as const,
    rating: 'A',
    owner: { id: 1, fullName: 'Test Owner' },
    regNumber: `CZ${id}000`,
    primaryAddress: {
      id,
      primary: true,
      contactAddress: false,
      address: {
        id,
        city,
        country: 'Czechia',
        street: `${id} Street`,
        zipCode: '110 00',
      },
    },
    category: { id: 1, value: 'Customer' },
  };
}

const listItems = companies.map(
  ([name, city], index) => createCompany(index + 1, name, city) as CompanyListItemApi,
);

const categoryResponse: CompanyCategoryResponse = {
  success: 'true',
  totalCount: 1,
  data: [{ id: 1, code01: 'Customer', code02: null }],
};

export function setupApiMocks() {
  vi.mocked(companyApi.getCategories).mockResolvedValue(categoryResponse);

  vi.mocked(companyApi.getAll).mockImplementation((params): Promise<CompanyListResponse> => {
    const term = params?.fulltext?.toLowerCase() ?? '';
    const data = listItems.filter((company) => company.name.toLowerCase().includes(term));

    return Promise.resolve({ success: 'true', totalCount: data.length, data });
  });

  vi.mocked(companyApi.getById).mockImplementation((id) => {
    const company = listItems.find((item) => item.id === id);

    return Promise.resolve({
      success: 'true',
      data: {
        ...company,
        notice: null,
        logo: null,
      } as unknown as CompanyDetailApi,
    });
  });

  vi.mocked(fileApi.getImage).mockResolvedValue({
    fileName: '',
    contentType: 'image/png',
    imgData: '',
  });
}
