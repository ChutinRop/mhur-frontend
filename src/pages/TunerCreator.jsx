import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { FiShare2 } from 'react-icons/fi';
import CharacterSelector from '../components/CharacterSelector';
import TunerSlotsGrid from '../components/TunerSlotsGrid';
import TuningSelectorModal from '../components/TuningSelectorModal';
import StatsSummaryPanel from '../components/StatsSummaryPanel';
import { showToast } from '../components/UIFeedback/Toast';
import CustomModal from '../components/UIFeedback/CustomModal';
import { generateTags } from '../utils/tagGenerator';
import normalesData from '../data/tunnings_normales.json';

export default function TunerCreator() {
  const [selectedCharacter, setSelectedCharacter] = useState(() => {
    const saved = localStorage.getItem('mhur_creator_character');
    return saved ? JSON.parse(saved) : null;
  });
  const location = useLocation();
  
  // Tuner Grid States
  const [activeSlotIndex, setActiveSlotIndex] = useState(null);
  const [activeSlotData, setActiveSlotData] = useState(null);
  const [isTuningModalOpen, setIsTuningModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  // The actual build: mapping of slotIndex -> tuningObject
  const [characterBuild, setCharacterBuild] = useState(() => {
    const saved = localStorage.getItem('mhur_creator_build');
    return saved ? JSON.parse(saved) : {};
  });
  const [slotLevels, setSlotLevels] = useState(() => {
    const saved = localStorage.getItem('mhur_creator_levels');
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedStyle, setSelectedStyle] = useState(() => {
    return localStorage.getItem('mhur_creator_style') || null;
  });
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: () => {} });

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('mhur_creator_character', JSON.stringify(selectedCharacter));
    localStorage.setItem('mhur_creator_build', JSON.stringify(characterBuild));
    localStorage.setItem('mhur_creator_levels', JSON.stringify(slotLevels));
    if (selectedStyle) localStorage.setItem('mhur_creator_style', selectedStyle);
  }, [selectedCharacter, characterBuild, slotLevels, selectedStyle]);

  // Handle imported build from Community page
  useEffect(() => {
    if (location.state && location.state.importedBuild) {
      console.log("Loading imported build:", location.state.importedBuild);
      const { selectedCharacter, characterBuild, slotLevels } = location.state.importedBuild;
      setSelectedCharacter(selectedCharacter);
      setCharacterBuild(characterBuild);
      setSlotLevels(slotLevels);
      
      // Clear state so it doesn't re-import on refresh/navigation
      window.history.replaceState({}, document.title);
      showToast("Build importada correctamente", "success");
    }
  }, [location.state]);

  const handleSlotClick = ({ index, data }) => {
    setActiveSlotIndex(index);
    setActiveSlotData(data);
    setIsTuningModalOpen(true);
  };

  const handleSelectTuning = (tuning) => {
    setCharacterBuild(prev => ({
      ...prev,
      [activeSlotIndex]: tuning
    }));
    setSlotLevels(prev => ({
      ...prev,
      [activeSlotIndex]: 1
    }));
  };

  const handleRemoveTuning = (e, index) => {
    e.stopPropagation();
    setCharacterBuild(prev => ({
      ...prev,
      [index]: null
    }));
    setSlotLevels(prev => ({
      ...prev,
      [index]: 1
    }));
  };

  const handleLevelChange = (e, index, delta, maxLevel) => {
    e.stopPropagation();
    setSlotLevels(prev => {
      const current = prev[index] || 1;
      const next = Math.max(1, Math.min(maxLevel, current + delta));
      return { ...prev, [index]: next };
    });
  };

  const handleMaxAllLevels = () => {
    if (!selectedCharacter || !selectedCharacter._entrada) return;
    const updatedLevels = { ...slotLevels };
    const ranuras = selectedCharacter._entrada.ranuras || [];

    Object.entries(characterBuild).forEach(([slotId, tuning]) => {
      if (!tuning) return;
      let maxLevel = 1;
      if (slotId === 'left-special') {
        maxLevel = 10;
      } else if (slotId === 'right-special') {
        maxLevel = 11;
      } else {
        const numericId = parseInt(slotId, 10);
        let slotData;
        if (numericId >= 1 && numericId >= 1 && numericId <= 5) slotData = ranuras[numericId];
        else if (numericId >= 6 && numericId <= 10) slotData = ranuras[numericId + 1];
        if (slotData) maxLevel = (slotData.rol === 'Universal') ? 3 : 4;
        else maxLevel = 3;
      }
      updatedLevels[slotId] = maxLevel;
    });
    setSlotLevels(updatedLevels);
    showToast("¡Tunnings mejorados al máximo!", "success");
  };

  const handleCharacterChange = (newChar) => {
    setSelectedCharacter(newChar);
    setSelectedStyle(newChar?.personaje || null); // Default to base style
    setCharacterBuild({});
    setSlotLevels({});
    setActiveSlotIndex(null);
    setActiveSlotData(null);
    setIsTuningModalOpen(false);
  };

  // Get available styles for the current character
  const availableStyles = useMemo(() => {
    if (!selectedCharacter?.personaje) return [];
    const baseName = selectedCharacter.personaje;
    return normalesData
      .filter(t => t.personaje === baseName || (t.personaje && t.personaje.startsWith(`${baseName} (`)))
      .map(t => t.personaje);
  }, [selectedCharacter]);

  const getStyleLabel = (name) => {
    if (!name) return "";
    const match = name.match(/\((.*?)\)/);
    return match ? match[1] : "Base";
  };

  const handleExportBuild = () => {
    if (!selectedCharacter) {
      setModalConfig({
        isOpen: true,
        type: 'alert',
        title: 'Atención',
        message: 'Selecciona un personaje primero para poder exportar la build.',
        onConfirm: () => {}
      });
      return;
    }
    const buildData = {
      characterName: selectedCharacter.personaje,
      styleName: selectedStyle || selectedCharacter.personaje,
      selectedCharacter,
      characterBuild,
      slotLevels
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(buildData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `MHUR_Build_${buildData.characterName.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    showToast("Build exportada localmente", "info");
  };

  const handleImportBuild = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (importedData.selectedCharacter && importedData.characterBuild && importedData.slotLevels) {
          setSelectedCharacter(importedData.selectedCharacter);
          setCharacterBuild(importedData.characterBuild);
          setSlotLevels(importedData.slotLevels);
          showToast("¡Build importada exitosamente!", "success");
        } else {
          showToast("El archivo no tiene el formato correcto", "error");
        }
      } catch (error) {
        showToast("Error al leer el archivo JSON", "error");
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handlePublishBuild = async () => {
    const currentlyBlocked = localStorage.getItem('mhur_publish_blocked_until');
    if (currentlyBlocked && Date.now() < parseInt(currentlyBlocked)) {
      const timeLeft = Math.ceil((parseInt(currentlyBlocked) - Date.now()) / 1000);
      showToast(`Límite alcanzado. Espera ${timeLeft} segundos antes de volver a publicar.`, "error");
      return;
    }

    let attemptsStr = localStorage.getItem('mhur_publish_attempts');
    let attempts = attemptsStr ? JSON.parse(attemptsStr) : [];
    
    const now = Date.now();
    // Maintain a 30-second window to count 3 clicks
    attempts = attempts.filter(time => now - time < 30000);
    attempts.push(now);
    
    if (attempts.length >= 3) {
      localStorage.setItem('mhur_publish_blocked_until', (now + 60000).toString()); // 1 minute block
      localStorage.setItem('mhur_publish_attempts', JSON.stringify([]));
      showToast("Límite de spam alcanzado. Publicaciones bloqueadas por 1 minuto.", "error");
      return;
    }
    
    localStorage.setItem('mhur_publish_attempts', JSON.stringify(attempts));

    if (!selectedCharacter) {
      setModalConfig({
        isOpen: true,
        type: 'alert',
        title: 'Atención',
        message: 'Selecciona un personaje primero para poder publicar en la nube.',
        onConfirm: () => {}
      });
      return;
    }

    const creatorName = localStorage.getItem('mhur_username');
    if (!creatorName) {
      setModalConfig({
        isOpen: true,
        type: 'alert',
        title: 'Identificación Necesaria',
        message: "Por favor, identifícate primero en el botón 'Identificarse' del menú superior para poder publicar.",
        onConfirm: () => {}
      });
      return;
    }

    setModalConfig({
      isOpen: true,
      type: 'confirm',
      title: 'Publicar Tuning',
      message: `¿Estás seguro de que deseas publicar el tuning de ${selectedCharacter._entrada?.nombre_completo || selectedCharacter.nombre_completo}? Otros jugadores podrán verlo e importarlo.`,
      onConfirm: async () => {
        const buildData = {
          characterName: selectedCharacter.personaje,
          styleName: selectedStyle || selectedCharacter.personaje,
          selectedCharacter,
          characterBuild,
          slotLevels
        };

        const tags = generateTags(characterBuild, slotLevels);
        const battleStyleLabel = getStyleLabel(selectedStyle || selectedCharacter.personaje);
        if (battleStyleLabel && battleStyleLabel !== "Base") {
          tags.unshift(`BStyle:${battleStyleLabel}`);
        }
        
        // Inject outfit name for backend compatibility
        const outfitName = selectedCharacter._entrada?.nombre_completo || selectedCharacter.nombre_completo;
        if (outfitName) {
          tags.push(`Traje:${outfitName}`);
        }

        try {
          showToast("Publicando build...", "info");
          const response = await fetch('https://mhur-backend.onrender.com/api/builds', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              character_name: buildData.characterName,
              creator_name: creatorName,
              build_data: buildData,
              tags: tags
            }),
          });

          if (response.ok) {
            showToast(`¡Build de ${buildData.characterName} publicada exitosamente!`, "success");
            setModalConfig({
              isOpen: true,
              type: 'success',
              title: '¡Publicado!',
              message: `Tu tuning de ${buildData.characterName} ya está disponible en la sección de Builds Públicas.`,
              onConfirm: () => {}
            });
          } else {
            const errorData = await response.json();
            if (response.status === 409) {
              setModalConfig({
                isOpen: true,
                type: 'alert',
                title: 'Tuning ya publicado',
                message: errorData.error,
                onConfirm: () => {}
              });
            } else {
              showToast(`Error: ${errorData.error || 'Fallo de publicación'}`, "error");
            }
          }
        } catch (error) {
          showToast("No se pudo conectar con el servidor", "error");
        }
      }
    });
  };

  const handleResetBuild = () => {
    setModalConfig({
      isOpen: true,
      type: 'confirm',
      title: 'Eliminar Todo',
      message: '¿Estás seguro de que quieres borrar el tuning actual? Se perderá todo el progreso.',
      onConfirm: () => {
        setSelectedCharacter(null);
        setCharacterBuild({});
        setSlotLevels({});
        setActiveSlotIndex(null);
        setActiveSlotData(null);
        setIsTuningModalOpen(false);
        localStorage.removeItem('mhur_creator_character');
        localStorage.removeItem('mhur_creator_build');
        localStorage.removeItem('mhur_creator_levels');
        showToast("Progreso borrado correctamente", "info");
      }
    });
  };

  return (
    <main className="main-content">
      <CustomModal 
        {...modalConfig} 
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))} 
      />

      <div className="left-column">
        <section className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Configuración de Personaje</h2>
          <CharacterSelector selectedChar={selectedCharacter} setSelectedChar={handleCharacterChange} />
        </section>

        {selectedCharacter?._entrada && (
          <section className="glass-panel" style={{ padding: '2rem', paddingBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <h2>Ranuras de Equipamiento</h2>
              <button 
                className="btn-rainbow-max" 
                onClick={handleMaxAllLevels}
                title="Mejorar todos los Tunnings equipados al nivel máximo"
              >Max.</button>
              <button 
                className="action-btn" 
                title="Eliminar progreso del personaje y tunnings" 
                onClick={handleResetBuild}
                style={{ 
                  background: 'rgba(239, 68, 68, 0.1)', 
                  color: '#ef4444', 
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  fontSize: '0.75rem',
                  padding: '0.4rem 0.8rem',
                  height: 'auto',
                  marginLeft: 'auto'
                }}
              >ELIMINAR TODO</button>
            </div>
            <TunerSlotsGrid 
              selectedChar={selectedCharacter}
              activeSlotIndex={activeSlotIndex}
              onSlotClick={handleSlotClick}
              characterBuild={characterBuild}
              slotLevels={slotLevels}
              onRemoveTuning={handleRemoveTuning}
              onLevelChange={handleLevelChange}
            />
          </section>
        )}
      </div>

      <aside className="right-column glass-panel" style={{ padding: '2rem', position: 'sticky', top: '2rem' }}>
        <div className="summary-header">
          <div className="summary-title-row">
            <div className="summary-actions">
              <button 
                className="action-btn import-btn" 
                title="Importar Build (Cargar archivo .json)" 
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                IMPORTAR
              </button>
              <input 
                type="file" 
                accept=".json" 
                style={{ display: 'none' }} 
                ref={fileInputRef}
                onChange={handleImportBuild}
              />
              <button 
                className="action-btn export-btn" 
                title="Guardar / Exportar Build Localmente" 
                onClick={handleExportBuild}
              >
                EXPORTAR
              </button>
              <button 
                className="action-btn publish-btn" 
                title="Publicar Build en la Nube" 
                onClick={handlePublishBuild}
              >
                <FiShare2 /> PUBLICAR
              </button>
            </div>
            <h2 className="summary-title">Resumen</h2>
          </div>
          
          {selectedCharacter && (
            <div className="summary-character-info" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="char-label">Personaje:</span>
                <span className="char-name" style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>
                  {selectedCharacter.personaje}
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', opacity: 0.8 }}>
                <span className="char-label">Traje:</span>
                <span className="char-name">
                  {selectedCharacter._entrada?.nombre_completo || selectedCharacter.nombre_completo}
                </span>
              </div>
              
              {availableStyles.length > 1 && (
                <div className="battle-style-selector" style={{ marginTop: '0.5rem', width: '100%' }}>
                  <span className="style-label">Estilo de Batalla:</span>
                  <div className="style-options">
                    {availableStyles.map(style => (
                      <button 
                        key={style}
                        className={`style-opt-btn ${selectedStyle === style ? 'active' : ''}`}
                        onClick={() => setSelectedStyle(style)}
                      >
                        {getStyleLabel(style)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <StatsSummaryPanel characterBuild={characterBuild} slotLevels={slotLevels} />
      </aside>

      <TuningSelectorModal 
        isOpen={isTuningModalOpen}
        onClose={() => setIsTuningModalOpen(false)}
        slotData={activeSlotData}
        characterData={selectedCharacter?._entrada}
        selectedStyle={selectedStyle}
        characterBuild={characterBuild}
        activeSlotIndex={activeSlotIndex}
        onSelectTuning={handleSelectTuning}
      />
    </main>
  );
}
