import type { ClientTableItem } from '../../types/clientTable.ts';
import { checkValue } from '../../../../shared/utils/checkValue.ts';
import { getCompanyRoleLabel, getCompanyStateLabel } from '../../constants/companyLabels.ts';

export interface ClientListRowProps {
  client: ClientTableItem;
  isSelected: boolean;
  onSelect: (clientId: number) => void;
}

export function ClientListRow({ client, isSelected, onSelect }: Readonly<ClientListRowProps>) {
  const name = checkValue(client.name);
  const state = getCompanyStateLabel(client.state);
  const role = getCompanyRoleLabel(client.role);
  const rating = checkValue(client.rating);
  const owner = checkValue(client.owner?.fullName);
  const regNumber = checkValue(client.regNumber);
  const city = checkValue(client.primaryAddress?.address?.city);
  const category = checkValue(client.category?.value);

  return (
    <tr>
      <th scope="row">
        <a
          href={`#client-${client.id}`}
          aria-current={isSelected ? 'page' : undefined}
          onClick={(event) => {
            event.preventDefault();
            onSelect(client.id);
          }}
        >
          {name}
        </a>
      </th>
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
