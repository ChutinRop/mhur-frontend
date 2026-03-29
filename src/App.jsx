// Deploy Build: v1.0.2 - Full Sync
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import { FiUser, FiDatabase, FiEdit, FiGlobe, FiLogOut, FiAlertTriangle, FiLifeBuoy, FiGift } from 'react-icons/fi';
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

function Navigation({ username, handleLogout, handleSetName }) {
  const location = useLocation();
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: () => {}, defaultValue: username });

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

          {/* Lado derecho: login / identificación + soporte */}
          <div className="header-right">
            <a 
              href="https://ko-fi.com/chutinrop" 
              target="_blank" 
              rel="noreferrer" 
              className="support-btn glass-panel"
              title="Apoyar el proyecto (Ko-fi)"
            >
              <FiGift />
              <span>Apoyar</span>
            </a>

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
  const [username, setUsername] = useState(localStorage.getItem('mhur_username') || '');
  const [showReportModal, setShowReportModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: () => {}, defaultValue: '' });

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setTimeout(() => {
        showToast("📱 Si la página se ve mal en móvil, actívala en 'Modo Escritorio' para una mejor experiencia.", "info", 8000);
      }, 1500);
    }
  }, []);

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

  const submitReport = async (reportData) => {
    const formData = new FormData();
    formData.append('description', reportData.description);
    formData.append('username', username || 'Usuario Anónimo');
    
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
        throw new Error(errorData.error || 'Error del servidor al enviar el reporte.');
      }

      showToast("¡Reporte enviado! Gracias por tu ayuda.", "success");
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

        <Navigation username={username} handleLogout={handleLogout} handleSetName={handleSetName} />

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
            <p className="footer-disclaimer" style={{ 
              fontSize: '0.7rem', 
              color: 'rgba(255,255,255,0.3)', 
              maxWidth: '800px', 
              margin: '10px auto 0',
              lineHeight: '1.4'
            }}>
              MHUR Tunning es una herramienta fan no oficial. No estamos afiliados con Bandai Namco Entertainment, Sony Interactive Entertainment ni K. Horikoshi. 
              Todos los personajes, imágenes y marcas registradas son propiedad de sus respectivos dueños.
            </p>
          </footer>
          
          <Toast />
          <Analytics />

          {/* ── Botón Flotante de Reporte ── */}
          <button 
            className="floating-report-fab"
            onClick={() => setShowReportModal(true)}
            title="Reportar un error"
          >
            <FiLifeBuoy />
            <span>Reportar Error</span>
          </button>
        </div>
      </div>
    </Router>
  );
}

export default App;
