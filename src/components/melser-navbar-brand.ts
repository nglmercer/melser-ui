import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createComponentTheme } from '../theme/style-generator';
import { Var } from '../theme/tokens';

/**
 * Component-specific tokens for navbar brand styling
 */
export const { styles: NavbarBrandStyles } = createComponentTheme('navbar-brand', {
  'font-size': '1.25rem',
  'font-weight': '600',
});

@customElement('me-navbar-brand')
export class MelserNavbarBrand extends LitElement {
  @property({ type: String }) href?: string;
  @property({ type: String }) target?: '_self' | '_blank' | '_parent' | '_top' = '_self';
  @property({ type: String }) logo?: string;
  @property({ type: String }) logoAlt = 'Logo';

  static styles = [
    NavbarBrandStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none;
        color: ${Var.color.text.primary};
        font-size: 1.25rem;
        font-weight: 600;
        transition: opacity 0.2s ease;
      }

      :host(:hover) {
        opacity: 0.8;
      }

      img {
        width: 2rem;
        height: 2rem;
        object-fit: contain;
      }

      .brand-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
    `
  ];

  render() {
    const content = html`
      ${this.logo ? html`<img src="${this.logo}" alt="${this.logoAlt}" />` : ''}
      <slot></slot>
    `;

    if (this.href) {
      return html`
        <a href="${this.href}" target="${this.target}" class="brand-content">
          ${content}
        </a>
      `;
    }

    return html`<div class="brand-content">${content}</div>`;
  }
}
