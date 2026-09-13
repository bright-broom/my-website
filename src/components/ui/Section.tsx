import { createElement, type ComponentPropsWithoutRef } from 'react';
import type { PolymorphicProps } from './types';
import { cn } from '@/lib/cn';

export function Container<T extends 'div' | 'ul' = 'div'>({ as, className, ...props }: PolymorphicProps<T>) {
  const Tag = as ?? 'div';
  return createElement(Tag, { ...props, className: cn('mx-auto w-full max-w-content px-5 sm:px-8', className) });
}

const tones = {
  default: '',
  subtle: 'bg-bg-subtle',
};

export function Section({
  id,
  tone = 'default',
  className,
  children,
}: Pick<ComponentPropsWithoutRef<'section'>, 'id' | 'className' | 'children'> & { tone?: keyof typeof tones }) {
  return (
    <section id={id} className={cn('border-t border-border py-24 md:py-32', tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}
