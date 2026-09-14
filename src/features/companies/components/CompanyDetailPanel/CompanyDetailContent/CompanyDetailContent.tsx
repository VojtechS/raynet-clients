import { X } from 'lucide-react';
import { CompanyLogo } from '../../CompanyLogo/CompanyLogo.tsx';
import type { CompanyDetail } from '../../../model/company.types.ts';
import type { CategoryColors } from '../../../utils/categoryUtils.ts';
import { checkValue } from '../../../../../shared/utils/checkValue.ts';
import { addressUtils } from '../../../utils/addressUtils.ts';
import { Badge } from '../../../../../shared/components/Badge/Badge.tsx';
import { CompanyAddress } from '../../CompanyAddress/CompanyAddress.tsx';
import styles from './CompanyDetailContent.module.scss';
import { getCompanyRoleLabel } from '../../../constants/companyLabels.ts';
import { CompanyState } from '../../CompanyState/CompanyState.tsx';
import { CompanyMapLink } from '../../CompanyMapLink/CompanyMapLink.tsx';

interface CompanyDetailContentProps {
  company: CompanyDetail;
  categoryColors: CategoryColors;
  onClose: () => void;
}

export function CompanyDetailContent({
  company,
  categoryColors,
  onClose,
}: Readonly<CompanyDetailContentProps>) {
  const category = company.category?.value;
  const companyName = checkValue(company.name);
  const role = getCompanyRoleLabel(company.role);
  const addressText = addressUtils(company.primaryAddress);
  const categoryColor = company.category ? categoryColors.get(company.category.id) : undefined;

  return (
    <>
      <header>
        <div className={styles.top}>
          {category && <Badge color={categoryColor}>{category}</Badge>}
          <div className={styles.state}>
            <strong>
              <CompanyState state={company.state} suffix={checkValue(role)} />
            </strong>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Zavřít detail společnosti"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <h2 className={styles.title}>{companyName}</h2>
      </header>

      <div className={styles.content}>
        <div className={styles.logo}>
          <CompanyLogo logoId={company.logo?.id} companyName={companyName} />
        </div>
        <div>
          <p className={styles.text}>IČO: {checkValue(company.regNumber)}</p>
          <div className={styles.text}>
            <CompanyAddress contactAddress={company.primaryAddress} />
          </div>
          <CompanyMapLink address={addressText} />
        </div>
      </div>

      {company.notice && (
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: company.notice }} />
      )}
      <p className={styles.text}>
        Vlastník: <strong>{checkValue(company.owner?.fullName)}</strong>
      </p>
    </>
  );
}
