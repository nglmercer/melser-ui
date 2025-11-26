import { html, css } from 'lit';
import { customElement, property,query } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType } from '../types/index';

@customElement('melser-date-picker')
export class MelserDatePicker extends MelserBaseInput<string> {
  @property({ type: String }) value = '';
  @property({ type: String }) min = '';
  @property({ type: String }) max = '';

  readonly dataType: MelserDataType = 'string';
  @query('input') inputElement!: HTMLInputElement;

  handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchChange();
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label for="${this.inputId}">${this.label}</label>` : ''}
        <div class="date-container">
          <input
            id="${this.inputId}"
            type="date"
            .value="${this.value}"
            .min="${this.min}"
            .max="${this.max}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            @input="${this.handleInput}"
            part="input"
          />
          <!-- Optional: Add a custom calendar icon here if we want to hide the default browser indicator and style our own -->
        </div>
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  static styles = [
    MelserBaseInput.styles,
    css`
      input[type="date"] {
        appearance: none;
        width: 100%;
        -webkit-appearance: none;
        position: relative;
      }
      
      /* Make the calendar icon look better in supported browsers */
      input[type="date"]::-webkit-calendar-picker-indicator {
        cursor: pointer;
        opacity: 0.6;
        transition: 0.2s;
        filter: invert(var(--melser-icon-invert, 0)); /* Handle dark mode if needed */
      }
      
      input[type="date"]::-webkit-calendar-picker-indicator:hover {
        opacity: 1;
      }
    `
  ];
}
