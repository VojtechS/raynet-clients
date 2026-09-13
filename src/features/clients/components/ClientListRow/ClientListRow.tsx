import { Link } from 'react-router-dom';
import type { CompanyCategory } from '../../api/companyApi.types.ts';
import type { ClientListItem } from '../../model/client.types.ts';
import { checkValue } from '../../../../shared/utils/checkValue.ts';
import { getClientRoleLabel } from '../../constants/clientLabels.ts';
import { Badge } from '../../../../shared/components/Badge/Badge.tsx';
import { ClientState } from '../ClientState/ClientState.tsx';
import tableStyles from '../../../../styles/clientListTableSizes.module.scss';
import styles from './ClientListRow.module.scss';

export interface ClientListRowProps {
  client: ClientListItem;
  categories: CompanyCategory[];
  isSelected: boolean;
  onSelect: () => void;
}

export function ClientListRow({
  client,
  categories,
  isSelected,
  onSelect,
}: Readonly<ClientListRowProps>) {
  const name = checkValue(client.name);
  const role = getClientRoleLabel(client.role);
  const rating = checkValue(client.rating);
  const owner = checkValue(client.owner?.fullName);
  const regNumber = checkValue(client.regNumber);
  const city = checkValue(client.primaryAddress?.address?.city);
  const category = checkValue(client.category?.value);
  const categoryColor = categories.find((item) => item.id === client.category?.id)?.code02;

  return (
    <tr
      className={`${styles.clientListRow} ${isSelected && styles.clientListRowSelected}`}
    >
      <th className={tableStyles.clientList__name} scope="row">
        <div className={styles.clientListRow__content}>
          <Link
            className={styles.clientListRow__link}
            to={{ search: `?clientId=${client.id}` }}
            aria-current={isSelected ? 'page' : undefined}
            onClick={onSelect}
          >
            {name}
          </Link>
        </div>
      </th>
      <td className={tableStyles.clientList__state}>
        <div className={styles.clientListRow__content}>
          <ClientState state={client.state} />
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
