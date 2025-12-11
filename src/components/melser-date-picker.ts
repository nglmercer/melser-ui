import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { MelserBaseInput, InputVar } from '../core/melser-base-input';
import { Var } from '../theme/tokens';
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
        /* Inherit font and color from input mixin */
        font-family: inherit;
        color: ${InputVar['text-color']};
      }
      
      /* Make the calendar icon look better in supported browsers */
      input[type="date"]::-webkit-calendar-picker-indicator {
        cursor: pointer;
        opacity: 0.6;
        transition: 0.2s;
        /* Using a filter to colorize the icon based on our primary color is tricky without SVG injection.
           However, we can force it to be dark or light depending on theme if needed. 
           For now, let's keep it simple or use a token if we had one for icons specifically.
        */
        filter: invert(0.4); /* Placeholder for better contrast */
      }
      
      input[type="date"]::-webkit-calendar-picker-indicator:hover {
        opacity: 1;
      }
    `
  ];
}
