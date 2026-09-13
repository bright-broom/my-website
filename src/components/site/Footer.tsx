import type { SiteProps } from '@/content/site';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Container, IconLink, TextLink } from '@/components/ui';
import { profileLinks } from '@/content/site';
import { profileIcons } from './icons';

export function Footer({ t }: SiteProps) {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col-reverse items-center justify-between gap-6 py-10 sm:flex-row">
        <p className="text-sm text-fg-subtle">{t.footer.copyright}</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {profileLinks.map((link) => (
              <IconLink key={link.icon} href={link.href} external aria-label={link.name}>
                <FontAwesomeIcon icon={profileIcons[link.icon]} />
              </IconLink>
            ))}
          </div>
          <TextLink href="#home" className="inline-flex items-center gap-2">
            {t.footer.backToTop}
            <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
          </TextLink>
        </div>
      </Container>
    </footer>
  );
}
