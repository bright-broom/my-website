import { cn } from '@/lib/cn';

export function Tag({ className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-sm text-fg-muted',
        className,
      )}
      {...props}
    />
  );
}
