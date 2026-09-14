import { Link } from 'react-router-dom';
import type { CompanyListItem } from '../../model/company.types.ts';
import type { CategoryColors } from '../../utils/categoryUtils.ts';
import { checkValue } from '../../../../shared/utils/checkValue.ts';
import { getCompanyRoleLabel } from '../../constants/companyLabels.ts';
import { Badge } from '../../../../shared/components/Badge/Badge.tsx';
import { CompanyState } from '../CompanyState/CompanyState.tsx';
import tableStyles from '../../../../styles/companyListTableSizes.module.scss';
import styles from './CompanyListRow.module.scss';

export interface CompanyListRowProps {
  company: CompanyListItem;
  categoryColors: CategoryColors;
  isSelected: boolean;
}

export function CompanyListRow({
  company,
  categoryColors,
  isSelected,
}: Readonly<CompanyListRowProps>) {
  const name = checkValue(company.name);
  const role = getCompanyRoleLabel(company.role);
  const rating = checkValue(company.rating);
  const owner = checkValue(company.owner?.fullName);
  const regNumber = checkValue(company.regNumber);
  const city = checkValue(company.primaryAddress?.address?.city);
  const category = checkValue(company.category?.value);
  const categoryColor = company.category ? categoryColors.get(company.category.id) : undefined;

  return (
    <tr
      className={`${styles.companyListRow} ${isSelected ? styles['companyListRow--selected'] : ''}`}
    >
      <th className={tableStyles.companyList__name} scope="row">
        <div className={styles.companyListRow__content}>
          <Link
            className={styles.companyListRow__link}
            to={{ search: `?companyId=${company.id}` }}
            aria-current={isSelected ? 'true' : undefined}
          >
            {name}
          </Link>
        </div>
      </th>
      <td className={tableStyles.companyList__state}>
        <div className={styles.companyListRow__content}>
          <CompanyState state={company.state} />
        </div>
      </td>
      <td className={tableStyles.companyList__relation}>
        <div className={styles.companyListRow__content}>{role}</div>
      </td>
      <td className={tableStyles.companyList__rating}>
        <div className={styles.companyListRow__content}>{rating}</div>
      </td>
      <td className={tableStyles.companyList__owner}>
        <div className={styles.companyListRow__content}>{owner}</div>
      </td>
      <td className={tableStyles.companyList__regNumber}>
        <div className={styles.companyListRow__content}>{regNumber}</div>
      </td>
      <td className={tableStyles.companyList__city}>
        <div className={styles.companyListRow__content}>{city}</div>
      </td>
      <td className={tableStyles.companyList__category}>
        <div className={styles.companyListRow__content}>
          <Badge color={categoryColor}>{category}</Badge>
        </div>
      </td>
    </tr>
  );
}
