import React, { useState, useMemo } from 'react';
import { FiSearch, FiX, FiStar, FiList } from 'react-icons/fi';
import clsx from 'clsx';
import { getCharacterImage } from '../data/characterImages';
import '../components/AbilityDetails.css';
import './Database.css';

// ── Datos ─────────────────────────────────────────────────────────────────────
// Para actualizar solo reemplaza los archivos JSON en src/data/ y recompila.
import especialesRaw from '../data/tunnings_especiales.json';
import normalesRaw   from '../data/tunnings_normales.json';

// ── Utilidades ────────────────────────────────────────────────────────────────
const getClassColor = (clase) => {
  switch (clase) {
    case 'Apoyo':     return '#22c55e';
    case 'Daño':      return '#ef4444';
    case 'Tanque':    return '#eab308';
    case 'Técnico':   return '#a855f7';
    case 'Velocista': return '#3b82f6';
    default:          return '#6b7280';
  }
};

// Extrae el nombre BASE de un personaje (sin la variante entre paréntesis)
const baseName = (nombre) => nombre.replace(/\s*\(.*?\)$/, '').trim();

const uniq = (arr) => [...new Set(arr)].sort((a, b) => a.localeCompare(b, 'es'));

// ── Agrupar por personaje ─────────────────────────────────────────────────────
// Recibe array plano [{personaje, rol, clase, habilidad, descripcion, niveles, ...}]
// Devuelve array agrupado [{personaje, rol, clase, habilidades:[...]}]
function groupByCharacter(flat) {
  const map = new Map();
  for (const t of flat) {
    if (!map.has(t.personaje)) {
      map.set(t.personaje, { personaje: t.personaje, rol: t.rol, clase: t.clase, habilidades: [] });
    }
    map.get(t.personaje).habilidades.push({
      habilidad:   t.habilidad,
      descripcion: t.descripcion,
      niveles:     t.niveles,
      subir_nivel: t.subir_nivel ?? null,
      sub_efectos: t.sub_efectos ?? null,
    });
  }
  return [...map.values()];
}

// ── Preparar datos ────────────────────────────────────────────────────────────

// Especiales: ya son planos, agrupamos por personaje
const especialesGrupo = groupByCharacter(especialesRaw);

// Normales: aplanar primero (personaje → habilidades[]) y luego agrupar
const normalesFlat = normalesRaw.flatMap(p =>
  p.habilidades.map(h => ({ personaje: p.personaje, rol: p.rol, clase: p.clase, ...h }))
);
const normalesGrupo = groupByCharacter(normalesFlat);

// ── Listas para filtros ───────────────────────────────────────────────────────
// Nombres BASE únicos para el filtro de personaje
const E_CLASES    = uniq(especialesGrupo.map(t => t.clase));
const E_ROLES     = uniq(especialesGrupo.map(t => t.rol));
const E_BASE_NAMES= uniq(especialesGrupo.map(t => baseName(t.personaje)));

const N_CLASES    = uniq(normalesGrupo.map(t => t.clase));
const N_ROLES     = uniq(normalesGrupo.map(t => t.rol));
const N_BASE_NAMES= uniq(normalesGrupo.map(t => baseName(t.personaje)));

// ── Estilos compartidos ───────────────────────────────────────────────────────
const selectStyle = {
  background: 'var(--surface-hover)',
  border: '1px solid var(--surface-border)',
  borderRadius: 'var(--radius-sm)',
  color: '#fff',
  padding: '0.5rem 0.75rem',
  fontSize: '0.9rem', 
  outline: 'none',
  cursor: 'pointer',
};

const rolStyle = (rol) => ({
  fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 'bold',
  background: rol === 'Héroe' ? 'rgba(59,130,246,0.15)' : 'rgba(239,68,68,0.15)',
  color:      rol === 'Héroe' ? '#3b82f6' : '#ef4444',
  border:     `1px solid ${rol === 'Héroe' ? '#3b82f640' : '#ef444440'}`,
});

