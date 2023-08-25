(function (Drupal, drupalSettings, once) {

  'use strict';

  document.addEventListener('alpine:init', () => {
    Alpine.store('scrolled', false); /* @see <data id="scroll_observer"> */
    setCurrentBreakpoint(); /* @see <data id="scroll_observer"> */
  });

  Drupal.behaviors.linkify = {
    attach: function (context, settings) {
      once('linkify', '[data-js-behavior-linkify]', context).forEach((element) => {
        let action = element.getAttribute('data-js-behavior-linkify');
        let link = element.parentNode.querySelector(`a[data-action-link-type=${action}]`);
        element.addEventListener('click', (event) => {
          if (
            event.target.getAttribute('class')?.includes('splide') ||
            event.target?.ownerSVGElement?.getAttribute('class')?.includes('splide')
          ) {
            return;
          }
          if (event.target instanceof SVGElement) {
            console.info(event.target);
          }
          let clickEvent = new MouseEvent('click', {bubbles: true, cancelable: true});
          link.dispatchEvent(clickEvent);
        });
      });
    }
  };

  /*
  Drupal.behaviors.document_ready_behavior = {
    attach: function (context, settings) {
      once('document_ready_behavior', document.documentElement, context).forEach(() => {
        console.log('This behavior will be fired only once after page load.');
      });
    }
  };
  */
}(Drupal, drupalSettings, once));
