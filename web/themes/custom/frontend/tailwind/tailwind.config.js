module.exports = {
  theme: {
    extend: {
      /**
       * See presets.config.js for typography config. e.g. stuff like
       * fontFamily: { 'family-running': ['Montserrat', sans-serif] }
       * fontWeight: { 'weight-default': 300, 'weight-thick': 600 }
       */
      fontFamily: {
        'family-running': ['Open Sans', 'sans-serif'],
      },
      /**
       * Project specific, but within project reusebable color names here.
       * Useful if shades of the same hue are needed.
       */
      colors: {
        primary: {
          verylight: '#b32934', /* e.g. oneoff shade for used in/to alternate multiple fixed CTA buttons */
          light: '#b32934', /* e.g. the flashyhocus for dark schemas */
          DEFAULT: '#a0242f', /* e.g. the default flashy color for all neutral colorschemas */
          dark: '#891f28', /* e.g. the flashyhocus for light schemas */
        }
      },
    },
    /**
     * - Colorschema keys MUST be synced with Drupal's
     *   style_options.yml => options.colorschema.options
     *   settings. The YAML must contain the same keys, but prefixed with 'cs-'.
     * - The colorschema keys "white" (with pure white bg), "black" (with pure black bg),
     *   "lightimg" and "darkimg" (with transparent bg and light/dark fg) should always exist.
     */
    colorschemas: ({theme}) => ({
      white: {
        background: 'white', /* this line should not be changed */
        foreground: 'black',
        onforeground: 'white',
        flashy: theme('colors.primary.DEFAULT'),
        onflashy: 'white',
        flashyhocus: theme('colors.primary.dark'),
      },
      'neutral-100': {
        background: '#eee',
        foreground: 'black',
        onforeground: 'white',
        flashy: theme('colors.primary.DEFAULT'),
        onflashy: 'white',
        flashyhocus: theme('colors.primary.dark'),
      },
      'neutral-900': {
        background: '#333',
        foreground: 'white',
        onforeground: '#333',
        flashy: theme('colors.primary.DEFAULT'),
        onflashy: 'white',
        flashyhocus: theme('colors.primary.light'),
      },
      black: {
        background: 'black', /* this line should not be changed */
        foreground: 'white',
        onforeground: 'black',
        flashy: theme('colors.primary.DEFAULT'),
        onflashy: 'white',
        flashyhocus: theme('colors.primary.light'),
      },
      flashy: {
        background: theme('colors.primary.DEFAULT'),
        foreground: 'white',
        onforeground: 'black',
        flashy: 'black',
        onflashy: 'white',
        flashyhocus: theme('colors.primary.dark'),
      },
      lightimg: {
        background: 'transparent', /* this line should not be changed */
        foreground: 'black',
        onforeground: 'white',
        flashy: theme('colors.primary.DEFAULT'),
        onflashy: 'white',
        flashyhocus: 'lightblue',
      },
      darkimg: {
        background: 'transparent', /* this line should not be changed */
        foreground: 'white',
        onforeground: 'black',
        flashy: theme('colors.primary.DEFAULT'),
        onflashy: 'white',
        flashyhocus: theme('colors.primary.light'),
      },
    }),
  },
  presets: [
    require('./presets.default.js')
  ],
}