// ── Card agrupada ─────────────────────────────────────────────────────────────
function CharacterCard({ group, tipo = 'especial' }) {
  const cardColor = getClassColor(group.clase);
  const imgSrc = getCharacterImage(group.personaje, group.rol, group.clase, tipo);
  return (
    <div className="ability-details database-char-card" style={{ margin: 0, alignItems: 'flex-start' }}>
      {/* Ícono coloreado — muestra imagen si existe, placeholder si no */}
      <div className="ability-icon-block" style={{ backgroundColor: cardColor, overflow: 'hidden', flexShrink: 0 }}>
        {imgSrc
          ? <img src={imgSrc} alt={group.personaje} className="char-img-full" loading="lazy" />
          : <div className="ability-icon-inner"></div>
        }
      </div>

      {/* Contenido */}
      <div className="ability-info database-char-info" style={{ width: '100%' }}>
        {/* Cabecera */}
        <div className="database-char-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h4 className="ability-char-name">{group.personaje}</h4>
          <div className="char-badges-group" style={{ display: 'flex', gap: '0.4rem' }}>
            <span className="char-rol-badge" style={rolStyle(group.rol)}>{group.rol}</span>
            <span className="char-clase-badge" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '4px', color: cardColor, fontWeight: 'bold', border: `1px solid ${cardColor}40` }}>
              {group.clase}
            </span>
          </div>
        </div>

        {/* Habilidades (una o varias) */}
        {group.habilidades.map((h, i) => (
          <div key={i} style={{
            borderTop: i > 0 ? '1px solid var(--surface-border)' : 'none',
            paddingTop: i > 0 ? '1rem' : 0,
            marginTop:  i > 0 ? '1rem' : 0,
          }}>
            <h3 className="ability-name" style={{ marginBottom: '0.25rem' }}>{h.habilidad}</h3>
            <p className="ability-desc-text">
              <span className="ability-desc-icon">▶</span> {h.descripcion}
            </p>
            <div className="ability-level-info" style={{ marginTop: '0.5rem' }}>
              {h.subir_nivel && <p className="level-up-text">{h.subir_nivel}</p>}
              <div className="levels-grid">
                {Object.entries(h.niveles).map(([lvl, val]) => (
                  <div key={lvl} className="level-item">
                    <span className="level-label">Nivel {lvl}:</span> {val}
                  </div>
                ))}
              </div>
              {h.sub_efectos && Object.keys(h.sub_efectos).length > 0 && (
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem' }}>
                  {Object.entries(h.sub_efectos).map(([k, v]) => (
                    <p key={k} className="sub-effect">Sub Effect {k}: {v}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Barra de filtros ──────────────────────────────────────────────────────────
function FilterBar({ roles, clases, baseNames, filters, setFilters }) {
  const { search, rol, clase, personaje } = filters;
  const hasFilters = search || rol || clase || personaje;
  const set = (key) => (e) => setFilters(f => ({ ...f, [key]: e.target.value }));
  const clear = () => setFilters({ search: '', rol: '', clase: '', personaje: '' });

  return (
    <div className="filter-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <div className="filter-input-wrapper" style={{ display: 'flex', alignItems: 'center', background: 'var(--surface-hover)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', minWidth: '230px', border: '1px solid var(--surface-border)' }}>
        <FiSearch className="filter-icon" style={{ color: 'var(--text-muted)', marginRight: '0.5rem', flexShrink: 0 }} />
        <input 
          type="text" 
          placeholder="Buscar habilidad..." 
          value={search}
          onChange={set('search')}
          className="filter-input" 
          style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%' }}
        />
      </div>

      <select value={rol} onChange={set('rol')} className="filter-select" style={selectStyle}>
        <option value="">Todos los Roles</option>
        {roles.map(r => <option key={r} value={r}>{r}</option>)}
      </select>

      <select value={clase} onChange={set('clase')} className="filter-select" style={selectStyle}>
        <option value="">Todas las Clases</option>
        {clases.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select value={personaje} onChange={set('personaje')} className="filter-select" style={{ ...selectStyle, maxWidth: '240px' }}>
        <option value="">Todos los Personajes</option>
        {baseNames.map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      {hasFilters && (
        <button onClick={clear} className="filter-clear-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.85rem', background: 'rgba(239,68,68,0.15)', border: '1px solid #ef444460', borderRadius: 'var(--radius-sm)', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem' }}>
          <FiX /> Limpiar
        </button>
      )}
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────
export default function Database() {
  const [tab, setTab] = useState('especiales');
  // Un solo estado de filtros compartido entre ambas pestañas
  const [filters, setFilters] = useState({ search: '', rol: '', clase: '', personaje: '' });

  // Filtra grupos: si hay filtro de personaje, usa baseName para comparar
  const applyFilters = (groups, f) => groups.filter(g => {
    const s = f.search.toLowerCase();
    const matchSearch = !s || g.habilidades.some(h =>
      h.habilidad.toLowerCase().includes(s) || h.descripcion.toLowerCase().includes(s)
    ) || g.personaje.toLowerCase().includes(s);
    const matchRol  = !f.rol   || g.rol   === f.rol;
    const matchClase= !f.clase || g.clase  === f.clase;
    const matchPers = !f.personaje || baseName(g.personaje) === f.personaje;
    return matchSearch && matchRol && matchClase && matchPers;
  });

  const especiales = useMemo(() => applyFilters(especialesGrupo, filters), [filters]);
  const normales   = useMemo(() => applyFilters(normalesGrupo,  filters), [filters]);

  const tabBtn = (id, icon, label) => (
    <button 
      onClick={() => setTab(id)} 
      className={clsx('database-tab-btn', tab === id && 'active')}
    >
      {icon} <span>{label}</span>
    </button>
  );

  return (
    <main className="main-content database-page-container" style={{ display: 'block' }}>
      <section className="glass-panel database-section" style={{ padding: '2rem' }}>

        <div className="database-header-row">
          <h2 className="database-title">Tunnings</h2>
          <div className="database-tabs-wrapper">
            {tabBtn('especiales', <FiStar />,  `Especiales (${especiales.length})`)}
            {tabBtn('normales',   <FiList />,  `Normales (${normales.length})`)}
          </div>
        </div>

        {tab === 'especiales' && (
          <>
            <FilterBar roles={E_ROLES} clases={E_CLASES} baseNames={E_BASE_NAMES}
              filters={filters} setFilters={setFilters} />
            <div className="database-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {especiales.map((g, i) => <CharacterCard key={i} group={g} tipo="especial" />)}
              {especiales.length === 0 && <div className="no-results" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No se encontraron resultados.</div>}
            </div>
          </>
        )}

        {tab === 'normales' && (
          <>
            <FilterBar roles={N_ROLES} clases={N_CLASES} baseNames={N_BASE_NAMES}
              filters={filters} setFilters={setFilters} />
            <div className="database-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {normales.map((g, i) => <CharacterCard key={i} group={g} tipo="normal" />)}
              {normales.length === 0 && <div className="no-results" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No se encontraron resultados.</div>}
            </div>
          </>
        )}

      </section>
    </main>
  );
}
