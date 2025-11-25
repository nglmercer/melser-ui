import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType, SelectOption } from '../types/index';

@customElement('melser-radio-group')
export class MelserRadioGroup extends MelserBaseInput<string> {
  @property({ type: String }) value = '';
  @property({ type: Array }) options: SelectOption[] = [];

  readonly dataType: MelserDataType = 'string';

  handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.checked) {
      this.value = input.value;
      this.dispatchChange();
    }
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        <div class="radio-group" role="radiogroup">
          ${this.options.map((opt) => html`
            <label class="radio-label">
              <input
                type="radio"
                name="${this.name || 'radio-group'}"
                value="${opt.value}"
                .checked="${this.value === opt.value}"
                ?disabled="${this.disabled}"
                ?required="${this.required}"
                @change="${this.handleChange}"
                part="input"
              />
              <span class="label-text">${opt.label}</span>
            </label>
          `)}
        </div>
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  static styles = [
    MelserBaseInput.styles,
    css`
      .radio-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .radio-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: normal;
        cursor: pointer;
      }
      input[type="radio"] {
        width: 1.2em;
        height: 1.2em;
        margin: 0;
        cursor: pointer;
        accent-color: var(--melser-primary);
        outline: none;
      }
      
      input[type="radio"]:focus-visible {
        outline: 2px solid var(--melser-primary);
        outline-offset: 2px;
      }
    `
  ];
}
