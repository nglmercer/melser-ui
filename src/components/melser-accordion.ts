import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * MelserAccordion - A simple container component for accordion functionality.
 * 
 * This component provides the basic structure and styling for an accordion.
 * Users can place any elements inside and handle their own events using event delegation.
 * 
 * @example
 * ```html
 * <me-accordion>
 *   <div class="accordion-header" data-value="item1">Header 1</div>
 *   <div class="accordion-content">Content 1</div>
 *   
 *   <div class="accordion-header" data-value="item2">Header 2</div>
 *   <div class="accordion-content">Content 2</div>
 * </me-accordion>
 * ```
 * 
 * Users should add their own event listeners to handle accordion behavior:
 * ```javascript
 * const accordion = document.querySelector('me-accordion');
 * accordion.addEventListener('click', (e) => {
 *   if (e.target.classList.contains('accordion-header')) {
 *     const value = e.target.dataset.value;
 *     // Handle toggle logic
 *   }
 * });
 * ```
 */
@customElement('me-accordion')
export class MelserAccordion extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }

    ::slotted(*) {
      width: 100%;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'me-accordion': MelserAccordion;
  }
}
