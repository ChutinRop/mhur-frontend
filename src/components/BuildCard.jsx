import React from 'react';
import { FiDownload, FiUser, FiCalendar, FiTrendingUp, FiEdit, FiTrash2 } from 'react-icons/fi';
import { getAnyCharacterImage, getCharacterImage } from '../data/characterImages';
import trajesData from '../data/trajes_es.json';
import { useT } from '../context/LanguageContext';
import { translateNombreCompleto, translateTag, translateBattleStyleLabel } from '../utils/gameTranslation';

export const getClassColor = (clase) => {
  switch (clase) {
    case 'Apoyo':     return '#00ff00';
    case 'Daño':      return '#ff0000';
    case 'Tanque':    return '#ffff00';
    case 'Técnico':   return '#b026ff';
    case 'Velocista': return '#00d5ff';
    default:          return '#888888';
  }
};

export default function BuildCard({ build, onImport, onEdit, onDelete, showActions = true }) {
  const { t, lang } = useT();

  // 1. Intentar obtener imagen de la build guardada
  let costumeImg = build.build_data?.selectedCharacter?.imagen_url || null;
  
  const normalizeOutfitName = (name) => {
    if (!name) return '';
    return name.toLowerCase()
      .replace(/traje\sde|traje|costume|ver\.|ver| - |\(|\)/gi, '')
      .replace(/\s+/g, '');
  };

  // 2. Fallback: buscarla en trajesData
  const outfitTag = build.tags?.find(t => t.startsWith('Traje:'))?.replace('Traje:', '');
  const outfitName = outfitTag || build.build_data?.selectedCharacter?.nombre_completo;
  
  if (outfitName) {
     const normalizedSearch = normalizeOutfitName(outfitName);
     
     let found = trajesData.find(tr => 
         tr.personaje === build.character_name && 
         normalizeOutfitName(tr.nombre_completo) === normalizedSearch
     );
     
     if (!found) {
         const baseOutfitName = outfitName.split(' - ')[0];
         const normalizedBase = normalizeOutfitName(baseOutfitName);
         found = trajesData.find(tr => 
             tr.personaje === build.character_name && 
             normalizeOutfitName(tr.traje).includes(normalizedBase) && 
             (tr.variante === 'Por Defecto' || !tr.variante)
         );
     }
     
     if (!found) {
        found = trajesData.find(tr => tr.personaje === build.character_name);
     }

     if (found) {
        costumeImg = found.imagen_url;
     }
  }

  const targetCharName = build.build_data?.styleName || build.build_data?.selectedCharacter?.personaje;
  const charPortrait = targetCharName
    ? getAnyCharacterImage(targetCharName, 'normal')
    : null;

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
              {translateNombreCompleto(
                build.tags?.find(tag => tag.startsWith('Traje:'))?.replace('Traje:', '') ||
                build.build_data?.selectedCharacter?.nombre_completo ||
                build.character_name,
                lang
              )}
            </div>
          </div>
        </div>
      </div>

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
            ⚔️ {translateBattleStyleLabel(
              build.tags?.find(t => t.startsWith('BStyle:'))?.replace('BStyle:', '') ||
              getStyleLabel(build.build_data?.styleName, build.character_name),
              lang
            )}
          </span>
        )}
        {build.tags && build.tags.filter(tag => !tag.startsWith('BStyle:') && !tag.startsWith('Traje:')).slice(0, 4).map((tag, i) => (
          <span key={i} className={`tag-badge ${tag === 'Berserker' ? 'berserker' : 'normal'}`}>
            {translateTag(tag, lang)}
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
        
        {showActions && (
          <div className="build-card-actions" style={{ display: 'flex', gap: '8px' }}>
            {onImport && (
              <button className="import-btn-community" onClick={() => onImport(build._id)}>
                <FiDownload size={16} /> {t('card_import')}
              </button>
            )}
            
            {onEdit && (
              <button className="edit-btn-profile" onClick={() => onEdit(build)} style={{ background: 'rgba(88, 101, 242, 0.2)', color: '#5865F2', border: '1px solid rgba(88, 101, 242, 0.4)', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', flex: 1, justifyContent: 'center' }}>
                <FiEdit size={14} /> {t('card_edit')}
              </button>
            )}
            
            {onDelete && (
              <button className="delete-btn-profile" onClick={() => onDelete(build._id)} style={{ background: 'rgba(255,0,0,0.2)', color: '#ff6b6b', border: '1px solid rgba(255,0,0,0.4)', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', flex: 1, justifyContent: 'center' }}>
                <FiTrash2 size={14} /> {t('card_delete')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
