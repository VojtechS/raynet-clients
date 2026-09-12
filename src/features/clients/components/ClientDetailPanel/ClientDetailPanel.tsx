import type { ClientDetailPanelData } from '../../types/clientDetailPanel.ts';
import { checkValue } from '../../../../shared/utils/checkValue.ts';
import { formatAddress } from '../../utils/formatAddress.ts';

export interface ClientDetailPanelProps {
  client?: ClientDetailPanelData;
}

export function ClientDetailPanel({ client }: Readonly<ClientDetailPanelProps>) {
  const addressText = formatAddress(client.primaryAddress);

  return (
    <aside aria-label="Detail klienta">
      <header>
        <div>
          <span>{checkValue(client.category?.value)}</span>
          <span>{checkValue(client.state)}</span>
        </div>
        <h2>{checkValue(client.name)}</h2>
      </header>

      <div>
        <div>
          {client.logo?.fileName ? (
            <img src={client.logo.fileName} alt={`${client.name} logo`} />
          ) : (
            <span aria-hidden="true">-</span>
          )}
        </div>

        <div>
          <p>{checkValue(client.regNumber)}</p>
          <address>{addressText}</address>
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
      <p>{checkValue(client.owner?.fullName)}</p>
    </aside>
  );
}
