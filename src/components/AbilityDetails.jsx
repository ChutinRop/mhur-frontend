import React from 'react';
import { useT } from '../context/LanguageContext';
import './AbilityDetails.css';

export default function AbilityDetails({ ability }) {
  const { t } = useT();
  if (!ability) {
    return (
      <div className="ability-details-placeholder glass-panel">
        <p>{t('ability_select_placeholder')}</p>
      </div>
    );
  }

  return (
    <div className="ability-details">
      {/* Icon/Color Block (Left) */}
      <div className="ability-icon-block" style={{ backgroundColor: ability.color }}>
        <div className="ability-icon-inner"></div>
      </div>

      {/* Details (Right) */}
      <div className="ability-info">
        <h4 className="ability-char-name">{ability.character}</h4>
        <h3 className="ability-name">{ability.name}</h3>
        
        <p className="ability-desc-text">
          <span className="ability-desc-icon">▶</span> {ability.description}
        </p>

        <div className="ability-level-info">
          <p className="level-up-text">{ability.levelUpText}</p>
          
          <div className="levels-grid">
            {ability.levels.map((val, index) => (
              <div key={index} className="level-item">
                <span className="level-label">{t('db_level', index + 1)}</span> {val}
              </div>
            ))}
          </div>
          
          <p className="sub-effect">{ability.subEffect}</p>
        </div>
      </div>
    </div>
  );
}
