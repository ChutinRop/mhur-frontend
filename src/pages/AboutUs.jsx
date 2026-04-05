import React from 'react';
import { useT } from '../context/LanguageContext';

export default function AboutUs() {
  const { t } = useT();
  return (
    <main className="main-content" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <section className="glass-panel" style={{ padding: '2rem' }}>
        <h1 style={{ marginBottom: '1.5rem' }}>{t('about_title')}</h1>
        <p style={{ marginBottom: '1.2rem', lineHeight: '1.6' }}>{t('about_p1')}</p>
        <p style={{ marginBottom: '1.2rem', lineHeight: '1.6' }}>{t('about_p2')}</p>
        <p style={{ marginBottom: '1.2rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>{t('about_p3')}</p>
      </section>
    </main>
  );
}
