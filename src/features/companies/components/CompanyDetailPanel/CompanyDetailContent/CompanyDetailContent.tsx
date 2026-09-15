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
  const categoryColor = company.category ? categoryColors.get(company.category.id) : undefined;
  const companyLogoId = company.logo?.id;
  const companyName = checkValue(company.name);
  const companyState = company.state;
  const notice = company.notice;
  const ownerFullName = checkValue(company.owner?.fullName);
  const primaryAddress = company.primaryAddress;
  const regNumber = checkValue(company.regNumber);
  const role = getCompanyRoleLabel(company.role);

  return (
    <div className={styles.CompanyDetailContent}>
      <header>
        <div className={styles.CompanyDetailContent__top}>
          {category && <Badge color={categoryColor}>{category}</Badge>}

          <div className={styles.CompanyDetailContent__state}>
            <strong>
              <CompanyState state={companyState} suffix={checkValue(role)} />
            </strong>
          </div>

          <button
            type="button"
            className={styles.CompanyDetailContent__closeButton}
            onClick={onClose}
            aria-label="Zavřít detail společnosti"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <h2 className={styles.CompanyDetailContent__title}>{companyName}</h2>
      </header>

      <div className={styles.CompanyDetailContent__content}>
        <div className={styles.CompanyDetailContent__logo}>
          <CompanyLogo logoId={companyLogoId} companyName={companyName} />
        </div>

        <div className={styles.CompanyDetailContent__info}>
          <p className={styles.CompanyDetailContent__text}>IČ: {regNumber}</p>

          <div className={styles.CompanyDetailContent__text}>
            <CompanyAddress contactAddress={primaryAddress} />
          </div>

          <CompanyMapLink address={addressUtils(primaryAddress)} />
        </div>
      </div>

      {notice && (
        <div
          className={styles.CompanyDetailContent__text}
          dangerouslySetInnerHTML={{ __html: notice }}
        />
      )}

      <p className={styles.CompanyDetailContent__text}>
        Vlastník: <strong>{ownerFullName}</strong>
      </p>
    </div>
  );
}
