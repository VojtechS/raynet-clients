import tableStyles from '../../../../styles/clientListTableSizes.module.scss';
import styles from './ClientListHeader.module.scss';

export function ClientListHeader() {
  return (
    <thead className={styles.clientListHeader}>
      <tr>
        <th className={tableStyles.clientList__name} scope="col">Název/Jméno</th>
        <th className={tableStyles.clientList__state} scope="col">Stav</th>
        <th className={tableStyles.clientList__relation} scope="col">Vztah</th>
        <th className={tableStyles.clientList__rating} scope="col">Rating</th>
        <th className={tableStyles.clientList__owner} scope="col">Vlastník</th>
        <th className={tableStyles.clientList__regNumber} scope="col">IČO</th>
        <th className={tableStyles.clientList__city} scope="col">Město</th>
        <th className={tableStyles.clientList__category} scope="col">Kategorie</th>
      </tr>
    </thead>
  );
}
