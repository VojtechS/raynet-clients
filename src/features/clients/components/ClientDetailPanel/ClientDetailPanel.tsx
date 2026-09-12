import { ClientLogo } from '../ClientLogo/ClientLogo.tsx';
import type { ClientDetail } from '../../model/client.types.ts';
import { checkValue } from '../../../../shared/utils/checkValue.ts';
import { formatAddress } from '../../utils/formatAddress.ts';
import { Badge } from '../../../../shared/components/Badge/Badge.tsx';
import { ClientAddress } from '../ClientAddress/ClientAddress.tsx';

export interface ClientDetailPanelProps {
  client?: ClientDetail;
}

export function ClientDetailPanel({ client }: Readonly<ClientDetailPanelProps>) {
  if (!client) {
    return null;
  }

  const addressText = formatAddress(client.primaryAddress);

  return (
    <aside aria-label="Detail klienta">
      <header>
        <div>
          <Badge>{checkValue(client.category?.value)}</Badge>
          <strong>{checkValue(client.state)} {checkValue(client.role)}</strong>
        </div>
        <h2>{checkValue(client.name)}</h2>
      </header>

      <div>
        <ClientLogo logoId={client.logo?.id} clientName={client.name} />

        <div>
          <p>IČ: {checkValue(client.regNumber)}</p>
          <ClientAddress contactAddress={client.primaryAddress} />
          {addressText !== '-' ? (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zobrazit na mapě"
            >
              Zobrazit na mapě
            </a>
          ) : null}
        </div>
      </div>

      {client.notice ? <p>{client.notice}</p> : null}

      <p>Vlastník: {checkValue(client.owner?.fullName)}</p>
    </aside>
  );
}
