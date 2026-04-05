import React from 'react';
import { useT } from '../context/LanguageContext';
import { FaYoutube, FaTwitch, FaCode, FaVideo, FaTools, FaGamepad } from 'react-icons/fa';

export default function AboutUs() {
  const { t } = useT();
  
  const sections = [
    { title: t('about_creator_title'), icon: <FaGamepad />, text: t('about_creator_p'), color: '#5865F2' },
    { title: t('about_editor_title'), icon: <FaVideo />, text: t('about_editor_p'), color: '#ef4444' },
    { title: t('about_modder_title'), icon: <FaTools />, text: t('about_modder_p'), color: '#eab308' },
    { title: t('about_dev_title'), icon: <FaCode />, text: t('about_dev_p'), color: '#3b82f6' },
  ];

  return (
    <main className="main-content" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <section className="glass-panel" style={{ padding: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('about_title')}</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            {t('about_intro')}
          </p>
        </div>

        <div className="about-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '2rem',
          marginBottom: '3.5rem'
        }}>
          {sections.map((s, i) => (
            <div key={i} className="about-card" style={{ 
              background: 'rgba(255,255,255,0.03)', 
              padding: '2rem', 
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'flex-start'
            }}>
              <div style={{ 
                fontSize: '2rem', 
                color: s.color, 
                background: `${s.color}15`, 
                padding: '1rem', 
                borderRadius: '15px' 
              }}>
                {s.icon}
              </div>
              <div>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.3rem' }}>{s.title}</h3>
                <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '1.5rem', 
          justifyContent: 'center', 
          borderTop: '1px solid var(--surface-border)', 
          paddingTop: '3rem',
          flexWrap: 'wrap'
        }}>
          <a href="https://www.youtube.com/@chutinrop" target="_blank" rel="noreferrer" className="social-cta youtube" style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', 
            background: '#ff0000', color: 'white', borderRadius: '50px', fontWeight: 'bold', 
            textDecoration: 'none', transition: 'transform 0.2s'
          }}>
            <FaYoutube fontSize="1.5rem" /> {t('about_social_yt')}
          </a>
          <a href="https://www.twitch.tv/chutinrop" target="_blank" rel="noreferrer" className="social-cta twitch" style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', 
            background: '#9146FF', color: 'white', borderRadius: '50px', fontWeight: 'bold', 
            textDecoration: 'none'
          }}>
            <FaTwitch fontSize="1.5rem" /> {t('about_social_twitch')}
          </a>
        </div>
      </section>
    </main>
  );
}
