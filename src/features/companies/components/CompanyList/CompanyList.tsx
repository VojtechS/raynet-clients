import { CompanyListHeader } from '../CompanyListHeader/CompanyListHeader.tsx';
import { CompanyListRow } from '../CompanyListRow/CompanyListRow.tsx';
import type { CompanyListItem } from '../../model/company.types.ts';
import type { CategoryColors } from '../../utils/categoryUtils.ts';
import tableSizeStyles from '../../../../styles/companyListTableSizes.module.scss';
import { LoadingOverlay } from '../../../../shared/components/LoadingOverlay/LoadingOverlay.tsx';
import styles from './CompanyList.module.scss';

export interface CompanyListProps {
  companies: CompanyListItem[];
  categoryColors: CategoryColors;
  selectedCompanyId: number | null;
  isLoading?: boolean;
}

export function CompanyList({
  companies,
  categoryColors,
  selectedCompanyId,
  isLoading = false,
}: Readonly<CompanyListProps>) {
  return (
    <div className={styles.companyList__wrapper} aria-busy={isLoading}>
      {isLoading && <LoadingOverlay label="Načítání seznamu klientů" />}
      <table className={`${styles.companyList__table} ${tableSizeStyles.companyList}`}>
        <caption className="visuallyHidden">Seznam klientů</caption>
        <CompanyListHeader />
        <tbody>
          {companies.length === 0 && !isLoading ? (
            <tr>
              <td className={styles.companyList__emptyCell} colSpan={8}>
                <div className="emptyState">Žádní klienti</div>
              </td>
            </tr>
          ) : (
            companies.map((company) => (
              <CompanyListRow
                key={company.id}
                company={company}
                categoryColors={categoryColors}
                isSelected={company.id === selectedCompanyId}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
