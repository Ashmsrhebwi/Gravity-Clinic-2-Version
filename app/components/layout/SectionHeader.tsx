import * as React from 'react';

import { cn } from '../ui/utils';

type SectionHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeader({ title, subtitle, align = 'center', className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === 'center' ? 'text-center' : 'text-left',
        'mb-12 md:mb-16',
        className,
      )}
    >
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-secondary">{title}</h2>
      {subtitle ? (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      ) : null}
    </div>
  );
}

