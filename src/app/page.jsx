"use client";
import { useEffect, useState } from 'react';
import { Header } from '@/components/site/Header';
import { Hero } from '@/components/site/Hero';
import { About } from '@/components/site/About';
import { Works } from '@/components/site/Works';
import { Contact } from '@/components/site/Contact';
import { Footer } from '@/components/site/Footer';
import { translations } from '@/content/site';

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export default function MainComponent() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    if (readStorage('language') === 'ja') setLanguage('ja');
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    writeStorage('theme', next);
    setTheme(next);
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'ja' : 'en';
    writeStorage('language', next);
    setLanguage(next);
  };

  return (
    <>
      <Header t={t} theme={theme} onToggleTheme={toggleTheme} onToggleLanguage={toggleLanguage} />
      <main>
        <Hero t={t} />
        <About t={t} />
        <Works t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
