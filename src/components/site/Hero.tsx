import type { SiteProps } from '@/content/site';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Button, Container, Eyebrow, Heading, IconLink } from '@/components/ui';
import { profileLinks } from '@/content/site';
import { profileIcons } from './icons';

function Terminal({ t }: SiteProps) {
  const lines = [
    ['whoami', 'toshiki-sakuta'],
    ['cat focus.txt', 'cloud / network / security'],
    ['echo $LOCATION', t.contact.location],
  ];

  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
      </div>
      <dl className="space-y-4 p-6 font-mono text-sm">
        {lines.map(([command, output]) => (
          <div key={command}>
            <dt className="text-fg-subtle">
              <span className="text-accent">$</span> {command}
            </dt>
            <dd className="mt-1 break-all text-fg">{output}</dd>
          </div>
        ))}
        <div aria-hidden="true" className="h-4 w-2 animate-pulse bg-accent" />
      </dl>
    </div>
  );
}

export function Hero({ t }: SiteProps) {
  return (
    <section id="home" className="pb-24 pt-36 md:pb-32 md:pt-48">
      <Container className="grid items-end gap-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Eyebrow className="flex animate-fade-up items-center gap-2 motion-reduce:animate-none">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t.hero.eyebrow}
          </Eyebrow>
          <Heading
            variant="display"
            className="mt-6 animate-fade-up motion-reduce:animate-none"
            style={{ animationDelay: '80ms' }}
          >
            {t.hero.name}
          </Heading>
          <p
            className="mt-8 max-w-2xl animate-fade-up text-lead text-fg-muted motion-reduce:animate-none"
            style={{ animationDelay: '160ms' }}
          >
            {t.hero.lead}
          </p>
          <div
            className="mt-10 flex animate-fade-up flex-col gap-6 motion-reduce:animate-none sm:flex-row sm:items-center sm:gap-4"
            style={{ animationDelay: '240ms' }}
          >
            <div className="flex flex-wrap gap-3">
              <Button as="a" href="#works" size="lg">
                {t.hero.primaryAction}
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
              </Button>
              <Button as="a" href="#contact" variant="secondary" size="lg">
                {t.hero.secondaryAction}
              </Button>
            </div>
            <div className="-ml-2.5 flex items-center gap-1 sm:ml-0">
              {profileLinks.map((link) => (
                <IconLink key={link.icon} href={link.href} external aria-label={link.name}>
                  <FontAwesomeIcon icon={profileIcons[link.icon]} />
                </IconLink>
              ))}
            </div>
          </div>
        </div>
        <div
          className="hidden animate-fade-up motion-reduce:animate-none lg:col-span-4 lg:block"
          style={{ animationDelay: '320ms' }}
        >
          <Terminal t={t} />
        </div>
      </Container>
    </section>
  );
}
