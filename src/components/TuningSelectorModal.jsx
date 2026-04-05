import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import { useT } from '../context/LanguageContext';
import { translateTuning, translateClass, translateRole, translatePersonajeName } from '../utils/gameTranslation';
import './TuningSelectorModal.css';

import normalesData from '../data/tunnings_normales.json';
import especialesData from '../data/tunnings_especiales.json';
import trajesData from '../data/trajes_es.json';
import { getAnyCharacterImage } from '../data/characterImages';

const TuningSelectorModal = ({ isOpen, onClose, slotData, characterData, characterBuild, activeSlotIndex, onSelectTuning, selectedStyle }) => {
  const { t, lang } = useT();

  if (!isOpen || !slotData || !characterData) return null;

  const tunings = useMemo(() => {
    const { tipo, clase } = slotData;
    const { personaje } = characterData;

    let availableTunings = [];

    const alreadyEquippedPersonajes = new Set();
    const activeKey = String(activeSlotIndex);
    if (characterBuild) {
      Object.entries(characterBuild).forEach(([slotKey, equipped]) => {
        if (slotKey !== activeKey && equipped) {
          const items = Array.isArray(equipped) ? equipped : [equipped];
          items.forEach(t => {
            if (t?.personaje) alreadyEquippedPersonajes.add(t.personaje);
          });
        }
      });
    }

    let filteredEspeciales = especialesData.filter(t => t.clase === clase);
    let filteredNormales = normalesData.filter(t => t.clase === clase);

    if (slotData.rol !== 'Universal') {
      filteredEspeciales = filteredEspeciales.filter(t => t.rol === slotData.rol);
      filteredNormales = filteredNormales.filter(t => t.rol === slotData.rol);
    }

    const getBaseName = (name) => name.split('(')[0].trim().toLowerCase();
    const currentPersonaje = characterData.personaje;
    const currentBaseName = getBaseName(currentPersonaje);

    // ── Standalone sibling detection ──────────────────────────────────────────
    // If the current character AND another character share the same base name but
    // BOTH exist as independent personajes in trajesData (e.g. "All For One" and
    // "All For One (Youth age)"), they are DIFFERENT characters and should be able
    // to equip each other's tunings.
    const trajesPersonajesSet = new Set(trajesData.map(t => t.personaje));
    const hasStandaloneSibling = [...trajesPersonajesSet].some(
      p => p !== currentPersonaje && getBaseName(p) === currentBaseName
    );

    /**
     * Returns true if the given tuning personaje belongs to the SAME character
     * as the currently selected one (and should therefore be excluded).
     */
    const isSameCharacter = (tuningPersonaje) => {
      const tuningBaseName = getBaseName(tuningPersonaje);
      if (tuningBaseName !== currentBaseName) return false; // Different family
      if (!hasStandaloneSibling) return true; // Standard: same base = same char
      // Distinguish siblings by whether the name has a parenthetical variant:
      // - (no variant) = base character (e.g. "All For One")
      // - (with variant) = the other standalone character (e.g. "All For One (Youth age)")
      return tuningPersonaje.includes('(') === currentPersonaje.includes('(');
    };

    if (tipo === 'Especial') {
      availableTunings = filteredEspeciales.filter(t => 
        !alreadyEquippedPersonajes.has(t.personaje) && 
        !isSameCharacter(t.personaje)
      );
    } else {
      filteredNormales.forEach(normalMatch => {
        if (normalMatch.habilidades && 
            !alreadyEquippedPersonajes.has(normalMatch.personaje) &&
            !isSameCharacter(normalMatch.personaje)) {
          normalMatch.habilidades.forEach(hab => {
            availableTunings.push({
              ...hab,
              personaje: normalMatch.personaje,
              rol: normalMatch.rol,
              clase: normalMatch.clase,
              sub_efectos: hab.sub_efectos || null,
              subir_nivel: hab.subir_nivel || "Sube de nivel para aumentar el efecto."
            });
          });
        }
      });
    }

    return availableTunings;
  }, [slotData, characterData, characterBuild, activeSlotIndex]);

  const groupedTunings = useMemo(() => {
    const groups = {};
    tunings.forEach(t => {
      const charName = t.personaje;
      if (!groups[charName]) {
        groups[charName] = {
          personaje: charName,
          rol: t.rol,
          clase: t.clase,
          imageType: slotData.tipo === 'Especial' ? 'especial' : 'normal',
          habilidades: []
        };
      }
      groups[charName].habilidades.push(t);
    });
    return Object.values(groups);
  }, [tunings, slotData.tipo]);

  const getBadgeClass = (rol) => {
    if (rol === 'Héroe') return 'hero';
    if (rol === 'Villano') return 'villain';
    return '';
  };

  const handleSelect = (tuning) => {
    onSelectTuning(tuning);
    onClose();
  };

  return createPortal(
    <div className="tuning-modal-overlay" onClick={onClose}>
      <div className="tuning-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="tuning-modal-header">
          <h3>{t('tuning_modal_title', slotData.tipo)}</h3>
          <button className="tuning-modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="tuning-modal-body">
          {groupedTunings.length === 0 ? (
            <div className="no-tunnings-message">
              {t('tuning_no_results', slotData.tipo)}
            </div>
          ) : (
            groupedTunings.map((group, groupIdx) => {
              const classColorHex = getClassColor(slotData.clase); 
              const iconImage = getAnyCharacterImage(group.personaje, group.imageType) || "/assets/Images/Rank/No_Rank.png"; 

                return (
                  <div 
                    key={groupIdx} 
                    className="tuning-card" 
                    onClick={() => handleSelect(group.habilidades)}
                    style={{ borderLeft: `6px solid ${classColorHex}` }}
                  >
                  <div className="tuning-card-icon-container">
                    <img src={iconImage} alt={group.personaje} />
                  </div>

                  <div className="tuning-card-info-group">
                    <div className="tuning-card-top-row">
                      <div className="tuning-card-char">{translatePersonajeName(group.personaje, lang)}</div>
                      <div className="tuning-card-badges">
                        <span className={`tuning-badge ${getBadgeClass(group.rol)}`}>
                          {translateRole(group.rol, lang)}
                        </span>
                        <span className="tuning-badge class-tag" style={{ borderBottom: `2px solid ${classColorHex}`}}>
                          {translateClass(group.clase, lang)}
                        </span>
                      </div>
                    </div>
                    
                    {group.habilidades.map((ability, abiIdx) => {
                      const ta = translateTuning(ability, lang);
                      const title   = ta.habilidad   || 'Unknown Ability';
                      const desc    = ta.descripcion || '';
                      const subDesc = ta.subir_nivel || '';
                      const levels  = ability.niveles || {};

                      return (
                        <div 
                          key={abiIdx} 
                          className="tuning-ability-row"
                        >
                          <div className="tuning-title-container">
                             <h4 className="tuning-card-title marquee-text">{title}</h4>
                          </div>
                          <div className="tuning-card-desc">
                            <span>▶</span> {desc}
                          </div>
                          <div className="tuning-card-sub-desc">
                            {subDesc}
                          </div>
                          <div className="tuning-card-levels">
                            {Object.keys(levels).slice(0, 11).map((lvlKey) => (
                              <span key={lvlKey}>
                                {t('tuning_level', lvlKey)} <strong>{levels[lvlKey]}</strong>
                              </span>
                            ))}
                          </div>
                          {ability.sub_efectos && (
                            <div className="tuning-card-subs">
                              {Object.keys(ability.sub_efectos).map(subKey => (
                                <span key={subKey}>Sub Effect {subKey}: {ability.sub_efectos[subKey]}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

function getClassColor(clase) {
  switch (clase) {
    case 'Tanque': return '#ffff00';
    case 'Daño': return '#ff0000';
    case 'Técnico': return '#a020f0';
    case 'Apoyo': return '#00ff00';
    case 'Velocista': return '#00bfff';
    default: return '#ffffff';
  }
}

export default TuningSelectorModal;
