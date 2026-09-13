import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { focusRing } from './Button';

export function IconButton({ className, ...props }: ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-10 min-w-10 items-center justify-center rounded-control px-2 text-fg-muted transition-colors duration-200 hover:bg-bg-subtle hover:text-fg',
        focusRing,
        className,
      )}
      {...props}
    />
  );
}
