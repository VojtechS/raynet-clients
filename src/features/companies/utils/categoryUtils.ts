import type { CompanyCategory } from '../api/companyApi.types.ts';

export type CategoryColors = ReadonlyMap<number, string | null>;

export function createCategoryColorMap(categories: CompanyCategory[]): CategoryColors {
  return new Map(categories.map((category) => [category.id, category.code02]));
}
