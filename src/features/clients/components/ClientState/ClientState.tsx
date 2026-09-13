import type { ReactNode } from 'react';
import type { CompanyState } from '../../api/companyApi.types.ts';
import { getClientStateLabel } from '../../constants/clientLabels.ts';
import styles from './ClientState.module.scss';

const stateClasses: Record<CompanyState, string> = {
  A_POTENTIAL: styles['clientState--potential'],
  B_ACTUAL: styles['clientState--actual'],
  C_DEFERRED: styles['clientState--deferred'],
  D_UNATTRACTIVE: styles['clientState--uninteresting'],
};

export interface ClientStateProps {
  state: CompanyState;
  suffix?: ReactNode;
}

export function ClientState({ state, suffix }: Readonly<ClientStateProps>) {
  return (
    <span className={stateClasses[state]}>
      {getClientStateLabel(state)}
      {suffix ? <> {suffix}</> : null}
    </span>
  );
}
