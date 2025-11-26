import { html, css } from 'lit';
import { customElement, property,query } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType } from '../types/index';

@customElement('melser-time-picker')
export class MelserTimePicker extends MelserBaseInput<string> {
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
        MelserBaseInput.styles,
        css`
      input[type="time"]::-webkit-calendar-picker-indicator {
        cursor: pointer;
        opacity: 0.6;
        transition: 0.2s;
        filter: invert(var(--melser-icon-invert, 0));
      }
      
      input[type="time"]::-webkit-calendar-picker-indicator:hover {
        opacity: 1;
      }
    `
    ];
}
