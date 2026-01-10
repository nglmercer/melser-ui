import { LitElement, html, css, type CSSResultGroup } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ModalThemeStyles, ModalVar } from './modal-theme.js';

@customElement('modal-base')
export class ModalBase extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) closeOnBackdropClick = true;
  @property({ type: Boolean, reflect: true }) showBackdrop = true;
  @property({ type: Boolean, reflect: true }) centered = true;
  @property({ type: String, reflect: false }) ariaLabel: string | null = null;
  @property({ type: String, reflect: false }) ariaDescribedby: string | null = null;

  @query('.backdrop') private _backdropElement?: HTMLElement;

  protected updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('open')) {
      this._toggleBodyScroll(this.open);
      if (this.open) {
        window.addEventListener('keydown', this._handleKeyDown);
      } else {
        window.removeEventListener('keydown', this._handleKeyDown);
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._toggleBodyScroll(false);
    window.removeEventListener('keydown', this._handleKeyDown);
  }

  private _toggleBodyScroll(lock: boolean) {
    document.body.style.overflow = lock ? 'hidden' : '';
  }

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.open) {
      // Let the parent component handle the close event
      this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    }
  }

  private _handleBackdropClick(e: MouseEvent) {
    if (this.closeOnBackdropClick && e.target === this._backdropElement) {
      this._requestClose();
    }
  }

  private _requestClose() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private _getAriaLabel() {
    // If ariaLabel is provided, use it
    if (this.ariaLabel) {
      return this.ariaLabel;
    }
    // Otherwise, return null to let the browser infer from title slot
    return null;
  }

  render() {
    const backdropClasses = [
      'backdrop',
      this.open ? 'open' : '',
      !this.showBackdrop ? 'no-backdrop' : '',
      !this.centered ? 'not-centered' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div 
        class="${backdropClasses}"
        part="backdrop"
        @click=${this._handleBackdropClick}
      >
        <div 
          class="modal-wrapper" 
          part="modal"
          role="dialog" 
          aria-modal="true"
          aria-label="${this._getAriaLabel() || ''}"
          aria-describedby="${this.ariaDescribedby || ''}"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }

  static styles: CSSResultGroup = [
    ModalThemeStyles,
    css`
      :host { display: contents; }
      
      .backdrop {
        position: fixed;
        inset: 0;
        z-index: ${ModalVar['z-index-backdrop']};
        background: ${ModalVar['backdrop-bg']};
        backdrop-filter: blur(${ModalVar['backdrop-blur']});
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
        transition: opacity ${ModalVar['transition-duration']} ${ModalVar['transition-easing']};
      }

      .backdrop.open {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
      }

      .backdrop.no-backdrop {
        background: transparent;
        backdrop-filter: none;
      }

      .backdrop.not-centered {
        align-items: flex-start;
        padding-top: 10vh;
      }

      .modal-wrapper {
        transform: scale(0.95);
        transition: transform ${ModalVar['transition-duration']} ${ModalVar['transition-easing']};
        display: flex;
        justify-content: center;
        z-index: ${ModalVar['z-index-modal']};
      }

      .backdrop.open .modal-wrapper { transform: scale(1); }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        .backdrop,
        .modal-wrapper {
          transition: none;
        }
      }
    `
  ];
}
