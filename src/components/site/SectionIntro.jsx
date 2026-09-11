import { Eyebrow, Heading } from '@/components/ui';

export function SectionIntro({ eyebrow, heading, children }) {
  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading className="mt-4">{heading}</Heading>
      {children}
    </div>
  );
}
