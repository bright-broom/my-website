import type { SiteProps, Theme } from '@/content/site';

type HeaderProps = SiteProps & {
  theme: Theme;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
};

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import { Container, IconButton, TextLink, focusRing } from '@/components/ui';
import { cn } from '@/lib/cn';
import { navItems } from '@/content/site';

function Toggles({ t, theme, onToggleTheme, onToggleLanguage }: HeaderProps) {
  return (
    <div className="flex items-center gap-1">
      <IconButton onClick={onToggleLanguage} className="font-mono text-label">
        {t.switchLanguage}
      </IconButton>
      <IconButton onClick={onToggleTheme} aria-label={t.toggleTheme}>
        <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
      </IconButton>
    </div>
  );
}

export function Header({ t, ...toggleProps }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-20 border-b backdrop-blur-md transition-colors duration-300',
        isMenuOpen ? 'border-border bg-bg' : isScrolled ? 'border-border bg-bg/85' : 'border-transparent bg-bg/0',
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className={cn('flex items-center gap-2 rounded-sm font-semibold tracking-tight', focusRing)}>
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-accent" />
          Toshiki Sakuta
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item}>
                <TextLink variant="nav" href={`#${item}`}>
                  {t.nav[item]}
                </TextLink>
              </li>
            ))}
          </ul>
          <Toggles t={t} {...toggleProps} />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <Toggles t={t} {...toggleProps} />
          <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={t.toggleMenu} aria-expanded={isMenuOpen}>
            <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
          </IconButton>
        </div>
      </Container>

      {isMenuOpen && (
        <nav className="border-t border-border md:hidden">
          <Container as="ul" className="py-4">
            {navItems.map((item) => (
              <li key={item}>
                <TextLink variant="menu" href={`#${item}`} onClick={closeMenu}>
                  {t.nav[item]}
                </TextLink>
              </li>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
