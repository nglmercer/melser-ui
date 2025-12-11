import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { MelserBaseInput, InputVar } from '../core/melser-base-input';
import { Var } from '../theme/tokens';
import type { MelserDataType } from '../types/index';

@customElement('melser-switch')
export class MelserSwitch extends MelserBaseInput<boolean> {
  @property({ type: Boolean }) value = false;
  @query('input') inputElement!: HTMLInputElement;
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
        gap: ${InputVar.gap};
        cursor: pointer;
      }

      .switch-container {
        position: relative;
        display: inline-block;
        width: ${InputVar['switch-width']};
        height: ${InputVar['switch-height']};
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
        background-color: ${InputVar['border-color']};
        transition: .3s;
        border-radius: ${InputVar['switch-radius']};
      }

      .slider:before {
        position: absolute;
        content: "";
        height: ${InputVar['switch-thumb-size']};
        width: ${InputVar['switch-thumb-size']};
        left: ${InputVar['switch-thumb-left']};
        bottom: ${InputVar['switch-thumb-bottom']};
        background-color: ${InputVar.bg};
        transition: .3s;
        border-radius: ${Var.radius.pill};
        box-shadow: ${InputVar['switch-shadow']};
      }

      input:checked + .slider {
        background-color: ${InputVar['control-bg-checked']};
      }

      input:focus-visible + .slider {
        box-shadow: ${InputVar['focus-shadow']};
      }

      input:checked + .slider:before {
        transform: ${InputVar['switch-thumb-transform-checked']};
      }
      
      input:disabled + .slider {
        background-color: ${InputVar['control-bg-disabled']};
        cursor: ${InputVar['disabled-cursor']};
      }
    `
  ];
}
