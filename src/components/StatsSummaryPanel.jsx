import React, { useMemo, useState } from 'react';
import './StatsSummaryPanel.css';

// ─── Helper: Parse a numeric value from a level string like "+2.5%" or "+15 altura" ───
function parseNumeric(str) {
  if (typeof str === 'number') return str;
  const match = String(str).match(/[+-]?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}

// ─── Helper: Convert seconds to "X min Y s" or "Y s" format ───
function formatTimeDisplay(totalSecs) {
  if (!totalSecs || totalSecs === 0) return '0s';
  const mins = Math.floor(totalSecs / 60);
  const secs = Math.round(totalSecs % 60);
  
  if (mins > 0) {
    return secs > 0 ? `${mins} min ${secs} s` : `${mins} min`;
  }
  return `${secs} s`;
}

// ─── Helper: Determine the SUB-TYPE of a skill name (α, β, γ, or "generic") ───
function getSubType(name) {
  if (name.includes('α')) return 'α';
  if (name.includes('β')) return 'β';
  if (name.includes('γ')) return 'γ';
  return null;
}

// ─── Helper: Categorize a skill name into a top-level group ───
function categorizeSkill(name) {
  if (name.includes('HP Máximo')) return 'hp_maximo';
  if (name.includes('HP Máximo en CAÍDO') || name.includes('en CAÍDO')) return 'hp_caido';
  if (name.includes('GP Máximo')) return 'gp_maximo';
  if (name.includes('Defensa de HP')) return 'defensa_hp';
  if (name.includes('Defensa de Habilidad Peculiar')) return 'defensa_habilidad';
  if (name.includes('Defensa Cuerpo a Cuerpo')) return 'defensa_cac';
  if (name.includes('Poder de Ataque de Habilidad Peculiar')) return 'ataque_habilidad';
  if (name.includes('Poder de Ataque Cuerpo a Cuerpo') || name.includes('Poder de Ataque de GP')) return 'ataque_cac';
  if (name.includes('Recarga de Habilidad Peculiar') || name.includes('Recarga de PU')) return 'recarga';
  if (name.includes('Velocidad de Dash')) return 'velocidad_dash';
  if (name.includes('Velocidad de Desplazamiento')) return 'velocidad_desp';
  if (name.includes('Velocidad de Movimiento')) return 'velocidad_mov';
  if (name.includes('Altura de Salto Frontal')) return 'salto_frontal';
  if (name.includes('Altura de Salto Vertical')) return 'salto_vertical';
  if (name.includes('Altura de Salto de Muro')) return 'salto_muro';
  return 'otros';
}

// ─── Group definition for rendering ───
const STAT_GROUPS = [
  {
    key: 'ataque',
    label: 'Poder de Ataque',
    icon: '🗡️',
    color: '#ff4444',
    children: ['ataque_habilidad', 'ataque_cac'],
    childLabels: {
      ataque_habilidad: 'Habilidad Peculiar',
      ataque_cac: 'Cuerpo a Cuerpo / GP',
    }
  },
  {
    key: 'defensa',
    label: 'Defensa',
    icon: '🛡️',
    color: '#4488ff',
    children: ['defensa_habilidad', 'defensa_hp', 'defensa_cac'],
    childLabels: {
      defensa_habilidad: 'Habilidad Peculiar',
      defensa_hp: 'HP Directo',
      defensa_cac: 'Cuerpo a Cuerpo',
    }
  },
  {
    key: 'recarga',
    label: 'Recarga de Habilidad',
    icon: '🔄',
    color: '#aa55ff',
    children: ['recarga'],
    childLabels: { recarga: 'Recarga' }
  },
  {
    key: 'velocidad',
    label: 'Velocidad',
    icon: '💨',
    color: '#00d5ff',
    children: ['velocidad_dash', 'velocidad_desp', 'velocidad_mov'],
    childLabels: {
      velocidad_dash: 'Dash',
      velocidad_desp: 'Desplazamiento por Pared',
      velocidad_mov: 'Movimiento',
    }
  },
  {
    key: 'salto',
    label: 'Altura de Salto',
    icon: '↕️',
    color: '#ffcc00',
    children: ['salto_frontal', 'salto_vertical', 'salto_muro'],
    childLabels: {
      salto_frontal: 'Frontal',
      salto_vertical: 'Vertical',
      salto_muro: 'De Muro',
    }
  },
  {
    key: 'hp',
    label: 'HP Máximo / CAÍDO',
    icon: '💚',
    color: '#00ff88',
    children: ['hp_maximo', 'hp_caido'],
    childLabels: {
      hp_maximo: 'HP Máximo',
      hp_caido: 'HP en CAÍDO',
    }
  },
  {
    key: 'gp',
    label: 'GP Máximo',
    icon: '🔵',
    color: '#55aaff',
    children: ['gp_maximo'],
    childLabels: { gp_maximo: 'GP Máximo' }
  },
];

// ─── Main Component ───
export default function StatsSummaryPanel({ characterBuild, slotLevels, specialTunings }) {
  const [expanded, setExpanded] = useState({});

  const toggle = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  // Build the aggregated stats: { categoryKey: { subType: { total, unit, entries[] } } }
  const aggregated = useMemo(() => {
    const agg = {};
    const specials = [];

    Object.entries(characterBuild).forEach(([slotId, tuning]) => {
      if (!tuning) return;

      const level = slotLevels[slotId] || 1;
      const isSpecial = slotId === 'left-special' || slotId === 'right-special';

      if (isSpecial) {
        // Special tunings: just show name + current level value
        const t = Array.isArray(tuning) ? tuning[0] : tuning;
        const levelVal = t.niveles?.[String(level)];
        specials.push({
          habilidad: t.habilidad,
          value: levelVal,
          tipo: t.tipo_valor,
          descripcion: t.descripcion,
          rol: t.rol,
        });
        return;
      }

      // Normal tunings: may have multiple habilidades
      const habilidades = Array.isArray(tuning) ? tuning : [tuning];
      habilidades.forEach(t => {
        if (!t) return;
        const levelVal = t.niveles?.[String(level)];
        if (levelVal == null) return;

        const catKey = categorizeSkill(t.habilidad);
        const subType = getSubType(t.habilidad);
        const numVal = parseNumeric(levelVal);
        const unit = String(levelVal).includes('altura') ? 'unidades' : '%';

        if (!agg[catKey]) agg[catKey] = {};
        const subKey = subType || 'general';
        if (!agg[catKey][subKey]) agg[catKey][subKey] = { total: 0, unit, entries: [] };
        agg[catKey][subKey].total += numVal;
        agg[catKey][subKey].entries.push({ name: t.habilidad, value: numVal, unit });
      });
    });

    return { normal: agg, specials };
  }, [characterBuild, slotLevels]);

  const formatVal = (num, unit) => {
    const sign = num >= 0 ? '+' : '';
    return unit === 'unidades'
      ? `${sign}${num} u.`
      : `${sign}${num.toFixed(1)}%`;
  };

  const hasAnyStats = Object.keys(aggregated.normal).length > 0 || aggregated.specials.length > 0;

  return (
    <div className="stats-panel">
      {!hasAnyStats ? (
        <div className="stats-empty">
          <span>Equipa Tunnings para ver el resumen de estadísticas.</span>
        </div>
      ) : (
        <>
          {/* ── NORMAL STAT GROUPS ── */}
          {STAT_GROUPS.map(group => {
            const childCats = group.children.filter(c => aggregated.normal[c]);
            if (childCats.length === 0) return null;

            // Calculate group-level total
            const groupTotal = childCats.reduce((sum, catKey) => {
              const cat = aggregated.normal[catKey];
              return sum + Object.values(cat).reduce((s, sub) => s + sub.total, 0);
            }, 0);

            const groupUnit = childCats.length > 0
              ? Object.values(aggregated.normal[childCats[0]])[0]?.unit || '%'
              : '%';

            // Count sub-items
            const subItems = [];
            childCats.forEach(catKey => {
              const catLabel = group.childLabels[catKey];
              Object.entries(aggregated.normal[catKey]).forEach(([subType, data]) => {
                subItems.push({ label: `${catLabel}${subType !== 'general' ? ' ' + subType : ''}`, ...data });
              });
            });

            const hasChildren = subItems.length > 1;

            return (
              <div className="stat-group" key={group.key}>
                <div
                  className={`stat-group-header ${hasChildren ? 'expandable' : ''}`}
                  style={{ '--group-color': group.color }}
                  onClick={hasChildren ? () => toggle(group.key) : undefined}
                >
                  <span className="stat-icon">{group.icon}</span>
                  <span className="stat-label">{group.label}</span>
                  <span className="stat-total" style={{ color: groupTotal < 0 ? '#55ff88' : group.color }}>
                    {formatVal(groupTotal, groupUnit)}
                  </span>
                  {hasChildren && (
                    <span className="stat-arrow">{expanded[group.key] ? '▾' : '▸'}</span>
                  )}
                </div>

                {expanded[group.key] && hasChildren && (
                  <div className="stat-group-children">
                    {subItems.map((item, i) => (
                      <div className="stat-child-row" key={i}>
                        <span className="stat-child-label">{item.label}</span>
                        <span className="stat-child-value" style={{ color: item.total < 0 ? '#55ff88' : group.color }}>
                          {formatVal(item.total, item.unit)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* ── SPECIAL TUNNING SECTION ── */}
          {aggregated.specials.length > 0 && (
            <div className="stat-specials-section">
              <div className="stat-specials-title">⭐ Tunnings Especiales</div>
              {aggregated.specials.map((s, i) => (
                <div className="stat-special-item" key={i}>
                  <div className="stat-special-name">
                    {s.habilidad}
                    {s.rol && <span className="stat-special-role">({s.rol === 'Universal' ? 'Universal' : (s.rol === 'Héroe' ? 'Héroe' : 'Villano')})</span>}
                  </div>
                  <div className="stat-special-detail">
                    {s.tipo === 'tiempo_frames'
                      ? `Duración: ${formatTimeDisplay(s.value)}`
                      : `Valor: ${s.value}`}
                  </div>
                  <div className="stat-special-desc">{s.descripcion}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
