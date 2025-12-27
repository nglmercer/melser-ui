import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createComponentTheme } from '../theme/style-generator';
import { Var } from '../theme/tokens';

/**
 * Component-specific tokens for sidebar toggle styling
 */
export const { styles: SidebarToggleStyles, vars: SidebarToggleVar } = createComponentTheme('sidebar-toggle', {
  'size': '1.5rem',
  'radius': Var.radius.default,
});

@customElement('me-sidebar-toggle')
export class MelserSidebarToggle extends LitElement {
  @property({ type: Boolean, reflect: true }) expanded = true;

  static styles = [
    SidebarToggleStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        background: transparent;
        border: none;
        border-radius: ${SidebarToggleVar.radius};
        cursor: pointer;
        color: ${Var.color.text.primary};
        transition: background-color 0.2s ease;
      }

      :host(:hover) {
        background-color: ${Var.color.bg.hover};
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
      }

      svg {
        width: 1.25rem;
        height: 1.25rem;
        transition: transform 0.3s ease;
      }

      /* Rotate icon when collapsed */
      :host([expanded="false"]) svg {
        transform: rotate(180deg);
      }
    `
  ];

  render() {
    return html`
      <button @click="${this.handleClick}" aria-label="${this.expanded ? 'Collapse sidebar' : 'Expand sidebar'}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
    `;
  }

  private handleClick() {
    this.expanded = !this.expanded;
    this.dispatchEvent(new CustomEvent('toggle', { 
      detail: { expanded: this.expanded },
      bubbles: true,
      composed: true 
    }));
  }
}
