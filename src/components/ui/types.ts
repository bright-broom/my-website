import type { ComponentPropsWithoutRef, ElementType } from 'react';

/** Keep native attributes and event handlers tied to the chosen HTML element. */
export type PolymorphicProps<T extends ElementType, Props = object> = Props & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof Props | 'as'>;
