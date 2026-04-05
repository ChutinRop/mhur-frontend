import React from 'react';
import { useT } from '../context/LanguageContext';

export default function PrivacyPolicy() {
  const { t } = useT();
  return (
    <main className="main-content" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <section className="glass-panel" style={{ padding: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>{t('privacy_title')}</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{t('privacy_updated')}</p>

        <p dangerouslySetInnerHTML={{ __html: t('privacy_intro') }} style={{ marginBottom: '1.5rem', lineHeight: '1.6' }} />

        <h2 style={{ marginTop: '2rem', fontSize: '1.2rem', color: 'var(--primary)' }}>{t('privacy_s1_title')}</h2>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>{t('privacy_s1')}</p>

        <h2 style={{ marginTop: '2rem', fontSize: '1.2rem', color: 'var(--primary)' }}>{t('privacy_s2_title')}</h2>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>{t('privacy_s2')}</p>

        <h2 style={{ marginTop: '2rem', fontSize: '1.2rem', color: 'var(--primary)' }}>{t('privacy_s3_title')}</h2>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>{t('privacy_s3')}</p>

        <h2 style={{ marginTop: '2rem', fontSize: '1.2rem', color: 'var(--primary)' }}>{t('privacy_s4_title')}</h2>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>{t('privacy_s4')}</p>

        <h2 style={{ marginTop: '2rem', fontSize: '1.2rem', color: 'var(--primary)' }}>{t('privacy_s5_title')}</h2>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>{t('privacy_s5')}</p>
      </section>
    </main>
  );
}
