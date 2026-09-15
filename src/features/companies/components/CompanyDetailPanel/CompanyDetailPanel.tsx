import type { CompanyDetail } from '../../model/company.types.ts';
import type { CategoryColors } from '../../utils/categoryUtils.ts';
import { CompanyDetailContent } from './CompanyDetailContent/CompanyDetailContent.tsx';
import styles from './CompanyDetailPanel.module.scss';
import { LoadingOverlay } from '../../../../shared/components/LoadingOverlay/LoadingOverlay.tsx';

export interface CompanyDetailPanelProps {
  company?: CompanyDetail;
  categoryColors: CategoryColors;
  onClose: () => void;
  isOpen: boolean;
  isLoading?: boolean;
}

export function CompanyDetailPanel({
  company,
  categoryColors,
  onClose,
  isOpen,
  isLoading = false,
}: Readonly<CompanyDetailPanelProps>) {
  if (!isOpen) {
    return null;
  }

  let content = <LoadingOverlay label="Načítání detailu společnosti" />;

  if (company) {
    content = (
      <CompanyDetailContent company={company} categoryColors={categoryColors} onClose={onClose} />
    );
  } else if (!isLoading) {
    content = <p className="emptyState">Žádné údaje o společnosti</p>;
  }

  return (
    <aside className={styles.panel} aria-label="Detail společnosti" aria-busy={isLoading}>
      {content}
    </aside>
  );
}
