import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createComponentTheme } from '../theme/style-generator';
import { Var } from '../theme/tokens';

/**
 * Component-specific tokens for navigation item styling
 */
export const { styles: NavItemStyles, vars: NavItemVar } = createComponentTheme('nav-item', {
  'padding': '0.75rem 1rem',
  'gap': '0.75rem',
  'radius': Var.radius.default,
  'color': Var.color.text.primary,
  'color-hover': Var.color.primary,
  'color-active': Var.color.primary,
  'bg-hover': Var.color.bg.hover,
  'bg-active': Var.color.primaryLighter,
  'icon-size': '1.25rem',
});

@customElement('me-nav-item')
export class MelserNavItem extends LitElement {
  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: String, reflect: true }) href?: string;
  @property({ type: String }) target?: '_self' | '_blank' | '_parent' | '_top' = '_self';
  @property({ type: Boolean, reflect: true }) collapsed = false;

  static styles = [
    NavItemStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        gap: ${NavItemVar.gap};
        padding: ${NavItemVar.padding};
        border-radius: ${NavItemVar.radius};
        cursor: pointer;
        color: ${NavItemVar.color};
        text-decoration: none;
        transition: background-color 0.2s ease, color 0.2s ease;
        position: relative;
      }

      :host(:hover) {
        background-color: ${NavItemVar['bg-hover']};
        color: ${NavItemVar['color-hover']};
      }

      :host([active]) {
        background-color: ${NavItemVar['bg-active']};
        color: ${NavItemVar['color-active']};
      }

      ::slotted([slot="icon"]) {
        width: ${NavItemVar['icon-size']};
        height: ${NavItemVar['icon-size']};
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      ::slotted([slot="badge"]) {
        margin-left: auto;
      }

      ::slotted([slot="text"]) {
        white-space: nowrap;
        overflow: hidden;
      }

      /* Hide text and badge when collapsed */
      :host([collapsed]) ::slotted([slot="text"]),
      :host([collapsed]) ::slotted([slot="badge"]) {
        display: none;
      }

      /* Center icon when collapsed */
      :host([collapsed]) {
        justify-content: center;
      }
    `
  ];

  render() {
    const content = html`
      <slot name="icon"></slot>
      <slot name="text"></slot>
      <slot></slot>
      <slot name="badge"></slot>
    `;

    if (this.href) {
      return html`
        <a href="${this.href}" target="${this.target}" style="display: contents; color: inherit; text-decoration: inherit;">
          ${content}
        </a>
      `;
    }
    
    return content;
  }
}
