import { ClientListHeader } from '../ClientListHeader/ClientListHeader.tsx';
import { ClientListRow } from '../ClientListRow/ClientListRow.tsx';
import type { ClientTableItem } from '../../types/clientTable.ts';

export interface ClientListProps {
  clients: ClientTableItem[];
}

export function ClientList({ clients }: Readonly<ClientListProps>) {
  return (
    <div>
      <table>
        <ClientListHeader />
        <tbody>
          {clients.map((client) => (
            <ClientListRow key={client.id} client={client} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
