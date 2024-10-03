/**
 * ###################################################################################################################
 * ###################################################################################################################
 * Project-independent TailwindCSS config.
 * -------------------------------------------------------------------------------------------------------------------
 * This file should not be modified, overwrite settings in "tailwind.config.js" instead.
 * ###################################################################################################################
 * ###################################################################################################################
 */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    /**
     * These responsive prefixes are used by various style options.
     *
     * @see @backend/backend.style_options.yml
     * @see templates/page/html.html.twig
     */
    screens: {
      'sm': '768px',
      'md': '1024px',
      'lg': '1400px',
    },
    colors: {
      black: '#000',
      white: '#fff',
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      currentcolor: 'currentColor',
      gray: colors.neutral,
      background: 'rgb(var(--rgb-color-background) / <alpha-value>)',
      foreground: 'rgb(var(--rgb-color-foreground) / <alpha-value>)',
      onforeground: 'rgb(var(--rgb-color-onforeground) / <alpha-value>)',
      flashy: 'rgb(var(--rgb-color-flashy) / <alpha-value>)',
      onflashy: 'rgb(var(--rgb-color-onflashy) / <alpha-value>)',
      flashyhocus: 'rgb(var(--rgb-color-flashyhocus) / <alpha-value>)',
    },
    extend: {
      /**
       * The available font families for this project. By default, this is pairing of a
       * "running" font used for plain paragraphs and a "decorative" font for headlines.
       */
      fontFamily: {
        /**
         * The running font-family is used to set the font-family on the root <html> tag.
         * It must provide at least 4 style+weight variants
         * (normal, normal+italic, bold, bold+italic), because those options are
         * always available for editorial database content through in CKEditor text fields.
         */
        'family-running': [...defaultTheme.fontFamily.sans],
        /**
         * The decorative font-family is optional, and contrary to the running font
         * it should provide only those style+weight variants explicitly specified
         * by the designer's handover files.
         */
        'family-decorative': [...defaultTheme.fontFamily.serif],
      },
      fontWeight: {
        /**
         * The default font-weight for running text.
         * This value is used to set the font weight on the <html> tag in the @base layer.
         * It is explicitly listed and named here to provide the parametrised, reusable name "font-weight-default"
         * to be used with @apply in CSS files and as class name in Twig or HTML files.
         */
        'weight-default': 400,
        /**
         * The thick font-weight for running text.
         * This value is used to set the font weight on <b> and <strong> tags in the @base layer.
         * It is explicitly listed here to provide the parametrised, reusable name "font-weight-thick"
         * to be used with @apply in CSS files and as class name in Twig or HTML files.
         */
        'weight-thick': 700,
      },
      /**
       * @see https://www.drupal.org/docs/theming-drupal/z-indexes-in-drupal-8
       */
      zIndex: {
        'behind': -1,
        /**
         * Typically used for fixed navigation, corresponding to Drupal Admin toolbar
         */
        'fixed': 500,
        /**
         * Typically used for lightboxes, corresponding to Drupal modal dialogs and jQuery UI widget overlays
         */
        'modal': 1259,
      },
      /**
       * Additional settings for column widths in the layout builder. These setting should be kept in sync with
       * style options and should be available in Drupal's admin theme.
       *
       * @see modules/contrib/landle/landle.style_options.yml - options.column_width
       */
      flexBasis: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
        '10/10': '100%',
      },
      minWidth: ({ theme }) => theme('flexBasis'),
      maxWidth: ({ theme }) => theme('flexBasis'),
    }
  },
  /* Disallow Tailwind's ".block" to avoid conflicts with Drupal's ".block" entities. Use ".display-block" instead. */
  blocklist: [
    'block',
  ],
  /* Safelist running text styles for CKeditor and the colorschemes class pattern. */
  safelist: [
    'ck-content',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'btn-outline',
    'btn-filled-foreground',
    'btn-filled-flashy',
    'text-align-left',
    'text-align-center',
    'text-align-right',
    'text-align-justify',
    {
      pattern: /cs-.+/,
    },
  ],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('./colorschemas.js'),
    plugin (
      function ({ addBase, addUtilities, addVariant, matchUtilities, matchComponents, theme, e }) {

        addBase({
          'html': {
            'fontFamily': theme('fontFamily.family-running'),
            'fontWeight': theme('fontWeight.weight-default'),
          },
          'b': {
            'fontWeight': theme('fontWeight.weight-thick'),
          },
          'strong': {
            'fontWeight': theme('fontWeight.weight-thick'),
          },
        });

        addUtilities({
          '.text-align-left': {
            'textAlign': 'left',
          },
          '.text-align-center': {
            'textAlign': 'center',
          },
          '.text-align-right': {
            'textAlign': 'right',
          },
          '.text-align-justify': {
            'textAlign': 'justify',
          },
          '.display-contents': {
            'display': 'contents',
          },
          '.display-block': {
            'display': 'block',
          },
        });

        addVariant('mouse', '@media (pointer: fine) and (hover: hover)');

        addVariant('touch', '@media (pointer: coarse), (hover: none)');

        addVariant('backend', ['.is-backend &']);

        addVariant('frontend', ['.is-frontend &']);

        addVariant('frontpage', ['.is-frontpage &']);

        addVariant('summer', '.season-summer &');

        addVariant('winter', '.season-winter &');

        addVariant('not-scrolled', ['[data-scrolled=false] &']);

        addVariant('scrolled', ['[data-scrolled=true] &']);

        addVariant('no-banner', ['.node--no-banner &']);

        addVariant('has-banner', ['.node--has-banner &']);

        addVariant('large-banner', ['.node--banner--banner_lg &']);

        addVariant('overlay-open', ['[data-mainnav-overlay=true] &']);

        addVariant('overlay-close', ['[data-mainnav-overlay=false] &']);

        addVariant('hocus', ['&:hover', '&:focus']);

        addVariant('children', ['& > *']);

        addVariant('children-adjacent', ['& > * + *']);

        addVariant('children-odd', ['& > :where(:nth-child(odd))']);

        addVariant('children-even', ['& > :where(:nth-child(even))']);

        addVariant('descendants', ['& *']);

        addVariant('components', ['& :where(.component)']);

        addVariant('components-odd', ['& :where(.component:nth-child(odd))']);

        addVariant('components-even', ['& :where(.component:nth-child(even))']);

        addVariant('images', ['& img', '& svg']);

        matchUtilities(
          {
            'gap-vertical': (value) => ({
              'row-gap': value,
              '--gap-vertical': value,
            }),
          },
          {
            values: theme('spacing')
          }
        );

        matchComponents(
          {
            'gap-horizontal': (value) => [
              {
                marginLeft: `-${value}`,
                marginRight: `-${value}`,
                '--gap-horizontal': `calc(${value} * 2)`,
              },
              {
                '> :where(.fieldset-wrapper, .fieldset__wrapper)': {
                  display: 'contents',
                }
              },
              {
                '> :where(.area), > :where(.component), > :where(.form-item, .form-wrapper), :where(.gap-horizontal-child)': {
                  paddingLeft: value,
                  paddingRight: value,
                }
              }
            ]
          },
          {
            values: theme('spacing')
          }
        );
      },
    ),
  ]
}
