import { ClientListHeader } from '../ClientListHeader/ClientListHeader.tsx';
import { ClientListRow } from '../ClientListRow/ClientListRow.tsx';
import type { CompanyCategory } from '../../api/companyApi.types.ts';
import type { ClientListItem } from '../../model/client.types.ts';
import tableSizeStyles from '../../../../styles/clientListTableSizes.module.scss';
import styles from './ClientList.module.scss';

export interface ClientListProps {
  clients: ClientListItem[];
  categories: CompanyCategory[];
  selectedClientId: number | null;
  onSelect: () => void;
}

export function ClientList({
  clients,
  categories,
  selectedClientId,
  onSelect,
}: Readonly<ClientListProps>) {
  return (
    <div className={styles.clientListWrapper}>
      <table className={`${styles.clientList} ${tableSizeStyles.clientList}`}>
        <ClientListHeader />
        <tbody>
          {clients.length === 0 ? (
            <tr>
              <td className={styles.clientListEmptyCell} colSpan={8}>
                <div className={styles.clientListEmptyCellContent}>Žádní klienti</div>
              </td>
            </tr>
          ) : (
            clients.map((client) => (
              <ClientListRow
                key={client.id}
                client={client}
                categories={categories}
                isSelected={client.id === selectedClientId}
                onSelect={onSelect}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
