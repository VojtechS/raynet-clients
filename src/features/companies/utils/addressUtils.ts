import type { CompanyContactAddress } from '../api/companyApi.types.ts';

export function addressUtils(contactAddress: CompanyContactAddress | null): string | null {
  const address = contactAddress?.address;

  if (!address) {
    return null;
  }

  const city = [address.zipCode, address.city].filter(Boolean).join(' ');

  return [address.street, city, address.country].filter(Boolean).join(', ') || null;
}

export function getGoogleMapsUrl(address: string | null): string | null {
  return address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : null;
}
