import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType, SelectOption } from '../types/index';

@customElement('melser-select')
export class MelserSelect extends MelserBaseInput<string> {
  @property({ type: String }) value = '';
  @property({ type: Array }) options: SelectOption[] = [];

  readonly dataType: MelserDataType = 'string';

  handleChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.value = select.value;
    this.dispatchChange();
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label for="select">${this.label}</label>` : ''}
        <select
          id="select"
          .value="${this.value}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          @change="${this.handleChange}"
          part="select"
        >
          <option value="" disabled selected>Select an option</option>
          ${this.options.map(opt => html`
            <option value="${opt.value}" ?selected="${opt.value === this.value}">
              ${opt.label}
            </option>
          `)}
        </select>
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  static styles = [
    MelserBaseInput.styles,
    css`
      select {
        appearance: none;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 1em;
      }
    `
  ];
}
