import { Button, Card, Input, Reveal, TextLink } from '@/components/ui';

<Button as="a" href="#works" size="lg" />;
<Button type="submit" onClick={(event) => event.currentTarget.disabled} />;
<Card as="form" onSubmit={(event) => event.preventDefault()} />;
<Input label="Name" autoComplete="name" />;
<Reveal as="li" delay={100} />;

// @ts-expect-error A button cannot accept an anchor's href without as="a".
<Button href="#works" />;
// @ts-expect-error Only defined design variants are supported.
<Button variant="unknown" />;
// @ts-expect-error Form events belong to forms, not a div's action attribute.
<Card action="/submit" />;
// @ts-expect-error Fields require a visible label.
<Input />;
// @ts-expect-error Links do not have a disabled property.
<TextLink disabled />;
