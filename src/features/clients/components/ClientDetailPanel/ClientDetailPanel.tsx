import { ClientLogo } from '../ClientLogo/ClientLogo.tsx';
import type { ClientDetail } from '../../model/client.types.ts';
import { checkValue } from '../../../../shared/utils/checkValue.ts';
import { formatAddress } from '../../utils/formatAddress.ts';
import { Badge } from '../../../../shared/components/Badge/Badge.tsx';
import { ClientAddress } from '../ClientAddress/ClientAddress.tsx';
import type { CompanyCategory, CompanyState } from '../../api/companyApi.types.ts';
import styles from './ClientDetailPanel.module.scss';
import { getClientRoleLabel, getClientStateLabel } from '../../constants/clientLabels.ts';

const stateClasses: Record<CompanyState, string> = {
  A_POTENTIAL: styles['clientDetailPanel__state--potential'],
  B_ACTUAL: styles['clientDetailPanel__state--actual'],
  C_DEFERRED: styles['clientDetailPanel__state--deferred'],
  D_UNATTRACTIVE: styles['clientDetailPanel__state--uninteresting'],
};

export interface ClientDetailPanelProps {
  client?: ClientDetail;
  categories: CompanyCategory[];
}

export function ClientDetailPanel({ client, categories }: Readonly<ClientDetailPanelProps>) {
  if (!client) {
    return null;
  }

  const category = client.category?.value;
  const state = getClientStateLabel(client.state);
  const role = getClientRoleLabel(client.role);

  const addressText = formatAddress(client.primaryAddress);
  const categoryColor = categories.find((item) => item.id === client.category?.id)?.code02;

  return (
    <aside className={styles.clientDetailPanel} aria-label="Detail klienta">
      <header>
        <div>
          {category && <Badge color={categoryColor}>{category}</Badge>}

          <strong className={stateClasses[client.state]}>
            {checkValue(state)} {checkValue(role)}
          </strong>
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
