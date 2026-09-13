import type { ElementType } from 'react';
import type { PolymorphicProps } from './types';
import { cn } from '@/lib/cn';

const variants = {
  display: { tag: 'h1', className: 'text-display font-semibold text-fg' },
  section: { tag: 'h2', className: 'text-heading font-semibold text-fg' },
  title: { tag: 'h3', className: 'text-title font-semibold text-fg' },
} as const;

export function Heading({
  variant = 'section',
  as,
  className,
  ...props
}: PolymorphicProps<'h1' | 'h2' | 'h3', { variant?: keyof typeof variants }>) {
  const { tag, className: variantClassName } = variants[variant];
  const Tag = as ?? tag;
  return <Tag className={cn(variantClassName, className)} {...props} />;
}

export function Eyebrow<T extends 'p' | 'h3' | 'dt' = 'p'>({ as, className, ...props }: PolymorphicProps<T>) {
  const Tag: ElementType = as ?? 'p';
  return <Tag className={cn('font-mono text-label uppercase text-fg-subtle', className)} {...props} />;
}
