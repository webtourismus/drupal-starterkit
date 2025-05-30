/**
 * ###################################################################################################################
 * ###################################################################################################################
 * Colorschema plugin for TailwindCSS.
 * -------------------------------------------------------------------------------------------------------------------
 * A colorschema is a set of 6 colors:
 * - a "foreground" color (e.g. text color)
 * - a "background" color (e.g. page background or <div> container background)
 * - a "onforeground" color (foreground color over inverted background [when normal ]
 *                           e.g. text of secondary/darkgrey button)
 * - a "flashy" color (e.g. link color, header color or primary button color)
 * - a "onflashy" color (foreground color over flashy background color, e.g. primary button text)
 * - a "flashyhocus" color (variation of the flashy color, e.g. hover or focus effects on a link or primary button)
 * -------------------------------------------------------------------------------------------------------------------
 * A colorschema has to defined in a tailwind.config.js file:
 * module.exports = {
 *   theme: {
 *     colorschemas: ({theme}) => ({
 *       'purewhite': {
 *         background: 'white',
 *         foreground: '#333333',
 *         onforeground: 'white',
 *         flashy: theme('colors.my_primary.DEFAULT'),
 *         onflashy: 'white',
 *         flashyhocus: theme('colors.my_primary.500'),
 *       },
 *       'greyish': {
 *         background: '#EEEEEE',
 *         foreground: '#333333',
 *         onforeground: 'white',
 *         flashy: theme('colors.my_primary.DEFAULT'),
 *         onflashy: 'white',
 *         flashyhocus: theme('colors.my_primary.700'),
 *       },
 *       'turquoise': {
 *         background: '#22A699',
 *         foreground: '#F2BE22',
 *         onforeground: '#22A699',
 *         flashy: '#F24C3D',
 *         onflashy: '#FFF5E0',
 *         flashyhocus: '#E02110'
 *       },
 *     }
 *   }
 * }
 * -------------------------------------------------------------------------------------------------------------------
 * A colorschema can be used by applying its name with the prefix "cs-" to a container's class attribute:
 * <body class="cs-greyish">
 *   <p>I'm a boring text.</p>
 *   <div class="cs-turquise">I'm a fancy text.</div>
 * </body>
 *
 * Elements meant to be affected by colorschemas should be defined using the semantic color names listed above:
 * a {
 *   @apply text-flashy hover:text-flashyhocus focus:text-flashyhocus;
 * }
 * .button-primary {
 *   @apply bg-flashy text-onflashy hover:bg-flashyhocus;
 * }
 * .button-secondary {
 *   @apply bg-foreground/80 text-onforeground hover:bg-foreground/90;
 * }
 * .button-outline {
 *   @apply bg-transparent text-foreground border-currentcolor hover:text-flashy;
 * }
 * ###################################################################################################################
 * ###################################################################################################################
 */


const plugin = require('tailwindcss/plugin');

const colorschemas = plugin(
  function ({ addBase, addComponents, addVariant, matchVariant, theme, e }) {
    const allSchemas = theme('colorschemas');

    const toRGB = (value) => {
      const HEX = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
      const SHORT_HEX = /^#([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
      const VALUE = /(?:\d+|\d*\.\d+)%?/;
      const SEP = /(?:\s*,\s*|\s+)/;
      const ALPHA_SEP = /\s*[,/]\s*/;
      const RGB = new RegExp(`^(rgb)a?\\(\\s*(${VALUE.source})(?:${SEP.source}(${VALUE.source}))?(?:${SEP.source}(${VALUE.source}))?(?:${ALPHA_SEP.source}(${VALUE.source}))?\\s*\\)$`);

      const NAMEDCOLORS = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
      };

      if (typeof value !== "string") {
        return null;
      }
      value = value.trim();
      if (["transparent", "currentcolor", "inherit", "unset"].includes(value.toLowerCase())) {
        return value;
      }
      if (value in NAMEDCOLORS) {
        return NAMEDCOLORS[value].join(" ");
      }
      let hex = value.replace(SHORT_HEX, (_, r, g, b, a)=>[
        "#",
        r,
        r,
        g,
        g,
        b,
        b,
        a ? a + a : ""
      ].join("")).match(HEX);
      if (hex !== null) {
        return parseInt(hex[1], 16) + " " + parseInt(hex[2], 16) + " " + parseInt(hex[3], 16);
      }
      let match = value.match(RGB);
      if (match === null) {
        return null;
      }
      let color = [
        match[2],
        match[3],
        match[4]
      ].filter(Boolean).map((v)=>v.toString());
      if (color.length < 3 && !color.some((part)=>/^var\(.*?\)$/.test(part))) {
        return null;
      }
      return color.join(" ");
    }

    addComponents(
      Object.entries(allSchemas).map(([schemaKey, schemaPalette]) => {
        return {
          [`.${e(`cs-${schemaKey}`)}`]: {
            '--rgb-color-background': toRGB(schemaPalette.background),
            '--rgb-color-foreground': toRGB(schemaPalette.foreground),
            '--rgb-color-onforeground': toRGB(schemaPalette.onforeground),
            '--rgb-color-flashy': toRGB(schemaPalette.flashy),
            '--rgb-color-onflashy': toRGB(schemaPalette.onflashy),
            '--rgb-color-flashyhocus': toRGB(schemaPalette.flashyhocus),
          },
        }
      })
    );

    addComponents({
      '[class^="cs-"], [class*=" cs-"], [class*=":cs-"]': {
        '--color-background': 'rgb(var(--rgb-color-background))',
        '--color-foreground': 'rgb(var(--rgb-color-foreground))',
        '--color-onforeground': 'rgb(var(--rgb-color-onforeground))',
        '--color-flashy': 'rgb(var(--rgb-color-flashy))',
        '--color-onflashy': 'rgb(var(--rgb-color-onflashy))',
        '--color-flashyhocus': 'rgb(var(--rgb-color-flashyhocus))',
        'color': 'var(--color-foreground)',
        'background-color': 'var(--color-background)',
      }
    });

    matchVariant(
      'cs',
      (value) => {
        return `&.cs-${value}`;
      },
      {
        values: allSchemas
      }
    );

    const getColorsAsCssVariables = (colorObj, colorGroup = '') => {
      return Object.keys(colorObj).reduce((entries, colorKey) => {
        const value = colorObj[colorKey];
        let newEntry = {};
        if (['background', 'foreground', 'onforeground', 'flashy', 'onflashy', 'flashyhocus'].includes(colorKey)) {
          return { ...entries };
        }
        if (typeof value === 'string') {
          const defaultEntry = { [`--color${colorGroup}${colorKey !== 'DEFAULT' ? '-'.concat(colorKey) : ''}`]: value };
          const rgbOnlyEntry = toRGB(value) ? { [`--rgb-color${colorGroup}${colorKey !== 'DEFAULT' ? '-'.concat(colorKey) : ''}`]: toRGB(value) } : {};
          newEntry = {...defaultEntry, ...rgbOnlyEntry};
        }
        else {
          newEntry = getColorsAsCssVariables(value, `-${colorKey}`);
        }
        return { ...entries, ...newEntry };
      }, {});
    }

    addBase({
      ':root': getColorsAsCssVariables(theme('colors')),
    });
  },
);

module.exports = colorschemas;
