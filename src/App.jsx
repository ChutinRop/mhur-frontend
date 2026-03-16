// Deploy Build: v1.0.2 - Full Sync
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FiUser, FiDatabase, FiEdit, FiGlobe, FiLogOut, FiAlertTriangle, FiLifeBuoy } from 'react-icons/fi';
import { FaTwitch, FaYoutube, FaTiktok, FaDiscord } from 'react-icons/fa';
import clsx from 'clsx';
import TunerCreator from './pages/TunerCreator';
import Database from './pages/Database';
import Community from './pages/Community';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Toast, { showToast } from './components/UIFeedback/Toast';
import CustomModal from './components/UIFeedback/CustomModal';
import ReportModal from './components/UIFeedback/ReportModal';
import './App.css';

function Navigation() {
  const location = useLocation();
  const [username, setUsername] = useState(localStorage.getItem('mhur_username') || '');
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: () => {}, defaultValue: '' });
  const [showBanner, setShowBanner] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleSetName = () => {
    setModalConfig({
      isOpen: true,
      type: 'prompt',
      title: 'Identificación de Tunner',
      message: 'Introduce tu nombre para que tus builds sean reconocidas en la comunidad:',
      defaultValue: username,
      onConfirm: (name) => {
        if (name && name.trim() !== "") {
          const cleanName = name.trim();
          setUsername(cleanName);
          localStorage.setItem('mhur_username', cleanName);
          window.dispatchEvent(new Event('storage'));
          showToast(`¡Bienvenido, ${cleanName}!`, 'success');
        } else {
          showToast("El nombre no puede estar vacío", "error");
        }
      }
    });
  };

  const handleLogout = () => {
    setModalConfig({
      isOpen: true,
      type: 'confirm',
      title: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres cerrar sesión o cambiar de nombre?',
      onConfirm: () => {
        setUsername('');
        localStorage.removeItem('mhur_username');
        window.dispatchEvent(new Event('storage'));
        showToast("Sesión cerrada correctamente", "info");
      }
    });
  };

  const handleReportError = (e) => {
    e.preventDefault();
    setShowReportModal(true);
  };

  const submitReport = async (reportData) => {
    const formData = new FormData();
    formData.append('description', reportData.description);
    formData.append('username', username || 'Usuario Anónimo');
    
    if (reportData.image) {
      formData.append('image', reportData.image);
    }

    const API_URL = import.meta.env.VITE_API_URL || 'https://mhur-backend.onrender.com';
    
    const response = await fetch(`${API_URL}/api/reports`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error del servidor al enviar el reporte.');
    }

    showToast("¡Reporte enviado! Gracias por tu ayuda.", "success");
  };

  return (
    <>
      <CustomModal 
        {...modalConfig} 
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))} 
      />
      
      <ReportModal 
        isOpen={showReportModal} 
        onClose={() => setShowReportModal(false)}
        onSubmit={submitReport}
      />

      {/* ── Beta Banner ── */}
      {showBanner && (
        <div className="beta-banner">
          <span className="beta-banner-content">
            <FiAlertTriangle className="beta-banner-icon" />
            🚀 ESTAMOS EN BETA: Aún faltan agregar algunas imágenes de personajes. Si encuentras un error, por favor repórtalo.
          </span>
          <button 
            onClick={handleReportError}
            className="beta-report-btn"
          >
            <FiLifeBuoy /> REPORTAR ERROR
          </button>
          <button 
            onClick={() => setShowBanner(false)}
            className="beta-banner-close"
          >&times;</button>
        </div>
      )}

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
                MHUR Tunning <span className="header-subtitle">Chutunning</span>
              </h1>
              <span className="header-author">
                Hecho por ChutinRop
              </span>
            </div>

            <nav className="header-nav">
              <Link to="/" className={clsx('nav-link', location.pathname === '/' && 'active')}>
                <FiDatabase /> Tunnings
              </Link>
              <Link to="/creator" className={clsx('nav-link', location.pathname === '/creator' && 'active')}>
                <FiEdit /> Crear Tuning
              </Link>
              <Link to="/community" className={clsx('nav-link', location.pathname === '/community' && 'active')}>
                <FiGlobe /> Builds Públicas
              </Link>
            </nav>
          </div>

          {/* Lado derecho: login / identificación */}
          <div className="header-right">
            {username ? (
              <div className="user-status">
                <span className="user-greeting">
                  Hola, <strong className="user-name">{username}</strong>
                </span>
                <button 
                  className="logout-btn glass-panel" 
                  onClick={handleLogout}
                  title="Cambiar Nombre"
                >
                  <FiLogOut />
                </button>
              </div>
            ) : (
              <button 
                className="login-btn glass-panel" 
                onClick={handleSetName}
              >
                <FiUser /> Identificarse
              </button>
            )}
          </div>
        </header>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app-main-wrapper">
        {/* ── Full Width Hero ── */}
        <div className="app-hero-banner-full">
          <img
            src="/assets/Images/Banner Pagina.png"
            alt="MHUR Tuner Banner"
            className="app-hero-image-full"
          />
        </div>

        <Navigation />

        <div className="app-container">
          <Routes>
            <Route path="/" element={<Database />} />
            <Route path="/creator" element={<TunerCreator />} />
            <Route path="/community" element={<Community />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>

          <footer className="footer">
            <div className="footer-socials">
              <a href="https://www.twitch.tv/chutinrop" target="_blank" rel="noreferrer" className="social-link twitch"><FaTwitch /></a>
              <a href="https://www.youtube.com/@chutinrop" target="_blank" rel="noreferrer" className="social-link youtube"><FaYoutube /></a>
              <a href="https://www.tiktok.com/@chutinrop1" target="_blank" rel="noreferrer" className="social-link tiktok"><FaTiktok /></a>
              <a href="https://discord.com/invite/JdnGVhBtn4" target="_blank" rel="noreferrer" className="social-link discord"><FaDiscord /></a>
            </div>
            
            <div className="footer-links">
               <Link to="/privacy" className="footer-link">Política de Privacidad</Link>
            </div>
            <p className="footer-copyright">© 2026 MHUR Tunning - Hecho por ChutinRop. Todos los derechos reservados.</p>
          </footer>
          
          <Toast />
        </div>
      </div>
    </Router>
  );
}

export default App;
