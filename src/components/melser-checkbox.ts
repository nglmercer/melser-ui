import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType } from '../types/index';

@customElement('melser-checkbox')
export class MelserCheckbox extends MelserBaseInput<boolean> {
  @property({ type: Boolean }) value = false;

  readonly dataType: MelserDataType = 'boolean';

  handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.checked;
    this.dispatchChange();
  }

  // Override checkValidity for checkbox (required means must be checked)
  checkValidity(): boolean {
    if (this.required && !this.value) {
      return false;
    }
    return true;
  }

  render() {
    return html`
      <div class="input-wrapper">
        <label class="checkbox-label">
          <input
            type="checkbox"
            .checked="${this.value}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            @change="${this.handleChange}"
            part="input"
          />
          <span class="label-text">${this.label}</span>
        </label>
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  static styles = [
    MelserBaseInput.styles,
    css`
      .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
      }
      
      input[type="checkbox"] {
        width: 1.2em;
        height: 1.2em;
        margin: 0;
        cursor: pointer;
        accent-color: var(--melser-primary);
        outline: none;
      }
      
      input[type="checkbox"]:focus-visible {
        outline: 2px solid var(--melser-primary);
        outline-offset: 2px;
        border-radius: 2px;
      }
    `
  ];
}
