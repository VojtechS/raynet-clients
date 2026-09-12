import type { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  color?: string | null;
}

export function Badge({ children, color }: Readonly<BadgeProps>) {
  return <span style={{ backgroundColor: color ? `#${color}` : undefined }}>{children}</span>;
}
