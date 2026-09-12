import { ClientListHeader } from '../ClientListHeader/ClientListHeader.tsx';
import { ClientListRow } from '../ClientListRow/ClientListRow.tsx';
import type { ClientTableItem } from '../../types/clientTable.ts';

export interface ClientListProps {
  clients: ClientTableItem[];
  selectedClientId: number | null;
  onClientSelect: (clientId: number) => void;
}

export function ClientList({ clients, selectedClientId, onClientSelect }: Readonly<ClientListProps>) {
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
              onSelect={onClientSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
