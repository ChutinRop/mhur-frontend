import React from 'react';
import { useT } from '../context/LanguageContext';

export default function ContactUs() {
  const { t } = useT();
  return (
    <main className="main-content" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <section className="glass-panel" style={{ padding: '2rem' }}>
        <h1 style={{ marginBottom: '1.5rem' }}>{t('contact_title')}</h1>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>{t('contact_p1')}</p>
        
        <div style={{ background: 'var(--surface-hover)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid var(--surface-border)' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>{t('contact_email_label')}</h3>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            <a href={`mailto:${t('contact_email_val')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              {t('contact_email_val')}
            </a>
          </p>
        </div>

        <h3 style={{ marginBottom: '1rem' }}>{t('contact_socials_title')}</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{t('contact_socials_desc')}</p>
      </section>
    </main>
  );
}
