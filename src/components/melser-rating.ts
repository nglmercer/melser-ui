import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType } from '../types/index';

@customElement('melser-rating')
export class MelserRating extends MelserBaseInput<number> {
    @property({ type: Number }) value = 0;
    @property({ type: Number }) max = 5;

    @state() private _hoverValue = 0;

    readonly dataType: MelserDataType = 'number';

    handleMouseEnter(index: number) {
        if (this.disabled) return;
        this._hoverValue = index;
    }

    handleMouseLeave() {
        if (this.disabled) return;
        this._hoverValue = 0;
    }

    handleClick(index: number) {
        if (this.disabled) return;
        this.value = index;
        this.dispatchChange();
    }

    render() {
        return html`
      <div class="input-wrapper">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        <div class="rating-container" @mouseleave="${this.handleMouseLeave}">
          ${Array.from({ length: this.max }, (_, i) => i + 1).map(i => html`
            <span
              class="star ${i <= (this._hoverValue || this.value) ? 'active' : ''}"
              @mouseenter="${() => this.handleMouseEnter(i)}"
              @click="${() => this.handleClick(i)}"
            >
              ★
            </span>
          `)}
        </div>
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
    }

    static styles = [
        MelserBaseInput.styles,
        css`
      .rating-container {
        display: flex;
        gap: 0.25rem;
      }

      .star {
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--melser-border); /* Inactive color */
        transition: color 0.2s, transform 0.1s;
      }

      .star.active {
        color: #fbbf24; /* Gold/Yellow */
      }

      .star:hover:not(.disabled) {
        transform: scale(1.1);
      }
      
      :host([disabled]) .star {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `
    ];
}
