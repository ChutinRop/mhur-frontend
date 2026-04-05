// Deploy Build: v1.0.2 - Full Sync
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import { FiUser, FiDatabase, FiEdit, FiGlobe, FiLogOut, FiAlertTriangle, FiLifeBuoy, FiGift } from 'react-icons/fi';
import { FaTwitch, FaYoutube, FaTiktok, FaDiscord } from 'react-icons/fa';
import clsx from 'clsx';
import TunerCreator from './pages/TunerCreator';
import Database from './pages/Database';
import Community from './pages/Community';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import TermsOfService from './pages/TermsOfService';
import Toast, { showToast } from './components/UIFeedback/Toast';
import CustomModal from './components/UIFeedback/CustomModal';
import ReportModal from './components/UIFeedback/ReportModal';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { LanguageProvider, useT } from './context/LanguageContext';
import { useContext } from 'react';
import AuthCallback from './pages/AuthCallback';
import Profile from './pages/Profile';
import './App.css';

function LangDropdown() {
  const { lang, setLang } = useT();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const LANGUAGES = [
    { code: 'es', label: 'Espa\u00f1ol', native: 'ES' },
    { code: 'en', label: 'English',  native: 'EN' },
  ];

  // Close on outside click
  useEffect(() => {
    const onOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  const current   = LANGUAGES.find(l => l.code === lang);
  const menuLabel = lang === 'es' ? 'Idioma' : 'Language';

  return (
    <div className="lang-dropdown-wrapper" ref={wrapperRef}>
      <button
        id="lang-dropdown-btn"
        className={`lang-dropdown-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={menuLabel}
      >
        <span className="lang-trigger-badge">{current?.native}</span>
        <span className="lang-trigger-label">{menuLabel}</span>
        <span className={`lang-chevron ${open ? 'up' : ''}`} aria-hidden>&#9660;</span>
      </button>

      {open && (
        <div className="lang-dropdown-menu" role="listbox">
          {LANGUAGES.map(({ code, native, label }) => (
            <button
              key={code}
              role="option"
              aria-selected={lang === code}
              className={`lang-dropdown-item ${lang === code ? 'selected' : ''}`}
              onClick={() => { setLang(code); setOpen(false); }}
            >
              <span className="lang-item-code">{native}</span>
              <span className="lang-item-label">{label}</span>
              {lang === code && <span className="lang-item-check" aria-hidden>&#10003;</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Navigation({ handleLogout, setShowReportModal }) {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { t, lang, setLang } = useT();
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: () => {}, defaultValue: '' });

  const handleDiscordLogin = () => {
    const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID || '1355403297126154331';
    const REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI || 'http://localhost:5173/auth/callback';
    const DISCORD_LOGIN_URL = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=identify`;
    window.location.href = DISCORD_LOGIN_URL;
  };

  return (
    <>
      <CustomModal 
        {...modalConfig} 
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))} 
      />
      
      {/* ── Header ── */}
      <div className="top-nav-wrapper">
        <header className="header glass-panel">
          {/* Lado izquierdo: logo + título + nav */}
          <div className="header-left">
            <img
              src="/assets/Images/Logo pagina.png"
              alt="MHUR Tuner Logo"
              className="header-logo"
            />

            <div className="header-title-container">
              <h1 className="header-title">
                MHUR Tunning
              </h1>
              <span className="header-author">
                {t('header_author')}
              </span>
            </div>

            <nav className="header-nav">
              <Link to="/" className={clsx('nav-link', location.pathname === '/' && 'active')}>
                <FiDatabase /> {t('nav_tunnings')}
              </Link>
              <Link to="/creator" className={clsx('nav-link', location.pathname === '/creator' && 'active')}>
                <FiEdit /> {t('nav_creator')}
              </Link>
              <Link to="/community" className={clsx('nav-link', location.pathname === '/community' && 'active')}>
                <FiGlobe /> {t('nav_community')}
              </Link>
            </nav>
          </div>

          {/* Lado derecho: idioma + soporte + login */}
          <div className="header-right">
            {/* ── Language Dropdown ── */}
            <LangDropdown />

            <button 
              className="report-btn glass-panel"
              onClick={() => setShowReportModal(true)}
              title={t('nav_report')}
            >
              <FiLifeBuoy />
              <span>{t('nav_report')}</span>
            </button>

            <a 
              href="https://ko-fi.com/chutinrop" 
              target="_blank" 
              rel="noreferrer" 
              className="support-btn glass-panel"
              title={t('nav_support')}
            >
              <FiGift />
              <span>{t('nav_support')}</span>
            </a>

            {user ? (
              <div className="user-status">
                <Link to="/profile" className="user-profile-btn" title={t('nav_profile_title')}>
                  <img src={user.avatar} alt="Avatar" className="user-profile-avatar" />
                  <span className="user-name">
                    {user.username.length > 12 ? user.username.slice(0, 12) + '...' : user.username}
                  </span>
                </Link>
                <button 
                  className="logout-btn glass-panel" 
                  onClick={handleLogout}
                  title={t('nav_logout_title')}
                >
                  <FiLogOut />
                </button>
              </div>
            ) : (
              <button 
                className="login-btn glass-panel discord-btn" 
                onClick={handleDiscordLogin}
                style={{ backgroundColor: '#5865F2', borderColor: '#5865F2' }}
              >
                <FaDiscord /> {t('nav_login')}
              </button>
            )}
          </div>
        </header>
      </div>
    </>
  );
}

