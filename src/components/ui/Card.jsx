import { cn } from '@/lib/cn';
import { focusRing } from './Button';

const variants = {
  static: '',
  interactive: cn(
    'group transition duration-300 ease-out-expo hover:-translate-y-1 hover:border-border-strong hover:shadow-card',
    focusRing,
  ),
};

export function Card({ as: Tag = 'div', variant = 'static', className, ...props }) {
  return (
    <Tag
      className={cn('block rounded-card border border-border bg-surface p-6 md:p-8', variants[variant], className)}
      {...props}
    />
  );
}
