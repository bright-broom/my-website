import { cn } from '@/lib/cn';

const variants = {
  display: { tag: 'h1', className: 'text-display font-semibold text-fg' },
  section: { tag: 'h2', className: 'text-heading font-semibold text-fg' },
  title: { tag: 'h3', className: 'text-title font-semibold text-fg' },
};

export function Heading({ variant = 'section', as, className, ...props }) {
  const { tag, className: variantClassName } = variants[variant];
  const Tag = as ?? tag;
  return <Tag className={cn(variantClassName, className)} {...props} />;
}

export function Eyebrow({ as: Tag = 'p', className, ...props }) {
  return <Tag className={cn('font-mono text-label uppercase text-fg-subtle', className)} {...props} />;
}
