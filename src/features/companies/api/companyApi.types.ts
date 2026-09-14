export interface CompanyListResponse {
  success: string;
  totalCount: number;
  data: CompanyListItem[];
}

export interface CompanyCategoryResponse {
  success: string;
  totalCount: number;
  data: CompanyCategory[];
}

export interface CompanyListParams {
  offset?: number;
  limit?: number;
  sortColumn?:
    | 'id'
    | 'rowInfo.createdAt'
    | 'rowInfo.updatedAt'
    | 'rowInfo.lastModifiedAt'
    | 'name'
    | 'regNumber';
  sortDirection?: 'ASC' | 'DESC';
  fulltext?: string;
  name?: string;
  lastName?: string;
  person?: boolean;
  regNumber?: string;
  taxNumber?: string;
  taxNumber2?: string;
  owner?: number;
  rating?: string;
  role?: CompanyRole;
  state?: CompanyState;
  category?: number;
  economyActivity?: number;
  companyClassification1?: number;
  companyClassification2?: number;
  companyClassification3?: number;
  legalForm?: number;
  turnover?: number;
  paymentTerm?: number;
  contactSource?: number;
  'primaryAddress-address.city'?: string;
  'primaryAddress-contactInfo.email'?: string;
  'primaryAddress-contactInfo.email2'?: string;
  'primaryAddress-address.countryCode'?: string;
  'contactAddress-address.countryCode'?: string;
  'rowInfo.createdAt'?: string;
  'rowInfo.updatedAt'?: string;
  'rowInfo.lastModifiedAt'?: string;
  'rowInfo.rowAccess'?: string;
  gdprTemplate?: string;
  withoutGdpr?: string;
  view?: string;
  tags?: string;
  id?: number;
}

export interface CompanyDetailResponse {
  success: string;
  data: CompanyDetail;
}

export interface CompanyImageResponse {
  fileName: string;
  contentType: string;
  imgData: string;
}

export interface CompanyListItem {
  id: number;
  name: string;
  titleBefore: string | null;
  firstName: string | null;
  lastName: string | null;
  titleAfter: string | null;
  person: boolean;
  role: CompanyRole;
  state: CompanyState;
  rating: string;
  owner: CompanyOwner;
  regNumber: string | null;
  taxNumber: string | null;
  taxNumber2: string | null;
  taxPayer: string | null;
  bankAccount: string | null;
  databox: string | null;
  court: string | null;
  primaryAddress: CompanyContactAddress | null;
  contactAddress: CompanyContactAddress | null;
  category: CompanyLookupValue | null;
  turnover: CompanyLookupValue | null;
  economyActivity: CompanyLookupValue | null;
  companyClassification1: CompanyLookupValue | null;
  companyClassification2: CompanyLookupValue | null;
  companyClassification3: CompanyLookupValue | null;
  legalForm: CompanyLookupValue | null;
  paymentTerm: CompanyLookupValue | null;
  contactSource: CompanyLookupValue | null;
  birthday: string | null;
  notice: string | null;
  tags: string[];
  customFields: CompanyCustomFields | null;
  'rowInfo.createdAt': string;
  'rowInfo.createdBy': string;
  'rowInfo.updatedAt': string;
  'rowInfo.updatedBy': string;
  'rowInfo.rowAccess': string | null;
  'rowInfo.rowState': string | null;
  securityLevel: CompanySecurityLevel;
  inlineGdpr: CompanyGdprEntry[];
  _version: number;
}

export interface CompanyDetail {
  id: number;
  name: string;
  person: boolean;
  firstName: string | null;
  lastName: string | null;
  titleBefore: string | null;
  titleAfter: string | null;
  salutation: string | null;
  owner: CompanyOwner;
  rating: string;
  state: CompanyState;
  role: CompanyRole;
  notice: string | null;
  category: CompanyLookupValue | null;
  contactSource: CompanyLookupValue | null;
  employeesNumber: CompanyLookupValue | null;
  legalForm: CompanyLookupValue | null;
  paymentTerm: CompanyLookupValue | null;
  turnover: CompanyLookupValue | null;
  economyActivity: CompanyLookupValue | null;
  companyClassification1: CompanyLookupValue | null;
  companyClassification2: CompanyLookupValue | null;
  companyClassification3: CompanyLookupValue | null;
  regNumber: string | null;
  taxNumber: string | null;
  taxNumber2: string | null;
  taxPayer: string | null;
  bankAccount: string | null;
  databox: string | null;
  court: string | null;
  birthday: string | null;
  primaryAddress: CompanyContactAddress | null;
  tags: string[];
  logo: CompanyFile | null;
  socialNetworkContact: CompanySocialNetworkContact;
  customFields: CompanyCustomFields;
  'rowInfo.createdAt': string;
  'rowInfo.createdBy': string;
  'rowInfo.updatedAt': string;
  'rowInfo.updatedBy': string;
  'rowInfo.rowAccess': string | null;
  'rowInfo.rowState': string | null;
  extIds: unknown;
  _version: number;
  attachments: CompanyAttachment[];
  addresses: CompanyContactAddress[];
  inlineGdpr: CompanyGdprEntry[];
  originLead: CompanyOriginLead | null;
}

export interface CompanyOwner {
  id: number;
  fullName: string;
}

export interface CompanyLookupValue {
  id: number;
  value: string;
}

export interface CompanyCategory {
  id: number;
  code01: string;
  code02: string | null;
}

export interface CompanyContactAddress {
  id: number;
  primary: boolean;
  contactAddress: boolean;
  address: CompanyAddress;
  territory: CompanyLookupValue | null;
  contactInfo: CompanyContactInfo | null;
  extIds: unknown;
}

export interface CompanyAddress {
  id: number;
  city: string | null;
  country: string | null;
  name: string | null;
  province: string | null;
  street: string | null;
  zipCode: string | null;
  lat: number | null;
  lng: number | null;
}

export interface CompanyContactInfo {
  email: string | null;
  email2: string | null;
  primary: boolean;
  tel1: string | null;
  tel1Type: string | null;
  tel2: string | null;
  tel2Type: string | null;
  www: string | null;
  otherContact: string | null;
}

export interface CompanyFile {
  id: number;
  contentType: string;
  fileName: string;
  size: number;
}

export interface CompanyAttachment {
  id: number;
  link: string | null;
  linkName: string | null;
  file: CompanyFile | null;
  folder: string | null;
  folderId: number | null;
}

export interface CompanySocialNetworkContact {
  facebook: string | null;
  googleplus: string | null;
  twitter: string | null;
  linkedin: string | null;
  pinterest: string | null;
  instagram: string | null;
  skype: string | null;
  youtube: string | null;
  whatsapp?: string | null;
  tiktok?: string | null;
  threads?: string | null;
}

export type CompanyCustomFields = Record<string, string | number | boolean | null>;

export interface CompanySecurityLevel {
  id: number;
  name: string;
}

export interface CompanyGdprEntry {
  id: number;
  validFrom: string;
  validTill: string;
  legalTitle: string;
  templateName: string;
  gdprTemplate: number;
}

export interface CompanyOriginLead {
  id: number;
  code: string;
  topic: string;
}

export type CompanyState = 'A_POTENTIAL' | 'B_ACTUAL' | 'C_DEFERRED' | 'D_UNATTRACTIVE';

export type CompanyRole = 'A_SUBSCRIBER' | 'B_PARTNER' | 'C_SUPPLIER' | 'D_RIVAL' | 'E_OWN';
