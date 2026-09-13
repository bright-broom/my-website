import type { SiteProps } from '@/content/site';
import { Eyebrow, Reveal, Section, Tag } from '@/components/ui';
import { SectionIntro } from './SectionIntro';

export function About({ t }: SiteProps) {
  const { about } = t;

  return (
    <Section id="about" tone="subtle">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <SectionIntro eyebrow={about.eyebrow} heading={about.heading} />
        </Reveal>

        <div className="lg:col-span-8">
          <Reveal className="max-w-3xl space-y-6 text-lead text-fg-muted">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={100} className="mt-12">
            <Eyebrow as="h3">{about.skillsLabel}</Eyebrow>
            <ul className="mt-4 flex flex-wrap gap-2">
              {about.skills.map((skill) => (
                <li key={skill}>
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200} className="mt-12">
            <Eyebrow as="h3">{about.timelineLabel}</Eyebrow>
            <ol className="mt-4 border-t border-border">
              {about.timeline.map((step, index) => (
                <li
                  key={step.label}
                  className="grid gap-1 border-b border-border py-4 sm:grid-cols-[3rem_14rem_1fr] sm:gap-4"
                >
                  <span className="hidden font-mono text-sm text-fg-subtle sm:block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-medium text-fg">{step.label}</span>
                  <span className="text-fg-muted">{step.text}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
