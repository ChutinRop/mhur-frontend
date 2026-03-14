import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiDownload, FiUser, FiCalendar, FiSearch, FiTrendingUp } from 'react-icons/fi';
import { showToast } from '../components/UIFeedback/Toast';
import CustomModal from '../components/UIFeedback/CustomModal';
import { getAnyCharacterImage } from '../data/characterImages';

export default function Community() {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: () => {} });
  const importAttempts = useRef(0);
  const blockedUntil = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/builds')
      .then(res => res.json())
      .then(data => {
        setBuilds(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching builds:", err);
        showToast("Error al cargar builds de la comunidad", "error");
        setLoading(false);
      });
  }, []);

  const handleImportBuild = async (buildId) => {
    const currentlyBlocked = localStorage.getItem('mhur_import_blocked_until');
    if (currentlyBlocked && Date.now() < parseInt(currentlyBlocked)) {
      const timeLeft = Math.ceil((parseInt(currentlyBlocked) - Date.now()) / 1000);
      showToast(`Servidor saturado. Espera ${timeLeft} segundos.`, "error");
      return;
    }

    // Attempt tracking
    let attemptsStr = localStorage.getItem('mhur_import_attempts');
    let attempts = attemptsStr ? JSON.parse(attemptsStr) : [];
    
    // Filter out attempts older than 10 seconds
    const now = Date.now();
    attempts = attempts.filter(time => now - time < 10000);
    
    attempts.push(now);
    
    if (attempts.length >= 4) {
      localStorage.setItem('mhur_import_blocked_until', (now + 60000).toString());
      localStorage.setItem('mhur_import_attempts', JSON.stringify([]));
      showToast("Límite de spam alcanzado. Botón bloqueado por 1 minuto.", "error");
      return;
    }
    
    localStorage.setItem('mhur_import_attempts', JSON.stringify(attempts));

    try {
      showToast("Cargando build...", "info");
      const resp = await fetch(`http://localhost:3001/api/builds/${buildId}`);
      if (!resp.ok) throw new Error("Build not found");
      const detailedBuild = await resp.json();
      
      navigate('/creator', { state: { importedBuild: detailedBuild.build_data } });
    } catch (error) {
      setModalConfig({
        isOpen: true,
        type: 'alert',
        title: 'Error de Importación',
        message: 'No se pudo cargar el detalle de la build seleccionada. Inténtalo de nuevo más tarde.',
        onConfirm: () => {}
      });
    }
  };

  const filteredBuilds = builds.filter(build => {
    const charMatch = build.character_name ? build.character_name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const tagMatch = build.tags ? build.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) : false;
    return charMatch || tagMatch;
  });

  return (
    <main className="main-content" style={{ display: 'block' }}>
      <CustomModal 
        {...modalConfig} 
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))} 
      />

      <section className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h2>Comunidad de Tunnings</h2>
            <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
              Explora y utiliza las configuraciones compartidas por otros jugadores.
            </p>
          </div>
          
          <div className="search-container glass-panel" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '0.5rem 1.25rem', 
            gap: '0.75rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--surface-border)',
            width: '100%',
            maxWidth: '400px'
          }}>
            <FiSearch style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Buscar personaje o etiqueta..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: 'var(--text-primary)', 
                outline: 'none',
                width: '100%',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>
      </section>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Cargando builds...</div>
      ) : (
        <div className="builds-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {filteredBuilds.length === 0 ? (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              {searchTerm ? `No se encontraron builds para "${searchTerm}"` : 'No hay builds publicadas todavía.'}
            </p>
          ) : (
            filteredBuilds.map(build => {
              const charImg = build.build_data?.selectedCharacter?.personaje
                ? getAnyCharacterImage(build.build_data.selectedCharacter.personaje, 'normal')
                : null;
              
              return (
              <div key={build._id} className="glass-panel build-card" style={{ 
                padding: '1.5rem', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem',
                transition: 'transform 0.2s',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Popularity Ribbon for highly imported builds */}
                {build.imports > 5 && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '-30px',
                    background: 'linear-gradient(45deg, #10b981, #34d399)',
                    color: '#fff',
                    padding: '4px 30px',
                    transform: 'rotate(45deg)',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    zIndex: 1
                  }}>
                    POPULAR
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {charImg ? (
                      <img 
                        src={charImg} 
                        alt={build.character_name} 
                        style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.1)' }} 
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.05)' }} />
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h3 style={{ margin: 0, color: 'var(--color-rapid)', fontSize: '1.1rem' }}>{build.character_name}</h3>
                        {build.imports > 0 && (
                          <span title={`${build.imports} importaciones`} style={{ display: 'flex', alignItems: 'center', color: '#10b981', fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '10px' }}>
                            <FiTrendingUp style={{ marginRight: '3px' }}/> {build.imports}
                          </span>
                        )}
                      </div>
                      {build.build_data?.selectedCharacter?.personaje && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                           👤 {build.build_data.selectedCharacter.personaje}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  {build.tags && build.tags.map((tag, i) => (
                    <span key={i} style={{ 
                      fontSize: '0.7rem', 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      background: tag === 'Berserker' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(111, 66, 193, 0.2)',
                      color: tag === 'Berserker' ? '#ef4444' : 'var(--color-rapid)',
                      border: `1px solid ${tag === 'Berserker' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(111, 66, 193, 0.3)'}`,
                      fontWeight: 'bold'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiUser size={14} /> <span>{build.creator_name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiCalendar size={14} /> <span>{new Date(build.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <button 
                    className="max-all-btn" 
                    onClick={() => handleImportBuild(build._id)}
                    title="Importar esta Build al Creador"
                    style={{ 
                      padding: '8px 16px', 
                      fontSize: '0.85rem',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      borderColor: 'rgba(16, 185, 129, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#10b981';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                      e.currentTarget.style.color = '#10b981';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <FiDownload size={16} /> Importar
                  </button>
                </div>
              </div>
              );
            })
          )}
        </div>
      )}
    </main>
  );
}
