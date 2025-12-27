import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createComponentTheme } from '../theme/style-generator';
import { Var } from '../theme/tokens';

/**
 * Component-specific tokens for icon button styling
 */
export const { styles: IconButtonStyles, vars: IconButtonVar } = createComponentTheme('icon-button', {
  'size': '2.5rem',
  'icon-size': '1.25rem',
  'radius': Var.radius.default,
});

@customElement('me-icon-button')
export class MelserIconButton extends LitElement {
  @property({ type: String }) href?: string;
  @property({ type: String }) target?: '_self' | '_blank' | '_parent' | '_top' = '_self';
  @property({ type: String }) label?: string;
  @property({ type: String }) badge?: string;
  @property({ type: Boolean, reflect: true }) disabled = false;

  static styles = [
    IconButtonStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: ${IconButtonVar.size};
        height: ${IconButtonVar.size};
        padding: 0;
        background: transparent;
        border: none;
        border-radius: ${IconButtonVar.radius};
        cursor: pointer;
        color: ${Var.color.text.primary};
        transition: background-color 0.2s ease, color 0.2s ease;
        position: relative;
      }

      :host(:hover) {
        background-color: ${Var.color.bg.hover};
      }

      :host([disabled]) {
        opacity: 0.5;
        cursor: not-allowed;
      }

      :host([disabled]:hover) {
        background-color: transparent;
      }

      button,
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;
        color: inherit;
        text-decoration: none;
        cursor: inherit;
      }

      ::slotted(svg) {
        width: ${IconButtonVar['icon-size']};
        height: ${IconButtonVar['icon-size']};
      }

      ::slotted([slot="icon"]) {
        width: ${IconButtonVar['icon-size']};
        height: ${IconButtonVar['icon-size']};
      }

      /* Badge */
      .badge {
        position: absolute;
        top: 0.25rem;
        right: 0.25rem;
        min-width: 1rem;
        height: 1rem;
        padding: 0 0.25rem;
        background: var(--me-error, #ef4444);
        color: white;
        border-radius: 9999px;
        font-size: 0.65rem;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
    `
  ];

  render() {
    const icon = html`
      <slot name="icon">
        <slot></slot>
      </slot>
    `;

    const badge = this.badge ? html`<span class="badge">${this.badge}</span>` : '';

    if (this.href) {
      return html`
        <a href="${this.href}" target="${this.target}" aria-label="${this.label || ''}">
          ${icon}
          ${badge}
        </a>
      `;
    }

    return html`
      <button ?disabled="${this.disabled}" aria-label="${this.label || ''}" @click="${this.handleClick}">
        ${icon}
        ${badge}
      </button>
    `;
  }

  private handleClick(e: Event) {
    this.dispatchEvent(new CustomEvent('click', { 
      detail: e,
      bubbles: true,
      composed: true 
    }));
  }
}
