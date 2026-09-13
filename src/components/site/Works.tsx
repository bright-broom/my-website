import type { SiteProps } from '@/content/site';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Card, Heading, Reveal, Section } from '@/components/ui';
import { SectionIntro } from './SectionIntro';

export function Works({ t }: SiteProps) {
  const { works } = t;

  return (
    <Section id="works">
      <Reveal>
        <SectionIntro eyebrow={works.eyebrow} heading={works.heading} />
      </Reveal>

      <ul className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
        {works.projects.map((project, index) => (
          <Reveal as="li" key={project.url} delay={index * 100}>
            <Card as="a" href={project.url} variant="interactive" className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-fg-subtle">{String(index + 1).padStart(2, '0')}</span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="-rotate-45 text-fg-subtle transition duration-300 ease-out-expo group-hover:rotate-0 group-hover:text-accent"
                />
              </div>
              <Heading variant="title" className="mt-12">
                {project.title}
              </Heading>
              <p className="mt-3 flex-1 text-fg-muted">{project.description}</p>
              <span className="mt-8 text-sm font-medium text-accent">{works.viewProject}</span>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
