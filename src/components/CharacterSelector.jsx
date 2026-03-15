import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiCheck } from 'react-icons/fi';
import trajesData from '../data/trajes_es.json';
import { getAnyCharacterImage } from '../data/characterImages';
import './CharacterSelector.css';

export default function CharacterSelector({ selectedChar, setSelectedChar }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState('character'); // 'character' | 'costume'
  const [tempCharName, setTempCharName] = useState(null);

  // Lista única de personajes
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

  // Datos para la vista de Trajes (agrupados por 'traje')
  const trajesAgrupados = useMemo(() => {
    if (!tempCharName) return {};
    const entries = trajesData.filter(t => t.personaje === tempCharName);
    const map = {};
    for (const e of entries) {
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
      {/* ── Main View (Button or Selected Card) ── */}
      {!selectedChar ? (
        <button className="btn-primary" onClick={openCharacterModal}>
          Seleccionar Personaje
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
              <strong>Estilo:</strong> {selectedChar.traje} <br />
              <strong>Traje:</strong> {selectedChar.variante}
            </div>
            <div className="change-buttons">
              <button className="btn-secondary" onClick={openCharacterModal}>Cambiar Personaje</button>
              <button className="btn-secondary" onClick={() => openCostumeModal(selectedChar.personaje)}>Cambiar Traje</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Overlay via Portal ── */}
      {isModalOpen && createPortal(
        <div className="char-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="char-modal-content" onClick={e => e.stopPropagation()}>
            
            <div className="modal-header">
              <h3>
                {modalStep === 'character' ? 'Selecciona un Personaje' : `Selecciona un Traje: ${tempCharName}`}
              </h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              {/* STAGE 1: Character Grid */}
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

              {/* STAGE 2: Costume Grid by Style */}
              {modalStep === 'costume' && (
                <div>
                  {/* Option to go back to character selection */}
                  {!selectedChar && (
                    <button className="btn-secondary" style={{ marginBottom: '1.5rem' }} onClick={openCharacterModal}>
                      &larr; Volver
                    </button>
                  )}

                  {Object.entries(trajesAgrupados).map(([estilo, variantes]) => (
                    <div key={estilo} className="costume-section">
                      <div className="costume-section-header">
                        {estilo}
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
                                {/* Placeholder since we don't have costume images yet */}
                                <div className="costume-img-placeholder">
                                  {v.variante}
                                </div>
                              </div>
                              <span className="costume-name">{v.variante}</span>
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
