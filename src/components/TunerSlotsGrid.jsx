import React from 'react';
import TunerSlot from './TunerSlot';
import './TunerSlotsGrid.css';

export default function TunerSlotsGrid({ 
  selectedChar, 
  activeSlotIndex, 
  onSlotClick,
  characterBuild = {},
  slotLevels = {},
  onRemoveTuning,
  onLevelChange
}) {
  // Wait for full selection
  if (!selectedChar || !selectedChar._entrada) return null;

  const { _entrada } = selectedChar;
  const ranuras = _entrada.ranuras || []; // Array of 12

  // Split into left (indices 0..5) and right (indices 6..11)
  const leftSlots = ranuras.slice(0, 6);
  const rightSlots = ranuras.slice(6, 12);

  // The left column is always for Héroes, right for Villanos (by game design)
  const leftSpecial = leftSlots.find(r => r.tipo === 'Especial');
  const rightSpecial = rightSlots.find(r => r.tipo === 'Especial');

  // Read roles directly from the JSON data — index 0 = left special, index 6 = right special
  const leftRole = leftSpecial?.rol || 'Universal';
  const rightRole = rightSpecial?.rol || 'Villano';

  return (
    <div className="tuner-slots-grid-container">
      {/* ── LEFT COLUMN ── */}
      <div className="slots-column">
        {/* The Special Header Slot */}
        <TunerSlot 
          isSpecial={true} 
          slotPosition={'left'}
          heroOrVillain={leftRole} 
          data={leftSpecial}
          isSelected={activeSlotIndex === 'left-special'}
          onClick={() => onSlotClick({ index: 'left-special', data: leftSpecial })}
          selectedTuning={characterBuild['left-special']}
          level={slotLevels['left-special'] || 1}
          onRemove={(e) => onRemoveTuning(e, 'left-special')}
          onLevelChange={(e, delta, max) => onLevelChange(e, 'left-special', delta, max)}
        />
        
        {/* Render slots 1 to 5 (Indices 1 to 5 from leftSlots) */}
        {leftSlots.slice(1).map((slot, idx) => {
          const globalIdx = idx + 1; // 1 to 5
          return (
            <TunerSlot 
              key={`left-${globalIdx}`}
              number={globalIdx}
              data={slot}
              isSelected={activeSlotIndex === globalIdx}
              onClick={() => onSlotClick({ index: globalIdx, data: slot })}
              selectedTuning={characterBuild[globalIdx]}
              level={slotLevels[globalIdx] || 1}
              onRemove={(e) => onRemoveTuning(e, globalIdx)}
              onLevelChange={(e, delta, max) => onLevelChange(e, globalIdx, delta, max)}
            />
          );
        })}
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div className="slots-column">
        {/* The Special Header Slot */}
        <TunerSlot 
          isSpecial={true} 
          slotPosition={'right'}
          heroOrVillain={rightRole} 
          data={rightSpecial}
          isSelected={activeSlotIndex === 'right-special'}
          onClick={() => onSlotClick({ index: 'right-special', data: rightSpecial })}
          selectedTuning={characterBuild['right-special']}
          level={slotLevels['right-special'] || 1}
          onRemove={(e) => onRemoveTuning(e, 'right-special')}
          onLevelChange={(e, delta, max) => onLevelChange(e, 'right-special', delta, max)}
        />

        {/* Render slots 6 to 10 (Indices 1 to 5 from rightSlots) */}
        {rightSlots.slice(1).map((slot, idx) => {
          const globalIdx = idx + 6; // 6 to 10
          return (
            <TunerSlot 
              key={`right-${globalIdx}`}
              number={globalIdx}
              data={slot}
              isSelected={activeSlotIndex === globalIdx}
              onClick={() => onSlotClick({ index: globalIdx, data: slot })}
              selectedTuning={characterBuild[globalIdx]}
              level={slotLevels[globalIdx] || 1}
              onRemove={(e) => onRemoveTuning(e, globalIdx)}
              onLevelChange={(e, delta, max) => onLevelChange(e, globalIdx, delta, max)}
            />
          );
        })}
      </div>
    </div>
  );
}
