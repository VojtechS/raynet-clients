import type { CompanyContactAddress } from '../../types/company.ts';

export interface ClientAddressProps {
  contactAddress: CompanyContactAddress | null;
}

export function ClientAddress({
  contactAddress,
}: Readonly<ClientAddressProps>) {
  const address = contactAddress?.address;

  return (
    <address>
      {address ? (
        <>
          {address.street}
          <br />
          {address.zipCode} {address.city}
          <br />
          {address.country}
        </>
      ) : '-'}
    </address>
  );
}
