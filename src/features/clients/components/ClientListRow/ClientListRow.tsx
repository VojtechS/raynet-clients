import { Link } from 'react-router-dom';
import type { CompanyCategory, CompanyState } from '../../api/companyApi.types.ts';
import type { ClientListItem } from '../../model/client.types.ts';
import { checkValue } from '../../../../shared/utils/checkValue.ts';
import { getClientRoleLabel, getClientStateLabel } from '../../constants/clientLabels.ts';
import { Badge } from '../../../../shared/components/Badge/Badge.tsx';
import styles from './ClientListRow.module.scss';

const stateClasses: Record<CompanyState, string> = {
  A_POTENTIAL: styles['clientListRow__state--potential'],
  B_ACTUAL: styles['clientListRow__state--actual'],
  C_DEFERRED: styles['clientListRow__state--deferred'],
  D_UNATTRACTIVE: styles['clientListRow__state--uninteresting'],
};

export interface ClientListRowProps {
  client: ClientListItem;
  categories: CompanyCategory[];
  isSelected: boolean;
}

export function ClientListRow({ client, categories, isSelected }: Readonly<ClientListRowProps>) {
  const name = checkValue(client.name);
  const state = getClientStateLabel(client.state);
  const role = getClientRoleLabel(client.role);
  const rating = checkValue(client.rating);
  const owner = checkValue(client.owner?.fullName);
  const regNumber = checkValue(client.regNumber);
  const city = checkValue(client.primaryAddress?.address?.city);
  const category = checkValue(client.category?.value);
  const categoryColor = categories.find((item) => item.id === client.category?.id)?.code02;

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
      <td>
        <span className={stateClasses[client.state]}>{state}</span>
      </td>
      <td>{role}</td>
      <td>{rating}</td>
      <td>{owner}</td>
      <td>{regNumber}</td>
      <td>{city}</td>
      <td>
        <Badge color={categoryColor}>{category}</Badge>
      </td>
    </tr>
  );
}
