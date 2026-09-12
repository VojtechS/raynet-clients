import type { CompanyContactAddress } from '../api/companyApi.types.ts';

export function formatAddress(contactAddress: CompanyContactAddress | null): string {
  const address = contactAddress?.address;

  if (!address) {
    return '-';
  }

  const city = [address.zipCode, address.city].filter(Boolean).join(' ');

  return [address.street, city, address.country].filter(Boolean).join(', ') || '-';
}
