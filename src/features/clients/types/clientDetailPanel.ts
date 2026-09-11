import type { CompanyDetail } from './company.ts';

export type ClientDetailPanelData = Pick<
  CompanyDetail,
  | 'id'
  | 'name'
  | 'state'
  | 'category'
  | 'logo'
  | 'regNumber'
  | 'primaryAddress'
  | 'notice'
  | 'owner'
>;
