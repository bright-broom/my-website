import { useId } from 'react';
import { cn } from '@/lib/cn';

const control =
  'block w-full rounded-control border border-border bg-surface px-4 py-3 text-fg placeholder:text-fg-subtle transition-colors duration-200 hover:border-border-strong focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';

function Field({ label, className, children }) {
  return (
    <div className={className}>
      <label htmlFor={children.props.id} className="mb-2 block text-sm font-medium text-fg">
        {label}
      </label>
      {children}
    </div>
  );
}

export function Input({ label, className, ...props }) {
  const id = useId();
  return (
    <Field label={label} className={className}>
      <input id={id} className={control} {...props} />
    </Field>
  );
}

export function Textarea({ label, className, ...props }) {
  const id = useId();
  return (
    <Field label={label} className={className}>
      <textarea id={id} className={cn(control, 'resize-y')} {...props} />
    </Field>
  );
}
