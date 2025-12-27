import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createComponentTheme } from '../theme/style-generator';
import { Var } from '../theme/tokens';

export const { styles: NavbarStyles, vars: NavbarVar } = createComponentTheme('navbar', {
  'height': '64px',
  'bg': Var.color.surface.primary,
  'border-color': Var.color.border.default,
  'padding': '0 1.25rem',
  'transition': '300ms cubic-bezier(0.4, 0, 0.2, 1)',
});

@customElement('me-navbar')
export class MelserNavbar extends LitElement {
  @property({ type: Boolean }) fixed = false;
  @property({ type: Boolean }) sticky = false;
  @property({ type: String }) variant: 'default' | 'light' | 'dark' = 'default';
  @state() private open = false;


static styles = [
    NavbarStyles,
    css`
      :host {
        display: block;
        width: 100%;
        height: ${NavbarVar.height};
        background-color: ${NavbarVar.bg};
        border-bottom:1px solid ${NavbarVar['border-color']};
        z-index: 100;
        font-family: ${Var.font.family};
        transition: background-color ${NavbarVar.transition}, border-color ${NavbarVar.transition};
        position: relative; 
      }
      
      :host([fixed]) { 
        position: fixed; /* Fixed is usually relative to viewport */
        top: 0; 
        left: 0; 
        right: 0;
        z-index: 1050;
      }
      
      :host([sticky]) { 
        position: sticky; 
        top: 0; 
      }

      /* Variant overrides */
      :host([variant="light"]) {
        --navbar-bg: ${Var.palette.neutral[0]};
        --navbar-border-color: ${Var.palette.neutral[200]};
      }
      :host([variant="dark"]) {
        --navbar-bg: ${Var.palette.neutral[900]};
        --navbar-border-color: ${Var.palette.neutral[700]};
      }

      .navbar-container {
        display: grid;
        /* Grid: Brand | Desktop Links | Actions */
        grid-template-columns: auto 1fr auto;
        align-items: center;
        height: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding: ${NavbarVar.padding};
        gap: 1rem;
      }

      .brand-section { 
        display: flex; 
        align-items: center; 
        gap: 0.5rem; 
      }
      
      /* DESKTOP LINKS (Default Slot) */
      .nav-desktop {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.5rem;
        height: 100%;
      }

      /* MOBILE MENU DRAWER */
      .nav-mobile-drawer {
        display: none; /* Hidden on desktop */
      }

      .actions-section {
        display: flex;
        align-items: center;
        gap: ${Var.spacing.gap.default};
      }

      .mobile-toggle {
        display: none;
        background: transparent;
        border: none;
        color: ${Var.color.text.primary};
        cursor: pointer;
        padding: 0.5rem;
        border-radius: ${Var.radius.default};
        margin-left: 0.5rem;
      }

      /* --- MOBILE BREAKPOINT --- */
      @media (max-width: 768px) {
        .navbar-container {
           /* On mobile, middle column (desktop links) collapses */
           grid-template-columns: 1fr auto; 
        }

        .mobile-toggle { 
            display: block; 
        }

        /* Hide desktop links */
        .nav-desktop {
            display: none;
        }

        /* Show Mobile Drawer Logic */
        .nav-mobile-drawer {
          display: flex;
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: ${NavbarVar.bg};
          flex-direction: column;
          padding: 1.5rem;
          border-bottom: 1px solid ${NavbarVar['border-color']};
          
          /* Animation States */
          transform: translateY(-10px);
          opacity: 0;
          pointer-events: none;
          transition: all ${NavbarVar.transition};
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
          box-sizing: border-box; /* Ensure padding doesn't break width */
        }

        :host([open]) .nav-mobile-drawer {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
      }
    `
  ];

  render() {
    return html`
      <nav class="navbar-container" role="navigation">
        <div class="brand-section">
          <slot name="brand"></slot>
        </div>

        <div class="nav-desktop">
           <slot></slot> 
        </div>

        <div class="actions-section">
          <slot name="actions"></slot>
          
          <button class="mobile-toggle" @click="${this.toggleMenu}" aria-label="Menu">
            ${this.open
              ? html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`
              : html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>`
            }
          </button>
        </div>

        <div class="nav-mobile-drawer">
            <slot name="mobile-menu"></slot>
        </div>
      </nav>
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
  private toggleMenu() {
    this.open = !this.open;
    
    // This line is crucial! It adds/removes the 'open' attribute 
    // on the <me-navbar> tag itself.
    if (this.open) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
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
