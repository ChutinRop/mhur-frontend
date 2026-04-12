
const fs = require('fs');
const write = (f, v) => fs.writeFileSync(f, JSON.stringify(v, null, 2));

// Fix tunnings_normales.json
let norm = JSON.parse(fs.readFileSync('c:/Users/Chutin/Desktop/Tunning MHUR/frontend/src/data/tunnings_normales.json', 'utf8'));
for (let n of norm) {
  if (n.personaje === 'All For One (Factor Fusion)') {
    for (let h of n.habilidades) {
      if (h.habilidad === 'Poder de ataque a los PV+') {
        h.habilidad = 'Poder de Ataque de HP+';
      }
      if (h.habilidad === 'Velocidad de arrastre caído+') {
        h.habilidad = 'Velocidad de Movimiento en CAÍDO+';
      }
    }
  }
  if (n.personaje === 'Katsuki Bakugo (Cluster)') {
    for (let h of n.habilidades) {
      if (h.habilidad === 'Poder de ataque de Don γ+') {
        h.habilidad = 'Poder de Ataque de Habilidad Peculiar Γ+';
      }
    }
  }
}
write('c:/Users/Chutin/Desktop/Tunning MHUR/frontend/src/data/tunnings_normales.json', norm);
console.log('Fixed tunnings_normales.json strings.');

// Fix english equivalents to map to the new keys
let eng = JSON.parse(fs.readFileSync('c:/Users/Chutin/Desktop/Tunning MHUR/frontend/src/data/game_normales_en.json', 'utf8'));

// Re-map PV+ -> HP+
const val_pv = eng['Poder de ataque a los PV+'];
if (val_pv) {
  eng['Poder de Ataque de HP+'] = val_pv;
  delete eng['Poder de ataque a los PV+'];
}

// Re-map crawl -> CAÍDO+
const val_crawl = eng['Velocidad de arrastre caído+'];
if (val_crawl) {
  eng['Velocidad de Movimiento en CAÍDO+'] = val_crawl;
  delete eng['Velocidad de arrastre caído+'];
}

// Re-map Don y+ -> Habilidad Peculiar Γ+
const val_don = eng['Poder de ataque de Don γ+'];
if (val_don) {
  eng['Poder de Ataque de Habilidad Peculiar \u0393+'] = val_don; // uppercase gamma
  delete eng['Poder de ataque de Don γ+'];
}

write('c:/Users/Chutin/Desktop/Tunning MHUR/frontend/src/data/game_normales_en.json', eng);
console.log('Fixed english keys.');


