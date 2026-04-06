/**
 * gameTranslation.js
 * Central translation layer for all game content (abilities, classes, roles).
 * The Spanish name is always the KEY — data is stored in Spanish in the DB,
 * and this utility translates at render time only.
 */

import especialesEN from '../data/game_especiales_en.json';
import normalesEN from '../data/game_normales_en.json';

// ── Class & Role display maps ──────────────────────────────────────────────
export const CLASS_EN = {
  'Apoyo':     'Support',
  'Daño':      'Strike',
  'Tanque':    'Assault',
  'Técnico':   'Technical',
  'Velocista': 'Rapid',
};

export const ROLE_EN = {
  'Héroe':     'Hero',
  'Villano':   'Villain',
  'Universal': 'Universal',
};

// ── Costume GROUP names (traje field) ─────────────────────────────────────
const TRAJE_EN = {
  // Hero Costumes
  'Traje de Héroe':                         'Hero Costume',
  'Traje de Héroe (Vendado)':               'Hero Costume (Bandaged)',
  'Traje de Héroe Cyber':                   'Cyber Hero Costume',
  'Traje de Héroe Gran Torino':             'Gran Torino Hero Costume',
  'Traje de Héroe Ver. Alpha':              'Hero Costume Ver. Alpha',
  'Traje de Héroe Ver. Beta':               'Hero Costume Ver. Beta',
  'Traje de Héroe Ver. Camuflaje':          'Hero Costume Ver. Camouflage',
  'Traje de Héroe Ver. Dañado':             'Hero Costume Ver. Damaged',
  'Traje de Héroe Ver. Metálico':           'Hero Costume Ver. Metallic',
  // Casual
  'Estilo Casual':                          'Casual Style',
  'Ropa Casual':                            'Casual Wear',
  // Villain Costumes
  'Traje de Villano':                       'Villain Costume',
  'Traje de Villano (Cabello Blanco)':      'Villain Costume (White Hair)',
  'Traje de Villano (Oculto)':              'Villain Costume (Hidden)',
  'Traje de la Liga de Villanos':           'League of Villains Costume',
  // Named outfits (Spanish)
  'Invencible':                             'Invincible',
  'Inquebrantable':                         'Unbreakable',
  'Despertado':                             'Awakened',
  'Piratas Villanos':                       'Villain Pirates',
  'Caballero Malvado':                      'Evil Knight',
  'Pasado de Moda':                         'Out of Fashion',
  'Traje Formal':                           'Formal Suit',
  'Traje de Jiangshi':                      'Jiangshi Costume',
  'Traje Conmemorativo 100 Millones de Copias': '100M Copies Commemorative Costume',
  'Atuendo de Festival':                    'Festival Attire',
  'Atuendo de Kung Fu':                     'Kung Fu Attire',
  'Mundo Paralelo':                         'Parallel World',
  'Bata de Hospital':                       'Hospital Gown',
  'Cara Descubierta':                       'Open-Faced',
  'Cara Descubierta Alpha':                 'Open-Faced Alpha',
  'Chándal de U.A.':                        'U.A. Tracksuit',
  'Calavera y Huesos':                      'Skull and Bones',
  'Ídolo Superestrella':                    'Superstar Idol',
  'Disfraz: Abrigo Largo':                  'Disguise: Long Coat',
  'Disfraz: Suéter':                        'Disguise: Sweater',
  'Uniforme Antiguo':                       'Old Uniform',
  'Naipes - Reina':                         'Playing Cards - Queen',
  'Trascender':                             'Transcend',
  'Ver. Fusión de Peculiaridades':          'Quirk Fusion Ver.',
  'Día Libre':                              'Day Off',
  'Ocio de Verano':                         'Summer Leisure',
  'Equipo de Asistencia de Peculiaridad':   'Quirk Assist Gear',
  'Aventurero':                             'Adventurer',
  'General del Viento':                     'Wind General',
  'Happi de Festival':                      'Festival Happi',
  'Jinbei de Festival':                     'Festival Jinbei',
  'Yukata de Festival':                     'Festival Yukata',
  'Armadura del Abismo':                    'Abyss Armor',
  'Mineta Escalofriante':                   'Creepy Mineta',
};

