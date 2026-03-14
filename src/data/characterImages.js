/**
 * Mapeo de imágenes por personaje.
 * Clave: "personaje|rol|clase|tipo"   (tipo = 'especial' | 'normal')
 *
 * Para agregar imágenes: añade una línea, recompila (o guarda en dev).
 */
const characterImages = {

  // ────────────────────────────────────────────────────────────────────────────
  // TUNNINGS ESPECIALES
  // ────────────────────────────────────────────────────────────────────────────
  'Izuku Midoriya|Héroe|Tanque|especial':                           '/assets/Images/Tunning Especial/Izuku Midorya Tanque (Especial).png',
  'Izuku Midoriya (Full Bullet)|Héroe|Daño|especial':               '/assets/Images/Tunning Especial/Izuku Midoriya (Full bullet) (Especial).png',
  'Izuku Midoriya OFA|Héroe|Velocista|especial':                    '/assets/Images/Tunning Especial/Izuku Midoriya OFA Velocista (Especial).png',
  'Katsuki Bakugo|Héroe|Daño|especial':                            '/assets/Images/Tunning Especial/Katsuki Bakugo agresor (Especial).png',
  'Katsuki Bakugo (Ametralladora)|Héroe|Velocista|especial':       '/assets/Images/Tunning Especial/Katsuki Bakugo (Machine gun) (Especial).png',
  'Ochaco Uraraka|Héroe|Velocista|especial':                        '/assets/Images/Tunning Especial/Ochaco Uraraka Velocista (Especial).png',
  'Ochaco Uraraka (Satélites Cero)|Héroe|Tanque|especial':         '/assets/Images/Tunning Especial/Ochaco Uraraka (Zero Satellites) Tanque (Especial).png',
  'Shoto Todoroki|Héroe|Daño|especial':                             '/assets/Images/Tunning Especial/Shoto Todoroki Agresor (Especial).png',
  'Shoto Todoroki (Colmillo de Hielo Viento Llama)|Héroe|Técnico|especial': '/assets/Images/Tunning Especial/Shoto Todoroki (Ice Fang Wind Flame) (Especial).png',
  'Tenya Iida|Héroe|Velocista|especial':                            '/assets/Images/Tunning Especial/Tenya Iida Velocista  (Especial).png',
  'Tsuyu Asui|Héroe|Velocista|especial':                            '/assets/Images/Tunning Especial/Tsuyu Asui Velocista (Especial).png',
  'Denki Kaminari|Héroe|Daño|especial':                             '/assets/Images/Tunning Especial/Denki Kaminari Agresor (Especial).png',
  'Denki Kaminari (Relámpago)|Héroe|Técnico|especial':             '/assets/Images/Tunning Especial/Denki Kaminari (Lightning) Tecnico (Especial).png',
  'Eijiro Kirishima|Héroe|Tanque|especial':                         '/assets/Images/Tunning Especial/Eijiro Kirishima Tanque (Especial).png',
  'Eijiro Kirishima (Propulsión Roja)|Héroe|Daño|especial':        '/assets/Images/Tunning Especial/Eijiro Kirishima (Red drive) Agresor (Especial).png',
  'Momo Yaoyorozu|Héroe|Apoyo|especial':                            '/assets/Images/Tunning Especial/Momo Yaoyorozu Apoyo (Especial).png',
  'Fumikage Tokoyami|Héroe|Tanque|especial':                        '/assets/Images/Tunning Especial/Fumikage Tokoyami Tanque (Especial).png',
  'All Might|Héroe|Tanque|especial':                                '/assets/Images/Tunning Especial/All might Tanque (Especial).png',
  'All Might (Ametralladora)|Héroe|Velocista|especial':            '/assets/Images/Tunning Especial/All might (Gatling) Velocista (Especial).png',
  'All Might Acorazado|Héroe|Técnico|especial':                    '/assets/Images/Tunning Especial/Armored All might Tecnico (Especial).png',
  'Shota Aizawa|Héroe|Técnico|especial':                            '/assets/Images/Tunning Especial/Shota aizawa Tecnico (Especial).png',
  'Tomura Shigaraki|Villano|Daño|especial':                         '/assets/Images/Tunning Especial/Tomura Shigaraki agresor (Especial).png',
  'Tomura Shigaraki (Catástrofe)|Villano|Tanque|especial':         '/assets/Images/Tunning Especial/Tomura Shigaraki (Catastrophe) Tanque (Especial).png',
  'Tomura Shigaraki (Quiebre de los Mil Brazos)|Villano|Técnico|especial': '/assets/Images/Tunning Especial/Tomura Shigaraki (Thousand-Hand Break) Tecnico (Especial).png',
  'All For One|Villano|Técnico|especial':                           '/assets/Images/Tunning Especial/All For One Tecnico (Especial).png',
  'All For One (Edad Juvenil)|Villano|Tanque|especial':            '/assets/Images/Tunning Especial/All For One (Youth age) Tanque (Especial).png',
  'Dabi|Villano|Técnico|especial':                                  '/assets/Images/Tunning Especial/Dabi Tecnico (Especial).png',
  'Dabi (Antorcha Loca)|Villano|Daño|especial':                    '/assets/Images/Tunning Especial/Dabi (Crazy Torch) agresor (Especial).png',
  'Himiko Toga|Villano|Técnico|especial':                           '/assets/Images/Tunning Especial/Himiko Toga Tecnico (Especial).png',
  'Himiko Toga (Danza del Aguijón)|Villano|Velocista|especial':    '/assets/Images/Tunning Especial/Himiko Toga (Sting Dance) Velocista (Especial).png',
  'Endeavor|Héroe|Daño|especial':                                   '/assets/Images/Tunning Especial/Endeavor Agresor (Especial).png',
  'Endeavor (Puño Infernal)|Héroe|Tanque|especial':                '/assets/Images/Tunning Especial/Endeavor (Inferno Fist) (Especial).png',
  'Mirio Togata|Héroe|Velocista|especial':                          '/assets/Images/Tunning Especial/Mirio Togata Velocista (Especial).png',
  'Mirio Togata (Contraataque Puro)|Héroe|Técnico|especial':       '/assets/Images/Tunning Especial/Mirio Togata (Sheer Counter) Tecnico (Especial).png',
  'Nejire Hado|Héroe|Técnico|especial':                             '/assets/Images/Tunning Especial/Nejire Hado Tecnico (Especial).png',
  'Nejire Hado (Hada)|Héroe|Apoyo|especial':                       '/assets/Images/Tunning Especial/Nejire Hado (Fairy) Apoyo (Especial).png',
  'Tamaki Amajiki|Héroe|Daño|especial':                             '/assets/Images/Tunning Especial/Tamaki Amajiki Agresor (Especial).png',
  'Overhaul|Villano|Apoyo|especial':                                '/assets/Images/Tunning Especial/Overhaul Apoyo (Especial).png',
  'Overhaul (Precipicio Maldito)|Villano|Tanque|especial':         '/assets/Images/Tunning Especial/Overhaul (Blighted Precipice) Tanque (Especial).png',
  'Twice|Villano|Velocista|especial':                               '/assets/Images/Tunning Especial/Twice Velocista (Especial).png',
  'Mr. Compress|Villano|Apoyo|especial':                            '/assets/Images/Tunning Especial/Mr. Compress Apoyo (Especial).png',
  'Hawks|Héroe|Velocista|especial':                                 '/assets/Images/Tunning Especial/Hawks Velocista (Especial).png',
  'Hawks (Viento Cortante)|Héroe|Daño|especial':                   '/assets/Images/Tunning Especial/Hawks (Slicing Wind) Agresor (Especial).png',
  'Itsuka Kendo|Héroe|Tanque|especial':                             '/assets/Images/Tunning Especial/Itsuka Kendo Tanque (Especial).png',
  'Itsuka Kendo (Golpe de Palma Doble)|Héroe|Daño|especial':       '/assets/Images/Tunning Especial/Itsuka Kendo (Twin Palm Strike) agresor (Especial).png',
  'Mt. Lady|Héroe|Tanque|especial':                                 '/assets/Images/Tunning Especial/Mt. Lady Tanque (Especial).png',
  'Cementoss|Héroe|Apoyo|especial':                                 '/assets/Images/Tunning Especial/Cementoss Apoyo (Especial).png',
  'Ibara Shiozaki|Héroe|Apoyo|especial':                            '/assets/Images/Tunning Especial/Ibara Shiozaki Apoyo (Especial).png',
  'Kurogiri|Villano|Apoyo|especial':                                '/assets/Images/Tunning Especial/Kurogiri Apoyo (Especial).png',
  'Neito Monoma|Héroe|Técnico|especial':                            '/assets/Images/Tunning Especial/Neito Monoma Tecnico (Especial).png',
  'Hitoshi Shinso|Héroe|Daño|especial':                             '/assets/Images/Tunning Especial/Hitoshi Shinso Agresor (Especial).png',
  'Present Mic|Héroe|Daño|especial':                                '/assets/Images/Tunning Especial/Present Mic Agresor (Especial).png',
  'Lady Nagant|Villano|Daño|especial':                              '/assets/Images/Tunning Especial/Lady Nagant agresor (Especial).png',

  // ────────────────────────────────────────────────────────────────────────────
  // TUNNINGS NORMALES
  // ────────────────────────────────────────────────────────────────────────────
  'Izuku Midoriya|Héroe|Tanque|normal':                             '/assets/Images/Tunning Normal/Izuku Midoriya Tanque (Normal).png',
  'Izuku Midoriya (Full Bullet)|Héroe|Daño|normal':                '/assets/Images/Tunning Normal/Izuku Midoriya (Full Bullet) Agresor (Normal).png',
  'Izuku Midoriya OFA|Héroe|Velocista|normal':                     '/assets/Images/Tunning Normal/Izuku Midoriya OFA Velocista (Normal).png',
  'Katsuki Bakugo|Héroe|Daño|normal':                              '/assets/Images/Tunning Normal/Katsuki Bakugo Agresor (Normal).png',
  'Katsuki Bakugo (Ametralladora)|Héroe|Velocista|normal':         '/assets/Images/Tunning Normal/Katsuki Bakugo (Machine Gun) Velocista (Normal).png',
  'Ochaco Uraraka|Héroe|Velocista|normal':                          '/assets/Images/Tunning Normal/Ochako Uraraka Velocista (Normal).png',
  'Ochaco Uraraka (Satélites Cero)|Héroe|Tanque|normal':           '/assets/Images/Tunning Normal/Ochako Uraraka (Zero Satellites) Tanque (Normal).png',
  'Shoto Todoroki|Héroe|Daño|normal':                               '/assets/Images/Tunning Normal/Shoto Todoroki Agresor (Normal).png',
  'Shoto Todoroki (Colmillo de Hielo Viento Llama)|Héroe|Técnico|normal': '/assets/Images/Tunning Normal/Shoto Todoroki (Ice Fang Wind Flame) Tecnico (Normal).png',
  'Tenya Iida|Héroe|Velocista|normal':                              '/assets/Images/Tunning Normal/Tenya Iida Velocista (Normal).png',
  'Tsuyu Asui|Héroe|Velocista|normal':                              '/assets/Images/Tunning Normal/Tsuyu Asui Velocista (Normal).png',
  'Denki Kaminari|Héroe|Daño|normal':                               '/assets/Images/Tunning Normal/Denki Kaminari Agresor (Normal).png',
  'Denki Kaminari (Relámpago)|Héroe|Técnico|normal':               '/assets/Images/Tunning Normal/Denki Kaminari (Lightning) Tecnico (Normal).png',
  'Eijiro Kirishima|Héroe|Tanque|normal':                           '/assets/Images/Tunning Normal/Eijiro KIrishima Tanque (Normal).png',
  'Eijiro Kirishima (Propulsión Roja)|Héroe|Daño|normal':          '/assets/Images/Tunning Normal/Eijiro Kirishima (Red Drive) Agresor (Normal).png',
  'Momo Yaoyorozu|Héroe|Apoyo|normal':                              '/assets/Images/Tunning Normal/Momo Yaoyorozu Apoyo (Normal).png',
  'Fumikage Tokoyami|Héroe|Tanque|normal':                          '/assets/Images/Tunning Normal/Fumikage Tokoyami Tanque (Normal).png',
  'All Might|Héroe|Tanque|normal':                                  '/assets/Images/Tunning Normal/All Might Tanque (Normal).png',
  'All Might (Ametralladora)|Héroe|Velocista|normal':              '/assets/Images/Tunning Normal/All Might (Gatling) Velocista (Normal).png',
  'All Might Acorazado|Héroe|Técnico|normal':                      '/assets/Images/Tunning Normal/Armored All Might Tecnico (Normal).png',
  'Shota Aizawa|Héroe|Técnico|normal':                              '/assets/Images/Tunning Normal/Shota Aizawa Tecnico (Normal).png',
  'Tomura Shigaraki|Villano|Daño|normal':                           '/assets/Images/Tunning Normal/Tomura Shigaraki Agresor (Normal).png',
  'Tomura Shigaraki (Catástrofe)|Villano|Tanque|normal':           '/assets/Images/Tunning Normal/Tomura Shigaraki (Catastrophe) Tanque (Normal).png',
  'Tomura Shigaraki (Quiebre de los Mil Brazos)|Villano|Técnico|normal': '/assets/Images/Tunning Normal/Tomura Shigaraki (Thousand-Hand Break) Tecnico (Normal).png',
  'All For One|Villano|Técnico|normal':                             '/assets/Images/Tunning Normal/All For One Tecnico (Normal).png',
  'All For One (Edad Juvenil)|Villano|Tanque|normal':              '/assets/Images/Tunning Normal/All For One (Youth age) Tanque (Normal).png',
  'Dabi|Villano|Técnico|normal':                                    '/assets/Images/Tunning Normal/Dabi Tecnico (Normal).png',
  'Dabi (Antorcha Loca)|Villano|Daño|normal':                      '/assets/Images/Tunning Normal/Dabi (Crazy Torch) Agresor (Normal).png',
  'Himiko Toga|Villano|Técnico|normal':                             '/assets/Images/Tunning Normal/Himiko Toga Tecnico (Normal).png',
  'Himiko Toga (Danza del Aguijón)|Villano|Velocista|normal':      '/assets/Images/Tunning Normal/Himiko Toga (Sting Dance) Velocista (Normal).png',
  'Endeavor|Héroe|Daño|normal':                                     '/assets/Images/Tunning Normal/Endeavor Agresor (Normal).png',
  'Endeavor (Puño Infernal)|Héroe|Tanque|normal':                  '/assets/Images/Tunning Normal/Endeavor (Inferno FIst) Tanque (Normal).png',
  'Mirio Togata|Héroe|Velocista|normal':                            '/assets/Images/Tunning Normal/Mirio Togata Velocista (Normal).png',
  'Mirio Togata (Contraataque Puro)|Héroe|Técnico|normal':         '/assets/Images/Tunning Normal/Mirio Togata (Sheer Counter) Tecnico (Normal).png',
  'Nejire Hado|Héroe|Técnico|normal':                               '/assets/Images/Tunning Normal/Nejire Hado Tecnico (Normal).png',
  'Nejire Hado (Hada)|Héroe|Apoyo|normal':                         '/assets/Images/Tunning Normal/Nejire Hado (Fairy) Apoyo (Normal).png',
  'Tamaki Amajiki|Héroe|Daño|normal':                               '/assets/Images/Tunning Normal/Tamaki Amajiki Agresor (Normal).png',
  'Overhaul|Villano|Apoyo|normal':                                  '/assets/Images/Tunning Normal/Overhaul Apoyo (Normal).png',
  'Overhaul (Precipicio Maldito)|Villano|Tanque|normal':           '/assets/Images/Tunning Normal/Overhaul (Blighted Precipice) Tanque (Normal).png',
  'Twice|Villano|Velocista|normal':                                 '/assets/Images/Tunning Normal/Twice Velocista (Normal).png',
  'Mr. Compress|Villano|Apoyo|normal':                              '/assets/Images/Tunning Normal/Mr. Compress Apoyo (Normal).png',
  'Hawks|Héroe|Velocista|normal':                                   '/assets/Images/Tunning Normal/Hawks Velocista (Normal).png',
  'Hawks (Viento Cortante)|Héroe|Daño|normal':                     '/assets/Images/Tunning Normal/Hawks (Slicing Wind) Agresor (Normal).png',
  'Itsuka Kendo|Héroe|Tanque|normal':                               '/assets/Images/Tunning Normal/Itsuka Kendo Tanque (Normal).png',
  'Itsuka Kendo (Golpe de Palma Doble)|Héroe|Daño|normal':         '/assets/Images/Tunning Normal/Itsuka Kendo (Twin Palm Strike) Agresor (Normal).png',
  'Mt. Lady|Héroe|Tanque|normal':                                   '/assets/Images/Tunning Normal/Mt. Lady Tanque (Normal).png',
  'Cementoss|Héroe|Apoyo|normal':                                   '/assets/Images/Tunning Normal/Cementoss Apoyo (Normal).png',
  'Ibara Shiozaki|Héroe|Apoyo|normal':                              '/assets/Images/Tunning Normal/Ibara Shiozaki Apoyo (Normal).png',
  'Kurogiri|Villano|Apoyo|normal':                                  '/assets/Images/Tunning Normal/Kurogiri Apoyo (Normal).png',
  'Neito Monoma|Héroe|Técnico|normal':                              '/assets/Images/Tunning Normal/Neito Monoma Tecnico (Normal).png',
  'Hitoshi Shinso|Héroe|Daño|normal':                               '/assets/Images/Tunning Normal/Hitoshi Shinso Agresor (Normal).png',
  'Present Mic|Héroe|Daño|normal':                                  '/assets/Images/Tunning Normal/Present Mic Agresor (Normal).png',
  'Lady Nagant|Villano|Daño|normal':                                '/assets/Images/Tunning Normal/Lady Nagant Agresor (Normal).png',
};

