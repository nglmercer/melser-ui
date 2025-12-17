import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { BaseInput, InputVar } from '../core/Base';

import type { MelserDataType } from '../types/index';

@customElement('me-time-picker')
export class MelserTimePicker extends BaseInput<string> {
  @property({ type: String }) value = '';
  @property({ type: String }) min = '';
  @property({ type: String }) max = '';
  @query('input') inputElement!: HTMLInputElement;
  readonly dataType: MelserDataType = 'string';

  handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchChange();
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label for="${this.inputId}">${this.label}</label>` : ''}
        <input
          id="${this.inputId}"
          type="time"
          .value="${this.value}"
          .min="${this.min}"
          .max="${this.max}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          @input="${this.handleInput}"
          part="input"
        />
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  static styles = [
    BaseInput.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      input[type="time"] {
        appearance: none;
        -webkit-appearance: none;
        width: 100%;
        box-sizing: border-box;
      }

      /* Specific styling to ensure border/hover works if base styles are overridden by UA */
      input[type="time"]:hover:not(:disabled) {
        border-color: ${InputVar['border-color-hover']};
      }

      input[type="time"]:focus {
        border-color: ${InputVar['focus-ring-color']};
      }

      input[type="time"]::-webkit-calendar-picker-indicator {
        cursor: pointer;
        opacity: 0.6;
        transition: 0.2s;
        padding: 4px;
        /* Try to conform to the text color, or keep it standard */
      }
      
      input[type="time"]::-webkit-calendar-picker-indicator:hover {
        opacity: 1;
        background-color: ${InputVar['bg-hover']};
        border-radius: 50%;
      }
    `
  ];
}
