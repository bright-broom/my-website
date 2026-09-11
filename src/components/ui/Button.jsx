import { cn } from '@/lib/cn';

const variants = {
  primary: 'bg-accent text-accent-fg hover:bg-accent-hover',
  secondary: 'border border-border-strong bg-surface text-fg hover:border-fg',
};

const sizes = {
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg';

export function Button({ as: Tag = 'button', variant = 'primary', size = 'md', block = false, className, ...props }) {
  return (
    <Tag
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors duration-200',
        focusRing,
        variants[variant],
        sizes[size],
        block && 'w-full',
        className,
      )}
      {...props}
    />
  );
}
