import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createComponentTheme } from '../theme/style-generator';
import { Var } from '../theme/tokens';

/**
 * Component-specific tokens for sidebar styling
 */
export const { styles: SidebarStyles, vars: SidebarVar } = createComponentTheme('sidebar', {
  'width': '260px',
  'width-collapsed': '64px',
  'height': '100%',
  'bg': Var.color.surface.variant,
  'border-color': Var.color.border.default,
});

@customElement('me-sidebar')
export class MelserSidebar extends LitElement {
  @property({ type: String }) position: 'left' | 'right' = 'left';
  @property({ type: Boolean, reflect: true }) collapsed = false;
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) fixed = false;
  @property({ type: Number }) navbarHeight = 64; // Default navbar height in pixels
  @property({ type: Boolean, reflect: true }) noNavbar = false; // If true, sidebar starts from top

  static styles = [
    SidebarStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: ${SidebarVar.width};
        height: ${SidebarVar.height};
        background-color: ${SidebarVar.bg};
        border-right: 1px solid ${SidebarVar['border-color']};
        transition: width 0.3s ease;
        position: relative;
      }

      :host([position="right"]) {
        border-right: none;
        border-left: 1px solid ${SidebarVar['border-color']};
      }

      :host([collapsed]) {
        width: ${SidebarVar['width-collapsed']};
      }

      :host([fixed]) {
        position: fixed;
        top: 0; /* Default: start from top unless noNavbar is false */
        height: 100vh; /* Default: full viewport height unless noNavbar is false */
        z-index: 1000;
      }

      :host([fixed][position="right"]) {
        right: 0;
      }

      :host([fixed][position="left"]) {
        left: 0;
      }

      /* When sidebar should be below navbar (default behavior) */
      :host([fixed]:not([noNavbar])) {
        top: var(--sidebar-navbar-height, 64px);
        height: calc(100vh - var(--sidebar-navbar-height, 64px));
      }

      /* When sidebar starts from top (no navbar) */
      :host([fixed][noNavbar]) {
        top: 0;
        height: 100vh;
      }

      :host([open]) {
        transform: translateX(0);
      }

      /* Content Area */
      .content {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
      }

      /* Hide logo/text content when collapsed */
      :host([collapsed]) ::slotted(.sidebar-content) > *,
      :host([collapsed]) .sidebar-content > * {
        display: none;
      }

      /* Show only the toggle button when collapsed */
      :host([collapsed]) ::slotted(.sidebar-content) > me-sidebar-toggle,
      :host([collapsed]) .sidebar-content > me-sidebar-toggle {
        display: flex;
      }

      /* Mobile responsive behavior */
      @media (max-width: 768px) {
        :host {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          z-index: 1000;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        :host([open]) {
          transform: translateX(0);
        }

        /* Never show collapsed state on mobile */
        :host([collapsed]) {
          width: ${SidebarVar.width};
        }

        :host([collapsed]) ::slotted(.sidebar-content) > *,
        :host([collapsed]) .sidebar-content > * {
          display: block;
        }

        :host([position="right"]) {
          left: auto;
          right: 0;
          transform: translateX(100%);
        }

        :host([open][position="right"]) {
          transform: translateX(0);
        }
      }

      /* Mobile overlay for fixed sidebar */
      .sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .sidebar-overlay[style*="display: block"] {
        opacity: 1;
      }

      /* Custom scrollbar */
      .content::-webkit-scrollbar {
        width: 6px;
      }

      .content::-webkit-scrollbar-track {
        background: transparent;
      }

      .content::-webkit-scrollbar-thumb {
        background: ${Var.color.border.default};
        border-radius: 3px;
      }

      .content::-webkit-scrollbar-thumb:hover {
        background: ${Var.color.text.secondary};
      }
    `
  ];

  private updateNavItemsCollapsed() {
    const navItems = this.querySelectorAll('me-nav-item');
    navItems.forEach(item => {
      if ('collapsed' in item) {
        item.collapsed = this.collapsed;
      }
    });
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateOverlay();
    this._handleMobileTransition();
    
    // Add resize listener to handle transitions
    this._handleResize = () => this._handleMobileTransition();
    window.addEventListener('resize', this._handleResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeOverlay();
    
    // Clean up resize listener
    if (this._handleResize) {
      window.removeEventListener('resize', this._handleResize);
    }
  }

  private _overlayElement: HTMLElement | null = null;
  private _handleResize: (() => void) | null = null;

  private _updateOverlay() {
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
      this._removeOverlay();
      return;
    }

    if (!this._overlayElement) {
      this._overlayElement = document.createElement('div');
      this._overlayElement.className = 'sidebar-overlay';
      this._overlayElement.style.position = 'absolute';
      this._overlayElement.style.top = '0';
      this._overlayElement.style.left = '0';
      this._overlayElement.style.right = '0';
      this._overlayElement.style.bottom = '0';
      this._overlayElement.style.background = 'rgba(0, 0, 0, 0.5)';
      this._overlayElement.style.zIndex = '999';
      this._overlayElement.style.display = this.open ? 'block' : 'none';
      this._overlayElement.style.opacity = this.open ? '1' : '0';
      this._overlayElement.style.transition = 'opacity 0.3s ease';
      
      this._overlayElement.addEventListener('click', () => this.close());
      
      // Add overlay to the parent container
      const container = this.parentElement;
      if (container) {
        container.appendChild(this._overlayElement);
      }
    } else {
      this._overlayElement.style.display = this.open ? 'block' : 'none';
      this._overlayElement.style.opacity = this.open ? '1' : '0';
    }
  }

  private _handleMobileTransition() {
    const isMobile = window.innerWidth <= 768;
    
    // When in mobile mode, ensure nav-items show full content (not collapsed)
    if (isMobile) {
      this._resetNavItemsCollapsed();
    }
  }

  private _resetNavItemsCollapsed() {
    const navItems = this.querySelectorAll('me-nav-item');
    navItems.forEach(item => {
      // Check if item has a collapsed property and reset it
      if ('collapsed' in item) {
        (item as any).collapsed = false;
      }
    });
  }

  private _removeOverlay() {
    if (this._overlayElement) {
      this._overlayElement.remove();
      this._overlayElement = null;
    }
  }

  /**
   * Toggle the collapsed state
   */
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(new CustomEvent('sidebar-toggle', {
      detail: { collapsed: this.collapsed },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Toggle the open state (for mobile/fixed sidebar)
   */
  toggleOpen(): void {
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent('sidebar-toggle-open', {
      detail: { open: this.open },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Collapse the sidebar
   */
  collapse(): void {
    this.collapsed = true;
    this.dispatchEvent(new CustomEvent('sidebar-collapse', {
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Expand the sidebar
   */
  expand(): void {
    this.collapsed = false;
    this.dispatchEvent(new CustomEvent('sidebar-expand', {
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Open the sidebar (for mobile/fixed)
   */
  openSidebar(): void {
    this.open = true;
    this.dispatchEvent(new CustomEvent('sidebar-open', {
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Close the sidebar (for mobile/fixed)
   */
  close(): void {
    this.open = false;
    this.dispatchEvent(new CustomEvent('sidebar-close', {
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Get the current width of the sidebar (only for desktop)
   * Returns 0 on mobile
   */
  getWidth(): number {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return 0;
    
    return this.collapsed ? 
      parseInt(String(SidebarVar['width-collapsed'])) : 
      parseInt(String(SidebarVar.width));
  }

  /**
   * Get the current position of the sidebar ('left' or 'right')
   */
  getPosition(): 'left' | 'right' {
    return this.position;
  }

  /**
   * Check if sidebar is visible on desktop
   */
  isVisible(): boolean {
    const isMobile = window.innerWidth <= 768;
    return !isMobile;
  }

  /**
   * Notify about width changes (for navbar to adjust)
   */
  private _notifyWidthChange() {
    if (!this.fixed) return;
    
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    this.dispatchEvent(new CustomEvent('sidebar-width-change', {
      detail: {
        width: this.getWidth(),
        position: this.getPosition(),
        collapsed: this.collapsed
      },
      bubbles: true,
      composed: true
    }));
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);
    
    // Update nav-items when collapsed state changes (only on desktop)
    const isMobile = window.innerWidth <= 768;
    if (changedProperties.has('collapsed') && !isMobile) {
      this.updateNavItemsCollapsed();
      this._notifyWidthChange();
    }
    
    // Update overlay when open state changes or on window resize
    if (changedProperties.has('open')) {
      this._updateOverlay();
    }
    
    // When switching to mobile mode, ensure nav-items are not collapsed
    if (changedProperties.has('position') || changedProperties.size > 0) {
      this._handleMobileTransition();
    }
  }
}
