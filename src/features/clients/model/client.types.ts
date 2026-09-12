import type { CompanyDetail, CompanyListItem } from '../api/companyApi.types.ts';

export type ClientListItem = Pick<
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

export type ClientDetail = Pick<
  CompanyDetail,
  | 'id'
  | 'name'
  | 'state'
  | 'role'
  | 'category'
  | 'logo'
  | 'regNumber'
  | 'primaryAddress'
  | 'notice'
  | 'owner'
>;
