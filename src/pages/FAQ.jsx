import React from 'react';
import { useT } from '../context/LanguageContext';

export default function FAQ() {
  const { t } = useT();
  const faqs = [
    { q: t('faq_q1'), a: t('faq_a1') },
    { q: t('faq_q2'), a: t('faq_a2') },
    { q: t('faq_q3'), a: t('faq_a3') },
    { q: t('faq_q4'), a: t('faq_a4') },
    { q: t('faq_q5'), a: t('faq_a5') },
  ];

  return (
    <main className="main-content" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <section className="glass-panel" style={{ padding: '2.5rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>{t('faq_title')}</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>{t('faq_intro')}</p>

        <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {faqs.map((f, i) => (
            <div key={i} className="faq-item" style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '2rem' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.75rem', fontSize: '1.25rem' }}>
                <span style={{ marginRight: '0.5rem', opacity: 0.5 }}>Q:</span> {f.q}
              </h3>
              <p style={{ lineHeight: '1.7', color: 'rgba(255,255,255,0.85)', fontSize: '1rem' }}>
                <span style={{ marginRight: '0.5rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>A:</span> {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