// ── Costume VARIANT names (variante field — color/style) ──────────────────
const VARIANTE_EN = {
  'Por Defecto':    'Default',
  'Elegante':       'Elegant',
  'Calor':          'Summer',
  'Peligroso':      'Perilous',
  'Estilo Villano': 'Villain Style',
  'Estilo Héroe':   'Hero Style',
  'Combate':        'Combat',
  'Crepúsculo':     'Twilight',
  'Escarlata':      'Scarlet',
  'Ardiente':       'Blazing',
  'Azul Marino':    'Navy',
  'Marina':         'Marine',
  'Naranja':        'Orange',
  'Negro':          'Black',
  'Rosa':           'Pink',
  'Verde':          'Green',
  'Horizonte':      'Horizon',
  'Acero Ámbar':    'Amber Steel',
  'Albaricoque':    'Apricot',
  'Cromo Zafiro':   'Sapphire Chrome',
  'Hierbaluisa':    'Verbena',
  'Hierro Rubí':    'Ruby Iron',
  'Metal Esmeralda':'Emerald Metal',
  'Oro Ópalo':      'Opal Gold',
};


// ── Level value suffix translation ("+5 altura" → "+5 in.") ──────────────
const LEVEL_VALUE_RULES = [
  [' altura', ' in.'],
];

/** Apply the first matching replacement rule to a string */
function applyRules(str, rules) {
  if (!str) return str;
  for (const [es, en] of rules) {
    if (str.includes(es)) {
      return str.replace(es, en);
    }
  }
  return str;
}

// ── Public API ─────────────────────────────────────────────────────────────

/**
 * Translate a class name (e.g. "Apoyo" → "Support") based on lang.
 */
export function translateClass(clase, lang) {
  if (lang !== 'en' || !clase) return clase;
  return CLASS_EN[clase] || clase;
}

/**
 * Translate a role name (e.g. "Héroe" → "Hero") based on lang.
 */
export function translateRole(rol, lang) {
  if (lang !== 'en' || !rol) return rol;
  return ROLE_EN[rol] || rol;
}

/**
 * Translate a level value string (e.g. "+5 altura" → "+5 in.").
 */
export function translateLevelValue(val, lang) {
  if (lang !== 'en' || typeof val !== 'string') return val;
  return applyRules(val, LEVEL_VALUE_RULES);
}

/**
 * Main function: returns a translated copy of a tuning object.
 * Falls back to the original if no translation is found.
 * @param {object} tuning - the original tuning object (Spanish)
 * @param {string} lang - 'es' or 'en'
 */
export function translateTuning(tuning, lang) {
  if (!tuning || lang !== 'en') return tuning;

  // 1. Try special tuning lookup (exact name match)
  const sp = especialesEN[tuning.habilidad];
  if (sp) {
    return {
      ...tuning,
      habilidad:   sp.habilidad,
      descripcion: sp.descripcion,
      subir_nivel: sp.subir_nivel || tuning.subir_nivel,
    };
  }

  // 2. Try normal tuning lookup (exact name match)
  const nor = normalesEN[tuning.habilidad];
  if (nor) {
    return {
      ...tuning,
      habilidad:   nor.habilidad,
      descripcion: nor.descripcion,
    };
  }

  return tuning;
}

/**
 * Translate a costume group name (traje field).
 * e.g. "Traje de Héroe" → "Hero Costume"
 */
export function translateTraje(traje, lang) {
  if (lang !== 'en' || !traje) return traje;
  return TRAJE_EN[traje] || traje;
}

/**
 * Translate a costume variant/color name (variante field).
 * e.g. "Por Defecto" → "Default", "Elegante" → "Elegant"
 */
export function translateVariante(variante, lang) {
  if (lang !== 'en' || !variante) return variante;
  return VARIANTE_EN[variante] || variante;
}

/**
 * Translate a full costume display name (nombre_completo field).
 * Handles both "Traje" and "Traje (Variante)" formats.
 * e.g. "Ropa Casual (Calor)" → "Casual Wear (Summer)"
 *      "Trascender (Combate)" → "Transcend (Combat)"
 */
