import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FiUser, FiDatabase, FiEdit, FiGlobe, FiLogOut } from 'react-icons/fi';
import clsx from 'clsx';
import TunerCreator from './pages/TunerCreator';
import Database from './pages/Database';
import Community from './pages/Community';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Toast, { showToast } from './components/UIFeedback/Toast';
import CustomModal from './components/UIFeedback/CustomModal';
import './App.css';

function Navigation() {
  const location = useLocation();
  const [username, setUsername] = useState(localStorage.getItem('mhur_username') || '');
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: () => {}, defaultValue: '' });

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

  return (
    <>
      <CustomModal 
        {...modalConfig} 
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))} 
      />
      {/* ── Banner ── */}
      <div style={{ width: '100%', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        <img
          src="/assets/Images/Banner Pagina.png"
          alt="MHUR Tuner Banner"
          style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* ── Header ── */}
      <header className="header glass-panel" style={{ padding: '0.75rem 2rem', border: 'none' }}>
        {/* Lado izquierdo: logo + título + nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <img
            src="/assets/Images/Logo pagina.png"
            alt="MHUR Tuner Logo"
            style={{ height: '90px', width: '150px', objectFit: 'contain', borderRadius: '12px', flexShrink: 0 }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <h1 className="header-title" style={{ margin: 0, fontSize: '1.9rem' }}>
              MHUR Tunnign <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>Chutunning</span>
            </h1>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
              Hecho por ChutinRop
            </span>
          </div>

          <nav style={{ display: 'flex', gap: '0.5rem', marginLeft: '0.75rem' }}>
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
        <div style={{ display: 'flex', gap: '1rem' }}>
          {username ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Hola, <strong style={{ color: 'var(--text-primary)' }}>{username}</strong>
              </span>
              <button 
                className="glass-panel" 
                onClick={handleLogout}
                style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', color: 'var(--color-rapid)', background: 'transparent', border: '1px solid var(--color-rapid)' }}
                title="Cambiar Nombre"
              >
                <FiLogOut />
              </button>
            </div>
          ) : (
            <button 
              className="glass-panel" 
              onClick={handleSetName}
              style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', background: 'var(--color-rapid)' }}
            >
              <FiUser /> Identificarse
            </button>
          )}
        </div>
      </header>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <Routes>
          <Route path="/" element={<Database />} />
          <Route path="/creator" element={<TunerCreator />} />
          <Route path="/community" element={<Community />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>

        <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
             <Link to="/privacy" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>Política de Privacidad</Link>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>© 2026 MHUR Tunning - Todos los derechos reservados.</p>
        </footer>
        
        <Toast />
      </div>
    </Router>
  );
}

export default App;
