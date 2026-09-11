import type { CompanyListItem } from './company.ts';

export type ClientTableItem = Pick<
  CompanyListItem,
  | 'id'
  | 'name'
  | 'state'
  | 'role'
  | 'rating'
  | 'owner'
  | 'regNumber'
  | 'primaryAddress'
  | 'category'
>;
