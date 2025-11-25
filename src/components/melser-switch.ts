import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType } from '../types/index';

@customElement('melser-switch')
export class MelserSwitch extends MelserBaseInput<boolean> {
  @property({ type: Boolean }) value = false;

  readonly dataType: MelserDataType = 'boolean';

  handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.checked;
    this.dispatchChange();
  }

  checkValidity(): boolean {
    if (this.required && !this.value) {
      return false;
    }
    return true;
  }

  render() {
    return html`
      <div class="input-wrapper">
        <label class="switch-label">
          <div class="switch-container">
            <input
              type="checkbox"
              .checked="${this.value}"
              ?disabled="${this.disabled}"
              ?required="${this.required}"
              @change="${this.handleChange}"
              part="input"
            />
            <span class="slider"></span>
          </div>
          <span class="label-text">${this.label}</span>
        </label>
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  static styles = [
    MelserBaseInput.styles,
    css`
      .switch-label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
      }

      .switch-container {
        position: relative;
        display: inline-block;
        width: 48px;
        height: 24px;
      }

      input {
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--melser-border);
        transition: .3s;
        border-radius: 24px;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .3s;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }

      input:checked + .slider {
        background-color: var(--melser-primary);
      }

      input:focus-visible + .slider {
        box-shadow: 0 0 0 2px var(--melser-bg), 0 0 0 4px var(--melser-primary);
      }

      input:checked + .slider:before {
        transform: translateX(24px);
      }
      
      input:disabled + .slider {
        background-color: var(--melser-surface);
        cursor: not-allowed;
      }
    `
  ];
}
