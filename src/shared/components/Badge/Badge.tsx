import type { ReactNode } from 'react';
import styles from './Badge.module.scss';

export interface BadgeProps {
  children: ReactNode;
  color?: string | null;
}

export function Badge({ children, color }: Readonly<BadgeProps>) {
  return (
    <span className={styles.badge} style={{ backgroundColor: color ? `#${color}` : undefined }}>
      {children}
    </span>
  );
}
