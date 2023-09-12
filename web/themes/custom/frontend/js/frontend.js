(function (Drupal, drupalSettings, once) {

  'use strict';

  document.addEventListener('alpine:init', () => {
    Alpine.store('scrolled', false); /* @see <data id="scroll_observer"> */
    Alpine.store('linkify', true); /* @see Drupal.behaviors.linkify */
    setCurrentBreakpoint(); /* @see <data id="scroll_observer"> */
  });

  Drupal.behaviors.linkify = {
    attach: function (context, settings) {
      once('linkify', '[data-js-behavior-linkify]', context).forEach((element) => {
        let action = element.getAttribute('data-js-behavior-linkify');
        let link = element.parentNode.querySelector(`a[data-action-link-type=${action}]`);
        if (!link) {
          console.error('Linkify without target action');
          element.classList.remove('cursor-pointer');
          return;
        }
        element.addEventListener('click', (event) => {
          if (
            /* don't trigger on splide control elements */
            event.target.getAttribute('class')?.includes('splide') ||
            /* don't trigger on SVG nodes of splide control elements */
            event.target?.ownerSVGElement?.getAttribute('class')?.includes('splide') ||
            /* other scripts that might want to interfere with linkify */
            Alpine.store('linkify') == false
          ) {
            return;
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
