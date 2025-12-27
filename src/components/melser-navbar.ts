import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createComponentTheme } from '../theme/style-generator';
import { Var } from '../theme/tokens';

/**
 * Component-specific tokens for navbar styling
 */
export const { styles: NavbarStyles, vars: NavbarVar } = createComponentTheme('navbar', {
  'height': '64px',
  'bg': Var.color.surface.primary,
  'border-color': Var.color.border.default,
});

@customElement('me-navbar')
export class MelserNavbar extends LitElement {
  @property({ type: Boolean }) fixed = false;
  @property({ type: Boolean }) sticky = false;
  @property({ type: String }) variant: 'default' | 'light' | 'dark' = 'default';
  @property({ type: Boolean, reflect: true }) open = false;

  static styles = [
    NavbarStyles,
    css`
      :host {
        display: flex;
        height: ${NavbarVar.height};
        background-color: ${NavbarVar.bg};
        border-bottom: 1px solid ${NavbarVar['border-color']};
        align-items: center;
        position: relative;
        width: 100%;
      }

      :host([fixed]) {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
      }

      :host([sticky]) {
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      :host([variant="light"]) {
        background-color: var(--me-neutral-0, #ffffff);
        border-color: var(--me-neutral-200, #e5e7eb);
      }

      :host([variant="dark"]) {
        background-color: var(--me-neutral-900, #111827);
        border-color: var(--me-neutral-700, #374151);
      }

      /* Navbar Container */
      .navbar-container {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0;
        position: relative;
      }

      /* Mobile Menu Overlay */
      .mobile-menu-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 998;
        display: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .mobile-menu-overlay.visible {
        display: block;
        opacity: 1;
        pointer-events: auto;
      }

      /* Sections */
      .brand-section {
        display: flex;
        align-items: center;
        padding: 0 1rem;
        flex-shrink: 0;
        gap: 0.5rem;
        overflow: hidden;
      }

      .center-section {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        justify-content: center;
        overflow: hidden;
      }

      .actions-section {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0 1rem;
        flex-shrink: 0;
        overflow: hidden;
      }

      /* Mobile Menu Button */
      .mobile-menu-button {
        display: none;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        padding: 0;
        background: transparent;
        border: none;
        border-radius: ${Var.radius.default};
        cursor: pointer;
        color: ${Var.color.text.primary};
        flex-shrink: 0;
      }

      .mobile-menu-button:hover {
        background-color: ${Var.color.bg.hover};
      }

      .mobile-menu-button svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      /* Mobile Menu */
      .mobile-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: ${NavbarVar.bg};
        border-bottom: 1px solid ${NavbarVar['border-color']};
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 999;
        overflow: hidden;
        max-height: 0;
        transition: max-height 0.3s ease;
      }

      .mobile-menu.open {
        max-height: 500px;
      }

      .mobile-menu-content {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .center-section {
          display: none;
        }

        .mobile-menu-button {
          display: flex;
        }

        .mobile-menu {
          display: block;
        }
      }

      /* Show mobile menu only when open on desktop */
      @media (min-width: 769px) {
        .mobile-menu {
          display: none !important;
        }
      }
    `
  ];

  render() {
    return html`
      <div class="navbar-container">
        <!-- Mobile Menu Overlay -->
        <div class="mobile-menu-overlay ${this.open ? 'visible' : ''}" @click="${this.close}"></div>

        <!-- Brand Section -->
        <div class="brand-section">
          <slot name="brand"></slot>
        </div>

        <!-- Center Section -->
        <div class="center-section">
          <slot name="center"></slot>
        </div>

        <!-- Actions Section -->
        <div class="actions-section">
          <slot name="actions"></slot>
          <button class="mobile-menu-button" @click="${this.toggleOpen}" aria-label="Toggle mobile menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div class="mobile-menu ${this.open ? 'open' : ''}">
          <div class="mobile-menu-content">
            <slot name="mobile-menu"></slot>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    
    // Add resize listener to handle transitions
    this._handleResize = () => this._handleMobileTransition();
    window.addEventListener('resize', this._handleResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    
    // Clean up resize listener
    if (this._handleResize) {
      window.removeEventListener('resize', this._handleResize);
    }
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);
    
    // When switching to desktop, close mobile menu
    if (changedProperties.has('open')) {
      this._handleMobileTransition();
    }
  }

  private _handleResize: (() => void) | null = null;

  private _handleMobileTransition() {
    const isMobile = window.innerWidth <= 768;
    
    // When transitioning to desktop, close mobile menu
    if (!isMobile && this.open) {
      this.open = false;
    }
  }

  /**
   * Toggle the open state of the mobile menu
   */
  toggleOpen(): void {
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent('navbar-toggle-open', {
      detail: { open: this.open },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Open the mobile menu
   */
  openMenu(): void {
    this.open = true;
    this.dispatchEvent(new CustomEvent('navbar-open', {
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Close the mobile menu
   */
  close(): void {
    this.open = false;
    this.dispatchEvent(new CustomEvent('navbar-close', {
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Set navbar to fixed position
   */
  setFixed(): void {
    this.fixed = true;
    this.sticky = false;
    this.dispatchEvent(new CustomEvent('navbar-fixed', { bubbles: true }));
  }

  /**
   * Remove fixed positioning
   */
  unsetFixed(): void {
    this.fixed = false;
    this.dispatchEvent(new CustomEvent('navbar-unfixed', { bubbles: true }));
  }

  /**
   * Set navbar to sticky position
   */
  setSticky(): void {
    this.sticky = true;
    this.fixed = false;
    this.dispatchEvent(new CustomEvent('navbar-sticky', { bubbles: true }));
  }

  /**
   * Set navbar variant
   */
  setVariant(variant: 'default' | 'light' | 'dark'): void {
    this.variant = variant;
    this.dispatchEvent(new CustomEvent('navbar-variant', { 
      detail: { variant },
      bubbles: true 
    }));
  }

  /**
   * Cycle through variants
   */
  toggleVariant(): void {
    const variants: ('default' | 'light' | 'dark')[] = ['default', 'light', 'dark'];
    const currentIndex = variants.indexOf(this.variant);
    const nextIndex = (currentIndex + 1) % variants.length;
    this.variant = variants[nextIndex];
    this.dispatchEvent(new CustomEvent('navbar-variant', { 
      detail: { variant: this.variant },
      bubbles: true 
    }));
  }
}
