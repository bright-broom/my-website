import { Button, Card, Input, Reveal, Section, TextLink, Textarea } from '@/components/ui';
import { contactDetails } from '@/content/site';
import { SectionIntro } from './SectionIntro';

export function Contact({ t }) {
  const { contact } = t;
  const details = [
    {
      label: contact.emailLabel,
      value: (
        <TextLink variant="inline" href={`mailto:${contactDetails.email}`}>
          {contactDetails.email}
        </TextLink>
      ),
    },
    {
      label: contact.phoneLabel,
      value: (
        <TextLink variant="inline" href={`tel:${contactDetails.phone.replace(/[^+\d]/g, '')}`}>
          {contactDetails.phone}
        </TextLink>
      ),
    },
    { label: contact.locationLabel, value: contact.location },
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
                <dt className="font-mono text-label uppercase text-fg-subtle">{label}</dt>
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
