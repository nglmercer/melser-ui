/**
 * Intersection Observer utility for tracking visible elements
 */

export interface IntersectionOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export interface IntersectionHandler {
  (entries: IntersectionObserverEntry[]): void;
}

/**
 * Creates and manages an Intersection Observer for tracking element visibility
 */
export class IntersectionTracker {
  private observer: IntersectionObserver | null = null;
  private handlers = new Map<string, IntersectionHandler>();

  /**
   * Initialize the intersection observer
   */
  constructor(options: IntersectionOptions = {}) {
    const {
      root = null,
      rootMargin = '0px',
      threshold = 0.5
    } = options;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const handler = this.handlers.get(entry.target.id);
          if (handler) {
            handler([entry]);
          }
        });

        // Notify all handlers with all entries for global coordination
        this.handlers.forEach(handler => {
          handler(entries);
        });
      },
      { root, rootMargin, threshold }
    );
  }

  /**
   * Start tracking an element
   */
  observe(element: Element, handler: IntersectionHandler) {
    if (this.observer) {
      const id = element.id || `element-${Date.now()}`;
      element.id = element.id || id;
      this.handlers.set(id, handler);
      this.observer.observe(element);
    }
  }

  /**
   * Stop tracking an element
   */
  unobserve(element: Element) {
    if (this.observer) {
      this.handlers.delete(element.id);
      this.observer.unobserve(element);
    }
  }

  /**
   * Stop tracking all elements
   */
  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.handlers.clear();
    }
  }
}

/**
 * Global singleton for tracking visible sections
 */
let globalTracker: IntersectionTracker | null = null;

/**
 * Get or create the global intersection tracker
 */
export function getGlobalTracker(options?: IntersectionOptions): IntersectionTracker {
  if (!globalTracker) {
    globalTracker = new IntersectionTracker(options);
  }
  return globalTracker;
}

/**
 * Find the most visible element from a list of elements
 */
export function findMostVisibleElement(elements: Element[]): Element | null {
  if (elements.length === 0) return null;

  const visibleElements = elements.filter(el => {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight;
  });

  if (visibleElements.length === 0) return null;

  // Find element closest to top of viewport
  let closestElement = visibleElements[0];
  let minDistance = Math.abs(closestElement.getBoundingClientRect().top);

  visibleElements.forEach(el => {
    const distance = Math.abs(el.getBoundingClientRect().top);
    if (distance < minDistance) {
      minDistance = distance;
      closestElement = el;
    }
  });

  return closestElement;
}

/**
 * Check if an element is currently visible in the viewport
 */
export function isElementVisible(element: Element, threshold = 0.5): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
  const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

  if (!vertInView || !horInView) return false;

  // Check if enough of the element is visible
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
  const visibleArea = visibleHeight * visibleWidth;
  const totalArea = rect.height * rect.width;

  return (visibleArea / totalArea) >= threshold;
}
