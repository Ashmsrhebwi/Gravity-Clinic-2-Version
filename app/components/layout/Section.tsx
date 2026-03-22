import * as React from 'react';

import { cn } from '../ui/utils';

type SectionProps = React.ComponentProps<'section'> & {
  tone?: 'default' | 'muted' | 'subtle' | 'dark';
  containerClassName?: string;
};

export function Section({
  className,
  containerClassName,
  tone = 'default',
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'py-16 md:py-24',
        tone === 'muted' && 'bg-muted/50',
        tone === 'subtle' && 'bg-muted/20',
        tone === 'dark' && 'bg-secondary text-white',
        className,
      )}
      {...props}
    >
      <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', containerClassName)}>
        {children}
      </div>
    </section>
  );
}

