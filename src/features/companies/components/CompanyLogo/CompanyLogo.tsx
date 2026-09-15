import { useFileImageQuery } from '../../../../shared/hooks/useFileImageQuery.ts';
import placeholderImage from '../../../../assets/img/company-placeholder.svg';
import styles from './CompanyLogo.module.scss';

interface CompanyLogoProps {
  logoId?: number;
  companyName: string;
}

export function CompanyLogo({ logoId, companyName }: Readonly<CompanyLogoProps>) {
  const imageQuery = useFileImageQuery(logoId);
  const imageData = imageQuery.data?.imgData;

  return (
    <img
      src={imageData ?? placeholderImage}
      alt={`${companyName} logo`}
      width={128}
      height={128}
      loading="eager"
      className={styles.companyLogo}
    />
  );
}
