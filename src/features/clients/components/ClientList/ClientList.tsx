import { ClientListHeader } from '../ClientListHeader/ClientListHeader.tsx';
import { ClientListRow } from '../ClientListRow/ClientListRow.tsx';
import type { ClientTableItem } from '../../types/clientTable.ts';

export interface ClientListProps {
  clients: ClientTableItem[];
  selectedClientId: number | null;
}

export function ClientList({ clients, selectedClientId }: Readonly<ClientListProps>) {
  return (
    <div>
      <table>
        <ClientListHeader />
        <tbody>
          {clients.map((client) => (
            <ClientListRow
              key={client.id}
              client={client}
              isSelected={client.id === selectedClientId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