function MainApp() {
  const { user, logout } = useContext(AuthContext);
  const { t } = useT();
  const [showReportModal, setShowReportModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: () => {}, defaultValue: '' });

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setTimeout(() => {
        showToast(t('mobile_warning'), "info", 8000);
      }, 1500);
    }
  }, []);

  const handleLogout = () => {
    setModalConfig({
      isOpen: true,
      type: 'confirm',
      title: t('logout_title'),
      message: t('logout_message'),
      onConfirm: () => {
        logout();
        showToast(t('logout_toast'), "info");
      }
    });
  };

  const submitReport = async (reportData) => {
    const formData = new FormData();
    formData.append('description', reportData.description);
    formData.append('username', user ? user.username : 'Usuario Anónimo');
    
    if (reportData.image) {
      formData.append('image', reportData.image);
    }

    const API_URL = import.meta.env.VITE_API_URL || 'https://mhur-backend.onrender.com';
    
    try {
      const response = await fetch(`${API_URL}/api/reports`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || t('report_error_send'));
      }

      showToast(t('report_success'), "success");
      setShowReportModal(false);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <Router>
      <div className="app-main-wrapper">
        <CustomModal 
          {...modalConfig} 
          onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))} 
        />
        
        <ReportModal 
          isOpen={showReportModal} 
          onClose={() => setShowReportModal(false)}
          onSubmit={submitReport}
        />

        {/* ── Full Width Hero ── */}
        <div className="app-hero-banner-full">
          <img
            src="/assets/Images/Banner Pagina.png"
            alt="MHUR Tuner Banner"
            className="app-hero-image-full"
          />
        </div>

        <Navigation handleLogout={handleLogout} setShowReportModal={setShowReportModal} />

        <div className="app-container">
            <Routes>
              <Route path="/" element={<Database />} />
              <Route path="/creator" element={<TunerCreator />} />
              <Route path="/community" element={<Community />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>

          <footer className="footer">
            <div className="footer-socials">
              <a href="https://www.twitch.tv/chutinrop" target="_blank" rel="noreferrer" className="social-link twitch"><FaTwitch /></a>
              <a href="https://www.youtube.com/@chutinrop" target="_blank" rel="noreferrer" className="social-link youtube"><FaYoutube /></a>
              <a href="https://www.tiktok.com/@chutinrop1" target="_blank" rel="noreferrer" className="social-link tiktok"><FaTiktok /></a>
              <a href="https://discord.com/invite/JdnGVhBtn4" target="_blank" rel="noreferrer" className="social-link discord"><FaDiscord /></a>
            </div>
            
            <div className="footer-links" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
               <Link to="/about" className="footer-link">{t('footer_about')}</Link>
               <Link to="/contact" className="footer-link">{t('footer_contact')}</Link>
               <Link to="/privacy" className="footer-link">{t('footer_privacy')}</Link>
               <Link to="/terms" className="footer-link">{t('footer_terms')}</Link>
            </div>
            <p className="footer-copyright">{t('footer_copyright')}</p>
            <p className="footer-disclaimer" style={{ 
              fontSize: '0.7rem', 
              color: 'rgba(255,255,255,0.3)', 
              maxWidth: '800px', 
              margin: '10px auto 0',
              lineHeight: '1.4'
            }}>
              {t('footer_disclaimer')}
            </p>
          </footer>
          
          <Toast />
          <Analytics />


        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