/**
 * Devuelve la ruta de imagen para un personaje dado, o null si no existe.
 */
export function getCharacterImage(personaje, rol, clase, tipo = 'especial') {
  const exactKey = `${personaje}|${rol}|${clase}|${tipo}`;
  if (characterImages[exactKey]) return characterImages[exactKey];

  // Fallback: nombre base sin la variante entre paréntesis
  const base = personaje.replace(/\s*\(.*?\)$/, '').trim();
  const baseKey = `${base}|${rol}|${clase}|${tipo}`;
  if (characterImages[baseKey]) return characterImages[baseKey];

  return null;
}

/**
 * Busca cualquier imagen disponible para un personaje basándose solo en su nombre.
 */
export function getAnyCharacterImage(personaje, tipo = 'normal') {
  if (!personaje) return null;
  const suffix = `|${tipo}`;
  
  // 1. Try to find an exact match for the full character name first
  for (const [key, path] of Object.entries(characterImages)) {
    if (key.startsWith(personaje + '|') && key.endsWith(suffix)) {
      return path;
    }
  }

  // 2. If no exact match, try the base name (fallback)
  const base = personaje.replace(/\s*\(.*?\)$/, '').trim();
  if (base !== personaje) {
    for (const [key, path] of Object.entries(characterImages)) {
      if (key.startsWith(base + '|') && key.endsWith(suffix)) {
        return path;
      }
    }
  }

  return null;
}
