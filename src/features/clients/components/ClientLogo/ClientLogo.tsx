import { useClientImageQuery } from '../../hooks/useClientQueries.ts';
import styles from './ClientLogo.module.scss';

interface ClientLogoProps {
  logoId?: number;
  clientName: string;
}

export function ClientLogo({ logoId, clientName }: Readonly<ClientLogoProps>) {
  const imageQuery = useClientImageQuery(logoId);
  const imageData = imageQuery.data?.imgData;
  const hasImage = Boolean(imageData);

  if (!hasImage) {
    return null;
  }

  return (
    <img
      src={imageData}
      alt={`${clientName} logo`}
      width={128}
      height={128}
      className={styles.clientLogo}
    />
  );
}
