import { useCompanyImageQuery } from '../../hooks/useCompanyQueries.ts';
import styles from './CompanyLogo.module.scss';

interface CompanyLogoProps {
  logoId?: number;
  companyName: string;
}

export function CompanyLogo({ logoId, companyName }: Readonly<CompanyLogoProps>) {
  const imageQuery = useCompanyImageQuery(logoId);
  const imageData = imageQuery.data?.imgData;
  const hasImage = Boolean(imageData);

  if (!hasImage) {
    return null;
  }

  return (
    <img
      src={imageData}
      alt={`${companyName} logo`}
      width={128}
      height={128}
      loading={'lazy'}
      className={styles.companyLogo}
    />
  );
}
