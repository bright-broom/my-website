import type { ReactNode } from 'react';

type SectionIntroProps = {
  eyebrow: string;
  heading: string;
  children?: ReactNode;
};

import { Eyebrow, Heading } from '@/components/ui';

export function SectionIntro({ eyebrow, heading, children }: SectionIntroProps) {
  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading className="mt-4">{heading}</Heading>
      {children}
    </div>
  );
}
