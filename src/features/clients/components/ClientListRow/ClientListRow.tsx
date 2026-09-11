import type { ClientTableItem } from '../../types/clientTable.ts';
import { checkValue } from '../../../../shared/utils/checkValue.ts';

export interface ClientListRowProps {
  client: ClientTableItem;
}

export function ClientListRow({ client }: Readonly<ClientListRowProps>) {
  const name = checkValue(client.name);
  const state = checkValue(client.state);
  const role = checkValue(client.role);
  const rating = checkValue(client.rating);
  const owner = checkValue(client.owner?.fullName);
  const regNumber = checkValue(client.regNumber);
  const city = checkValue(client.primaryAddress?.address?.city);
  const category = checkValue(client.category?.value);

  return (
    <tr>
      <th scope="row">{name}</th>
      <td>{state}</td>
      <td>{role}</td>
      <td>{rating}</td>
      <td>{owner}</td>
      <td>{regNumber}</td>
      <td>{city}</td>
      <td>{category}</td>
    </tr>
  );
}
