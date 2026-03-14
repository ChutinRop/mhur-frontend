// Importamos 'fs' (File System) de Node para poder crear y guardar archivos
const fs = require('fs');

// 1. PEGA AQUÍ TODO EL OBJETO CHARACTERS DEL ARCHIVO DE LA WEB
// Debe verse algo así (pero con todos los personajes):
const CHARACTERS = {

    // ================================
    // IZUKU MIDORIYA
    // ================================
    "Izuku Midoriya": {
        role: "H",
        styles: ["S", "A"],
        costumes: {
            "Casual Style": {
                variants: {

                    Default:
                        "UU! TU TU RU TH UV SV! UU RU SU AH RH",

                    "Villain Style":
                        "AU! RU RU AU SV RV SH! AU AU SU RV SV",

                    Heat:
                        "SU! RU SU TU TH RH UH! SU SU UU AH UV",

                    Combat:
                        "RU! UU TU RU UH AH TV! SU UU AU AV UH",

                    Fancy:
                        "UU! TU SU RU TV RH SV! AU UU RU TH TV",

                    Dangerous:
                        "TU! AU RU RU AH TV AH! RU SU SU SV AV"

                }
            },

            "Undefeatable": {
                variants: {

                    Default:
                        "AU! SU SU UU TH SV SH! UU UU SU SV AV",

                    "Villain Style":
                        "RU! RU AU UU RH SH SH! SU RU TU AV RV",

                    Heat:
                        "AU! RU RU SU RH RV AH! SU AU AU UV UH",

                    Combat:
                        "UU! TU AU SU AH RH RV! TU AU SU TH UH",

                    Fancy:
                        "SU! SU AU TU AV UH UH! TU UU AU SV TV",

                    Dangerous:
                        "TU! SU UU TU SV UV RV! UU UU UU AH TH"

                }
            },

            "Parallel World": {
                variants: {

                    Default:
                        "RU! RU SU TU SH RH AV! SU RU SU RV SV",

                    "Villain Style":
                        "AU! AU SU AU RH SV AU! AU UU SU RH SV",

                    Heat:
                        "SU! UU AU TU UH SH AV! SU AU UU AH SH",

                    Combat:
                        "RU! SU UU RU UH SV SH! RU UU UU SH UH",

                    Fancy:
                        "UU! TU TU AU RH TV TH! UU UU SU SH TV",

                    Dangerous:
                        "TU! AU AU SU TV TV SH! RU AU SU SH TH"

                }
            },

            "Kung Fu Outfit": {
                variants: {

                    Default:
                        "AU! AU SU RU RV RH RH! AU RU SU RH SV",

                    "Villain Style":
                        "RU! AU AU TU SH RV SV! SU SU SU AH SH",

                    Heat:
                        "TU! UU SU AU UH AH AV! SU AU SU AH RV",

                    Combat:
                        "AU! TU UU RU AH SH UH! AU UU UU SH UV",

                    Fancy:
                        "SU! RU TU AU RH AV TH! RU AU RU SV SH",

                    Dangerous:
                        "UU! AU RU SU SH TH UV! RU SU AU SH TH"

                }
            },

            "Costume E": {
                variants: {

                    Default:
                        "SU! AU SU RU TV AH AH! UU RU RU SV AH",

                    "Villain Style":
                        "RU! AU UU SU AV SV TH! SU RU UU AH RH",

                    Heat:
                        "TU! SU RU RU RH AH UV! SU UU RU SV UV",

                    Combat:
                        "AU! UU SU TU RV TV RV! TU AU TU TV SH",

                    Fancy:
                        "SU! RU AU UU TH RH SH! TU SU AU SH TH",

                    Dangerous:
                        "UU! AU UU RU SV TV RH! UU UU UU AH TH"

                }
            },

            "Old Uniform": {
                variants: {

                    Default:
                        "TU! AU RU SU RH RH AV! AU SU TU RH UH",

                    "Villain Style":
                        "SU! UU SU SU RV SV AH! AU SU TU UV AV",

                    Heat:
                        "UU! SU UU AU AH AH UH! SU SU RU UV SH",

                    Combat:
                        "RU! AU SU RU SH UH RV! TU AU RU SV SH",

                    Fancy:
                        "TU! SU AU RU RV SH SH! AU TU SU RH SV",

                    Dangerous:
                        "AU! RU SU AU SH RV TH! RU AU SU RH TV"

                }
            },

            "Full Cowling 100%": {
                variants: {

                    Default:
                        "UU! RH! UU TU RU AU SU TU RH SV SV RH",

                    "Villain Style":
                        "SU! RV! SU TU AU SU SU TU RV AH SH AH",

                    Heat:
                        "AU! UV! SU AU AU SU UU RU AH AH UH RH",

                    Combat:
                        "TU! TV! SU AU UU UU UU RU AV SV UH UV",

                    Fancy:
                        "RU! AH! RU RU UU UU RU TU SV AV TH RH",

                    Dangerous:
                        "UU! SV! RU AU SU TU SU RU SH RV TV SH"

                }
            },

            "Festival Jinbei": {
                variants: {

                    Default:
                        "RU! RU SU TU RV RH TV! RU SU TU RV SH",

                    "Villain Style":
                        "TU! AU AU TU RV AH AH! AU UU RU UH TH",

                    Heat:
                        "SU! SU SU AU UV SH UV! RU RU UU AH TH",

                    Combat:
                        "UU! TU SU RU AH SH TH! UU AU SU UV RV",

                    Fancy:
                        "RU! AU TU SU RV AH AH! SU TU TU TV UH",

                    Dangerous:
                        "AU! AU AU SU RH TV UH! RU TU RU AV UV"

                }
            },

            "Cyber Hero Costume": {
                variants: {

                    Default:
                        "RU! TU TU AU AH TV TV! SU RU RU RH SH",

                    "Villain Style":
                        "AU! UU TU UU AH TV UH! AU SU SU RH SV",

                    Heat:
                        "TU! UU AU RU UV TV RH! RU AU UU AH SH",

                    Combat:
                        "RU! SU SU AU SH SH SH! RU TU UU SV UV",

                    Fancy:
                        "SU! SU RU TU SV UV UV! UU UU SU SV AH",

                    Dangerous:
                        "UU! AU RU TU TH TH RH! RU AU SU AH TV"

                }
            },

            "Christmas Santa": {
                variants: {

                    Default:
                        "UU! UU SU UU SV UH RH! SU RU SU UH SV",

                    "Villain Style":
                        "AU! RU TU UU SH RV AV! RU UU AU SV RH",

                    Heat:
                        "UU! AU RU TU RV RV SV! RU SU SU TV RH",

                    Combat:
                        "TU! AU RU UU TH AV UH! UU TU UU SV AH",

                    Fancy:
                        "SU! UU SU TU UH TH SH! AU SU RU TV SH",

                    Dangerous:
                        "RU! TU UU TU SV AH UV! AU RU UU AH TH"

                }
            },

            "100 Million Copies Commemorative Costume": {
                variants: {

                    Default:
                        "SU! RU UU AU SH TH TH! AU AU RU UV TV"

                }
            },

            "Volunteer Activities": {
                variants: {

                    Default:
                        "SU! RU AU AU SH UV TV! TU TU RU SV UH",

                    Navy:
                        "UU! AU TU SU SV SH RV! UU AU TU TH RV",

                    Orange:
                        "TU! SU RU AU AH UV TH! SU UU RU TH TV",

                    Black:
                        "AU! UU RU RU SV RV SV! AU TU SU RH AH",

                    Pink:
                        "RU! RU AU UU SV SH AH! AU SU RU UV TH",

                    "Sky Blue":
                        "TU! TU TU RU UH UV RH! RU AU SU RV UH"

                }
            },

            "Summer Leisure": {
                variants: {

                    Default:
                        "TU! AU RU AU SH UV AH! UU TU RU RH SV",

                    Combat:
                        "UU! TU RU TU SH UH SH! AU SU TU UV TV"

                }
            },

            "Hero Costume Gran Torino": {
                variants: {

                    Default:
                        "SU! AU AU RU TH UV UH! AU SU RU TV AH",

                    Combat:
                        "UU! UU TU SU UH AV TV! UU SU AU SV TH"

                }
            }
        }
    },

    // ================================
    // MIDORIYA OFA
    // ================================
    "Midoriya OFA": {
        role: "H",
        styles: ["R"],
        costumes: {

            "One For All Final Battle Ver.": {
                variants: {

                    Default:
                        "AU! SU UU TU SV TV RV! UU SU AU RH SH",

                    "Villain Style":
                        "TU! AU TU SU AH SH SH! SU AU RU RV TV",

                    Heat:
                        "AU! RU AU RU SH SV SH! UU TU RU SV AH",

                    Combat:
                        "SU! TU SU TU RH SH AV! SU TU AU SV RV",

                    Fancy:
                        "RU! UU RU SU SV TH TH! AU UU UU SH TV",

                    Dangerous:
                        "UU! AU AU SU RH RV TV! TU AU RU UH SV"

                }
            },

            "Leather Style": {
                variants: {

                    Default:
                        "SU! RU AU RU UH UV UV! SU TU SU TV SH",

                    Combat:
                        "TU! AU UU RU AH RV RH! SU SU RU TH UV"

                }
            },

            "Quirk Assist Gear": {
                variants: {

                    Default:
                        "UU! UU SU TU AV SH SV! RU RU AU TV TH",

                    "Villain Style":
                        "AU! TU RU AU RV AH TV! RU AU SU UV SH",

                    Heat:
                        "TU! SU UU AU SH UV AH! TU UU TU UH SV",

                    Combat:
                        "SU! RU TU RU AV UV RH! AU SU TU UH SH",

                    Fancy:
                        "UU! UU SU SU UV TV AV! AU RU RU SH TH",

                    Dangerous:
                        "RU! AU RU AU UV SH UH! TU AU TU TV AH"

                }
            }
        }
    },

    // ================================
    // KATSUKI BAKUGO
    // ================================
    "Katsuki Bakugo": {
        role: "H",
        styles: ["S", "R"],
        costumes: {

            "Casual Style": {
                variants: {

                    Default:
                        "AU! UU RU TU RV SV RH! RU SU TU SH RH",

                    "Villain Style":
                        "UU! RU UU RU RH AH TV! SU SU AU RV SH",

                    Heat:
                        "AU! UU SU RU RH SV AH! UU SU TU UH RV",

                    Combat:
                        "SU! TU UU RU UV RV UH! SU UU SU RH SV",

                    Fancy:
                        "RU! RU TU UU RV UH SV! RU TU RU SV TH",

                    Dangerous:
                        "TU! RU AU SU UV RH AV! AU RU SU TH SV"

                }
            },

            "Undefeatable": {
                variants: {

                    Default:
                        "UU! TU SU AU RV SV TH! UU SU RU TH AV",

                    "Villain Style":
                        "AU! SU TU AU RH UV SV! AU RU SU AV SH",

                    Heat:
                        "RU! TU SU RU UH AV UH! SU RU AU RH TV",

                    Combat:
                        "TU! AU TU UU UV SV UH! UU SU TU TH TV",

                    Fancy:
                        "SU! AU UU SU SH SV AH! RU AU TU TV AH",

                    Dangerous:
                        "UU! RU RU SU SV RV RH! AU TU RU SV TV"

                }
            },

            "Winter Version": {
                variants: {

                    Default:
                        "SU! UU AU TU SH RH UV! UU SU RU RH RH",

                    "Villain Style":
                        "UU! TU UU TU AV TH RH! AU UU SU SH AH",

                    Heat:
                        "RU! AU SU UU AH RH SH! UU SU AU AV AH",

                    Combat:
                        "SU! AU UU RU UV UV AH! TU UU AU TV RH",

                    Fancy:
                        "AU! RU UU TU AH UV TH! RU AU AU RH AV",

                    Dangerous:
                        "TU! TU SU RU RH TV SV! RU RU SU SH TH"

                }
            },

            "Parallel World": {
                variants: {

                    Default:
                        "SU! RU SU RU TV RV RH! SU SU RU TH AH",

                    "Villain Style":
                        "AU! AU AU UU RH SH SV! AU SU SU AH SV",

                    Heat:
                        "UU! SU RU RU UV AH AV! SU RU AU RH AH",

                    Combat:
                        "TU! UU RU AU TH UV UH! UU SU TU AV TV",

                    Fancy:
                        "RU! SU AU UU TV SH TH! RU AU UU TV AH",

                    Dangerous:
                        "SU! AU UU AU SV TV SV! AU UU TU TH TV"

                }
            },

            "Kung Fu Outfit": {
                variants: {

                    Default:
                        "RU! SU RU SU AV SV AH! SU TU AU TV UH",

                    "Villain Style":
                        "AU! AU UU AU SH TV UH! RU UU AU UH RV",

                    Heat:
                        "UU! AU SU UU UV SH SV! TU SU SU TV TH",

                    Combat:
                        "SU! RU RU UU SH RH RH! UU TU UU SV AH",

                    Fancy:
                        "RU! UU SU SU UV UH TV! RU SU RU TH SH",

                    Dangerous:
                        "TU! TU SU TU SH AV SV! AU SU UU AH SV"

                }
            },

            "Old Uniform": {
                variants: {

                    Default:
                        "RU! TU AU SU RH SV SV! UU TU TU RV SH",

                    "Villain Style":
                        "SU! RU TU SU SV RH TH! TU AU SU TH SV",

                    Heat:
                        "TU! AU UU TU RH SV RV! SU AU UU AV UH",

                    Combat:
                        "RU! UU TU UU SV AH AH! SU UU UU AV UV",

                    Fancy:
                        "AU! UU SU SU TH UV UH! RU UU RU SV SV",

                    Dangerous:
                        "UU! TU SU TU SH TV UH! RU SU SU SH TH"

                }
            },

            "Strafe Panzer": {
                variants: {

                    Default:
                        "AU! SU TU RU TV UV RV! SU SU RU TH RH",

                    "Villain Style":
                        "UU! RU SU AU SH RH SH! AU SU AU AH SV",

                    Heat:
                        "RU! UU SU SU SV AH TV! SU UU SU RH UH",

                    Combat:
                        "SU! UU TU UU SV AH AV! UU RU RU SV TH",

                    Fancy:
                        "TU! TU UU RU TH SV AH! SU SU UU TV AH",

                    Dangerous:
                        "AU! AU RU RU AH TH UH! AU UU AU SV TV"

                }
            },

            "Cyber Hero Costume": {
                variants: {

                    Default:
                        "UU! RU RU SU AV RH RH! AU TU UU UV TH",

                    "Villain Style":
                        "TU! AU RU SU RH SH TH! UU AU UU AV TV",

                    Heat:
                        "RU! SU SU RU AV UH UV! UU AU AU UH TH",

                    Combat:
                        "SU! SU UU AU RV UH TV! SU SU AU AV SH",

                    Fancy:
                        "AU! AU UU RU RH RV SH! SU RU TU SV AH",

                    Dangerous:
                        "UU! RU SU SU RH AH RH! AU RU TU AH TH"

                }
            },

            "Casual Wear": {
                variants: {

                    Default:
                        "TU! RU RU AU SV UH RV! UU SU UU TH RH",

                    Combat:
                        "TU! UU TU UU SH AV UV! UU RU UU SV TH",
                }
            }
        }
    },

    // ================================
    // OCHACO URARAKA
    // ================================
    "Ochaco Uraraka": {
        role: "H",
        styles: ["R", "A"],
        costumes: {

            "Parallel World": {
                variants: {

                    Default:
                        "AU! SU SU UU TH TV SH! SU AU AU SH RV",

                    "Villain Style":
                        "SU! TU AU UU TH SV RH! TU UU TU SH TV",

                    Heat:
                        "RU! RU RU TU RH RV AV! UU SU UU AH AH",

                    Combat:
                        "TU! TU UU SU UH SV UV! AU UU RU AH UH",

                    Fancy:
                        "AU! SU TU TU SH UV TH! RU UU AU AH SH",

                    Dangerous:
                        "UU! SU UU TU SH UV SH! UU TU RU AV SH",
                }
            },

            "Casual Wear": {
                variants: {

                    Default:
                        "RU! SU RU SU TV SH TH! AU SU TU RH UV",

                    "Villain Style":
                        "UU! AU AU TU RV SV SH! AU AU TU RH AH",

                    Heat:
                        "AU! SU TU UU AH SH UV! SU SU AU UV SV",

                    Combat:
                        "RU! TU UU UU SH UV RV! TU RU RU AV SH",

                    Fancy:
                        "TU! UU UU SU TH TH UV! RU TU SU RV AV",

                    Dangerous:
                        "SU! RU AU SU TH TV AV! RU AU SU AH RH",
                }
            },

            "Old Uniform": {
                variants: {

                    Default:
                        "TU! RU AU TU RV RH AV! RU RU SU RV SH",

                    "Villain Style":
                        "TU! UU RU AU UH RV SH! RU TU SU RH SV",

                    Heat:
                        "SU! AU AU SU AV UH RV! RU AU TU AH SH",

                    Combat:
                        "AU! UU RU SU AH AV UV! UU UU SU TV UH",

                    Fancy:
                        "RU! SU AU UU TH SH TH! TU UU TU SH TH",

                    Dangerous:
                        "UU! RU RU RU TH SH SH! UU AU SU SV TV",

                }
            },

            "Quipao": {
                variants: {

                    Default:
                        "SU! AU RU RU RH UV AV! RU SU AU RH SH",

                    "Villain Style":
                        "TU! AU SU TU SH AV SV! SU AU AU RV UH",

                    Heat:
                        "UU! AU SU RU UV SH RH! TU SU SU UH AH",

                    Combat:
                        "SU! TU UU UU UH SV UH! AU TU RU UH SV",

                    Fancy:
                        "RU! AU TU RU RH SV TH! AU UU SU SV AV",

                    Dangerous:
                        "AU! TU AU SU TV TH TH! UU TU SU AV TV",

                }
            },

            "Festival Yukata": {
                variants: {

                    Default:
                        "UU! RU SU UU SH RH TV! SU RU TU RV SV",

                    "Villain Style":
                        "UU! SU SU AU RV SH UH! AU AU RU RH SH",

                    Heat:
                        "SU! UU SU UU UV RH AV! SU AU TU AH SH",

                    Combat:
                        "RU! SU UU AU RH SV SH! RU UU RU SH UV",

                    Fancy:
                        "AU! RU TU UU SV TV AH! UU UU TU SH TH",

                    Dangerous:
                        "TU! AU RU AU TH SV RV! RU AU RU SV SH",

                }
            },

            "Kunoichi": {
                variants: {

                    Default:
                        "TU! UU UU TU SV AH RH! TU AU AU RH SV",

                    "Villain Style":
                        "SU! TU SU TU AH SV AV! RU SU UU SH RH",

                    Heat:
                        "UU! AU UU UU AV SV AH! SU RU TU RV SV",

                    Combat:
                        "TU! UU SU RU UV AH UH! AU RU UU TV AH",

                    Fancy:
                        "RU! RU SU TU AH AH RV! UU SU SU UH RV",

                    Dangerous:
                        "AU! UU UU RU RH AV SV! TU SU TU AH RH",

                }
            },

            "Superstar Idol": {
                variants: {

                    Default:
                        "RU! SU SU AU RH UH SH! RU AU UU TV TH",

                    Viola:
                        "AU! RU RU AU SH UV AV! UU SU RU UH SH",

                    Scarlet:
                        "SU! AU TU SU RH TH TV! UU UU RU TV AH",

                    Apricot:
                        "UU! AU AU SU UV TV UV! TU SU UU SH TH",

                    Mimosa:
                        "TU! UU TU AU SV UV AH! RU RU AU TH SV",

                    Ranunculus:
                        "RU! SU RU RU AH RV RH! AU UU SU RH UV",

                }
            },

            "Volunteer Activities": {
                variants: {

                    Default:
                        "TU! AU AU SU SH RH TH! RU TU UU TV UV",

                    Navy:
                        "RU! RU AU TU TH UV SV! UU SU UU AH RV",

                }
            },

            "Summer Leisure": {
                variants: {

                    Default:
                        "SU! RU AU AU SH UV SV! TU SU AU AH UV",

                    "Villain Style":
                        "TU! SU SU TU AH RH AH! UU UU RU SV UV",

                    Heat:
                        "AU! AU SU AU UV UH TV! TU SU SU RH TV",

                    Combat:
                        "SU! AU RU RU UH SV RH! TU RU TU UV AH",

                    Fancy:
                        "UU! TU RU TU AH UV UH! AU TU SU SH TV",

                    Dangerous:
                        "RU! UU AU UU SV TV TV! SU UU RU TH AH",

                }
            },

            "Open-Faced": {
                variants: {

                    Default:
                        "RU! RU RU TU RU RH AH! SU TU SU RU AV",

                }
            },

            "Christmas Santa Costume": {
                variants: {

                    Default:
                        "RU! RU SU AU RH UH UH! AU AU RU SV TV",

                    "Villain Style":
                        "SU! SU UU TU UV TH AH! AU SU TU RV UH",

                    Heat:
                        "UU! RU RU AU SH TH SV! SU SU RU RV TV",

                    Combat:
                        "TU! UU TU SU RH UH TV! SU AU RU SV UV",

                    Fancy:
                        "AU! AU UU RU SH AH RH! AU UU TU UV SV",

                    Dangerous:
                        "SU! AU TU AU UV AH RV! SU AU TU TH TV",

                }
            }
        }
    },

    // ================================
    // TENYA IIDA
    // ================================
    "Tenya Iida": {
        role: "H",
        styles: ["R"],
        costumes: {

            "Casual Style": {
                variants: {

                    Default:
                        "AU! SU RU RU RV SH TH! RU UU RU AH TV",

                    "Villain Style":
                        "SU! AU SU SU RH SH AV! UU TU SU AH SV",

                    Heat:
                        "RU! SU AU UU AH SH RV! RU AU RU SH TH",

                    Combat:
                        "UU! RU UU UU SV UV RV! TU UU RU SV AV",

                    Fancy:
                        "TU! UU TU SU SH TV SH! AU SU TU TV TH",

                    Dangerous:
                        "AU! RU AU AU AV TH TH! AU SU AU TV TV",

                }
            },

            "Kung Fu Outfit": {
                variants: {

                    Default:
                        "UU! RU AU TU SH RH TH! RU TU AU AV TH",

                    "Villain Style":
                        "TU! TU RU TU AV TV AH! UU SU RU AH TV",

                    Heat:
                        "AU! AU SU RU AH RH RV! SU AU RU SV TH",

                    Combat:
                        "RU! AU UU RU RH UV SH! SU UU UU UH AH",

                    Fancy:
                        "SU! RU UU TU AH RV UV! SU UU TU SH UH",

                    Dangerous:
                        "UU! AU TU RU RH RV UV! RU RU TU TH TH",

                }
            },

            "Shinobi": {
                variants: {

                    Default:
                        "TU! TU AU AU RH SV SH! RU TU UU RH SV",

                    "Villain Style":
                        "AU! RU SU UU SH RH AH! SU TU UU AV RH",

                    Heat:
                        "TU! SU RU TU RV SV UV! AU TU UU UH AV",

                    Combat:
                        "SU! AU RU UU TH AH RH! AU TU UU SV UH",

                    Fancy:
                        "RU! UU SU SU UV RV TH! UU TU SU RV SH",

                    Dangerous:
                        "UU! TU SU TU AH TH RV! RU TU AU SH TV",

                }
            },

            "Parallel World": {
                variants: {

                    Default:
                        "RU! AU TU TU UH TH SV! SU RU TU SH SV",

                    Heat:
                        "SU! RU AU TU UH TV SH! SU SU TU SH TH",

                    Combat:
                        "SU! SU SU TU AH UH AV! RU SU SU SV SV",

                }
            },

            "Volunteer Activities": {
                variants: {

                    Default:
                        "RU! AU RU UU UV RH RH! UU TU UU SV UH",

                    Black:
                        "TU! SU RU RU UV UV AH! TU AU SU RH AH",

                    Orange:
                        "SU! TU TU RU SV AH UV! UU TU UU TV SH",

                    Green:
                        "AU! AU AU TU TH TV SH! AU RU AU SH UV",

                    Pink:
                        "UU! SU SU AU TH TH TV! RU SU UU SV RV",

                    "Sky Blue":
                        "TU! RU AU UU SH RV SV! UU TU SU AH TV",

                }
            },

            "Festival Happi": {
                variants: {

                    Default:
                        "UU! AU AU AU SH SV RH! RU UU TU RH UV",

                    "Villain Style":
                        "RU! TU AU SU RV UH TV! AU SU TU TH UV",

                    Heat:
                        "AU! UU TU RU SH RV UV! UU AU AU TV RH",

                    Combat:
                        "TU! RU SU AU TH UV TH! SU RU AU UV UH",

                    Fancy:
                        "SU! SU UU TU AH SV SV! AU SU RU RH TV",

                    Dangerous:
                        "RU! UU AU AU RH TV AH! UU TU SU RV RH",

                }
            }
        }
    },

    // ================================
    // SHOTO TODOROKI
    // ================================

    "Shoto Todoroki": {
        role: "H",
        styles: ["S", "T"],
        costumes: {

            "Casual Style": {
                variants: {

                    Default:
                        "RU! AU SU RU RH SV UH! AU RU SU RH SV",

                    "Villain Style":
                        "RU! AU UU UU RH SH SH! AU AU RU RV TH",

                    Heat:
                        "AU! SU RU UU UH AV UV! SU AU UU TH SH",

                    Combat:
                        "SU! UU RU SU SV SH TV! SU UU TU SH SH",

                    Fancy:
                        "UU! SU SU UU TV UH UH! UU TU RU SH TH",

                    Dangerous:
                        "TU! AU UU AU UV TV RV! TU AU SU RV TH",

                }
            },

            "Undefeatable": {
                variants: {

                    Default:
                        "SU! TU SU SU RV SH RH! RU TU SU AH RV",

                    "Villain Style":
                        "UU! AU TU UU SH RV AH! TU RU SU RH SH",

                    Heat:
                        "TU! AU RU TU RH RH UH! SU SU RU AV TV",

                    Combat:
                        "SU! AU RU UU TV RV SV! SU UU AU TH UV",

                    Fancy:
                        "RU! UU SU SU RH TH TV! AU UU RU TV RH",

                    Dangerous:
                        "AU! TU SU RU SH RV AH! RU SU TU RH AH",

                }
            },

            "Hero Costume Alpha Ver.": {
                variants: {

                    Default:
                        "TU! SU RU SU RH SV UV! AU SU RU TH RV",

                    "Villain Style":
                        "SU! UU UU TU SV RH RH! AU SU UU RH SV",

                    Heat:
                        "AU! AU RU UU TH SV TV! SU RU SU UV AH",

                    Combat:
                        "TU! AU RU UU SH UV SH! UU RU AU SV UH",

                    Fancy:
                        "RU! UU SU SU SH UH AV! SU AU AU TV SH",

                    Dangerous:
                        "UU! TU SU AU SH AH RH! AU TU AU SV TH"

                }
            },

            "Parallel World": {
                variants: {

                    Default:
                        "UU! UU SU AU AH TH RH! SU SU RU TV TV",

                    "Villain Style":
                        "RU! UU TU SU AV TH AH! TU AU RU TH SH",

                    Heat:
                        "SU! TU AU RU SH TV UV! RU RU RU RV RV",

                    Combat:
                        "UU! UU SU AU SV AH RH! TU UU RU UH SH",

                    Fancy:
                        "TU! TU RU TU TV SV SV! SU TU RU SH UV",

                    Dangerous:
                        "AU! UU RU SU SH TH AH! SU UU RU SH UH"

                }
            },

            "Kung Fu Outfit": {
                variants: {

                    Default:
                        "RU! RU SU RU TV AH TH! AU SU TU RH SH",

                    "Villain Style":
                        "TU! AU RU AU SV SH AH! UU SU AU UH SH",

                    Heat:
                        "RU! SU RU SU RH AH UH! AU RU AU AV TV",

                    Combat:
                        "AU! UU SU AU RV TH SV! UU UU SU SH RV",

                    Fancy:
                        "UU! RU AU UU TH SH TV! SU TU UU TV AH",

                    Dangerous:
                        "SU! AU UU TU RH TV SV! RU TU RU SH TH"

                }
            },

            "Festival Jinbei": {
                variants: {

                    Default:
                        "AU! RU TU SU AH UH TV! RU UU UU RH SV",

                    "Villain Style":
                        "UU! UU RU UU SV UH AH! SU RU UU AV RH",

                    Heat:
                        "TU! UU AU RU UH UH SV! AU AU UU UH AV",

                    Combat:
                        "RU! SU SU AU RH UV AH! AU RU UU SH UV",

                    Fancy:
                        "AU! AU RU TU SH UV UH! UU AU SU RH SH",

                    Dangerous:
                        "SU! SU SU TU TV UH RV! RU UU AU SV TH"

                }
            },

            "100 Million Copies Commemorative Costume": {
                variants: {

                    Default:
                        "RU! UU TU UU SH SV UV! RU UU AU AH TV"

                }
            },

            "Volunteer Activities": {
                variants: {

                    Default:
                        "UU! SU SU RU RH AH SH! UU AU TU TV RV",

                    Navy:
                        "AU! UU TU SU TH UV UV! AU SU UU RV AH",

                    Orange:
                        "SU! AU SU TU RH TV SH! TU UU TU RH SV",

                    Green:
                        "RU! RU AU AU SV TH RV! AU TU UU AH UV",

                    Pink:
                        "TU! RU SU SU AH TV TV! SU RU AU SV TH",

                    Black:
                        "SU! UU SU UU TH UH AH! RU AU RU SV RV"

                }
            }

        }
    },

    // ================================
    // TSUYU ASUI
    // ================================

    "Tsuyu Asui": {
        role: "H",
        styles: ["R"],
        costumes: {

            "Parallel World": {
                variants: {

                    Default:
                        "RU! SU RU UU RH SH SH! RU RU RU TV AH",

                    "Villain Style":
                        "TU! AU AU SU AV SH RV! AU TU UU RV UV",

                    Heat:
                        "UU! SU AU UU AH TV TH! SU SU RU UH AV",

                    Combat:
                        "RU! RU UU UU SH SV AH! UU TU AU TV SH",

                    Fancy:
                        "AU! UU TU SU TV TH UV! SU SU UU TV AH",

                    Dangerous:
                        "SU! RU AU SU SH TV RV! AU RU AU SH UV"

                }
            },

            "Jiangshi Costume": {
                variants: {

                    Default:
                        "SU! RU RU AU SH TH AV! AU UU RU RV UH",

                    "Villain Style":
                        "AU! TU AU AU RH TV SH! AU SU RU SV AV",

                    Heat:
                        "TU! TU AU SU RH SH UH! AU SU RU AV SH",

                    Combat:
                        "SU! SU AU UU TV UH AH! TU UU UU UV TV",

                    Fancy:
                        "UU! SU RU AU UH SV RV! AU TU RU SH SH",

                    Dangerous:
                        "RU! RU RU SU AH SH RH! TU AU RU TH TH"

                }
            },

            "Old Uniform": {
                variants: {

                    Default:
                        "AU! SU UU AU RH SV TH! RU TU RU RH SV",

                    "Villain Style":
                        "SU! RU SU UU SH RV UV! AU RU RU RH SH",

                    Heat:
                        "UU! AU UU SU RH SH SH! SU UU TU AH SH",

                    Combat:
                        "TU! AU UU UU SH AH TH! RU AU RU TV UH",

                    Fancy:
                        "AU! UU UU SU UH SV TV! UU AU TU SV UH",

                    Dangerous:
                        "RU! TU UU TU UH RH SH! RU UU RU TV TH"

                }
            },

            "Festival Yukata": {
                variants: {

                    Default:
                        "TU! SU SU TU TV AH AV! RU AU SU RH SH",

                    "Villain Style":
                        "SU! AU SU SU UV SH TV! RU AU AU SH RV",

                    Heat:
                        "RU! SU RU AU RH TH UH! AU RU UU AH RH",

                    Combat:
                        "UU! UU SU TU RV TV SH! AU RU UU UV UV",

                    Fancy:
                        "TU! RU AU SU TH AV AH! TU SU TU TV AH",

                    Dangerous:
                        "AU! AU RU TU TH TH RH! TU SU UU SH AV"

                }
            },

            "Superstar Idol": {
                variants: {

                    Default:
                        "AU! RU AU SU SV RH UH! SU UU SU AH TV",

                    Viola:
                        "SU! TU RU SU UH RV SV! AU RU TU RH UV",

                    Scarlet:
                        "RU! RU UU RU TH SH UV! AU SU UU UH SV",

                    Apricot:
                        "UU! AU AU UU SV SH TV! SU AU UU RV AH",

                    Mimosa:
                        "TU! RU SU RU AH UH RH! TU SU AU TH SV",

                    Ranunculus:
                        "UU! SU UU SU RH AV AH! UU RU AU SV SH"

                }
            },

            "Creepy Mineta": {
                variants: {

                    Default:
                        "UU! RU SU RU UU RH RH! UU AU TU SU AV"

                }
            },

            "Kunoichi": {
                variants: {

                    Default:
                        "AU! RU AU UU SV UH AH! TU SU TU RH UV",

                    "Villain Style":
                        "UU! AU RU SU TH UV SV! TU AU AU SH RV",

                    Heat:
                        "TU! UU AU RU SH TH RV! AU TU SU SV UV",

                    Combat:
                        "RU! SU AU RU RH UV UH! TU RU TU AH SV",

                    Fancy:
                        "SU! TU SU AU TH RH TH! AU TU UU UV RV",

                    Dangerous:
                        "TU! RU UU SU AV UH UV! SU TU TU AH RV"

                }
            }

        }
    },

    // ================================
    // EIJIRO KIRISHIMA
    // ================================

    "Eijiro Kirishima": {
        role: "H",
        styles: ["A", "S"],
        costumes: {

            "Casual Style": {
                variants: {

                    Default:
                        "AU! UU UU RU AH TV AV! SU RU RU RH SV",

                    "Villain Style":
                        "UU! UU UU SU AH SH RH! AU SU RU RH SV",

                    Heat:
                        "RU! RU AU UU SH TV TH! SU AU RU AV TH",

                    Combat:
                        "SU! TU UU UU UH AH UV! RU UU AU SH RH",

                    Fancy:
                        "TU! AU SU TU TH UH SV! UU UU RU SH SV",

                    Dangerous:
                        "AU! UU SU AU TH TH RH! TU AU RU SH TH"

                }
            },

            "Unbreakable": {
                variants: {

                    Default:
                        "RU! TU TU AU AH TH AV! UU RU TU RH SH",

                    "Villain Style":
                        "SU! RU TU UU RH TH RH! RU UU RU RV AH",

                    Heat:
                        "UU! UU AU UU RH TV UU! UU SU RU RH SV",

                    Combat:
                        "TU! SU SU AU SV AV AH! TU UU RU UH RH",

                    Fancy:
                        "AU! SU AU TU TH UH SV! RU TU AU AV UV",

                    Dangerous:
                        "RU! AU RU SU TH TV TH! RU AU SU UV RV"

                }
            },

            "Kung Fu Outfit": {
                variants: {

                    Default:
                        "TU! TU SU RU TH AH SV! RU SU RU TH RV",

                    "Villain Style":
                        "RU! AU TU AU SH SH RH! AU AU UU RV SH",

                    Heat:
                        "SU! SU RU TU RV TV SH! SU RU RU UH AH",

                    Combat:
                        "UU! UU SU SU TH TV TH! UU RU AU TH RV",

                    Fancy:
                        "AU! RU AU UU TH TV SH! SU AU UU UV SH",

                    Dangerous:
                        "TU! TU UU AU SV TH UV! AU UU TU RH TH"

                }
            },

            "Old Uniform": {
                variants: {

                    Default:
                        "UU! SU SU RU TH RV SV! UU SU SU SH RH",

                    "Villain Style":
                        "AU! AU TU AU RH TH TH! AU AU SU RH SH",

                    Heat:
                        "RU! SU UU UU RV UV AH! SU SU UU AH AH",

                    Combat:
                        "SU! RU RU RU RV TV AH! SU UU AU AV RV",

                    Fancy:
                        "UU! SU TU UU TV AH SV! AU UU RU TH TH",

                    Dangerous:
                        "TU! UU UU AU RH TH RV! RU SU TU SV AV",

                }
            },

            "Festival Happi": {
                variants: {

                    Default:
                        "UU! AU TU UU TH TU RH! SU SU TU RH UH",

                    "Villain Style":
                        "AU! UU AU RU AV TH UH! AU RU TU RH RV",

                    Heat:
                        "UU! UU AU AU UH TH AV! SU SU UU UV SV",

                    Combat:
                        "SU! SU TU AU AH SV RH! TU RU RU AH RH",

                    Fancy:
                        "RU! SU RU TU SH AV SV! UU TU SU RH SH",

                    Dangerous:
                        "TU! AU RU TU UH TH AH! RU UU SU TV SV",

                }
            },

            "Undefeatable": {
                variants: {

                    Default:
                        "SU! UU AU TU SV RH AH! SU RU UU RH SH",

                    "Villain Style":
                        "RU! UU UU TU AH TV SH! UU UU TU SH SV",

                    Heat:
                        "TU! AU SU UU AV RH RV! AU RU AU TV AH",

                    Combat:
                        "AU! AU UU RU UH UH UH! AU RU SU SV UV",

                    Fancy:
                        "UU! RU UU TU SH UV TV! UU SU SU SH UH",

                    Dangerous:
                        "SU! AU TU RU RH SH RV! TU SU AU SH AV",

                }
            },

            "Parallel World": {
                variants: {

                    Default:
                        "SU! AU TU RU TH UV UH! TU UU SU RH SH",

                    "Villain Style":
                        "TU! AU UU AU SH RH RV! UU TU RU SV RV",

                    Heat:
                        "AU! RU AU SU TV RV TH! AU RU TU UH SH",

                    Combat:
                        "RU! UU TU AU SV AH UV! AU UU UU TH RV",

                    Fancy:
                        "SU! AU SU RU AH SV TV! RU SU SU UH TH",

                    Dangerous:
                        "UU! AU RU UU AH AV AH! TU TU TU SV RV",

                }
            },

            "Shinobi": {
                variants: {

                    Default:
                        "TU! SU RU TU UH RV SH! AU AU RU SV TH",

                    "Villain Style":
                        "SU! AU UU TU RH SV UH! SU AU RU TH UV",

                    Heat:
                        "AU! UU TU RU SH AH RV! RU SU SU TV UV",

                    Combat:
                        "RU! TU AU AU RV SH TV! AU UU TU RH SV",

                    Fancy:
                        "UU! RU TU RU TH SV UV! TU AU UU AH UV",

                    Dangerous:
                        "AU! AU SU UU RV TH AH! RU UU SU UV TH",

                }
            }

        }
    },

    // ================================
    // MOMO YAOYOROZU
    // ================================

    "Momo Yaoyorozu": {
        role: "H",
        styles: ["U"],
        costumes: {

            "Casual Wear": {
                variants: {

                    Default:
                        "SU! RU SU AU TH RH UH! RU SU TU RV SH",

                    "Villain Style":
                        "AU! AU AU UU RH UH RV! UU AU AU UV SV",

                    Heat:
                        "UU! SU RU RU UV AV AH! AU RU SU AH SH",

                    Combat:
                        "RU! UU RU AU TV UH SH! UU UU SU AV RH",

                    Fancy:
                        "SU! SU AU UU TH SH TV! SU TU UU TH RV",

                    Dangerous:
                        "TU! AU UU TU SV TH RV! RU TU RU TV UV",
                }
            },

            "Quipao": {
                variants: {

                    Default:
                        "UU! AU AU TU SH RH SH! SU RU SU RH SH",

                    "Villain Style":
                        "RU! TU UU TU AH TV RV! UU TU TU SH RV",

                    Heat:
                        "SU! AU SU UU TV RV AH! AU RU UU TV SH",

                    Combat:
                        "TU! AU UU RU UH SH UV! AU UU UU SV SV",

                    Fancy:
                        "AU! RU SU TU AV SV AH! UU SU SU SV UH",

                    Dangerous:
                        "UU! AU TU RU RH SH TV! TU AU AU SH AV",

                }
            },

            "Festival Yukata": {
                variants: {

                    Default:
                        "TU! SU RU TU UV SH SH! SU AU SU RV SH",

                    "Villain Style":
                        "TU! AU AU RU AH SH AV! AU AU SU RH SH",

                    Heat:
                        "AU! SU RU TU AV SH SV! UU RU UU AH TH",

                    Combat:
                        "RU! RU UU RU SH UH TH! RU UU RU SV UV",

                    Fancy:
                        "UU! UU UU TU SV TV UH! SU SU SU SH TH",

                    Dangerous:
                        "SU! RU SU SU SV TV RH! SU AU SU SH TV",

                }
            },

            "Parallel World": {
                variants: {

                    Default:
                        "AU! RU RU RU TV RV UH! SU RU SU AH UH",

                    "Villain Style":
                        "TU! UU TU AU RH UH AV! AU TU AU SH TV",

                    Heat:
                        "SU! SU UU RU UV AH RV! AU SU TU UV SH",

                    Combat:
                        "AU! UU TU UU TH SV TH! RU RU RU TV RH",

                    Fancy:
                        "UU! SU SU RU UV AH SH! UU SU SU UH TV",

                    Dangerous:
                        "RU! AU RU AU SV SV UH! TU SU TU SH SH",

                }
            },

            "Kunoichi": {
                variants: {

                    Default:
                        "SU! AU RU RU UV TH AH! TU SU AU SH RV",

                    "Villain Style":
                        "AU! TU AU SU UH RH RH! SU AU SU RV UV",

                    Heat:
                        "TU! TU UU AU AH SV TH! SU TU TU RH AV",

                    Combat:
                        "AU! SU RU UU SV UH UV! TU RU TU UV RH",

                    Fancy:
                        "UU! RU SU AU UV TH SV! AU TU AU TV SH",

                    Dangerous:
                        "RU! UU TU SU RV AH TV! TU AU SU SH SV",

                }
            }

        }
    },

    // ================================
    // FUMIKAGE TOKOYAMI
    // ================================

    "Fumikage Tokoyami": {
        role: "H",
        styles: ["A"],
        costumes: {

            "Armor of the Abyss": {
                variants: {

                    Default:
                        "TU! UU RU SU TV RV UV! AU RU AU UH SH",

                    "Villain Style":
                        "SU! AU SU UU RH UV RV! TU AU UU TU SV",

                    Heat:
                        "AU! TU TU SU UH AH SH! AU SU AU RV UV",

                    Combat:
                        "UU! RU AU RU SH UH AH! RU TU TU AV SV",

                    Fancy:
                        "RU! TU UU TU SV SH TH! SU AU AU RV UH",

                    Dangerous:
                        "SU! AU TU SU TH SH TV! RU RU UU TV UV",

                }
            },

            "Casual Style": {
                variants: {

                    Default:
                        "RU! SU RU SU TV AH SV! UU SU AU UV TH",

                    "Villain Style":
                        "SU! RU UU SU UV TV UH! AU RU AU SH TH",

                    Heat:
                        "TU! AU SU AU TH RV AH! SU TU UU AV UH",

                    Combat:
                        "RU! UU AU SU AV RH RH! RU TU RU SH RV",

                    Fancy:
                        "AU! TU UU SU TV RH AV! AU UU TU RV TH",

                    Dangerous:
                        "UU! SU TU UU TH AH TV! RU UU SU UV AV",

                }
            }

        }
    },

    // ================================
    // DENKI KAMINARI
    // ================================

    "Denki Kaminari": {
        role: "H",
        styles: ["S", "T"],
        costumes: {

            "Casual Style": {
                variants: {

                    Default:
                        "UU! RU SU TU TH SH RH! SU RU SU UH SH",

                    "Villain Style":
                        "RU! UU AU AU UV SH TH! AU AU AU RH SV",

                    Heat:
                        "UU! TU RU SU SH TH SV! SU AU UU AV SV",

                    Combat:
                        "TU! UU UU SU AH RH AV! RU UU UU SH UH",

                    Fancy:
                        "SU! SU TU UU TH RV UH! UU UU SU SV TH",

                    Dangerous:
                        "AU! RU TU TU TH UH RV! RU AU TU SH TV"

                }
            },

            "Kung Fu Outfit": {
                variants: {

                    Default:
                        "RU! SU SU UU UV RH UV! RU AU TU SH RV",

                    "Villain Style":
                        "RU! AU SU TU SH TV RH! TU RU TU AH TV",

                    Heat:
                        "SU! UU RU TU UH RV TH! RU SU RU AV RV",

                    Combat:
                        "TU! TU UU RU TH TV SV! AU UU RU RH UH",

                    Fancy:
                        "UU! AU TU AU AH TH RH! RU UU TU AH RH",

                    Dangerous:
                        "AU! AU RU SU SH UV TH! AU TU RU TV UV"

                }
            },

            "Parallel World": {
                variants: {

                    Default:
                        "TU! AU RU RU TH UH RH! RU SU RU UV RV",

                    "Villain Style":
                        "UU! AU SU TU SV RH AV! AU SU SU SH RH",

                    Heat:
                        "SU! SU UU UU TV SH RH! UU TU RU UV AV",

                    Combat:
                        "AU! TU UU UU TH SV UV! SU UU TU TV TV",

                    Fancy:
                        "RU! AU TU RU RH SH SV! AU TU AU RH AH",

                    Dangerous:
                        "TU! TU AU SU TH UV TH! AU RU SU UV RV"

                }
            },

            "Undefeatable": {
                variants: {

                    Default:
                        "RU! RU SU AU TV RV AH! TU RU SU UH AH",

                    "Villain Style":
                        "SU! AU UU SU RV TH RV! TU UU UU SV RH",

                    Heat:
                        "UU! RU SU AU SH TV UH! TU SU AU UH RV",

                    Combat:
                        "TU! SU AU RU SV UH SH! UU AU AU TV TH",

                    Fancy:
                        "AU! UU TU SU AH RH TV! TU UU AU TV RV",

                    Dangerous:
                        "UU! SU RU SU UV TH SV! UU SU UU AV RH"

                }
            },

            "Armor of Holy Light": {
                variants: {

                    Default:
                        "SU! UU TU RU RV SH AV! TU AU UU TV AH",

                    "Villain Style":
                        "UU! TU SU TU RH AH RV! UU UU SU UV SV",

                    Heat:
                        "SU! SU AU TU AH SH TV! RU UU RU TV UV",

                    Combat:
                        "AU! UU RU SU TH RV UH! AU TU SU RH AV",

                    Fancy:
                        "TU! RU AU AU UV SV AH! AU TU AU TH UH",

                    Dangerous:
                        "RU! AU TU UU UH RH SH! SU RU SU UV AV"

                }
            }

        }
    },

    // ================================
    // NEITO MONOMA
    // ================================

    "Neito Monoma": {
        role: "H",
        styles: ["T"],
        costumes: {

            "U.A. Track Suit": {
                variants: {

                    Default:
                        "TU! SU SU TU UH RV TH! AU UU AU UH TV"

                }
            },

            "Clown": {
                variants: {

                    Default:
                        "AU! UU RU RU TV TV RH! TU SU AU UH AH",

                    "Villain Style":
                        "SU! SU AU UU SH TH UV! AU RU RU SV TV",

                    Heat:
                        "TU! TU UU AU SV RH AH! RU AU RU RV UH",

                    Combat:
                        "RU! UU SU UU RV TV SH! AU UU SU TH AH",

                    Fancy:
                        "UU! SU AU AU RH UV TV! AU TU UU AH TV",

                    Dangerous:
                        "SU! UU SU SU UH TH SV! TU UU SU UV TV"

                }
            },

            "Adventurer": {
                variants: {

                    Default:
                        "UU! UU UU SU AH SV AH! AU RU UU SH AV",

                    "Villain Style":
                        "AU! TU RU AU SH UV SV! RU TU SU TV RH",

                    Heat:
                        "TU! RU TU SU RV AV RH! SU UU AU SH TH",

                    Combat:
                        "SU! UU SU TU AH SV TV! AU RU AU UV TH",

                    Fancy:
                        "RU! AU UU RU SH RV UV! UU AU UU TV RH",

                    Dangerous:
                        "AU! SU AU RU RV SH TH! TU UU TU RH TV"

                }
            },

        }
    },

    // ================================
    // ITSUKA KENDO
    // ================================

    "Itsuka Kendo": {
        role: "H",
        styles: ["A", "S"],
        costumes: {

            "Casual Wear": {
                variants: {

                    Default:
                        "RU! TU AU SU RV SH TV! SU RU SU AH UH",

                    "Villain Style":
                        "SU! RU TU UU SH RV AH! AU TU AU SH TH",

                    Heat:
                        "TU! AU RU TU RH SH TH! AU UU TU UH SV",

                    Combat:
                        "UU! AU RU UU TH AH RV! RU RU RU TH RH",

                    Fancy:
                        "RU! UU SU SU UH TV SH! UU SU SU UV AH",

                    Dangerous:
                        "AU! TU SU TU SH RV TV! TU SU TU SH SV"

                }
            },

            "Festival Yukata": {
                variants: {

                    Default:
                        "SU! AU SU UU RV UH TV! TU TU TU SH SV",

                    "Villain Style":
                        "AU! RU AU SU AH TV RV! AU SU TU AH UV",

                    Heat:
                        "TU! UU SU RU RH TH AH! TU SU SU UV SV",

                    Combat:
                        "UU! SU AU AU UH UV AH! RU TU RU TV SH",

                    Fancy:
                        "RU! TU SU AU TV AH SV! TU RU TU UV TH",

                    Dangerous:
                        "AU! UU UU RU SH TH TH! RU AU AU UV SV"

                }
            },

            "Adventurer": {
                variants: {

                    Default:
                        "UU! UU RU RU SH TV TH! TU AU AU RV UH",

                    "Villain Style":
                        "SU! TU AU SU TH RH RH! RU SU UU SV AV",

                    Heat:
                        "AU! SU RU UU AH RV UH! TU SU TU TH UV",

                    Combat:
                        "TU! TU SU SU UH AH AV! AU UU RU SV TH",

                    Fancy:
                        "RU! AU RU AU TV SV AV! UU TU SU AH UH",

                    Dangerous:
                        "AU! UU SU AU RV UH SV! RU UU SU UV TH"

                }
            },

        }
    },


    // ================================
    // IBARA SHIOZAKI
    // ================================

    "Ibara Shiozaki": {
        role: "H",
        styles: ["U"],
        costumes: {

            "Casual Wear": {
                variants: {

                    Default:
                        "TU! UU AU TU UH RH RV! TU SU TU TH SH",

                    "Villain Style":
                        "AU! TU UU TU AH TH UU! AU AU AU TV UV",

                    Heat:
                        "RU! AU SU SU RV RH AH! RU SU SU TH TH",

                    Combat:
                        "SU! AU RU RU UV UH UH! AU RU RU AV RH",

                    Fancy:
                        "UU! SU UU TU SH TV RH! SU TU UU TH SV",

                    Dangerous:
                        "TU! AU TU RU AH SV SV! SU UU RU TH UH"

                }
            },

            "Festival Yukata": {
                variants: {

                    Default:
                        "AU! AU RU AU UV TV RV! SU UU TU AH RH",

                    "Villain Style":
                        "TU! UU SU AU UH AH TH! UU TU TU RV UV",

                    Heat:
                        "UU! SU SU UU TV UH AH! AU AU UU RH RV",

                    Combat:
                        "SU! TU RU TU SH AH SV! SU AU SU UV RV",

                    Fancy:
                        "RU! RU AU RU AH SV SH! UU RU RU TV SH",

                    Dangerous:
                        "UU! UU RU TU TH SV UV! RU TU AU TV UH"

                }
            },

            "Adventurer": {
                variants: {

                    Default:
                        "AU! SU AU SU UV RV TV! RU AU SU TH SH",

                    "Villain Style":
                        "SU! UU AU SU TH AH RH! RU SU TV RV UV",

                    Heat:
                        "UU! RU SU AU UH RH SH! SU AU AU TV SV",

                    Combat:
                        "TU! AU UU SU RV TV TV! UU TU UU SH TH",

                    Fancy:
                        "RU! TU TU AU SH UH TH! SU UU AU SV UV",

                    Dangerous:
                        "SU! RU AU RU TV SV UV! UU RU AU UH RH"

                }
            },

        }
    },


    // ================================
    // MIRIO TOGATA
    // ================================

    "Mirio Togata": {
        role: "H",
        styles: ["R", "T"],
        costumes: {

            "Casual Wear": {
                variants: {

                    Default:
                        "TU! UU AU TU SH RV AH! TU AU SU RH UH",

                    "Villain Style":
                        "TU! TU UU TU AV TH RH! RU TU UU AH TH",

                    Heat:
                        "AU! AU SU TU AH RH SV! AU SU TU SV SH",

                    Combat:
                        "SU! AU UU RU UV RH TH! AU RU UU AH AV",

                    Fancy:
                        "UU! RU AU TU AH AH RV! UU SU SU UH TH",

                    Dangerous:
                        "RU! AU SU RU RH SV UH! TU UU TU UV RH"

                }
            },

            "Festival Outfit": {
                variants: {

                    Default:
                        "SU! RU SU TU RH SV RH! UU AU TU SH RH",

                    "Villain Style":
                        "AU! UU AU AU UV SH RH! TU UU TU TH TH",

                    Heat:
                        "RU! AU RU SU AH TH SH! AU SU UU AV RV",

                    Combat:
                        "TU! UU UU SU AV RV TV! AU UU RU UH UH",

                    Fancy:
                        "SU! RU RU UU TH RV UV! RU UU RU AH UV",

                    Dangerous:
                        "UU! SU TU SU TH SH AH! AU TU SU RH SV"

                }
            },

            "Cyber Hero Costume": {
                variants: {

                    Default:
                        "UU! SU SU AU TH UH SV! TU AU SU UV RV",

                    "Villain Style":
                        "RU! RU TU SU UV TH RH! AU UU SU TH RV",

                    Heat:
                        "SU! AU UU AU SH TH TH! RU AU SU RV UV",

                    Combat:
                        "AU! UU RU SU RV TV UH! RU UU TU AH SH",

                    Fancy:
                        "TU! TU AU UU RV SH UH! RU UU TU AH SH",

                    Dangerous:
                        "RU! UU SU AU UH AH TH! RU RU UU UV TV"

                }
            },

        }
    },


    // ================================
    // TAMAKI AMAJIKI
    // ================================

    "Tamaki Amajiki": {
        role: "H",
        styles: ["S"],
        costumes: {

            "Casual Wear": {
                variants: {

                    Default:
                        "RU! UU RU AU TV AH SH! RU SU TU SH RV",

                    "Villain Style":
                        "AU! SU AU TU SV UV UH! RU SU UU TH RH",

                    Heat:
                        "SU! AU RU UU RH UH UV! SU SU AU UV TV",

                    Combat:
                        "TU! TU SU UU SH TH RV! AU RU TU RV UV",

                    Fancy:
                        "UU! RU AU SU TV UV TV! AU RU AU SH TH",

                    Dangerous:
                        "RU! AU UU UU SH SV AH! UU SU RU TV TH"

                }
            },

            "Festival Outfit": {
                variants: {

                    Default:
                        "UU! SU AU RU UH AH RV! AU TU UU TV SV",

                    "Villain Style":
                        "RU! RU UU TU AH UV UV! SU AU SU TV UH",

                    Heat:
                        "SU! AU TU RU TH SH AH! RU AU SU RV UV",

                    Combat:
                        "TU! SU AU UU TV RH SV! AU SU RU UV TH",

                    Fancy:
                        "AU! UU SU SU TV RV TH! SU AU TU UV RH",

                    Dangerous:
                        "SU! TU AU TU SV RV SH! UU TU UU RH AH"

                }
            },

            "Cyber Hero Costume": {
                variants: {

                    Default:
                        "SU! AU SU TU AH TH RH! UU AU SU RV UV",

                    "Villain Style":
                        "AU! UU UU UU SH AV UV! RU SU TU RV AH",

                    Heat:
                        "UU! TU SU SU UV AH SH! AU TU RU TH RV",

                    Combat:
                        "TU! RU TU RU SV RV AV! UU TU AU AH RH",

                    Fancy:
                        "RU! SU TU AU TH SH TH! AU SU SU TV AV",

                    Dangerous:
                        "AU! UU RU AU RH TV UV! UU RU UU SH SV"

                }
            },

        }
    },


    // ================================
    // NEJIRE HADO
    // ================================

    "Nejire Hado": {
        role: "H",
        styles: ["T", "U"],
        costumes: {

            "Miss Con Costume": {
                variants: {

                    Default:
                        "AU! UU AU UU SV UV RV! RU SU AU SH RH",

                    "Villain Style":
                        "TU! UU RU TU SV TV SH! SU SU AU RV SH",

                    Heat:
                        "RU! UU AU RU UV SV AV! UU SU UU TH RH",

                    Combat:
                        "SU! SU SU AU RV SH RV! SU TU AU RH SH",

                    Fancy:
                        "UU! AU AU TU SV TH TV! TU TU UU AH RH",

                    Dangerous:
                        "AU! UU UU TU RV RH UH! AU RU AU RH SH"

                }
            },

            "Superstar Idol": {
                variants: {

                    Default:
                        "RU! SU SU AU RH TH RV! TU UU AU TV SV",

                    Viola:
                        "TU! AU SU TU UV RH SV! AU AU RU TV UH",

                    Scarlet:
                        "RU! RU RU TU TH AH UH! UU RU UU SV RV",

                    Apricot:
                        "UU! TU RU UU SH UH AH! AU UU SU UV SV",

                    Mimosa:
                        "SU! AU RU AU TV TH TV! SU TU TU RV UH",

                    Ranunculus:
                        "AU! UU UU SU RV UV UH! TU AU SU RH RH"

                }
            },

            "Festival Yukata": {
                variants: {

                    Default:
                        "UU! UU SU AU AH RV SH! SU RU RU UV TH",

                    "Villain Style":
                        "AU! TU UU AU SV RH UV! RU SU UU TV AH",

                    Heat:
                        "RU! UU RU RU TH TV RH! AU SU SU UH SV",

                    Combat:
                        "SU! AU SU TU SH UV SV! RU AU AU RV TH",

                    Fancy:
                        "TU! UU AU TU UH UV AH! RU SU SU TH RV",

                    Dangerous:
                        "UU! TU RU SU TH UH TV! AU AU TU UV RV"

                }
            },

            "Cyber Hero Costume": {
                variants: {

                    Default:
                        "TU! AU TU AU SV RH RV! UU TU SU AH UV",

                    "Villain Style":
                        "AU! TU TU RU SH SV RH! SU TU UU AH RV",

                    Heat:
                        "SU! RU UU SU AH RV AV! TU RU TU UV AH",

                    Combat:
                        "UU! UU AU AU RV TV UH! RU AU RU RH UH",

                    Fancy:
                        "RU! SU AU UU TH SH SV! UU RU UU TV AV",

                    Dangerous:
                        "SU! UU RU UU SV AH TH! AU TU RU TV SH"

                }
            },

        }
    },


    // ================================
    // HITOSHI SHINSO
    // ================================

    "Hitoshi Shinso": {
        role: "H",
        styles: ["S"],
        costumes: {

            "U.A. Track Suit": {
                variants: {

                    Default:
                        "AU! AU AU SU RH SH SH! UU TU TU RV TH",

                    Heat:
                        "RU! RU RU AU TV AH AH! UU SU UU TH RH"

                }
            },

            "Cyber Hero Costume": {
                variants: {

                    Default:
                        "UU! TU RU SU SH UV RH! AU AU SU RH RV",

                    "Villain Style":
                        "TU! RU AU SU UH UV AH! UU SU RU UH TH",

                    Heat:
                        "AU! AU SU AU UV SV UH! RU UU RU TH TH",

                    Combat:
                        "UU! TU RU TU SH AH SV! UU SU SU AH RV",

                    Fancy:
                        "SU! AU SU AU UH TV TV! RU AU SU TH AV",

                    Dangerous:
                        "RU! RU AU RU AH RH RV! TU TU SU UH RV"

                }
            },

            "Shinobi": {
                variants: {

                    Default:
                        "RU! SU RU AU UH TV SH! TU UU AU RH SV",

                    "Villain Style":
                        "UU! RU AU UU AV SH RV! SU TU AU TV UH",

                    Heat:
                        "AU! TU SU RU SV TH TH! AU SU UU RV RH",

                    Combat:
                        "SU! AU SU TU RV UV UH! RU RU TU SH TH",

                    Fancy:
                        "TU! UU RU SU TH SV AV! SU UU AU UV AH",

                    Dangerous:
                        "RU! SU AU SU UH RV UV! TU AU TU UH AV"

                }
            },

        }
    },


    // ================================
    // ALL MIGHT
    // ================================

    "All Might": {
        role: "H",
        styles: ["A", "R"],
        costumes: {

            "Undefeatable": {
                variants: {

                    Default:
                        "RU! SU RU TU UH SV UV! TU AU SU RH SH",

                    "Villain Style":
                        "TU! RU SU RU RV UH SH! RU TU UU SH RV",

                    Heat:
                        "AU! UU RU AU RH AH UH! AU RU TU RH SV",

                    Combat:
                        "UU! TU UU TU SH RV AH! AU RU UU TH AH",

                    Fancy:
                        "SU! RU TU UU SV SH RV! UU SU SU UV TV",

                    Dangerous:
                        "RU! RU AU SU UH AV RV! TU SU TU SH RH"

                }
            },

            "Day Off": {
                variants: {

                    Default:
                        "TU! AU RU SU UV RH AH! UU RU TU SH RH",

                    "Villain Style":
                        "RU! AU SU RU SV TH TH! TU UU TU AV TV",

                    Heat:
                        "UU! UU TU AU UV AV SH! AU SU TU AH RV",

                    Combat:
                        "TU! SU AU RU TH SH UV! TU UU RU UH UH",

                    Fancy:
                        "AU! RU RU AU RH AV RV! RU UU TU AH RV",

                    Dangerous:
                        "SU! AU UU SU SV UV AV! AU TU RU TH SH"

                }
            },

            "Support Item": {
                variants: {

                    Default:
                        "UU! TU UU AU AH TH RV! UU RU SU SV RH",

                    "Villain Style":
                        "SU! RU TU UU AV TV UH! UU SU SU SH SH",

                    Heat:
                        "TU! UU AU RU UH TH RH! AU UU AU AH AV",

                    Combat:
                        "AU! UU UU AU SH AH TV! UU UU RU SH UV",

                    Fancy:
                        "UU! SU RU TU TV UV SV! SU RU RU RV SH",

                    Dangerous:
                        "RU! AU RU SU TH TH AH! RU TU TU SH RV",
                }
            },

            "Christmas Santa Costume": {
                variants: {

                    Default:
                        "SU! UU UU UU UH UV SV! SU SU SU SV SH",

                    "Villain Style":
                        "UU! AU AU TU SH TV TH! AU AU AU RV SV",

                    Heat:
                        "AU! UU RU TU UH AH SH! SU UU UU AH SV",

                }
            },

            "100 Million Copies Commemorative Costume": {
                variants: {

                    Default:
                        "RU! RU UU SU TV UV SH! AU TU AU UH UV",

                }
            },

            "Unyielding Commander": {
                variants: {

                    Default:
                        "AU! RU SU AU RV SH AH! UU UU TU AH SV",

                    "Villain Style":
                        "SU! SU TU TU RV AH RH! AU UU UU TH TV",

                    Heat:
                        "UU! UU SU UU SV UV RV! RU TU AU TH RH",

                    Combat:
                        "RU! AU RU AU UH RV UV! RU RU SU TV UH",

                    Fancy:
                        "TU! TU AU AU SV RH SV! AU UU AU SH UV",

                    Dangerous:
                        "AU! RU AU TU RH TV TH! SU UU SU AH UV",

                }
            },

            "Cyber Hero Costume": {
                variants: {

                    Default:
                        "AU! UU AU SU TV UH TH! RU RU AU SV RH",

                    "Villain Style":
                        "UU! TU SU RU SH UV UV! SU AU UU TV TH",

                    Heat:
                        "SU! RU RU AU AH UV RV! AU SU SU TV UH",

                    Combat:
                        "TU! SU TU UU TH UH TV! SU AU AU RV UV",

                    Fancy:
                        "RU! UU AU TU SV SH AH! TU SU RU UV RH",

                    Dangerous:
                        "UU! AU UU TU SH RH RH! RU TU UU AH SV",

                }
            },

            "Festival Happi": {
                variants: {

                    Default:
                        "RU! SU RU SU UV TH UH! TU AU AU SH RV",

                    "Villain Style":
                        "TU! AU UU RU SV TV RV! RU RU AU TH UH",

                    Heat:
                        "AU! RU TU TU RV SH RH! AU SU UU UH UV",

                    Combat:
                        "SU! RU AU SU AH UH TV! UU AU TU RV SV",

                    Fancy:
                        "UU! UU SU AU SV TH AH! AU TU TU RH UV",

                    Dangerous:
                        "AU! TU RU AU SH UV SV! AU UU SU SH TV",

                }
            },

            "Leather Style": {
                variants: {

                    Default:
                        "SU! RU AU SU UH RV SH! AU SU UU TV RH",

                    "Villain Style":
                        "TU! TU RU UU SV UV RH! SU AU SU RH TH",
                }
            },

        }
    },


    // ================================
    // ARMORED ALL MIGHT
    // ================================

    "Armored All Might": {
        role: "H",
        styles: ["T"],
        costumes: {

            "Hero Costume Metallic ver.": {
                variants: {

                    Default:
                        "UU! AU UU SU TH SH RV! RU SU TU UV TV",

                    "Ruby Iron":
                        "SU! SU AU SU AH TH SV! TU UU TU RV AV",

                    "Amber Steel":
                        "RU! RU UU AU SH UV AH! AU TU RU RV TV",

                    "Sapphire Chrome":
                        "AU! UU SU UU TH AH SH! RU AU UU SV UV",

                    "Opal Gold":
                        "RU! TU RU RU TV SH TV! AU UU UU AH UV",

                    "Emerald Metal":
                        "TU! RU SU SU AH SV UH! UU UU TU RV TH",

                }
            },

            "Hero Costume Camouflage ver.": {
                variants: {

                    Default:
                        "RU! AU AU TU RH TV RV! TU RU AU SV SH",

                    "Villain Style":
                        "AU! UU RU UU TH SV UV! SU AU TU UV SH",

                    Heat:
                        "SU! RU TU SU AH TV AV! UU RU RU UV AH",

                    Combat:
                        "UU! SU UU AU RV TV TH! TU SU UU UH AH",

                    Fancy:
                        "TU! RU RU SU AV UH SH! AU TU SU TH UV",

                    Dangerous:
                        "TU! TU AU UU RV AV RH! SU UU SU RH SH",
                }
            },

            "Hero Costume Damaged ver.": {
                variants: {

                    Default:
                        "UU! SU RU AU UV RH AH! RU AU TU AV UH",

                    "Villain Style":
                        "SU! RU SU UU AH TH TV! AU SU SU TV RV",

                    Heat:
                        "TU! UU RU TU UH SV UV! AU UU TU RH TV",

                    Combat:
                        "RU! AU UU SU TV UV SH! RU AU RU AH UH",

                    Fancy:
                        "AU! SU RU SU RH TH RV! TU SU AU RV UV",

                    Dangerous:
                        "SU! TU SU TU SH AH UH! UU TU RU TV AV",
                }
            },

        }
    },


    // ================================
    // SHOTA AIZAWA
    // ================================

    "Shota Aizawa": {
        role: "H",
        styles: ["T"],
        costumes: {

            "Casual Style": {
                variants: {

                    Default:
                        "AU! UU UU TU RV SV RV! AU SU TU RH SH",

                    "Villain Style":
                        "SU! AU TU RU RV SH RH! UU TU AU UH SV",

                    Heat:
                        "RU! SU AU TU AH SV AV! AU AU SU AH TV",

                    Combat:
                        "AU! RU UU RU SH UV UH! UU SU SU AH UV",

                    Fancy:
                        "UU! UU UU TU SV TH TH! TU TU UU AV RH",

                    Dangerous:
                        "UU! RU AU RU SH TV SV! RU TU RU RH UV",
                }
            },

            "Kung fu Outfit": {
                variants: {

                    Default:
                        "SU! SU RU SU AH AH TV! RU AU AU TH RH",

                    "Villain Style":
                        "AU! AU UU SU RH SH RH! AU UU UU RV SV",

                    Heat:
                        "UU! SU AU UU AH SV AH! UU RU RU AV AH",

                    Combat:
                        "TU! RU UU SU TH UH UV! UU RU TU TH UV",

                    Fancy:
                        "SU! UU TU SU TV TH SH! SU AU UU TV TV",

                    Dangerous:
                        "RU! RU AU SU SV TH RV! AU SU AU SH TH",
                }
            },

            "Undefeatable": {
                variants: {

                    Default:
                        "RU! TU RU SU AH TV UH! TU UU AU AV RV",

                    "Villain Style":
                        "UU! UU TU RU SV TV AH! SU TU UU AH TH",

                    Heat:
                        "AU! UU SU TU RH SH TV! UU UU RU UH TH",

                    Combat:
                        "TU! SU SU AU TV RH RH! SU SU AU SV RH",

                    Fancy:
                        "RU! AU RU TU AH RV SV! SU RU TU RV UH",

                    Dangerous:
                        "SU! TU SU AU TV TH AH! AU SU SU TV TV",
                }
            },

            "Festival Outfit": {
                variants: {

                    Default:
                        "RU! UU AU AU SV RV SV! TU AU UU RV UH",

                    "Villain Style":
                        "UU! TU UU TU SV TH UV! SU TU UU SH RH",

                    Heat:
                        "TU! UU SU UU AH AH SH! TU RU TU RH SV",

                    Combat:
                        "SU! AU UU RU UV UH RH! AU RU UU UV AV",

                    Fancy:
                        "RU! RU UU AU AH SV AH! UU SU SU SH TH",

                    Dangerous:
                        "AU! UU TU RU AH SV SV! TU AU TU SH AH",
                }
            },

            "Christmas Santa Costume": {
                variants: {

                    Default:
                        "TU! SU SU SU SH SV RV! UU UU UU UH UV",

                    "Villain Style":
                        "UU! AU AU RU RH SH RV! AU AU UU AH RH",

                    Heat:
                        "AU! SU UU TU AH SH SH! AU TU TU UH SV",
                }
            },

            "Silent Warlord": {
                variants: {

                    Default:
                        "UU! AU AU SU RH SH UH! RU TU TU UV SV",

                    "Villain Style":
                        "TU! UU RU AU RV UH SV! TU TU SU SH AH",

                    Heat:
                        "RU! UU TU TU TV RV RH! AU UU SU RH AH",

                    Combat:
                        "SU! SU RU AU SH RH UV! UU TU RU TV RV",

                    Fancy:
                        "AU! RU AU SU RV UV AV! TU SU TU TH UH",

                    Dangerous:
                        "SU! AU UU AU UV SH TH! RU AU SU SV TH",
                }
            },

        }
    },


    // ================================
    // PRESENT MIC
    // ================================

    "Present Mic": {
        role: "H",
        styles: ["S"],
        costumes: {

            "Commander of Chaos": {
                variants: {

                    Default:
                        "AU! AU RU RU SH UH SH! SU AH UU TH RV",

                    "Villain Style":
                        "RU! AU UU AU UV RV RV! TU TU RU SV SH",

                    Heat:
                        "TU! TU SU UU RH TV SV! SU RU AU UH TH",

                    Combat:
                        "UU! SU UU TU RV TH TH! RU RU RU SH AH",

                    Fancy:
                        "RU! UU TU SU AV UH UH! AU AU SU TH RV",

                    Dangerous:
                        "AU! UU AU RU RH TV AH! TU SU UU UH SH",
                }
            },

            "Party Outfit": {
                variants: {

                    Default:
                        "UU! AU SU RU RV TV RV! UU RU SU AH SH",

                    "Villain Style":
                        "SU! UU TU SU RH SH TH! AU AU UU RV TV",

                    Heat:
                        "AU! TU TU RU SV RV UV! AU RU SU UH UV",

                    Combat:
                        "TU! UU RU UU UH RH AH! UU AU SU RV TV",

                    Fancy:
                        "RU! AU UU AU RV TH SV! AU TU AU TH SH",

                    Dangerous:
                        "TU! SU TU SU RH UV TV! RU TU SU AH UH",
                }
            },

            "Quirk Assist Gear": {
                variants: {

                    Default:
                        "UU! SU AU UU AV TV TV! RU RU AU SV AH",

                    "Villain Style":
                        "SU! RU UU TU SH AH RH! SU AU TU SV UH",

                    Heat:
                        "AU! RU RU SU UV TV UH! TU AU TU UV TH",

                    Combat:
                        "TU! SU SU SU AH RV AV! AU TU TU SV RH",

                    Fancy:
                        "RU! UU AU TU UH UV SH! SU UU TU SH UV",

                    Dangerous:
                        "TU! AU UU RU SH RH RV! RU TU RU UV SV",
                }
            },

        }
    },


    // ================================
    // CEMENTOSS
    // ================================

    "Cementoss": {
        role: "H",
        styles: ["U"],
        costumes: {

            "Day Off": {
                variants: {

                    Default:
                        "AU! TU SU UU AV SV RH! RU SU AU TH RV",

                    "Villain Style":
                        "UU! AU TU AU RH UH SV! AU AU AU RV SH",

                    Heat:
                        "TU! RU SU RU UH RV AH! SU RU RU UV AH",

                    Combat:
                        "SU! AU TU SU UH SH UH! UU RU SU TH UV",

                    Fancy:
                        "AU! AU UU RU AH TV RV! SU RU UU TH SH",

                    Dangerous:
                        "RU! UU RU TU TV RH TH! AU UU AU TH TH",
                }
            },

            "Party Outfit": {
                variants: {

                    Default:
                        "RU! UU SU AU UH RV TV! AU TU UU TH UV",

                    "Villain Style":
                        "AU! SU AU UU TV AH SH! RU AU AU UH RV",

                    Heat:
                        "SU! AU TU SU AH TV RV! UU RU RU TV TH",

                    Combat:
                        "UU! UU SU RU SV AH AH! TU SU UU SH UV",

                    Fancy:
                        "TU! TU AU AU SH RV UH! UU RU RU SV RH",

                    Dangerous:
                        "SU! AU TU SU TH SV SV! RU TU UU SH UV",
                }
            },

            "Quirk Assist Gear": {
                variants: {

                    Default:
                        "TU! RU UU RU SV TH RH! AU RU AU UV TH",

                    "Villain Style":
                        "UU! SU TU AU UV SV TH! RU SU UU AH RH",

                    Heat:
                        "SU! AU RU TU SH AH UV! UU AU SU UV TV",

                    Combat:
                        "AU! UU RU TU UV AV AV! AU SU RU UH RH",

                    Fancy:
                        "RU! TU SU TU RH AH AV! TU UU TU SV RV",

                    Dangerous:
                        "TU! AU UU SU AV RV SH! RU TU SU TH UH",
                }
            },

        }
    },


    // ================================
    // ENDEAVOR
    // ================================

    "Endeavor": {
        role: "H",
        styles: ["S", "A"],
        costumes: {

            "Casual Wear": {
                variants: {

                    Default:
                        "UU! RU SU TU RH SV SV! TU AU SU TH UH",

                    "Villain Style":
                        "TU! UU AU AU UH SH UH! RU TU UU AH AH",

                    Heat:
                        "RU! AU RU SU UV TV AH! UU SU TU SV SV",

                    Combat:
                        "UU! UU UU SU AH RV RV! AU RU RU UH UH",

                    Fancy:
                        "SU! SU TU UU TH TV AH! UU SU TU UV TH",

                    Dangerous:
                        "AU! RU TU AU TH UH TV! TU UU AU SH RH",
                }
            },

            "Undefeatable": {
                variants: {

                    Default:
                        "TU! SU RU SU RH SH AH! RU UU RU UH RV",

                    "Villain Style":
                        "AU! AU UU SU RH SV SH! TU SU SU SH RV",

                    Heat:
                        "SU! SU UU UU TH SH TV! UU TU RU UV UH",

                    Combat:
                        "TU! RU UU UU SV TV SH! SU UU TU TH TH",

                    Fancy:
                        "RU! UU UU SU AH TH UV! AU TU AU AH AV",

                    Dangerous:
                        "UU! RU AU SU UH TH TH! AU TU UU SH RH",
                }
            },

            "Fierce Fire General": {
                variants: {

                    Default:
                        "SU! AU TU AU UH TV UV! UU SU RU RH SH",

                    "Villain Style":
                        "SU! UU AU TU AH TV RV! AU UU SU AH AH",

                    Heat:
                        "AU! UU RU TU UH RH RV! UU SU SU UH UV",

                    Combat:
                        "RU! SU SU TU AU TV SH! TU SU TU TH RH",

                    Fancy:
                        "UU! AU AU RU SH AV SV! SU AU AU RH AH",

                    Dangerous:
                        "TU! AU RU UU AH TH AH! UU RU SU SH TV",
                }
            },

            "Cyber Hero Costume": {
                variants: {

                    Default:
                        "RU! AU TU TU SH UH UH! UU AU AU SV RV",

                    "Villain Style":
                        "AU! RU TU AU RH SV SV! AU SU UU UH TV",

                    Heat:
                        "TU! TU UU SU AV TH RV! AU AU SU SH RV",

                    Combat:
                        "SU! SU RU RU AH RV RH! SU AU UU TV TH",

                    Fancy:
                        "UU! UU RU UU SV UH AH! SU AU TU RH TV",

                    Dangerous:
                        "RU! RU AU RU UH SV TV! AU TU TU TV SH",
                }
            },

            "Leather Style": {
                variants: {

                    Default:
                        "UU! RU UU AU UV RH TH! AU SU SU AH RV",

                    "Villain Style":
                        "RU! UU TU SU UH TV SH! RU AU SU RH AV",

                    Heat:
                        "SU! AU RU AU TV TH UH! SU TU TU SV AH",

                    Combat:
                        "TU! SU UU TU RV AH SV! AU UU UU TV SH",

                    Fancy:
                        "AU! RU UU SU RH TH AV! AU SU AU RV SV",

                    Dangerous:
                        "RU! TU RU AU SV UV RV! SU UU SU AH TH",
                }
            },

        }
    },


    // ================================
    // HAWKS
    // ================================

    "Hawks": {
        role: "H",
        styles: ["R", "S"],
        costumes: {

            "Parallel World": {
                variants: {

                    Default:
                        "AU! RU SU TU RH SH RV! SU TU SU AV UH",

                    "Villain Style":
                        "UU! UU AU AU UH SV AH! UU SU TU UH AV",

                    Heat:
                        "SU! AU RU SU AH AH UH! UU AU SU AH TV",

                    Combat:
                        "RU! UU RU SU AH RV UV! SU RU AU RV RH",

                    Fancy:
                        "AU! SU TU UU TV RH UH! SU RU SU SH SV",

                    Dangerous:
                        "TU! RU RU RU RH UH SV! AU SU TU TV SH",
                }
            },

            "Wind General": {
                variants: {

                    Default:
                        "UU! SU TU RU TH UV TH! TU AU AU RV SH",

                    "Villain Style":
                        "TU! RU SU AU SV RH RH! RU TU UU TH RV",

                    Heat:
                        "RU! UU SU SU SH AH SV! AU SU TU RH SH",

                    Combat:
                        "UU! UU TU UU AH AH SH! AU RU AU TU TH",

                    Fancy:
                        "AU! TU UU AU TV AH AV! UU SU AU UH TV",

                    Dangerous:
                        "SU! AU UU RU UH TV TH! TU UU UU SV UV",
                }
            },

            "Cyber Hero Costume": {
                variants: {

                    Default:
                        "SU! SU AU RU TH UH AH! UU RU TU SH AV",

                    "Villain Style":
                        "SU! RU TU AU TH RH RV! TU SU TU AV TV",

                    Heat:
                        "UU! UU SU SU SV AH UV! SU UU UU AH SH",

                    Combat:
                        "AU! UU TU UU SH AH SH! UU UU RU UH AH",

                    Fancy:
                        "RU! TU AU RU TH AV AH! RU RU TU AH AH",

                    Dangerous:
                        "RU! TU AU RU TH AV AH! RU RU TU AH AH",
                }
            },

            "Formal Suit": {
                variants: {

                    Default:
                        "AU! AU UU RU SH UH UV! TU TU SU RV TV",

                    "Villain Style":
                        "RU! UU UU TU RH AH AV! AU SU UU SV UV",

                    Heat:
                        "UU! RU TU SU RH UV RV! SU RU AU TV AH",

                    Combat:
                        "SU! UU SU AU TH SV TH! AU AU RU TV UH",

                    Fancy:
                        "TU! SU AU UU RV TH SH! TU RU UU AH SV",

                    Dangerous:
                        "RU! AU SU RU SH TH UH! SU UU RU UV AV",
                }
            },

            "Quirk Assist Gear": {
                variants: {

                    Default:
                        "AU! RU AU AU SV TH AH! UU RU AU SH UV",

                    "Villain Style":
                        "SU! TU TU RU UH SV TV! AU AU SU TH RV",

                    Heat:
                        "UU! RU UU TU SH AH SV! RU RU UU SV TV",

                    Combat:
                        "RU! SU AU TU SV UV SH! SU RU UU AH SH",

                    Fancy:
                        "TU! UU SU UU RV TV UV! AU UU TU SH TH",

                    Dangerous:
                        "AU! AU RU SU AV TH RH! UU SU TU RV UV",
                }
            },

        }
    },


    // ================================
    // MT. LADY
    // ================================

    "Mt. Lady": {
        role: "H",
        styles: ["A"],
        costumes: {

            "Casual Wear": {
                variants: {

                    Default:
                        "UU! RU SU RU TH AH SV! UU AU UU SH UH",

                    "Villain Style":
                        "RU! AU AU UU RH SH TV! UU RU TU SV TV",

                    Heat:
                        "AU! SU SU SU UH AV UH! UU AU RU SH SH",

                    Combat:
                        "TU! UU RU AU TH RV UH! SU RU AU RV SH",

                    Fancy:
                        "UU! SU AU UU TH SV AV! AU AU TU SH TH",

                    Dangerous:
                        "SU! AU UU UU SV TH RH! UU UU TU UV RH"

                }
            },

            "Party Outfit": {
                variants: {

                    Default:
                        "TU! UU AU AU SV RV SH! TU UU AU TH TH",

                    "Villain Style":
                        "UU! TU UU TU SH TH RV! RU TU UU AV TV",

                    Dangerous:
                        "TU! UU TU SU AH SV AH! SU RU SU TH SH"

                }
            },

        }
    },


    // ================================
    // TOMURA SHIGARAKI
    // ================================

    "Tomura Shigaraki": {
        role: "V",
        styles: ["S", "A", "T"],
        costumes: {

            "Disguise: Long Coat ": {
                variants: {

                    Default:
                        "UU! SU AU UU AH TH SH! TU AU RU RH SV",

                    "Hero Style":
                        "UU! RU UU UU SV UH AH! SU SU RU RH RH",

                    Heat:
                        "RU! UU AU AU UV SH TV! UU UU TU SH SH",

                    Combat:
                        "SU! SU UU RU SV SH UU! AU RU UU SH AH",

                    Fancy:
                        "TU! TU TU AU RH TH SH! UU SU TU UH TV",

                    Dangerous:
                        "AU! AU SU SU TH RV RH! AU UU TU UV RH",
                }
            },

            "League of Villains Suit": {
                variants: {

                    Default:
                        "RU! SU RU TU AH SV UV! AU RU UU UH AH",

                    "Hero Style":
                        "AU! RU UU UU SV UH SH! UU SU AU UV TH",

                    Heat:
                        "SU! UU TU SU UV AH RV! TU RU RU SH AH",

                    Combat:
                        "RU! SU UU SU AH SH AH! UU TU AU TV RH",

                    Fancy:
                        "UU! AU TU AU SV AH TH! UU AU UU AH SH",

                    Dangerous:
                        "TU! UU RU SU RH RV UV! RU AU RU SV TV",
                }
            },

            "Awakened": {
                variants: {

                    Default:
                        "SU! UU SU TU RV SV AH! UU AU UU SH RH",

                    "Hero Style":
                        "TU! SU SU AU TH RH AH! TU RU UU RH RV",

                    Heat:
                        "RU! TU SU SU UV SH SH! AU SU TU RH SV",

                    Combat:
                        "UU! AU TU UU UH SV RV! UU TU UU SH AH",

                    Fancy:
                        "AU! AU UU AU AH AH UH! UU SU SU TV UH",

                    Dangerous:
                        "SU! UU TU RU AH TH SV! TU RU TU RV TV",
                }
            },

            "Evil Knight": {
                variants: {

                    Default:
                        "TU! UU RU AU TH UH RV! SU TU AU RH SV",

                    "Hero Style":
                        "TU! SU AU UU TV TV SH! TU TU TU RH AH",

                    Heat:
                        "SU! AU AU TU AH SV AH! AU SU RU UH SH",

                    Combat:
                        "RU! UU UU UU TV UH UV! AU TU TU SV SH",

                    Fancy:
                        "UU! TU UU SU SH SV SH! AU UU SU SH RV",

                    Dangerous:
                        "AU! UU AU RU RH TH TH! UU RU RU RH RV",
                }
            },

            "Transcend": {
                variants: {

                    Default:
                        "AU! UU AU SU RH UH UV! TU SU RU SV TV",

                    "Hero Style":
                        "TU! TU UU TU SH UV AV! AU AU AU RH TV",

                    Heat:
                        "SU! RU AU UU TH AH SH! SU RU SU RV TV",

                    Combat:
                        "RU! UU SU UU AH SV TH! TU UU AU TV SH",

                    Fancy:
                        "UU! TU RU AU TV RH UH! SU TU RU UH SV",

                    Dangerous:
                        "TU! AU AU SU SV UV RV! TU SU AU RH UH",
                }
            },

            "Cyberpunk": {
                variants: {

                    Default:
                        "TU! RU SU RU UH TH TV! RU AU AU SV SH",

                    "Hero Style":
                        "AU! AU RU UU SV TV RH! AU RU SU TH SH",

                    Heat:
                        "SU! SU RU RU RV AH SV! TU TU UU UU AH",
                }
            },

        }
    },


    // ================================
    // ALL FOR ONE
    // ================================

    "All For One": {
        role: "V",
        styles: ["T"],
        costumes: {

            "Prison Escape": {
                variants: {

                    Default:
                        "AU! UU AU TU TH SH SH! TU UU TU UH RV",

                    "Hero Style":
                        "UU! SU SU AU RV RV TH! TU TU UU SV SH",

                    Heat:
                        "SU! AU SU TU TV RH RV! SU UU RU UH AH",

                    Combat:
                        "TU! TU UU RU UH UV AV! UU RU UU TH SV",

                    Fancy:
                        "RU! RU UU TU AH AV RV! SU SU AU UV AH",

                    Dangerous:
                        "AU! TU TU RU TV SV SH! AU RU AU SH SH",
                }
            },

            "Knight of All Evil": {
                variants: {

                    Default:
                        "RU! UU AU SU UH TH UV! SU UU AU RH UV",

                    "Hero Style":
                        "SU! SU SU AU SV SH AH! RU UU RU SV RH",

                    Heat:
                        "RU! SU UU AU AH AH TV! TU AU UU AH SH",

                    Combat:
                        "UU! AU TU RU TH RH SV! RU TU RU SH RH",

                    Fancy:
                        "AU! SU AU UU RH AV AH! UU TU SU RH TV",

                    Dangerous:
                        "TU! UU SU TU SH RV UH! RU TU SU TV TH",
                }
            },

            "Cyberpunk": {
                variants: {

                    Default:
                        "UU! AU SU AU RH TV AH! RU AU SU UH RV",

                    Combat:
                        "SU! RU SU AU UV TH UH! RU AU RU RH UH",

                    Heat:
                        "AU! RU UU UU UH TH SV! TU SU AU TV SV",

                    Dangerous:
                        "AU! TU UU TU SV AH TV! UU RU SU UV SH",
                }
            },

        }
    },


    // ================================
    // ALL FOR ONE (YOUTH AGE)
    // ================================

    "All For One (Youth Age)": {
        role: "V",
        styles: ["A"],
        costumes: {

            "Villain Costume Wearable Ver.": {
                variants: {

                    Default:
                        "UU! UU TU SU RH TV SH! AU UU AU SV TH",

                    "Hero Style":
                        "RU! SU UU AU TH AH UV! RU SU RU SV UV",

                    Heat:
                        "AU! RU AU RU UH SV RH! SU AU TU RH TV",

                    Combat:
                        "SU! UU SU AU RV UH UV! RU UU SU TV AH",

                    Fancy:
                        "TU! AU RU SU UV TV TV! TU AU SU AH UH",

                    Dangerous:
                        "UU! RU SU TU AH UH AH! UU TU AU SV RV",
                }
            },

            "Villain Costume Rewind Ver.": {
                variants: {

                    Default:
                        "SU! AU UU RU TH RV TH! SU AU SU UH TV",

                    "Hero Style":
                        "RU! TU RU SU AH SH SV! SU UU AU UV TV",

                    Heat:
                        "UU! RU AU UU SV TV RV! AU SU AU RH UH",

                    Combat:
                        "TU! UU RU SU RH UH SH! TU AU SU TV RV",

                    Fancy:
                        "AU! SU UU AU UH RV UV! UU TU SU AH TV",

                    Dangerous:
                        "RU! TU UU SU RV TH AH! AU RU TU SH TV",
                }
            },

        }
    },


    // ================================
    // DABI
    // ================================

    "Dabi": {
        role: "V",
        styles: ["T", "S"],
        costumes: {

            "Disguise: Hoodie": {
                variants: {

                    Default:
                        "TU! UU SU AU RH AH RV! AU UU UU SH TH",

                    "Hero Style":
                        "RU! TU UU RU TV RV AV! UU UU TU TH SH",

                    Heat:
                        "AU! SU RU SU UH SH SV! AU SU UU SH RH",

                    Combat:
                        "TU! UU RU AU SV RH RH! AU RU RU UV RH",

                    Fancy:
                        "UU! SU AU AU TH SV TH! TU SU TU AH AH",

                    Dangerous:
                        "SU! AU TU SU SV UH UH! TU SU RU SH AH",
                }
            },

            "Villain Costume (White Hair ver.)": {
                variants: {

                    Default:
                        "AH! UU RU UU SV UV TH! AU SU UU UH SH",

                    "Hero Style":
                        "TU! UU AU TU UV TH SV! AU UU RU TV TV",

                    Heat:
                        "SU! SU UU UU AV SH RH! SU SU SU RH SV",

                    Combat:
                        "RU! RU TU SU AH AV UV! AU RU RU AH AH",

                    Fancy:
                        "UU! UU UU RU RH RH AH! RU TU RU TV AV",

                    Dangerous:
                        "AU! RU AU SU RV TH AH! UU UU AU SH TH",
                }
            },

            "Cyberpunk": {
                variants: {

                    Default:
                        "RU! AU AU TU TH SH TV! UU TU UU SV TV",

                    "Hero Style":
                        "SU! RU RU UU UV AH AV! TU AU UU UV SV",

                    Heat:
                        "UU! AU TU UU AH AH SV! SU RU RU UH AH",

                    Combat:
                        "TU! AU TU UU SV RH UH! RU RU AU TH RH",

                    Fancy:
                        "RU! UU TU SU RV SH SH! SU AU UU TV SV",

                    Dangerous:
                        "AU! RU TU AU TH TH RH! AU UU AU SH TV",
                }
            },

            "Avenging Assassin": {
                variants: {

                    Default:
                        "UU! SU RU TU TH UV RV! AU AU SU RV RH",

                    "Hero Style":
                        "TU! RU TU RU TV SV TV! TU SU RU AH RH",

                    Heat:
                        "AU! SU SU TU UV SH UH! TU UU AU RH SV",

                    Combat:
                        "SU! TU UU AU SV RV SH! AU UU TU UH TH",

                    Fancy:
                        "RU! AU AU UU RH TH SV! SU AU RU UV TH",

                    Dangerous:
                        "TU! RU AU TU SH AH AH! UU RU SU UV UH",
                }
            },

            "League of Villains Suit": {
                variants: {

                    Default:
                        "TU! SU AU TU RV UV SH! UU SU RU AH UH",

                    Heat:
                        "UU! RU AU SU UH SH RH! SU AU TU TV UV",
                }
            },

        }
    },


    // ================================
    // HIMIKO TOGA
    // ================================

    "Himiko Toga": {
        role: "V",
        styles: ["T", "R"],
        costumes: {

            "Disguise: Suit": {
                variants: {

                    Default:
                        "AU! AU RU TU SH TH SH! UU RU AU TH TV",

                    "Hero Style":
                        "SU! TU AU SU RU SV AV! SU SU UU TH UH",

                    Heat:
                        "AU! SU AU UU TH UH UV! UU SU UU UH TH",

                    Combat:
                        "UU! RU SU UU AH TH RH! AU UU TU AH AV",

                    Fancy:
                        "RU! UU UU RU SV RH TH! RU AU SU RH UH",

                    Dangerous:
                        "TU! RU AU AU SV RV UH! UU TU SU UV TV",
                }
            },

            "Uniform: Damaged": {
                variants: {

                    Default:
                        "SU! TU SU AU TH RV UH! SU UU UU AV SH",

                    "Hero Style":
                        "UU! SU AU AU RH AH TH! TU AU AU RH RV",

                    Heat:
                        "RU! AU TU SU TH TH AV! UU TU SU UV TV",

                    Combat:
                        "AU! UU UU UU AV RH RV! SU UU SU UV SH",

                    Fancy:
                        "SU! SU TU UU RH RV SV! RU RU AU RH AH",

                    Dangerous:
                        "TU! RU TU RU TH UV SV! SU SU SU SH SH",
                }
            },

            "Cyberpunk": {
                variants: {

                    Default:
                        "RU! RU TU AU SH UV SH! UU SU RU UH AH",

                    "Hero Style":
                        "TU! UU UU RU RV SH AH! RU RU TU AH AV",

                    Heat:
                        "SU! SU RU SU UV AH RV! UU AU SU SH SV",

                    Combat:
                        "RU! UU SU AU UH TV UH! AU AU AU AH RH",

                    Fancy:
                        "UU! RU AU UU RV UH SH! UU RU TU UV RH",

                    Dangerous:
                        "AU! AU UU TU UH TH TU! SU SU TU AH TV",
                }
            },

            "Disguise: Duffle Coat": {
                variants: {

                    Default:
                        "RU! TU RU RU UH UV AH! SU TU RU UH TH",

                    "Hero Style":
                        "UU! SU TU SU AH UV RV! AU RU TU UH SV",

                    Heat:
                        "SU! RU AU TU SH TH TH! RU UU UU UV SV",

                    Combat:
                        "AU! AU UU TU TV SV UV! RU TU RU AH SH",

                    Fancy:
                        "TU! SU AU UU RV TH SV! AU TU AU RH TH",

                    Dangerous:
                        "AU! AU UU TU UV SV RH! TU AU AU UH SH",
                }
            },

            "Christmas Santa Costume": {
                variants: {

                    Default:
                        "TU! AU RU RU AH UH AV! SU UU AU TV RV ",

                    "Hero Style":
                        "AU! UU TU SU SH RV SV! UU UU AU UV SH",

                    Heat:
                        "SU! TU TU RU TV AH TH! AU UU TU SH RV",

                    Combat:
                        "RU! SU UU AU TH RH RH! RU AU UU TV SV",

                    Fancy:
                        "AU! RU SU AU RV SH UH! UU TU SU TV TH",

                    Dangerous:
                        "UU! AU AU SU UH TV UV! TU RU RU AH UV",
                }
            },

            "Villain Pirates": {
                variants: {

                    Default:
                        "SU! RU AU SU UH TH RH! SU AU TU TV UV",

                    "Hero Style":
                        "AU! SU UU SU TV RV AH! RU SU AU SH UH",

                    Heat:
                        "RU! AU RU SU AH UV SV! UU RU SU TV RH",

                    Combat:
                        "UU! TU SU TU RV UV UH! SU AU AU UH TH",

                    Fancy:
                        "TU! UU RU UU SV AH UV! AU SU UU TH TV",

                    Dangerous:
                        "AU! RU AU AU UV SH TV! AU UU TU RH SV",
                }
            },

            "Dark Night Assassin": {
                variants: {

                    Default:
                        "SU! SU RU RU SV TV AH! UU TU UU RH TV",

                    "Hero Style":
                        "AU! UU AU SU TH SH TH! AU RU RU TV UH",

                    Heat:
                        "RU! AU UU AU UV RH UV! TU SU SU TH SH",

                    Fancy:
                        "TU! TU AU SU UH UV RV! AU RU RU RH SH",
                }
            },

        }
    },


    // ================================
    // TWICE
    // ================================

    "Twice": {
        role: "V",
        styles: ["R"],
        costumes: {

            "Paper Bag Disguise": {
                variants: {

                    Default:
                        "UU! UU SU TU AH TH AH! UU SU AU TH TV",

                    "Hero Style":
                        "AU! UU AU SU RH TV RV! RU AU UU TH SH",

                    Heat:
                        "TU! SU SU AU SH SH TV! UU RU TU SH AH",

                    Combat:
                        "RU! TU RU RU AH RH SH! SU UU RU TH RH",

                    Fancy:
                        "UU! UU TU SU UV AH RV! UU TU AU UH TH",

                    Dangerous:
                        "SU! AU AU SU AH RV SH! AU RU AU TV UH",
                }
            },

            "League of Villains Suit": {
                variants: {

                    Default:
                        "SU! TU UU RU SH RV UV! UU UU SU AH TV",

                    "Hero Style":
                        "RU! RU TU UU RH SH AH! RU AU AU AV AH",

                    Heat:
                        "SU! SU RU RU UH AH RH! AU RU RU RH TV",

                    Combat:
                        "TU! UU TU AU TH TV RH! UU TU SU UH RH",

                    Fancy:
                        "AU! SU SU UU TV AH SV! SU AU SU TH SH",

                    Dangerous:
                        "UU! AU RU AU UH UH TV! RU TU SU UV UH",
                }
            },

            "Skull and Bones": {
                variants: {

                    Default:
                        "RU! RU TU RU SV UV TH! UU RU SU AH UH",

                    "Hero Style":
                        "UU! SU TU SU AV RH SH! RU TU SU TH RV",

                    Heat:
                        "TU! SU RU RU SV AH AV! AU TU AU TH UV",

                    Combat:
                        "SU! UU SU UU TV RH RV! TU AU RU AV SH",

                    Fancy:
                        "RU! AU TU RU RH TV UH! AU UU AU UV TV",

                    Dangerous:
                        "AU! SU SU TU TH RV AV! RU SU AU UH SV",
                }
            },

            "CyberpunK": {
                variants: {

                    Default:
                        "RU! UU RU AU RH UH SH! RU TU SU TV RV",

                    Heat:
                        "AU! TU RU TU RV AH TH! AU TU UU TH SH",
                }
            },

            "Villain Pirates": {
                variants: {

                    Default:
                        "SU! AU AU SU UH TV UH! SU TU UU RV TH",

                    Fancy:
                        "AU! RU AU TU SV TV AH! SU AU AU UH RH",
                }
            },

        }
    },


    // ================================
    // MR. COMPRESS
    // ================================

    "Mr. Compress": {
        role: "V",
        styles: ["U"],
        costumes: {

            "Disguise: Sweater": {
                variants: {

                    Default:
                        "RU! RU SU UU TV UH SH! UU AU RU RV SH",

                    "Hero Style":
                        "UU! SU RU TU UH SV AV! SU SU AU RV RH",

                    Heat:
                        "AU! AU AU UU AH RH SH! TU AU SU RH SH",

                    Combat:
                        "RU! AU UU RU UV SH TH! SU AU RU UH UH",

                    Fancy:
                        "TU! RU UU TU AH RV UV! TU RU RU UH SV",

                    Dangerous:
                        "SU! AU TU RU SH TV TH! RU TU SU AH TH",
                }
            },

            "League of Villains Suit": {
                variants: {

                    Default:
                        "TU! AU TU UU TH AH SV! SU AU SU AH RV",

                    "Hero Style":
                        "RU! UU TU SU UV TH AH! AU TU RU TH TV",

                    Heat:
                        "TU! UU RU TU UH AH RV! RU RU TU RV SH",

                    Combat:
                        "SU! UU UU RU TH UV RH! AU RU SU UH UV",

                    Fancy:
                        "RU! AU TU AU RH TV UH! UU SU SU UH RV",

                    Dangerous:
                        "AU! AU RU SU SH UV TV! TU SU SU AV SH",
                }
            },

            "Skull and Bones": {
                variants: {

                    Default:
                        "SU! TU RU SU TH SH TV! UU UU SU AV UV",

                    "Hero Style":
                        "UU! AU RU RU SV AV SH! TU RU UU TH AH",

                    Combat:
                        "AU! SU UU UU TV SH UV! RU SU AU SH SV",

                    Dangerous:
                        "UU! TU AU SU AH UH SH! RU TU AU TV SV",
                }
            },

            "Cyberpunk": {
                variants: {

                    Default:
                        "AU! TU UU RU SH UV AV! RU AU AU UH AH",

                    "Hero Style":
                        "SU! AU TU AU AH AH SV! AU TU UU UV SH",

                    Fancy:
                        "UU! SU AU UU TH TH RH! RU TU TU UV TV",

                    Dangerous:
                        "TU! RU RU TU TH SV AV! TU RU RU RV SH",
                }
            },

            "Villain Pirates": {
                variants: {

                    Default:
                        "TU! SU UU AU RH TV AH! AU RU TU SH RV",

                    "Hero Style":
                        "AU! TU RU UU AH TH SV! RU SU SU SV UV",
                }
            },

        }
    },


    // ================================
    // KUROGIRI
    // ================================

    "Kurogiri": {
        role: "V",
        styles: ["U"],
        costumes: {

            "Commander of Dark Clouds": {
                variants: {

                    Default:
                        "RU! AU RU SU UH RV TH! SU RU TU SH SV",

                    "Hero Style":
                        "SU! UU RU AU TH UH UV! RU UU TU UV AH",

                    Heat:
                        "RU! TU AU UU RV AH AH! UU TU SU SV SH",

                    Combat:
                        "TU! SU UU SU RH UH TV! TU RU TU RV AH",

                    Fancy:
                        "AU! RU TU AU RH TH RH! UU SU AU UV RH",

                    Dangerous:
                        "UU! RU SU AU SV RV SV! AU UU AU RH TV",
                }
            },

            "Cyberpunk": {
                variants: {

                    Default:
                        "AU! SU TU RU UH RH SH! AU TU AU TV UV",

                    "Hero Style":
                        "SU! AU RU SU TV UV RV! RU TU RU UH UH",

                    Heat:
                        "UU! RU TU AU SV RV AV! RU UU TU UH SH",

                    Combat:
                        "RU! RU AU TU UH SH SH! SU SU RU UV AH",

                    Fancy:
                        "TU! UU SU AU RH AV UV! UU AU TU RH TH",

                    Dangerous:
                        "AU! UU TU RU SV UH TH! TU AU SU SV TH",
                }
            },

        }
    },


    // ================================
    // LADY NAGANT
    // ================================

    "Lady Nagant": {
        role: "V",
        styles: ["S"],
        costumes: {

            "Hero Costume": {
                variants: {

                    Default:
                        "UU! SU UU SU RV TV RH! TU AU TU AH UH",

                    "Hero Style":
                        "RU! AU RU TU RH UH SH! RU SU UU TV SV",

                    Heat:
                        "AU! RU TU RU AH SH SV! SU TU RU SV UV",

                    Combat:
                        "SU! AU UU AU TH SV TV! RU AU UU UV SH",

                    Fancy:
                        "UU! TU AU UU TH RH AH! SU TU TU AV SV",

                    Dangerous:
                        "TU! UU AU AU SV UH UV! TU RU RU AH RV",
                }
            },

            "Hospital Gown": {
                variants: {

                    Default:
                        "SU! AU RU TU TH TV UH! AU SU TU RV SH",

                    "Hero Style":
                        "TU! TU UU AU SH RV SH! RU AU TU AH UV",

                    Heat:
                        "RU! UU SU RU UH AH UV! AU SU UU TV SV",

                    Combat:
                        "UU! AU RU TU RH SH TH! SU AU RU UV TV",

                    Fancy:
                        "AU! RU TU UU SV UV RV! SU TU AU SH UH",

                    Dangerous:
                        "SU! SU AU AU SV RV AV! AU SU TU AH SH",
                }
            },

        }
    },


    // ================================
    // OVERHAUL
    // ================================

    "Overhaul": {
        role: "V",
        styles: ["U", "A"],
        costumes: {

            "Quirk Fusion ver.": {
                variants: {

                    Default:
                        "SU! RU AU AU RH TH AH! AU RU UU SV SV",

                    "Hero Style":
                        "TU! SU TU UU AH SH SV! TU AU SU UH SH",

                    Heat:
                        "UU! RU UU SU RV UH TV! RU RU RU SH TV",

                    Combat:
                        "AU! UU RU AU SV UV UH! TU AU AU SH AH",

                    Fancy:
                        "SU! SU AU SU TH UH RH! AU UU TU UH UV",

                    Dangerous:
                        "RU! AU UU TU SH TV AH! TU SU SU TH TV",
                }
            },

            "Formal Suit": {
                variants: {

                    Default:
                        "SU! RU RU AU SH TV TV! TU SU AU UV TH",

                    "Hero Style":
                        "RU! AU SU SU UH RH UV! RU AU SU AV TV",

                    Heat:
                        "AU! SU AU TU SH UH AH! UU TU AU RV TV",

                    Combat:
                        "TU! UU SU RU UH SV TH! TU RU UU UV TH",

                    Fancy:
                        "UU! TU RU AU RH SV RV! RU UU AU TV AH",

                    Dangerous:
                        "RU! UU UU SU TV AH SH! AU TU TU UH SV",
                }
            },

            "Cyberpunk": {
                variants: {

                    Default:
                        "RU! SU SU UU AV UH RV! AU UU RU TH SV",

                    "Hero Style":
                        "AU! UU TU RU TH SV UV! SU AU AU AH TV",

                    Heat:
                        "SU! AU RU SU UV TV SH! RU RU SU AH UH",

                    Combat:
                        "UU! TU SU AU TV UV AH! RU UU TU RH UH",

                    Fancy:
                        "TU! RU UU TU RH SH AV! AU SU AU UV TV",

                    Dangerous:
                        "SU! AU AU UU UV RH TH! TU RU TU AH RV",
                }
            },

        }
    }
};

