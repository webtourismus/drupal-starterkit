let frontendConfig = {};
try {
  frontendConfig = require('../../../../themes/custom/frontend/tailwind/tailwind-nopreflight.config.js');
}
catch (err) {}

frontendConfig.content = [
  '../config/sync/*.yml',
  './modules/contrib/designsystem/src/Plugin/Field/FieldWidget/LinkitAttributes2Columns.php',
  './modules/contrib/ebr/modules/ebr_stable_media/src/Plugin/Derivative/StableMediaEditLinkDeriver.php',
  './modules/contrib/ebr/modules/ebr_popup/src/Plugin/Derivative/PopupEditLinkDeriver.php',
  './modules/contrib/gin_custom/src/Plugin/Derivative/WebformSubmissionLinkDeriver.php',
  './modules/contrib/gin_custom/gin_custom.links.menu.yml',
  './modules/contrib/gin_custom/templates/*.html.twig',
  './modules/custom/backend/templates/**/*.html.twig',
  './modules/custom/backend/backend.style_options.yml',
  './modules/custom/backend/backend.links.menu.yml',
];

/* column layouts use dynamically generated breakpoint prefixes for the column widths. */
frontendConfig.safelist = frontendConfig.safelist ?? [];
frontendConfig.safelist.push(
  {
    pattern: /basis-.+/,
    variants: ['sm', 'md', 'lg', 'max-sm', 'max-md', 'max-lg'],
  },
  {
    pattern: /grow.*/,
    variants: ['sm', 'md', 'lg', 'max-sm', 'max-md', 'max-lg'],
  },
  {
    pattern: /shrink.*/,
    variants: ['sm', 'md', 'lg', 'max-sm', 'max-md', 'max-lg'],
  },
  {
    pattern: /max-w-.+/,
    variants: ['sm', 'md', 'lg', 'max-sm', 'max-md', 'max-lg'],
  },
);

module.exports = frontendConfig;
