import { ClientListHeader } from '../ClientListHeader/ClientListHeader.tsx';
import { ClientListRow } from '../ClientListRow/ClientListRow.tsx';
import type { CompanyCategory } from '../../api/companyApi.types.ts';
import type { ClientListItem } from '../../model/client.types.ts';
import styles from './ClientList.module.scss';

export interface ClientListProps {
  clients: ClientListItem[];
  categories: CompanyCategory[];
  selectedClientId: number | null;
}

export function ClientList({ clients, categories, selectedClientId }: Readonly<ClientListProps>) {
  return (
    <div>
      <table className={styles.clientList}>
        <ClientListHeader />
        <tbody>
          {clients.map((client) => (
            <ClientListRow
              key={client.id}
              client={client}
              categories={categories}
              isSelected={client.id === selectedClientId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