// 2. Diccionarios para traducir al formato de tus JSON
const CLASES = {
    S: "Daño",
    R: "Velocista",
    A: "Tanque",
    U: "Apoyo",
    T: "Técnico"
};

const ROLES = {
    H: "Héroe",
    V: "Villano",
    U: "Universal"
};

const trajesAdaptados = [];

// 3. Lógica para desempaquetar y traducir
for (const [nombrePersonaje, datosPersonaje] of Object.entries(CHARACTERS)) {
    for (const [nombreTraje, datosTraje] of Object.entries(datosPersonaje.costumes)) {
        for (const [nombreVariante, codigoRanuras] of Object.entries(datosTraje.variants)) {

            // Separar las ranuras por el espacio en blanco
            const ranurasArray = codigoRanuras.trim().split(/\s+/);

            const ranurasTraducidas = ranurasArray.map(codigo => {
                const esEspecial = codigo.includes("!");
                const limpio = codigo.replace("!", "");

                return {
                    tipo: esEspecial ? "Especial" : "Normal",
                    clase: CLASES[limpio[0]],
                    rol: ROLES[limpio[1]]
                };
            });

            trajesAdaptados.push({
                personaje: nombrePersonaje,
                traje: nombreTraje,
                variante: nombreVariante,
                nombre_completo: nombreVariante === "Default" ? nombreTraje : `${nombreTraje} - ${nombreVariante}`,
                ranuras: ranurasTraducidas
            });
        }
    }
}

// 4. Crear el archivo JSON final en tu computadora
fs.writeFileSync('trajes.json', JSON.stringify(trajesAdaptados, null, 4), 'utf-8');
console.log("✅ ¡Archivo trajes.json generado con éxito!");