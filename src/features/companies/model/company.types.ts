import type {
  CompanyDetail as CompanyDetailApi,
  CompanyListItem as CompanyListItemApi,
} from '../api/companyApi.types.ts';

export type CompanyListItem = Pick<
  CompanyListItemApi,
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

export type CompanyDetail = Pick<
  CompanyDetailApi,
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
