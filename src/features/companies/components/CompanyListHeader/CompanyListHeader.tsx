import tableStyles from '../../../../styles/companyListTableSizes.module.scss';
import styles from './CompanyListHeader.module.scss';

export function CompanyListHeader() {
  return (
    <thead className={styles.companyListHeader}>
      <tr>
        <th className={tableStyles.companyList__name} scope="col">
          Název/Jméno
        </th>
        <th className={tableStyles.companyList__state} scope="col">
          Stav
        </th>
        <th className={tableStyles.companyList__relation} scope="col">
          Vztah
        </th>
        <th className={tableStyles.companyList__rating} scope="col">
          Rating
        </th>
        <th className={tableStyles.companyList__owner} scope="col">
          Vlastník
        </th>
        <th className={tableStyles.companyList__regNumber} scope="col">
          IČO
        </th>
        <th className={tableStyles.companyList__city} scope="col">
          Město
        </th>
        <th className={tableStyles.companyList__category} scope="col">
          Kategorie
        </th>
      </tr>
    </thead>
  );
}
