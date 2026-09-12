import styles from './ClientListHeader.module.scss';

export function ClientListHeader() {
  return (
    <thead className={styles.clientListHeader}>
      <tr>
        <th scope="col">Název/Jméno</th>
        <th scope="col">Stav</th>
        <th scope="col">Vztah</th>
        <th scope="col">Rating</th>
        <th scope="col">Vlastník</th>
        <th scope="col">IČ</th>
        <th scope="col">Město</th>
        <th scope="col">Kategorie</th>
      </tr>
    </thead>
  );
}
