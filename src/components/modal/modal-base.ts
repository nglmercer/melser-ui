import { LitElement, html, css, type CSSResultGroup } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ModalThemeStyles, ModalVar as V } from './modal-theme.js';

@customElement('modal-base')
export class ModalBase extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) ManualClose = false; // ManualClose shortened
  @property({ type: Boolean, reflect: true }) BackdropHidden = false;
  @property({ type: Boolean, reflect: true }) centered = true;
  @property() ariaLabel: string | null = null;
  @property() ariaDescribedby: string | null = null;

  @query('.backdrop') private _el?: HTMLElement;

  protected updated(changed: Map<string, any>) {
    if (changed.has('open')) {
      document.body.style.overflow = this.open ? 'hidden' : '';
      const fn = this.open ? window.addEventListener : window.removeEventListener;
      fn('keydown', this._onEsc);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.body.style.overflow = '';
    window.removeEventListener('keydown', this._onEsc);
  }

  private _onEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.open) this._close();
  }

  private _onBackdropClick(e: MouseEvent) {
    // If user clicked exactly the backdrop and setting is enabled
    // Use target to check if the backdrop itself was clicked (not its children)
    if (!this.ManualClose && e.target === this._el) {
      console.log(e, e.target === this._el, this.ManualClose);
      this._close();
    }
  }

  private _close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    this.open = false;
  }

  render() {
    return html`
      <div
        class=${classMap({
          backdrop: true,
          open: this.open,
          'not-centered': !this.centered,
          'hide-bg': this.BackdropHidden
        })}
        part="backdrop"
        @click=${this._onBackdropClick}
      >
        <div
          class="modal-wrapper"
          part="modal"
          role="dialog"
          aria-modal="true"
          aria-label=${this.ariaLabel || ''}
          aria-describedby=${this.ariaDescribedby || ''}
          @click=${(e: Event) => e.stopPropagation()}
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
        z-index: ${V['z-index-backdrop']};
        background: ${V['backdrop-bg']};
        backdrop-filter: blur(${V['backdrop-blur']});
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity ${V['transition-duration']} ${V['transition-easing']};
      }

      .backdrop.open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto; /* Always allow clicks if open; JS handles logic */
      }

      /* Fixed the logic here: if BackdropHidden is false, hide the visual */
      .backdrop.hide-bg {
        background: transparent;
        backdrop-filter: none;
      }
      
      .backdrop.not-centered {
        align-items: flex-start;
        padding-top: 10vh;
      }

      .modal-wrapper {
        transform: scale(0.95);
        transition: transform ${V['transition-duration']} ${V['transition-easing']};
        z-index: ${V['z-index-modal']};
      }

      .open .modal-wrapper { transform: scale(1); }

      @media (prefers-reduced-motion: reduce) {
        .backdrop, .modal-wrapper { transition: none; }
      }
    `
  ];
}