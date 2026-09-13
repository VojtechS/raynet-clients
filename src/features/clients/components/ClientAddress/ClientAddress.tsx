import type { CompanyContactAddress } from '../../api/companyApi.types.ts';

export interface ClientAddressProps {
  contactAddress: CompanyContactAddress | null;
}

export function ClientAddress({
  contactAddress,
}: Readonly<ClientAddressProps>) {
  const address = contactAddress?.address;

  return (
    <address className="fontStyleNormal">
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