export function translateNombreCompleto(nombreCompleto, lang) {
  if (lang !== 'en' || !nombreCompleto) return nombreCompleto;

  // Pattern: "SomeName (SomeVariant)"
  const match = nombreCompleto.match(/^(.+?)\s*\((.+)\)$/);
  if (match) {
    const traje   = match[1].trim();
    const variante = match[2].trim();
    return `${translateTraje(traje, lang)} (${translateVariante(variante, lang)})`;
  }

  // No parenthetical — translate as a traje name
  return translateTraje(nombreCompleto, lang);
}

// ── Build tag translation map ──────────────────────────────────────────────
const TAG_EN = {
  'Daño':       'Strike',
  'Tanque':     'Assault',
  'Resistente': 'Resistant',
  'Velocista':  'Rapid',
  'Estratega':  'Strategist',
  'Aéreo':      'Aerial',
  'Especial':   'Special',
  // "Berserker" is English already — no entry needed
};

/**
 * Translate a build tag string.
 * e.g. "Especial" → "Special", "Velocista" → "Speedster"
 */
export function translateTag(tag, lang) {
  if (lang !== 'en' || !tag) return tag;
  return TAG_EN[tag] || tag;
}

// ── Battle Style variant names (from normalesData personaje parentheticals) ─
const BATTLE_STYLE_EN = {
  // Parenthetical variant parts (case-preserved as stored in data)
  'Satélites Cero':                  'Zero Satellites',
  'Ametralladora':                   'Machine Gun',
  'Antorcha Loca':                   'Mad Torch',
  'Relámpago':                       'Lightning',
  'Propulsión Roja':                 'Red Thrust',
  'Puño Infernal':                   'Infernal Fist',
  'Viento Cortante':                 'Slicing Wind',
  'Danza del Aguijón':               'Sting Dance',
  'Golpe de Palma Doble':            'Double Palm Strike',
  'Contraataque Puro':               'Pure Counter',
  'Hada':                            'Fairy',
  'Precipicio Maldito':              'Cursed Precipice',
  'Colmillo de Hielo Viento Llama':  'Ice Fang Wind Flame',
  'Catástrofe':                      'Catastrophe',
  'Quiebre de los Mil Brazos':       'Thousand Arms Break',
  'Edad Juvenil':                    'Young Age',
  // Full style names without parenthetical
  'All Might Acorazado':             'Armored All Might',
};

/**
 * Translate just the battle-style label (extracted from parenthetical or full name).
 * Performs a case-insensitive lookup so it handles both "Satélites Cero" and
 * "SATÉLITES CERO" (the UPPERCASE version returned by getStyleLabel).
 */
export function translateBattleStyleLabel(label, lang) {
  if (lang !== 'en' || !label) return label;
  // Exact lookup first
  if (BATTLE_STYLE_EN[label]) return BATTLE_STYLE_EN[label];
  // Case-insensitive fallback (handles UPPERCASED labels from getStyleLabel)
  const lower = label.toLowerCase();
  const key = Object.keys(BATTLE_STYLE_EN).find(k => k.toLowerCase() === lower);
  return key ? BATTLE_STYLE_EN[key] : label;
}

/**
 * Translate a full personaje/style name that may include a parenthetical variant.
 * e.g. "Ochaco Uraraka (Satélites Cero)" → "Ochaco Uraraka (Zero Satellites)"
 *      "All Might Acorazado"             → "Armored All Might"
 *      "Katsuki Bakugo"                  → "Katsuki Bakugo"  (unchanged)
 */
export function translatePersonajeName(name, lang) {
  if (lang !== 'en' || !name) return name;
  // Full name lookup (no parentheses)
  if (BATTLE_STYLE_EN[name]) return BATTLE_STYLE_EN[name];
  // Parenthetical form: "Base Name (Variant)"
  const match = name.match(/^(.+?)\s*\((.+)\)$/);
  if (match) {
    const base    = match[1].trim();
    const variant = match[2].trim();
    return `${base} (${translateBattleStyleLabel(variant, lang)})`;
  }
  return name;
}
