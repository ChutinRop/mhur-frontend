import React from 'react';
import { useT } from '../context/LanguageContext';

export default function TermsOfService() {
  const { t } = useT();
  return (
    <main className="main-content" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <section className="glass-panel" style={{ padding: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>{t('terms_title')}</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{t('terms_updated')}</p>

        <h2 style={{ marginTop: '2rem', fontSize: '1.2rem', color: 'var(--primary)' }}>{t('terms_s1_title')}</h2>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>{t('terms_s1')}</p>

        <h2 style={{ marginTop: '2rem', fontSize: '1.2rem', color: 'var(--primary)' }}>{t('terms_s2_title')}</h2>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>{t('terms_s2')}</p>

        <h2 style={{ marginTop: '2rem', fontSize: '1.2rem', color: 'var(--primary)' }}>{t('terms_s3_title')}</h2>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>{t('terms_s3')}</p>

        <h2 style={{ marginTop: '2rem', fontSize: '1.2rem', color: 'var(--primary)' }}>{t('terms_s4_title')}</h2>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>{t('terms_s4')}</p>
      </section>
    </main>
  );
}
