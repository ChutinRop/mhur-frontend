import React, { useState, useMemo } from 'react';
import { FiSearch, FiX, FiStar, FiList } from 'react-icons/fi';
import clsx from 'clsx';
import { getCharacterImage } from '../data/characterImages';
import { useT } from '../context/LanguageContext';
import { translateTuning, translateClass, translateRole } from '../utils/gameTranslation';
import '../components/AbilityDetails.css';
import './Database.css';

import especialesRaw from '../data/tunnings_especiales.json';
import normalesRaw   from '../data/tunnings_normales.json';

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

const baseName = (nombre) => nombre.replace(/\s*\(.*?\)$/, '').trim();
const uniq = (arr) => [...new Set(arr)].sort((a, b) => a.localeCompare(b, 'es'));

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

const especialesGrupo = groupByCharacter(especialesRaw);
const normalesFlat = normalesRaw.flatMap(p =>
  p.habilidades.map(h => ({ personaje: p.personaje, rol: p.rol, clase: p.clase, ...h }))
);
const normalesGrupo = groupByCharacter(normalesFlat);

const E_CLASES    = uniq(especialesGrupo.map(t => t.clase));
const E_ROLES     = uniq(especialesGrupo.map(t => t.rol));
const E_BASE_NAMES= uniq(especialesGrupo.map(t => baseName(t.personaje)));

const N_CLASES    = uniq(normalesGrupo.map(t => t.clase));
const N_ROLES     = uniq(normalesGrupo.map(t => t.rol));
const N_BASE_NAMES= uniq(normalesGrupo.map(t => baseName(t.personaje)));

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

function CharacterCard({ group, tipo = 'especial' }) {
  const { t, lang } = useT();
  const cardColor = getClassColor(group.clase);
  const imgSrc = getCharacterImage(group.personaje, group.rol, group.clase, tipo);
  const displayClase = translateClass(group.clase, lang);
  const displayRol = translateRole(group.rol, lang);
  return (
    <div className="ability-details database-char-card" style={{ margin: 0, alignItems: 'flex-start' }}>
      <div className="ability-icon-block" style={{ backgroundColor: cardColor, overflow: 'hidden', flexShrink: 0 }}>
        {imgSrc
          ? <img src={imgSrc} alt={group.personaje} className="char-img-full" loading="lazy" />
          : <div className="ability-icon-inner"></div>
        }
      </div>

      <div className="ability-info database-char-info" style={{ width: '100%' }}>
        <div className="database-char-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h4 className="ability-char-name">{group.personaje}</h4>
          <div className="char-badges-group" style={{ display: 'flex', gap: '0.4rem' }}>
            <span className="char-rol-badge" style={rolStyle(group.rol)}>{displayRol}</span>
            <span className="char-clase-badge" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '4px', color: cardColor, fontWeight: 'bold', border: `1px solid ${cardColor}40` }}>
              {displayClase}
            </span>
          </div>
        </div>

        {group.habilidades.map((h, i) => {
          const th = translateTuning(h, lang);
          return (
            <div key={i} style={{
              borderTop: i > 0 ? '1px solid var(--surface-border)' : 'none',
              paddingTop: i > 0 ? '1rem' : 0,
              marginTop:  i > 0 ? '1rem' : 0,
            }}>
              <h3 className="ability-name" style={{ marginBottom: '0.25rem' }}>{th.habilidad}</h3>
              <p className="ability-desc-text">
                <span className="ability-desc-icon">▶</span> {th.descripcion}
              </p>
              <div className="ability-level-info" style={{ marginTop: '0.5rem' }}>
                {th.subir_nivel && <p className="level-up-text">{th.subir_nivel}</p>}
                <div className="levels-grid">
                  {Object.entries(h.niveles).map(([lvl, val]) => (
                    <div key={lvl} className="level-item">
                      <span className="level-label">{t('db_level', lvl)}</span> {val}
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
          );
        })}
      </div>
    </div>
  );
}

function FilterBar({ roles, clases, baseNames, filters, setFilters }) {
  const { t, lang } = useT();
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
          placeholder={t('db_filter_search')}
          value={search}
          onChange={set('search')}
          className="filter-input" 
          style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%' }}
        />
      </div>

      <select value={rol} onChange={set('rol')} className="filter-select" style={selectStyle}>
        <option value="">{t('db_filter_all_roles')}</option>
        {roles.map(r => <option key={r} value={r}>{translateRole(r, lang)}</option>)}
      </select>

      <select value={clase} onChange={set('clase')} className="filter-select" style={selectStyle}>
        <option value="">{t('db_filter_all_classes')}</option>
        {clases.map(c => <option key={c} value={c}>{translateClass(c, lang)}</option>)}
      </select>

      <select value={personaje} onChange={set('personaje')} className="filter-select" style={{ ...selectStyle, maxWidth: '240px' }}>
        <option value="">{t('db_filter_all_chars')}</option>
        {baseNames.map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      {hasFilters && (
        <button onClick={clear} className="filter-clear-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.85rem', background: 'rgba(239,68,68,0.15)', border: '1px solid #ef444460', borderRadius: 'var(--radius-sm)', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem' }}>
          <FiX /> {t('db_filter_clear')}
        </button>
      )}
    </div>
  );
}

export default function Database() {
  const [tab, setTab] = useState('especiales');
  const [filters, setFilters] = useState({ search: '', rol: '', clase: '', personaje: '' });
  const { t } = useT();

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
          <h2 className="database-title">{t('db_title')}</h2>
          <div className="database-tabs-wrapper">
            {tabBtn('especiales', <FiStar />,  t('db_tab_specials', especiales.length))}
            {tabBtn('normales',   <FiList />,  t('db_tab_normals', normales.length))}
          </div>
        </div>

        {tab === 'especiales' && (
          <>
            <FilterBar roles={E_ROLES} clases={E_CLASES} baseNames={E_BASE_NAMES}
              filters={filters} setFilters={setFilters} />
            <div className="database-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {especiales.map((g, i) => <CharacterCard key={i} group={g} tipo="especial" />)}
              {especiales.length === 0 && <div className="no-results" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>{t('db_no_results')}</div>}
            </div>
          </>
        )}

        {tab === 'normales' && (
          <>
            <FilterBar roles={N_ROLES} clases={N_CLASES} baseNames={N_BASE_NAMES}
              filters={filters} setFilters={setFilters} />
            <div className="database-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {normales.map((g, i) => <CharacterCard key={i} group={g} tipo="normal" />)}
              {normales.length === 0 && <div className="no-results" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>{t('db_no_results')}</div>}
            </div>
          </>
        )}

      </section>
    </main>
  );
}
