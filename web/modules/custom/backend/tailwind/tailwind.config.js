let frontendConfig = {};
try {
  frontendConfig = require('../../../../themes/custom/frontend/tailwind/tailwind-nopreflight.config.js');
}
catch (err) {}

frontendConfig.content = [
  '../config/sync/*.yml',
  './modules/contrib/designsystem/src/Plugin/Field/FieldWidget/LinkitAttributes2Columns.php',
  './modules/contrib/designsystem/src/Plugin/StyleOption/ResponsiveClass.php',
  './modules/contrib/ebr/modules/ebr_stable_media/src/Plugin/Derivative/StableMediaEditLinkDeriver.php',
  './modules/contrib/ebr/modules/ebr_popup/src/Plugin/Derivative/PopupEditLinkDeriver.php',
  './modules/contrib/gin_custom/src/Plugin/Derivative/WebformSubmissionLinkDeriver.php',
  './modules/contrib/gin_custom/gin_custom.links.menu.yml',
  './modules/contrib/gin_custom/templates/*.html.twig',
  './modules/custom/backend/templates/**/*.html.twig',
  './modules/custom/backend/backend.style_options.yml',
  './modules/custom/backend/backend.links.menu.yml',
];

/* style option "column_width" uses dynamically generated breakpoint prefixes for the column widths. */
frontendConfig.safelist = frontendConfig.safelist ?? [];
let screens = [
  ...Object.keys(frontendConfig?.theme?.screens ?? frontendConfig?.presets[0]?.theme?.screens ?? {}),
  ...Object.keys(frontendConfig?.theme?.extend?.screens ?? {}),
];
let maxScreens = screens.map(screen => 'max-' + screen);
frontendConfig.safelist.push(
  {
    pattern: /basis-.+/,
    variants: [...screens, ...maxScreens],
  },
  {
    pattern: /grow(-0)?/,
    variants: [...screens, ...maxScreens],
  },
  {
    pattern: /shrink(-0)?/,
    variants: [...screens, ...maxScreens],
  },
  {
    pattern: /max-w-.+/,
    variants: [...screens, ...maxScreens],
  }
);
/* style options "grid_resposive_columns_(2|3)" uses dynamically generated breakpoint prefixes for the column widths. */
let grid_resposive_columns = [
  '[grid-template-columns:33.3333%_66.3337%]',
  '[grid-template-columns:40%_60%]',
  '[grid-template-columns:50%_50%]',
  '[grid-template-columns:60%_40%]',
  '[grid-template-columns:66.3337%_33.3333%]',
  '[grid-template-columns:33.3333%_33.3333%_33.3333%]',
  '[grid-template-columns:40%_30%_30%]',
  '[grid-template-columns:30%_40%_30%]',
  '[grid-template-columns:30%_30%_40%]',
  '[grid-auto-rows:var(--grid-row-height)]',
];
for (let bp of screens) {
  frontendConfig.safelist.push(`max-${bp}:grid-cols-1`);
  for (let cols of grid_resposive_columns) {
    frontendConfig.safelist.push(`${bp}:${cols}`);
  }
}
module.exports = frontendConfig;
