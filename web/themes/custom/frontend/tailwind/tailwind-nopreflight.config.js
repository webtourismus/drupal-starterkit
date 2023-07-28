const defaultHtmlRequestConfig = require('./tailwind.config.js');

defaultHtmlRequestConfig.corePlugins = {
  preflight: false,
}

module.exports = defaultHtmlRequestConfig;
