import { cn } from '@/lib/cn';

export function Container({ as: Tag = 'div', className, ...props }) {
  return <Tag className={cn('mx-auto w-full max-w-content px-5 sm:px-8', className)} {...props} />;
}

const tones = {
  default: '',
  subtle: 'bg-bg-subtle',
};

export function Section({ id, tone = 'default', className, children }) {
  return (
    <section id={id} className={cn('border-t border-border py-24 md:py-32', tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}
