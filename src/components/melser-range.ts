import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import { Var } from '../theme/tokens';
import type { MelserDataType } from '../types/index';

@customElement('melser-range')
export class MelserRange extends MelserBaseInput<number> {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @query('input') inputElement!: HTMLInputElement;
  readonly dataType: MelserDataType = 'number';

  handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = Number(input.value);
    this.dispatchChange();
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label for="${this.inputId}">${this.label}: ${this.value}</label>` : ''}
        <input
          id="${this.inputId}"
          type="range"
          .min="${this.min}"
          .max="${this.max}"
          .step="${this.step}"
          .value="${this.value}"
          ?disabled="${this.disabled}"
          @input="${this.handleInput}"
          part="input"
        />
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  static styles = [
    MelserBaseInput.styles,
    css`
      input[type="range"] {
        padding: 0;
        border: none;
        width: 100%;
        accent-color: ${Var.color.primary};
        height: 1.5rem;
        background: transparent;
        cursor: pointer;
      }
      
      input[type="range"]:focus-visible {
        outline: 2px solid ${Var.color.primary};
        outline-offset: 2px;
        border-radius: 4px;
      }
    `
  ];
}
