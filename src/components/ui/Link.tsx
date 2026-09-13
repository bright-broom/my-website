import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { focusRing } from './Button';

const textVariants = {
  nav: 'text-sm text-fg-muted hover:text-fg',
  menu: 'block py-3 text-2xl font-semibold tracking-tight text-fg hover:text-accent',
  subtle: 'text-sm text-fg-muted hover:text-fg',
  inline: 'text-fg underline decoration-border-strong underline-offset-4 hover:decoration-accent',
};

export function TextLink({
  variant = 'subtle',
  className,
  ...props
}: ComponentPropsWithoutRef<'a'> & { variant?: keyof typeof textVariants }) {
  return (
    <a
      className={cn('rounded-sm transition-colors duration-200', focusRing, textVariants[variant], className)}
      {...props}
    />
  );
}

export function IconLink({
  external = false,
  className,
  ...props
}: ComponentPropsWithoutRef<'a'> & { external?: boolean }) {
  return (
    <a
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-control text-lg text-fg-muted transition-colors duration-200 hover:bg-bg-subtle hover:text-fg',
        focusRing,
        className,
      )}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...props}
    />
  );
}
