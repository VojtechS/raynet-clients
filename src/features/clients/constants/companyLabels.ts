import type {
  CompanyRole,
  CompanyState,
} from '../types/company.ts';
import { checkValue } from '../../../shared/utils/checkValue.ts';

const stateLabels: Record<CompanyState, string> = {
  A_POTENTIAL: 'Potenciální',
  B_ACTUAL: 'Aktivní',
  C_DEFERRED: 'Odložený',
  D_UNATTRACTIVE: 'Neatraktivní',
};

const roleLabels: Record<CompanyRole, string> = {
  A_SUBSCRIBER: 'Odběratel',
  B_PARTNER: 'Partner',
  C_SUPPLIER: 'Dodavatel',
  D_RIVAL: 'Konkurent',
  E_OWN: 'Vlastní',
};

function isCompanyState(value: string): value is CompanyState {
  return value in stateLabels;
}

function isCompanyRole(value: string): value is CompanyRole {
  return value in roleLabels;
}

export function getCompanyStateLabel(value: string | null | undefined): string {
  const state = checkValue(value);

  return isCompanyState(state) ? stateLabels[state] : state;
}

export function getCompanyRoleLabel(value: string | null | undefined): string {
  const role = checkValue(value);

  return isCompanyRole(role) ? roleLabels[role] : role;
}
