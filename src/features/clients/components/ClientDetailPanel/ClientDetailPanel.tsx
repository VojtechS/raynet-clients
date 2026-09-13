import { ClientLogo } from '../ClientLogo/ClientLogo.tsx';
import type { ClientDetail } from '../../model/client.types.ts';
import { checkValue } from '../../../../shared/utils/checkValue.ts';
import { formatAddress } from '../../utils/formatAddress.ts';
import { Badge } from '../../../../shared/components/Badge/Badge.tsx';
import { ClientAddress } from '../ClientAddress/ClientAddress.tsx';
import type { CompanyCategory } from '../../api/companyApi.types.ts';
import styles from './ClientDetailPanel.module.scss';
import { getClientRoleLabel } from '../../constants/clientLabels.ts';
import { ClientState } from '../ClientState/ClientState.tsx';
import { X } from 'lucide-react';

export interface ClientDetailPanelProps {
  client?: ClientDetail;
  categories: CompanyCategory[];
  onClose: () => void;
}

export function ClientDetailPanel({
  client,
  categories,
  onClose,
}: Readonly<ClientDetailPanelProps>) {
  if (!client) {
    return null;
  }

  const category = client.category?.value;
  const role = getClientRoleLabel(client.role);

  const addressText = formatAddress(client.primaryAddress);
  const categoryColor = categories.find((item) => item.id === client.category?.id)?.code02;

  return (
    <aside className={styles.clientDetailPanel} aria-label="Detail klienta">
      <header>
        <div className={styles.clientDetailPanel__top}>
          {category && <Badge color={categoryColor}>{category}</Badge>}

          <div className={styles.clientDetailPanel__state}>
            <strong>
              <ClientState state={client.state} suffix={checkValue(role)} />
            </strong>
          </div>

          <button
            type="button"
            className={styles.clientDetailPanel__closeButton}
            onClick={onClose}
            aria-label="Zavřít detail klienta"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <h2 className={styles.clientDetailPanel__title}>{checkValue(client.name)}</h2>
      </header>

      <div className={styles.clientDetailPanel__content}>
        {client.logo?.id && (
          <div className={styles.clientDetailPanel__logo}>
            <ClientLogo logoId={client.logo?.id} clientName={client.name} />
          </div>
        )}

        <div>
          <p className={styles.clientDetailPanel__text}>IČ: {checkValue(client.regNumber)}</p>

          <div className={styles.clientDetailPanel__text}>
            <ClientAddress contactAddress={client.primaryAddress} />
          </div>

          {addressText !== '-' ? (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`}
              className="link link--blue"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zobrazit na mapě"
            >
              Zobrazit na mapě
            </a>
          ) : null}
        </div>
      </div>

      {client.notice && (
        <div
          className={styles.clientDetailPanel__text}
          dangerouslySetInnerHTML={{ __html: client.notice }}
        ></div>
      )}

      <p className={styles.clientDetailPanel__text}>
        Vlastník: <strong>{checkValue(client.owner?.fullName)}</strong>
      </p>
    </aside>
  );
}
