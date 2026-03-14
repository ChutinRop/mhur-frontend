// Utility to generate tags based on build statistics

function parseNumeric(str) {
  if (typeof str === 'number') return str;
  const match = String(str).match(/[+-]?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}

function categorizeSkill(name) {
  if (name.includes('HP Máximo')) return 'hp';
  if (name.includes('Defensa')) return 'defensa';
  if (name.includes('Poder de Ataque')) return 'ataque';
  if (name.includes('Recarga')) return 'recarga';
  if (name.includes('Velocidad')) return 'velocidad';
  if (name.includes('Altura de Salto')) return 'salto';
  if (name.includes('GP Máximo')) return 'gp';
  return 'otros';
}

export function generateTags(characterBuild, slotLevels) {
  const stats = {
    ataque: 0,
    defensa: 0,
    hp: 0,
    velocidad: 0,
    recarga: 0,
    salto: 0,
    hasSpecial: false
  };

  Object.entries(characterBuild).forEach(([slotId, tuning]) => {
    if (!tuning) return;
    const level = slotLevels[slotId] || 1;
    const isSpecial = slotId === 'left-special' || slotId === 'right-special';

    if (isSpecial) {
      stats.hasSpecial = true;
      return;
    }

    const habilidades = Array.isArray(tuning) ? tuning : [tuning];
    habilidades.forEach(t => {
      if (!t) return;
      const levelVal = t.niveles?.[String(level)];
      if (levelVal == null) return;

      const cat = categorizeSkill(t.habilidad);
      const val = parseNumeric(levelVal);
      if (stats[cat] !== undefined) {
        stats[cat] += val;
      }
    });
  });

  const tags = [];
  if (stats.ataque > 15) tags.push("Berserker");
  else if (stats.ataque > 7) tags.push("Daño");

  if (stats.defensa + stats.hp > 12) tags.push("Tanque");
  else if (stats.defensa > 5 || stats.hp > 5) tags.push("Resistente");

  if (stats.velocidad > 5) tags.push("Velocista");
  if (stats.recarga < -5) tags.push("Estratega"); // Faster cooldown
  if (stats.salto > 10) tags.push("Aéreo");
  if (stats.hasSpecial) tags.push("Especial");

  return tags;
}
