(function (Drupal, drupalSettings, once) {

  'use strict';

  document.addEventListener('alpine:init', () => {
    Alpine.store('scrolled', false); /* @see <data id="scroll_observer"> */
    setCurrentBreakpoint(); /* @see <data id="scroll_observer"> */
  });
  /*
  Drupal.behaviors.document_ready_behavior = {
    attach: function (context, settings) {
      once('document_ready_behavior', document.documentElement, context).forEach(() => {
        console.log('This behavior will be fired only once after page load.');
      });
    }
  };

  Drupal.behaviors.dom_node_behavior = {
    attach: function (context, settings) {
      once('dom_node_behavior', '.paragraph--type--linkblock', context).forEach((element) => {
        console.log(
          `This behavior was fired by linkblock ${[...element.classList].filter(classname => classname.startsWith('paragraph--id--'))}`
        );
      });
    }
  };
  */
}(Drupal, drupalSettings, once));
