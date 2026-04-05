import React, { useState, useRef, useEffect, useMemo, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiShare2 } from 'react-icons/fi';
import CharacterSelector from '../components/CharacterSelector';
import TunerSlotsGrid from '../components/TunerSlotsGrid';
import TuningSelectorModal from '../components/TuningSelectorModal';
import StatsSummaryPanel from '../components/StatsSummaryPanel';
import { showToast } from '../components/UIFeedback/Toast';
import CustomModal from '../components/UIFeedback/CustomModal';
import { generateTags } from '../utils/tagGenerator';
import normalesData from '../data/tunnings_normales.json';
import trajesData from '../data/trajes_es.json';
import { AuthContext } from '../context/AuthContext';
import { useT } from '../context/LanguageContext';
import { translateBattleStyleLabel, translateNombreCompleto } from '../utils/gameTranslation';

export default function TunerCreator() {
  const { user, token } = useContext(AuthContext);
  const { t, lang } = useT();

  const [selectedCharacter, setSelectedCharacter] = useState(() => {
    const saved = localStorage.getItem('mhur_creator_character');
    return saved ? JSON.parse(saved) : null;
  });
  const location = useLocation();
  const navigate = useNavigate();
  
  const [activeSlotIndex, setActiveSlotIndex] = useState(null);
  const [activeSlotData, setActiveSlotData] = useState(null);
  const [isTuningModalOpen, setIsTuningModalOpen] = useState(false);
  const fileInputRef = useRef(null);

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

  useEffect(() => {
    localStorage.setItem('mhur_creator_character', JSON.stringify(selectedCharacter));
    localStorage.setItem('mhur_creator_build', JSON.stringify(characterBuild));
    localStorage.setItem('mhur_creator_levels', JSON.stringify(slotLevels));
    if (selectedStyle) localStorage.setItem('mhur_creator_style', selectedStyle);
  }, [selectedCharacter, characterBuild, slotLevels, selectedStyle]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editBuildId, setEditBuildId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.importedBuild) {
      const { selectedCharacter, characterBuild, slotLevels } = location.state.importedBuild;
      setSelectedCharacter(selectedCharacter);
      setCharacterBuild(characterBuild);
      setSlotLevels(slotLevels);
      
      if (location.state.isEditMode) {
        setIsEditMode(true);
        setEditBuildId(location.state.editBuildId);
        showToast(t('creator_toast_edit_mode'), "info");
      } else {
        showToast(t('creator_toast_imported'), "success");
      }

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSlotClick = ({ index, data }) => {
    setActiveSlotIndex(index);
    setActiveSlotData(data);
    setIsTuningModalOpen(true);
  };

  const handleSelectTuning = (tuning) => {
    setCharacterBuild(prev => ({ ...prev, [activeSlotIndex]: tuning }));
    setSlotLevels(prev => ({ ...prev, [activeSlotIndex]: 1 }));
  };

  const handleRemoveTuning = (e, index) => {
    e.stopPropagation();
    setCharacterBuild(prev => ({ ...prev, [index]: null }));
    setSlotLevels(prev => ({ ...prev, [index]: 1 }));
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
    showToast(t('creator_toast_max'), "success");
  };

  const handleCharacterChange = (newChar) => {
    setSelectedCharacter(newChar);
    setSelectedStyle(newChar?.personaje || null);
    setCharacterBuild({});
    setSlotLevels({});
    setActiveSlotIndex(null);
    setActiveSlotData(null);
    setIsTuningModalOpen(false);
  };

  // Unique personaje names from trajesData (used to detect standalone characters)
  const trajesPersonajes = useMemo(
    () => new Set(trajesData.map(t => t.personaje)),
    []
  );

  const availableStyles = useMemo(() => {
    if (!selectedCharacter?.personaje) return [];
    const baseName = selectedCharacter.personaje;

    // If the selected character has a STANDALONE variant in trajesData (e.g. "All For One"
    // has "All For One (Youth age)" as its own separate character), then ANY normalesData
    // entry with that parenthetical is a separate character, NOT a battle style.
    const hasStandaloneVariant = [...trajesPersonajes].some(
      p => p !== baseName && p.startsWith(`${baseName} (`)
    );

    return normalesData
      .filter(t => {
        if (t.personaje === baseName) return true;
        if (!t.personaje?.startsWith(`${baseName} (`)) return false;
        return !hasStandaloneVariant;
      })
      .map(t => t.personaje);
  }, [selectedCharacter, trajesPersonajes]);

  const getStyleLabel = (name) => {
    if (!name) return "";
    const match = name.match(/\((.*?)\)/);
    return match ? match[1] : "Base";
  };

  const handleExportBuild = () => {
    if (!selectedCharacter) {
      setModalConfig({
        isOpen: true, type: 'alert',
        title: t('creator_modal_no_char_title'),
        message: t('creator_modal_no_char_export'),
        onConfirm: () => {}
      });
      return;
    }
    const buildData = {
      characterName: selectedCharacter.personaje,
      styleName: selectedStyle || selectedCharacter.personaje,
      selectedCharacter, characterBuild, slotLevels
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(buildData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `MHUR_Build_${buildData.characterName.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    showToast(t('creator_toast_export'), "info");
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
          showToast(t('creator_toast_import_ok'), "success");
        } else {
          showToast(t('creator_toast_import_err'), "error");
        }
      } catch (error) {
        showToast(t('creator_toast_import_json_err'), "error");
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handlePublishBuild = async () => {
    const currentlyBlocked = localStorage.getItem('mhur_publish_blocked_until');
    if (currentlyBlocked && Date.now() < parseInt(currentlyBlocked)) {
      const timeLeft = Math.ceil((parseInt(currentlyBlocked) - Date.now()) / 1000);
      showToast(t('creator_toast_spam', timeLeft), "error");
      return;
    }

    let attemptsStr = localStorage.getItem('mhur_publish_attempts');
    let attempts = attemptsStr ? JSON.parse(attemptsStr) : [];
    const now = Date.now();
    attempts = attempts.filter(time => now - time < 30000);
    attempts.push(now);
    
    if (attempts.length >= 3) {
      localStorage.setItem('mhur_publish_blocked_until', (now + 60000).toString());
      localStorage.setItem('mhur_publish_attempts', JSON.stringify([]));
      showToast(t('creator_toast_spam_block'), "error");
      return;
    }
    localStorage.setItem('mhur_publish_attempts', JSON.stringify(attempts));

    if (!selectedCharacter) {
      setModalConfig({
        isOpen: true, type: 'alert',
        title: t('creator_modal_no_char_title'),
        message: t('creator_modal_no_char_publish'),
        onConfirm: () => {}
      });
      return;
    }

    if (!user) {
      setModalConfig({
        isOpen: true, type: 'alert',
        title: t('creator_modal_no_login_title'),
        message: t('creator_modal_no_login_msg'),
        onConfirm: () => {}
      });
      return;
    }

    setModalConfig({
      isOpen: true,
      type: 'confirm',
      title: isEditMode ? t('creator_modal_save_title') : t('creator_modal_publish_title'),
      message: isEditMode 
        ? t('creator_modal_save_msg', selectedCharacter._entrada?.nombre_completo || selectedCharacter.nombre_completo)
        : t('creator_modal_publish_msg', selectedCharacter._entrada?.nombre_completo || selectedCharacter.nombre_completo),
      onConfirm: async () => {
        const buildData = {
          characterName: selectedCharacter.personaje,
          styleName: selectedStyle || selectedCharacter.personaje,
          selectedCharacter, characterBuild, slotLevels
        };

        const tags = generateTags(characterBuild, slotLevels);
        const battleStyleLabel = getStyleLabel(selectedStyle || selectedCharacter.personaje);
        if (battleStyleLabel && battleStyleLabel !== "Base") {
          tags.unshift(`BStyle:${battleStyleLabel}`);
        }
        
        const outfitName = selectedCharacter._entrada?.nombre_completo || selectedCharacter.nombre_completo;
        if (outfitName) tags.push(`Traje:${outfitName}`);

        try {
          showToast(isEditMode ? t('creator_toast_saving') : t('creator_toast_publishing'), "info");
          
          const headers = { 'Content-Type': 'application/json' };
          if (token) headers['Authorization'] = `Bearer ${token}`;

          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
          const endpoint = isEditMode ? `${API_URL}/api/builds/${editBuildId}` : `${API_URL}/api/builds`;
          const method = isEditMode ? 'PUT' : 'POST';

          const response = await fetch(endpoint, {
            method,
            headers,
            body: JSON.stringify({
              character_name: buildData.characterName,
              creator_name: user?.username || 'Anónimo',
              build_data: buildData,
              tags: tags
            }),
          });

          if (response.ok) {
            showToast(isEditMode ? t('creator_toast_saved') : t('creator_toast_published', buildData.characterName), "success");
            
            if (isEditMode) {
               setIsEditMode(false);
               setEditBuildId(null);
            }

            setModalConfig({
              isOpen: true,
              type: 'success',
              title: isEditMode ? t('creator_modal_success_save_title') : t('creator_modal_success_publish_title'),
              message: isEditMode
                ? t('creator_modal_success_save_msg', buildData.characterName)
                : t('creator_modal_success_publish_msg', buildData.characterName),
              onConfirm: () => {
                 setSelectedCharacter(null);
                 setCharacterBuild({});
                 setSlotLevels({});
                 setActiveSlotIndex(null);
                 setActiveSlotData(null);
                 setSelectedStyle(null);
                 setIsEditMode(false);
                 setEditBuildId(null);
                 localStorage.removeItem('mhur_creator_character');
                 localStorage.removeItem('mhur_creator_build');
                 localStorage.removeItem('mhur_creator_levels');
                 localStorage.removeItem('mhur_creator_style');
                 navigate(isEditMode ? '/profile' : '/community');
              }
            });

          } else {
            const errorData = await response.json();
            if (response.status === 409) {
              setModalConfig({
                isOpen: true, type: 'alert',
                title: t('creator_modal_duplicate_title'),
                message: errorData.error,
                onConfirm: () => {}
              });
            } else {
              showToast(`Error: ${errorData.error || t('creator_toast_server_err')}`, "error");
            }
          }
        } catch (error) {
          showToast(t('creator_toast_server_err'), "error");
        }
      }
    });
  };

  const handleResetBuild = () => {
    setModalConfig({
      isOpen: true, type: 'confirm',
      title: t('creator_modal_reset_title'),
      message: t('creator_modal_reset_msg'),
      onConfirm: () => {
        setSelectedCharacter(null);
        setCharacterBuild({});
        setSlotLevels({});
        setActiveSlotIndex(null);
        setActiveSlotData(null);
        setIsTuningModalOpen(false);
        setIsEditMode(false);
        setEditBuildId(null);
        localStorage.removeItem('mhur_creator_character');
        localStorage.removeItem('mhur_creator_build');
        localStorage.removeItem('mhur_creator_levels');
        showToast(t('creator_toast_reset'), "info");
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
          <h2 style={{ marginBottom: '1.5rem' }}>{t('creator_char_config')}</h2>
          <CharacterSelector selectedChar={selectedCharacter} setSelectedChar={handleCharacterChange} />
        </section>

        {selectedCharacter?._entrada && (
          <section className="glass-panel" style={{ padding: '2rem', paddingBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <h2>{t('creator_slots_title')}</h2>
              <button 
                className="btn-rainbow-max" 
                onClick={handleMaxAllLevels}
                title={t('creator_btn_max_title')}
              >{t('creator_btn_max')}</button>
              <button 
                className="action-btn" 
                title={t('creator_btn_reset_title')}
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
              >{t('creator_btn_reset')}</button>
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
                title={t('creator_btn_import_title')}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                {t('creator_btn_import')}
              </button>
              <input 
                type="file" accept=".json" style={{ display: 'none' }} 
                ref={fileInputRef} onChange={handleImportBuild}
              />
              <button 
                className="action-btn export-btn" 
                title={t('creator_btn_export_title')}
                onClick={handleExportBuild}
              >
                {t('creator_btn_export')}
              </button>
              <button 
                className={`action-btn publish-btn ${isEditMode ? 'edit-mode-active' : ''}`} 
                title={isEditMode ? t('creator_btn_save_title') : t('creator_btn_publish_title')}
                onClick={handlePublishBuild}
                style={isEditMode ? { backgroundColor: '#5865F2' } : {}}
              >
                <FiShare2 /> {isEditMode ? t('creator_btn_save') : t('creator_btn_publish')}
              </button>
            </div>
            <h2 className="summary-title">{t('creator_summary')}</h2>
          </div>
          
          {selectedCharacter && (
            <div className="summary-character-info" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="char-label">{t('creator_char_label')}</span>
                <span className="char-name" style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>
                  {selectedCharacter.personaje}
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', opacity: 0.8 }}>
                <span className="char-label">{t('creator_outfit_label')}</span>
                <span className="char-name">
                  {translateNombreCompleto(
                    selectedCharacter._entrada?.nombre_completo || selectedCharacter.nombre_completo,
                    lang
                  )}
                </span>
              </div>
              
              {availableStyles.length > 1 && (
                <div className="battle-style-selector" style={{ marginTop: '0.5rem', width: '100%' }}>
                  <span className="style-label">{t('creator_style_label')}</span>
                  <div className="style-options">
                    {availableStyles.map(style => (
                      <button 
                        key={style}
                        className={`style-opt-btn ${selectedStyle === style ? 'active' : ''}`}
                        onClick={() => setSelectedStyle(style)}
                      >
                        {translateBattleStyleLabel(getStyleLabel(style), lang)}
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
