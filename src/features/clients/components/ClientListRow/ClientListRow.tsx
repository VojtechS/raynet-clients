import { Link } from 'react-router-dom';
import type { CompanyCategory, CompanyState } from '../../api/companyApi.types.ts';
import type { ClientListItem } from '../../model/client.types.ts';
import { checkValue } from '../../../../shared/utils/checkValue.ts';
import { getClientRoleLabel, getClientStateLabel } from '../../constants/clientLabels.ts';
import { Badge } from '../../../../shared/components/Badge/Badge.tsx';
import tableStyles from '../../../../styles/clientListTableSizes.module.scss';
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
      <th className={tableStyles.clientList__name} scope="row">
        <div className={styles.clientListRow__content}>
          <Link
            className={styles['clientListRow__link']}
            to={{ search: `?clientId=${client.id}` }}
            aria-current={isSelected ? 'page' : undefined}
          >
            {name}
          </Link>
        </div>
      </th>
      <td className={tableStyles.clientList__state}>
        <div className={styles.clientListRow__content}>
          <span className={stateClasses[client.state]}>{state}</span>
        </div>
      </td>
      <td className={tableStyles.clientList__relation}>
        <div className={styles.clientListRow__content}>{role}</div>
      </td>
      <td className={tableStyles.clientList__rating}>
        <div className={styles.clientListRow__content}>{rating}</div>
      </td>
      <td className={tableStyles.clientList__owner}>
        <div className={styles.clientListRow__content}>{owner}</div>
      </td>
      <td className={tableStyles.clientList__regNumber}>
        <div className={styles.clientListRow__content}>{regNumber}</div>
      </td>
      <td className={tableStyles.clientList__city}>
        <div className={styles.clientListRow__content}>{city}</div>
      </td>
      <td className={tableStyles.clientList__category}>
        <div className={styles.clientListRow__content}>
          <Badge color={categoryColor}>{category}</Badge>
        </div>
      </td>
    </tr>
  );
}
