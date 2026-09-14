import type { ReactNode } from 'react';
import type { CompanyState } from '../../api/companyApi.types.ts';
import { getCompanyStateLabel } from '../../constants/companyLabels.ts';
import styles from './CompanyState.module.scss';

const stateClasses: Record<CompanyState, string> = {
  A_POTENTIAL: styles['companyState--potential'],
  B_ACTUAL: styles['companyState--actual'],
  C_DEFERRED: styles['companyState--deferred'],
  D_UNATTRACTIVE: styles['companyState--uninteresting'],
};

export interface CompanyStateProps {
  state: CompanyState;
  suffix?: ReactNode;
}

export function CompanyState({ state, suffix }: Readonly<CompanyStateProps>) {
  return (
    <span className={stateClasses[state]}>
      {getCompanyStateLabel(state)}
      {suffix ? <> {suffix}</> : null}
    </span>
  );
}
