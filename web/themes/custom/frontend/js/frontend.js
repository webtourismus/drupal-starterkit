(function (Drupal, drupalSettings, once) {

  'use strict';

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
            Alpine.store('linkify') == false ||
            /* disable click on a-tags inside. */
            event.target?.getAttribute('href')
          ) {
            return;
          }
          let clickEvent = new MouseEvent('click', {bubbles: true, cancelable: true});
          link.dispatchEvent(clickEvent);
        });
      });
    }
  };

  /**
   * Status messages as toasts: close button, auto hide for non-errors.
   *
   * Errors stay until closed. The timer pauses while hovered or focused.
   * Covers messages rendered by status-messages.html.twig ([data-message-type])
   * and messages added via JS by Drupal.Message ([data-drupal-message-type]).
   */
  const TOAST_SELECTOR = '[data-drupal-messages] :is([data-message-type], [data-drupal-message-type])';
  const TOAST_AUTO_HIDE_MS = 5000;

  const hideToast = (toast) => {
    if (toast.classList.contains('is-hiding')) {
      return;
    }
    toast.classList.add('is-hiding');
    // Hidden, not removed: Drupal.Message.remove() throws if its element is
    // already gone.
    const done = () => { toast.hidden = true; };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      done();
    }
    else {
      toast.addEventListener('transitionend', done, {once: true});
      // Fallback if transitionend doesn't fire.
      setTimeout(done, 500);
    }
  };

  const setupToast = (toast) => {
    let closeButton = toast.querySelector('[data-message-close]');
    if (!closeButton) {
      // Message added via JS: same markup as the twig template.
      const content = document.createElement('div');
      content.className = 'messages-container__content';
      content.append(...toast.childNodes);
      closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.className = 'messages-container__close';
      closeButton.setAttribute('data-message-close', '');
      closeButton.setAttribute('aria-label', Drupal.t('Close'));
      closeButton.innerHTML = '&times;';
      toast.append(content, closeButton);
    }
    closeButton.addEventListener('click', () => hideToast(toast));

    const type = toast.getAttribute('data-message-type') || toast.getAttribute('data-drupal-message-type');
    if (type === 'error') {
      return;
    }
    let timer = setTimeout(() => hideToast(toast), TOAST_AUTO_HIDE_MS);
    const pause = () => clearTimeout(timer);
    const resume = () => {
      clearTimeout(timer);
      timer = setTimeout(() => hideToast(toast), TOAST_AUTO_HIDE_MS);
    };
    toast.addEventListener('mouseenter', pause);
    toast.addEventListener('focusin', pause);
    toast.addEventListener('mouseleave', resume);
    toast.addEventListener('focusout', resume);
  };

  Drupal.behaviors.messageToasts = {
    attach: function (context) {
      once('message-toast', TOAST_SELECTOR, context).forEach(setupToast);

      // Drupal.Message doesn't attach behaviors to the messages it adds.
      once('message-toast-observer', 'body', context).forEach((body) => {
        new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE && node.matches(TOAST_SELECTOR)) {
                once('message-toast', node).forEach(setupToast);
              }
            });
          });
        }).observe(body, {childList: true, subtree: true});
      });
    }
  };

}(Drupal, drupalSettings, once));
