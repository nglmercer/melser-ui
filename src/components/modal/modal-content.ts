import { LitElement, html, css, type CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ModalVar, ModalThemeStyles } from './modal-theme.js';

@customElement('modal-content')
export class MelserModalContent extends LitElement {
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  @property({ type: Boolean, reflect: true }) showCloseButton = true;

  private _handleClose() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="card size-${this.size}">
        <header class="header" part="header">
          <slot name="header">
            <h2 class="title" part="title"><slot name="title">Default Title</slot></h2>
          </slot>
          ${this.showCloseButton ? html`
            <button 
              class="close-btn" 
              part="close-button"
              aria-label="Close"
              @click=${this._handleClose}
              type="button"
            >
              &times;
            </button>
          ` : ''}
        </header>
        <section class="body" part="body"><slot></slot></section>
        <footer class="footer" part="footer"><slot name="actions"></slot></footer>
      </div>
    `;
  }

  static styles: CSSResultGroup = [
    ModalThemeStyles,
    css`
      :host { display: block; }
      
      .card {
        display: flex;
        flex-direction: column;
        background-color: ${ModalVar.bg};
        border-radius: ${ModalVar.radius};
        box-shadow: ${ModalVar.shadow};
        border: 1px solid ${ModalVar['border-color']};
        max-width: ${ModalVar['max-width']};
        max-height: ${ModalVar['max-height']};
        overflow: hidden;
      }

      .size-sm { width: ${ModalVar['width-sm']}; }
      .size-md { width: ${ModalVar['width-md']}; }
      .size-lg { width: ${ModalVar['width-lg']}; }
      .size-xl { width: ${ModalVar['width-xl']}; }
      .size-full { 
        width: 95vw; 
        height: 95vh;
        max-width: 95vw;
        max-height: 95vh;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${ModalVar['header-padding']};
        border-bottom: 1px solid ${ModalVar['border-color']};
        flex-shrink: 0;
      }

      .title { 
        margin: 0; 
        color: ${ModalVar['text-primary']}; 
        font-size: 1.25rem;
        line-height: 1.4;
      }

      .body { 
        padding: ${ModalVar['body-padding']}; 
        color: ${ModalVar['text-primary']}; 
        overflow-y: auto; 
        flex: 1;
        min-height: 0;
      }

      .footer { 
        display: flex; 
        justify-content: flex-end; 
        gap: ${ModalVar.gap}; 
        padding: ${ModalVar['footer-padding']}; 
        border-top: 1px solid ${ModalVar['border-color']};
        flex-shrink: 0;
      }

      .close-btn { 
        background: transparent; 
        border: none; 
        font-size: 1.5rem; 
        line-height: 1;
        color: ${ModalVar['text-secondary']}; 
        cursor: pointer; 
        padding: 0.5rem;
        border-radius: 4px;
        transition: background-color 0.2s, color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 32px;
        min-height: 32px;
      }

      .close-btn:hover {
        background-color: rgba(0, 0, 0, 0.05);
        color: ${ModalVar['text-primary']};
      }

      .close-btn:focus {
        outline: 2px solid ${ModalVar['text-primary']};
        outline-offset: 2px;
      }

      /* Responsive styles */
      @media (max-width: 640px) {
        .card { 
          width: 100% !important; 
          border-radius: 0; 
          max-height: 100%;
          max-width: 100%;
        }
        
        .size-full {
          width: 100vw !important;
          height: 100vh;
          max-width: 100vw;
          max-height: 100vh;
        }

        .header,
        .body,
        .footer {
          padding: 1rem;
        }
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        .close-btn {
          transition: none;
        }
      }
    `
  ];
}
