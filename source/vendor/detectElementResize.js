/**
 * Detect Element Resize.
 * https://github.com/sdecima/javascript-detect-element-resize
 * Sebastian Decima
 *
 * Forked this module because was source of errors and memory leaks.
 *
 * Rewritten using ResizeObserver
 **/

const RESIZE_EVENT = '@resize-detected';

export default function createDetectElementResize(nonce, hostWindow) {
  const firstEventTriggered = new Set();
  const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
      const element = entry.target;

      if (firstEventTriggered.has(element)) {
        element.dispatchEvent(new CustomEvent(RESIZE_EVENT));
      } else {
        firstEventTriggered.add(element);
      }
    }
  });

  const addResizeListener = function(element, fn) {
    element.addEventListener(RESIZE_EVENT, fn);
    observer.observe(element);
  };

  const removeResizeListener = function(element, fn) {
    element.addEventListener(RESIZE_EVENT, fn);
    observer.unobserve(element);
    firstEventTriggered.delete(element);
  };

  return {
    addResizeListener,
    removeResizeListener,
  };
}
