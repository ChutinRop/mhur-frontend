import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiDownload, FiUser, FiCalendar, FiSearch, FiTrendingUp } from 'react-icons/fi';
import { showToast } from '../components/UIFeedback/Toast';
import CustomModal from '../components/UIFeedback/CustomModal';
import { getAnyCharacterImage, getCharacterImage } from '../data/characterImages';
import trajesData from '../data/trajes_es.json';
import './Community.css';

const getClassColor = (clase) => {
  switch (clase) {
    case 'Apoyo':     return '#00ff00';
    case 'Daño':      return '#ff0000';
    case 'Tanque':    return '#ffff00';
    case 'Técnico':   return '#b026ff';
    case 'Velocista': return '#00d5ff';
    default:          return '#888888';
  }
};

export default function Community() {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: () => {} });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://mhur-backend.onrender.com/api/builds')
      .then(res => res.json())
      .then(data => {
        // Ordenar por popularidad (importaciones DESC) por defecto
        const sorted = data.sort((a,b) => (b.imports || 0) - (a.imports || 0));
        setBuilds(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching builds:", err);
        showToast("Error al cargar builds de la comunidad", "error");
        setLoading(false);
      });
  }, []);

  // Reiniciar paginación al buscar
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleImportBuild = async (buildId) => {
    // ... logic remains same, but using detailedBuild
    const currentlyBlocked = localStorage.getItem('mhur_import_blocked_until');
    if (currentlyBlocked && Date.now() < parseInt(currentlyBlocked)) {
      const timeLeft = Math.ceil((parseInt(currentlyBlocked) - Date.now()) / 1000);
      showToast(`Servidor saturado. Espera ${timeLeft} segundos.`, "error");
      return;
    }

    let attemptsStr = localStorage.getItem('mhur_import_attempts');
    let attempts = attemptsStr ? JSON.parse(attemptsStr) : [];
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
      const resp = await fetch(`https://mhur-backend.onrender.com/api/builds/${buildId}`);
      if (!resp.ok) throw new Error("Build not found");
      const detailedBuild = await resp.json();
      navigate('/creator', { state: { importedBuild: detailedBuild.build_data } });
    } catch (error) {
       showToast("No se pudo cargar la build", "error");
    }
  };

  const filteredBuilds = builds.filter(build => {
    const s = searchTerm.toLowerCase();
    const charMatch = build.character_name ? build.character_name.toLowerCase().includes(s) : false;
    const tagMatch = build.tags ? build.tags.some(tag => tag.toLowerCase().includes(s)) : false;
    const creatorMatch = build.creator_name ? build.creator_name.toLowerCase().includes(s) : false;
    return charMatch || tagMatch || creatorMatch;
  });

  // Lógica de visualización
  const isSearching = searchTerm.trim().length > 0;
  
  // Top 10 solo si no estamos buscando específicamente
  const popularBuilds = !isSearching ? filteredBuilds.slice(0, 10) : [];
  // El resto de la lista (o todos si buscamos)
  const mainListSource = !isSearching ? filteredBuilds.slice(10) : filteredBuilds;
  
  // Lógica de Paginación Numérica
  const totalPages = Math.ceil(mainListSource.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBuilds = mainListSource.slice(startIndex, endIndex);

  // Generador de botones de paginación limitados (para no mostrar 50 botones a la vez)
  const getPaginationGroup = () => {
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + 4, totalPages);
    
    if (end - start < 4) {
      start = Math.max(end - 4, 1);
    }
    return Array.from({ length: (end - start) + 1 }, (_, idx) => start + idx);
  };

  return (
    <main className="main-content community-page-container" style={{ display: 'block' }}>
      <CustomModal 
        {...modalConfig} 
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))} 
      />

      <section className="glass-panel community-section" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div className="community-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FiTrendingUp style={{ color: '#10b981' }} /> Comunidad de Tunnings
            </h2>
            <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
              Explora las configuraciones más populares de la comunidad.
            </p>
          </div>
          
          <div className="community-search-wrapper glass-panel">
            <FiSearch style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Buscar personaje, etiqueta o creador..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="community-search-input"
            />
          </div>
        </div>
      </section>

      {loading ? (
        <div className="loading-container" style={{ textAlign: 'center', padding: '3rem' }}>Cargando builds populares...</div>
      ) : (
        <div className="community-scroll-area">
          
          {/* SECCIÓN 1: POPULARES (Solo si no hay búsqueda activa) */}
          {!isSearching && popularBuilds.length > 0 && currentPage === 1 && (
            <div className="popular-section-container" style={{ marginBottom: '3rem' }}>
               <h3 className="section-title-label" style={{ 
                 marginBottom: '1.5rem', 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '0.6rem',
                 fontSize: '1.4rem',
                 color: '#10b981'
               }}>
                 🔥 Top 10 Populares
               </h3>
               <div className="builds-grid">
                  {popularBuilds.map(build => (
                    <BuildCard key={build._id} build={build} onImport={handleImportBuild} />
                  ))}
               </div>
            </div>
          )}

          {/* SECCIÓN 2: LISTADO GENERAL O RESULTADOS */}
          <div className="all-builds-section">
            <h3 className="section-title-label" style={{ 
              marginBottom: '1.5rem', 
              fontSize: '1.4rem', 
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}>
              {isSearching ? `Resultados para "${searchTerm}"` : '✨ Explorar Recientes'}
            </h3>
            
            {displayedBuilds.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                No se encontraron resultados para esta búsqueda.
              </p>
            ) : (
              <>
                <div className="builds-grid">
                  {displayedBuilds.map(build => (
                    <BuildCard key={build._id} build={build} onImport={handleImportBuild} />
                  ))}
                </div>
                
                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="pagination-container">
                    <button 
                      className="pagination-btn arrow" 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                      &laquo; Ant
                    </button>
                    
                    {getPaginationGroup().map(page => (
                      <button 
                        key={page} 
                        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}

                    <button 
                      className="pagination-btn arrow" 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                      Sig &raquo;
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

// Sub-componente para la tarjeta de build (para limpiar el código)
function BuildCard({ build, onImport }) {
  // 1. Intentar obtener imagen de la build guardada
  let costumeImg = build.build_data?.selectedCharacter?.imagen_url || null;
  
  // 2. Fallback: Si no tiene imagen (build antigua), buscarla en trajesData por nombre
  if (!costumeImg) {
    const outfitTag = build.tags?.find(t => t.startsWith('Traje:'))?.replace('Traje:', '');
    const outfitName = outfitTag || build.build_data?.selectedCharacter?.nombre_completo;
    
    if (outfitName) {
       // Buscar coincidencia exacta primero (traducir formato viejo "Traje - Variante" a "Traje (Variante)")
       let exactName = outfitName.replace('Ver. Pelo Blanco', 'Cabello Blanco');
       if (exactName.includes(' - ')) {
           const parts = exactName.split(' - ');
           const base = parts.slice(0, -1).join(' - ').trim();
           const variant = parts[parts.length - 1].trim();
           exactName = variant === 'Por Defecto' ? base : `${base} (${variant})`;
       }
       
       let found = trajesData.find(t => t.personaje === build.character_name && t.nombre_completo === exactName);
       
       if (!found) {
           // Normalizar nombres legacy si no hubo coincidencia exacta (e.g. eliminar "Ver.")
           const baseOutfitName = outfitName.split(' - ')[0].trim().replace('Ver. Pelo Blanco', 'Cabello Blanco').replace('Ver.', '').trim();
           
           // Intentar buscar la versión "Por Defecto" de ese traje base primero
           found = trajesData.find(t => t.personaje === build.character_name && t.traje.includes(baseOutfitName) && (t.variante === 'Por Defecto' || !t.variante));
           
           if (!found) {
               // Si no, cualquier variante de ese traje
               found = trajesData.find(t => t.personaje === build.character_name && t.traje.includes(baseOutfitName));
           }
       }
       
       // Si aún no se encuentra, tomar el primer traje disponible para el personaje como "último recurso"
       if (!found) {
          found = trajesData.find(t => t.personaje === build.character_name);
       }

       if (found) costumeImg = found.imagen_url;
    }
  }

  const targetCharName = build.build_data?.styleName || build.build_data?.selectedCharacter?.personaje;
  const charPortrait = targetCharName
    ? getAnyCharacterImage(targetCharName, 'normal')
    : null;

  // Tunings Especiales
  const leftSpecial = build.build_data?.characterBuild?.['left-special'];
  const rightSpecial = build.build_data?.characterBuild?.['right-special'];

  const getStyleLabel = (name, charName) => {
    if (!name) return "BASE";
    const match = name.match(/\((.*?)\)/);
    if (match) return match[1].toUpperCase();
    const cleanName = name.trim();
    const cleanChar = charName?.trim();
    if (cleanName === cleanChar || !name.includes("(")) return "BASE";
    return cleanName.toUpperCase();
  };

  const renderSpecialIcon = (tuning, pos) => {
    if (!tuning) return null;
    
    // Si la ranura especial tiene múltiples habilidades (Array), tomar la primera para mostrar la clase
    const mainTuning = Array.isArray(tuning) ? tuning[0] : tuning;
    
    const color = getClassColor(mainTuning.clase);
    const imgUrl = getCharacterImage(mainTuning.personaje, mainTuning.rol, mainTuning.clase, 'especial');
    
    return (
      <div className={`compact-special-icon ${pos}`} style={{ borderColor: color }}>
        <div className="special-bg" style={{ backgroundColor: color }}>
          {imgUrl && <img src={imgUrl} alt="Special" loading="lazy" />}
        </div>
        <span className="special-role-char">{mainTuning.rol === 'Villano' ? 'V' : 'H'}</span>
      </div>
    );
  };


  return (
    <div className="glass-panel build-card">
      {build.imports > 10 && (
        <div className="popularity-ribbon">POPULAR</div>
      )}

      <div className="build-card-header">
        <div className="build-card-creator-info">
          {charPortrait ? (
             <img src={charPortrait} alt="" className="build-card-mini-portrait" loading="lazy" />
          ) : <div className="build-card-portrait-placeholder" />}
          <div className="build-card-title-group">
            <div className="build-card-name-row">
              <h3 className="build-card-char-name">{build.character_name}</h3>
              {build.imports > 0 && (
                <span className="import-count-badge">
                  <FiTrendingUp /> {build.imports}
                </span>
              )}
            </div>
            <div className="build-card-outfit-name">
              {build.tags?.find(t => t.startsWith('Traje:'))?.replace('Traje:', '') || build.build_data?.selectedCharacter?.nombre_completo || build.character_name}
            </div>
          </div>
        </div>
      </div>

      {/* Visual principal del traje */}
      <div className="costume-visual-preview">
        {renderSpecialIcon(leftSpecial, 'left')}
        <div className="costume-img-wrapper">
          {costumeImg ? (
            <img src={costumeImg} alt="Costume" className="full-costume-display" loading="lazy" />
          ) : (
            <div className="no-costume-placeholder">No Image</div>
          )}
        </div>
        {renderSpecialIcon(rightSpecial, 'right')}
      </div>
      
      <div className="build-card-tags">
        {(build.build_data?.styleName && getStyleLabel(build.build_data.styleName, build.character_name) !== "BASE" || (build.tags && build.tags.some(t => t.startsWith('BStyle:')))) && (
          <span className="style-tag-badge">
            ⚔️ {build.tags?.find(t => t.startsWith('BStyle:'))?.replace('BStyle:', '') || getStyleLabel(build.build_data?.styleName, build.character_name)}
          </span>
        )}
        {build.tags && build.tags.filter(tag => !tag.startsWith('BStyle:') && !tag.startsWith('Traje:')).slice(0, 4).map((tag, i) => (
          <span key={i} className={`tag-badge ${tag === 'Berserker' ? 'berserker' : 'normal'}`}>
            {tag}
          </span>
        ))}
      </div>

      <div className="build-card-footer">
        <div className="build-card-metadata">
          <div className="metadata-item">
            <FiUser size={12} /> <span>{build.creator_name}</span>
          </div>
          <div className="metadata-item">
            <FiCalendar size={12} /> <span>{new Date(build.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        
        <button className="import-btn-community" onClick={() => onImport(build._id)}>
          <FiDownload size={16} /> Importar
        </button>
      </div>
    </div>
  );
}
