import type { CompanyContactAddress } from '../../api/companyApi.types.ts';

export interface CompanyAddressProps {
  contactAddress: CompanyContactAddress | null;
}

export function CompanyAddress({ contactAddress }: Readonly<CompanyAddressProps>) {
  const address = contactAddress?.address;

  return (
    <address className="fontStyleNormal">
      {address ? (
        <>
          <p>{address.street}</p>
          <p>
            {address.zipCode} {address.city}
          </p>
          <p>{address.country}</p>
        </>
      ) : (
        '-'
      )}
    </address>
  );
}
