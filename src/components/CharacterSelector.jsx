import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiCheck } from 'react-icons/fi';
import trajesData from '../data/trajes_es.json';
import { getAnyCharacterImage } from '../data/characterImages';
import { useT } from '../context/LanguageContext';
import { translateTraje, translateVariante } from '../utils/gameTranslation';
import './CharacterSelector.css';

export default function CharacterSelector({ selectedChar, setSelectedChar }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState('character');
  const [tempCharName, setTempCharName] = useState(null);
  const { t, lang } = useT();

  const personajes = useMemo(() => [...new Set(trajesData.map(t => t.personaje))], []);

  const openCharacterModal = () => {
    setModalStep('character');
    setIsModalOpen(true);
  };

  const openCostumeModal = (charName) => {
    setTempCharName(charName || selectedChar?.personaje);
    setModalStep('costume');
    setIsModalOpen(true);
  };

  const handleSelectCharacter = (p) => {
    setTempCharName(p);
    setModalStep('costume');
  };

  const handleSelectCostume = (entrada) => {
    setSelectedChar({
      personaje: entrada.personaje,
      traje: entrada.traje,
      variante: entrada.variante,
      nombre_completo: entrada.nombre_completo,
      _entrada: entrada
    });
    setIsModalOpen(false);
  };

  const trajesAgrupados = useMemo(() => {
    if (!tempCharName) return {};
    const entries = trajesData.filter(t => t.personaje === tempCharName);
    const map = {};
    const seen = new Set(); // deduplicate by traje+variante
    for (const e of entries) {
      const key = `${e.traje}::${e.variante}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (!map[e.traje]) map[e.traje] = [];
      map[e.traje].push(e);
    }
    return map;
  }, [tempCharName]);

  const selectedPortrait = selectedChar
    ? getAnyCharacterImage(selectedChar.personaje, 'normal')
    : null;

  return (
    <div className="character-selector-container">
      {!selectedChar ? (
        <button className="btn-primary" onClick={openCharacterModal}>
          {t('char_btn_select')}
        </button>
      ) : (
        <div className="selected-char-card">
          <img
            src={selectedPortrait || '/assets/Images/placeholder.png'}
            alt={selectedChar.personaje}
            className="selected-char-portrait"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="selected-char-info">
            <h3 className="selected-char-name">{selectedChar.personaje}</h3>
            <div className="selected-char-details">
              <strong>{t('char_style_label')}</strong> {translateTraje(selectedChar.traje, lang)} <br />
              <strong>{t('char_outfit_label')}</strong> {translateVariante(selectedChar.variante, lang)}
            </div>
            <div className="change-buttons">
              <button className="btn-secondary" onClick={openCharacterModal}>{t('char_btn_change_char')}</button>
              <button className="btn-secondary" onClick={() => openCostumeModal(selectedChar.personaje)}>{t('char_btn_change_outfit')}</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && createPortal(
        <div className="char-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="char-modal-content" onClick={e => e.stopPropagation()}>
            
            <div className="modal-header">
              <h3>
                {modalStep === 'character' ? t('char_modal_select_char') : t('char_modal_select_outfit', tempCharName)}
              </h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              {modalStep === 'character' && (
                <div className="char-grid">
                  {personajes.map(p => {
                    const img = getAnyCharacterImage(p, 'normal');
                    return (
                      <button key={p} className="char-btn" onClick={() => handleSelectCharacter(p)}>
                        {img ? (
                          <img src={img} alt={p} />
                        ) : (
                          <div style={{ width: '80px', height: '80px', background: '#333', borderRadius: '4px' }} />
                        )}
                        <span>{p}</span>
                      </button>
                    )
                  })}
                </div>
              )}

              {modalStep === 'costume' && (
                <div>
                  {!selectedChar && (
                    <button className="btn-secondary" style={{ marginBottom: '1.5rem' }} onClick={openCharacterModal}>
                      {t('char_btn_back')}
                    </button>
                  )}

                  {Object.entries(trajesAgrupados).map(([estilo, variantes]) => (
                    <div key={estilo} className="costume-section">
                      <div className="costume-section-header">
                        {translateTraje(estilo, lang)}
                      </div>
                      
                      <div className="costume-grid">
                        {variantes.map(v => {
                          const isSelected = selectedChar?.personaje === v.personaje &&
                                             selectedChar?.traje === v.traje &&
                                             selectedChar?.variante === v.variante;

                          return (
                            <button
                              key={v.nombre_completo}
                              className={`costume-btn ${isSelected ? 'selected' : ''}`}
                              onClick={() => handleSelectCostume(v)}
                            >
                              <div className="costume-btn-inner">
                                {v.imagen_url ? (
                                  <img 
                                    src={v.imagen_url} 
                                    alt={v.variante} 
                                    className="costume-img" 
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="costume-img-placeholder">
                                    {v.variante}
                                  </div>
                                )}
                              </div>
                              <span className="costume-name">{translateVariante(v.variante, lang)}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
