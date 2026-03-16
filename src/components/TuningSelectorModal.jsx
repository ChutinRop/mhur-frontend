import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import './TuningSelectorModal.css';

import normalesData from '../data/tunnings_normales.json';
import especialesData from '../data/tunnings_especiales.json';
import { getAnyCharacterImage } from '../data/characterImages';

const TuningSelectorModal = ({ isOpen, onClose, slotData, characterData, characterBuild, activeSlotIndex, onSelectTuning, selectedStyle }) => {
  if (!isOpen || !slotData || !characterData) return null;

  const tunings = useMemo(() => {
    const { tipo, clase } = slotData;
    const { personaje } = characterData;

    let availableTunings = [];

    // Collect base character names (without variant suffix) already equipped in OTHER slots
    // Only block exact same personaje to prevent true duplicates.
    // Different characters that share a skill name are still allowed.
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

    if (tipo === 'Especial') {
      availableTunings = filteredEspeciales.filter(t => 
        !alreadyEquippedPersonajes.has(t.personaje) && t.personaje !== selectedStyle
      );
    } else {
      filteredNormales.forEach(normalMatch => {
        if (normalMatch.habilidades && 
            !alreadyEquippedPersonajes.has(normalMatch.personaje) && 
            normalMatch.personaje !== selectedStyle) {
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

  // Group the tunings by character name so we can render one card per character
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

  // Helper to determine badge color based on role
  const getBadgeClass = (rol) => {
    if (rol === 'Héroe') return 'hero';
    if (rol === 'Villano') return 'villain';
    return '';
  };

  const handleSelect = (tuning) => {
    // Determine the actual skill name property (habilidad usually)
    onSelectTuning(tuning);
    onClose();
  };

  return createPortal(
    <div className="tuning-modal-overlay" onClick={onClose}>
      <div className="tuning-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="tuning-modal-header">
          <h3>Seleccionar Tuning {slotData.tipo}</h3>
          <button className="tuning-modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="tuning-modal-body">
          {groupedTunings.length === 0 ? (
            <div className="no-tunnings-message">
              No se encontraron tunnings {slotData.tipo}s para este personaje.
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
                      <div className="tuning-card-char">{group.personaje}</div>
                      <div className="tuning-card-badges">
                        <span className={`tuning-badge ${getBadgeClass(group.rol)}`}>
                          {group.rol}
                        </span>
                        <span className="tuning-badge class-tag" style={{ borderBottom: `2px solid ${classColorHex}`}}>
                          {group.clase}
                        </span>
                      </div>
                    </div>
                    
                    {/* Render each specific ability under this character */}
                    {group.habilidades.map((ability, abiIdx) => {
                      const title = ability.habilidad || "Habilidad Desconocida";
                      const desc = ability.descripcion || "";
                      const subDesc = ability.subir_nivel || "Sube de nivel para aumentar el tiempo del efecto.";
                      const levels = ability.niveles || {};

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
                                Nivel {lvlKey}: <strong>{levels[lvlKey]}</strong>
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

// Helper for generic class colors inside the modal
function getClassColor(clase) {
  switch (clase) {
    case 'Tanque': return '#ffff00'; // Yellowish
    case 'Daño': return '#ff0000';   // Red
    case 'Técnico': return '#a020f0'; // Purple
    case 'Apoyo': return '#00ff00';  // Green
    case 'Velocista': return '#00bfff'; // Blue
    default: return '#ffffff';
  }
}

export default TuningSelectorModal;
