import React from 'react';
import { FiX } from 'react-icons/fi';
import { getCharacterImage } from '../data/characterImages';
import './TunerSlot.css';

const getClassColor = (clase) => {
  switch (clase) {
    case 'Apoyo':     return '#00ff00'; // Bright Green
    case 'Daño':      return '#ff0000'; // Bright Red
    case 'Tanque':    return '#ffff00'; // Bright Yellow
    case 'Técnico':   return '#b026ff'; // Purple
    case 'Velocista': return '#00d5ff'; // Cyan/Blue
    default:          return '#888888';
  }
};

export default function TunerSlot({ 
  number, 
  data, 
  isSelected = false,
  isSpecial = false,
  slotPosition = null,
  heroOrVillain = null,
  onClick,
  onRemove,
  level = 1,
  onLevelChange,
  selectedTuning = null
}) {
  // data contains { tipo, clase, rol } from trajes_es.json
  const color = data ? getClassColor(data.clase) : '#444';

  let maxLevel = 1;
  let tuningRole = '';
  
  // Safely get the first tuning item if it's an array
  const hasSelection = selectedTuning && (Array.isArray(selectedTuning) ? selectedTuning.length > 0 : true);
  const mainTuning = hasSelection ? (Array.isArray(selectedTuning) ? selectedTuning[0] : selectedTuning) : null;

  if (mainTuning) {
    tuningRole = mainTuning.rol; // 'Universal', 'Héroe', 'Villano'
    if (isSpecial) {
      // Left Special slot max level is 10, Right is 11
      maxLevel = (slotPosition === 'left') ? 10 : 11;
    } else {
      // Normal slots: if the SLOTS role is not Universal, it gets 1 extra level (max 4)
      maxLevel = (data?.rol === 'Universal') ? 3 : 4;
    }
  }

  if (isSpecial) {
    return (
      <div 
        className={`tuner-slot-special ${selectedTuning ? 'locked' : ''}`} 
        style={{ borderColor: color, cursor: selectedTuning ? 'default' : 'pointer' }} 
        onClick={selectedTuning ? undefined : onClick}
      >
        {selectedTuning && (
          <button className="slot-remove-btn" onClick={onRemove} title="Desequipar Tuning">
            <FiX />
          </button>
        )}
        <div className="special-header">
          <h4>
            {selectedTuning 
              ? (Array.isArray(selectedTuning) 
                  ? selectedTuning.map(t => t.habilidad).join(' & ') 
                  : selectedTuning.habilidad) 
              : 'Habilidad especial de Tuning'}
          </h4>
          <div className="special-badge" style={{ backgroundColor: color }}>
            {selectedTuning && (
              <img 
                src={getCharacterImage(
                  mainTuning?.personaje, 
                  mainTuning?.rol,
                  mainTuning?.clase,
                  'especial'
                ) || "/assets/Images/Rank/No_Rank.png"} 
                alt="Tuning Icon" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  clipPath: 'polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%)',
                  WebkitClipPath: 'polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%)'
                }}
              />
            )}
          </div>
        </div>
        <div className="special-footer">
          <div className="special-level-controls">
            {selectedTuning ? (
              <div className="level-controls-group">
                <span className="level-display-text" style={{ marginRight: '8px' }}>Nv. {level}</span>
                <button 
                  className="lvl-btn"
                  onClick={(e) => onLevelChange(e, -1, maxLevel)} 
                  disabled={level <= 1}>-</button>
                <button 
                  className="lvl-btn"
                  onClick={(e) => onLevelChange(e, 1, maxLevel)} 
                  disabled={level >= maxLevel}>+</button>
              </div>
            ) : (
              <span style={{ opacity: 0.5, fontSize: '0.75rem' }}>Ranura vacía</span>
            )}
            
            <span className="role-text-special">
              {tuningRole 
                ? (tuningRole === 'Universal' ? 'UNIVERSAL' : (tuningRole === 'Héroe' ? 'HÉROES' : 'VILLANOS'))
                : (heroOrVillain === 'Héroe' ? 'HÉROES' : (heroOrVillain === 'Villano' ? 'VILLANOS' : 'UNIVERSAL'))
              }
            </span>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div 
      className={`tuner-slot-container ${isSelected ? 'selected' : ''} ${selectedTuning ? 'locked' : ''}`} 
      onClick={selectedTuning ? undefined : onClick}
      style={{ cursor: selectedTuning ? 'default' : 'pointer' }}
    >
      {selectedTuning && (
        <button className="slot-remove-btn" onClick={onRemove} title="Desequipar Tuning">
          <FiX />
        </button>
      )}
      {/* Background layered shadows */}
      <div className="slot-shadow-1"></div>
      <div className="slot-shadow-2"></div>
      
      {/* Main Box */}
      <div className="slot-main">
        <div className="slot-content unlocked">
          <span className="slot-number-unlocked">{number}</span>
          <div className="slot-title" style={{ fontSize: selectedTuning ? '1.0rem' : '1.3rem' }}>
            {selectedTuning 
              ? (Array.isArray(selectedTuning) 
                  ? selectedTuning.map((t, i) => <div key={i}>{t.habilidad}</div>) 
                  : selectedTuning.habilidad) 
              : 'Sin configurar'}
          </div>
          <div className="slot-level-band" style={{ backgroundColor: color }}>
            <span className="level-text">
              Nv. <strong>{level}</strong>
              {selectedTuning && (
                <span className="level-controls-group" style={{ marginLeft: '10px' }}>
                  <button 
                    className="lvl-btn"
                    onClick={(e) => onLevelChange(e, -1, maxLevel)} 
                    disabled={level <= 1}>-</button>
                  <button 
                    className="lvl-btn"
                    onClick={(e) => onLevelChange(e, 1, maxLevel)} 
                    disabled={level >= maxLevel}>+</button>
                </span>
              )}
            </span>
            {data?.rol === 'Héroe' && <span className="role-text">HÉROES</span>}
            {data?.rol === 'Villano' && <span className="role-text">VILLANOS</span>}
          </div>
        </div>
        
        <div className="class-hexagon" style={{ backgroundColor: color }}>
          {selectedTuning ? (
            <img 
               src={getCharacterImage(
                 mainTuning?.personaje, 
                 mainTuning?.rol,
                 mainTuning?.clase,
                 'normal'
               ) || "/assets/Images/Rank/No_Rank.png"} 
               alt="Tuning Owner" 
               style={{ 
                 position: 'absolute',
                 width: 'calc(100% - 6px)', 
                 height: 'calc(100% - 6px)', 
                 objectFit: 'cover', 
                 zIndex: 10,
                 clipPath: 'polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%)',
                 WebkitClipPath: 'polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%)',
                 backgroundColor: '#333'
               }}
            />
          ) : (
            <div className="hexagon-inner"></div>
          )}
        </div>
      </div>
    </div>
  );
}
