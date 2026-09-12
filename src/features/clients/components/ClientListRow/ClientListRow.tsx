import { Link } from 'react-router-dom';
import type { ClientListItem } from '../../model/client.types.ts';
import { checkValue } from '../../../../shared/utils/checkValue.ts';
import { getClientRoleLabel, getClientStateLabel } from '../../constants/clientLabels.ts';
import { Badge } from '../../../../shared/components/Badge/Badge.tsx';
import styles from './ClientListRow.module.scss';

export interface ClientListRowProps {
  client: ClientListItem;
  isSelected: boolean;
}

export function ClientListRow({ client, isSelected }: Readonly<ClientListRowProps>) {
  const name = checkValue(client.name);
  const state = getClientStateLabel(client.state);
  const role = getClientRoleLabel(client.role);
  const rating = checkValue(client.rating);
  const owner = checkValue(client.owner?.fullName);
  const regNumber = checkValue(client.regNumber);
  const city = checkValue(client.primaryAddress?.address?.city);
  const category = checkValue(client.category?.value);

  return (
    <tr className={styles.clientListRow}>
      <th scope="row">
        <Link
          className={styles['clientListRow__link']}
          to={{ search: `?clientId=${client.id}` }}
          aria-current={isSelected ? 'page' : undefined}
        >
          {name}
        </Link>
      </th>
      <td>{state}</td>
      <td>{role}</td>
      <td>{rating}</td>
      <td>{owner}</td>
      <td>{regNumber}</td>
      <td>{city}</td>
      <td>
        <Badge>{category}</Badge>
      </td>
    </tr>
  );
}
