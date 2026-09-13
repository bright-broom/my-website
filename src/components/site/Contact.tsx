import type { SiteProps } from '@/content/site';
import { Button, Card, Eyebrow, Input, Reveal, Section, TextLink, Textarea } from '@/components/ui';
import { profileLinks } from '@/content/site';
import { SectionIntro } from './SectionIntro';

export function Contact({ t }: SiteProps) {
  const { contact } = t;
  const details = [
    { label: contact.locationLabel, value: contact.location },
    {
      label: contact.linksLabel,
      value: (
        <span className="flex flex-wrap gap-x-5 gap-y-1">
          {profileLinks.map((link) => (
            <TextLink key={link.icon} variant="inline" href={link.href} target="_blank" rel="noopener noreferrer">
              {link.name}
            </TextLink>
          ))}
        </span>
      ),
    },
  ];

  return (
    <Section id="contact" tone="subtle">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionIntro eyebrow={contact.eyebrow} heading={contact.heading}>
            <p className="mt-6 max-w-md text-lead text-fg-muted">{contact.lead}</p>
          </SectionIntro>
          <dl className="mt-10 space-y-5">
            {details.map(({ label, value }) => (
              <div key={label}>
                <Eyebrow as="dt">{label}</Eyebrow>
                <dd className="mt-1 text-fg">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-7">
          <Card as="form" className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label={contact.form.name} name="name" autoComplete="name" />
              <Input label={contact.form.email} name="email" type="email" autoComplete="email" />
            </div>
            <Textarea label={contact.form.message} name="message" rows={6} />
            <Button type="submit" size="lg" block>
              {contact.form.submit}
            </Button>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
