import { html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { BaseInput, InputVar } from '../core/Base';
import type { MelserDataType } from '../types/index';

@customElement('me-checkbox')
export class MelserCheckbox extends BaseInput<boolean> {
  @property({ type: Boolean }) value = false;

  @property({ type: Boolean, reflect: true }) checked = false;
  @query('input') inputElement!: HTMLInputElement;
  readonly dataType: MelserDataType = 'boolean';

  handleChange(e: Event) {
    const input = e.target as HTMLInputElement;

    this.value = input.checked;
    this.checked = input.checked;
    this.dispatchChange();
  }

  checkValidity(): boolean {
    this.checked = this.value;
    return this.required ? this.checked : true;
  }

  render() {
    return html`
      <div class="input-wrapper" part="wrapper">
        <label class="checkbox-container" part="container">
          
          <input
            class="visually-hidden"
            type="checkbox"
            .checked="${(this.checked || this.value)}" 
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            @change="${this.handleChange}"
            part="native-input" 
          />

          <span class="control" part="control">
            <svg viewBox="0 0 24 24" part="icon">
              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
            </svg>
          </span>

          <span class="label-text" part="label">
            ${this.label}
            ${this.required ? html`<span class="required-mark">*</span>` : nothing}
          </span>
          
        </label>

        <div class="error" part="error-message">
           ${this.errorMessage}
        </div>
      </div>
    `;
  }

  static styles = [
    BaseInput.styles,
    css`
      :host {
        display: block;
      }

      .checkbox-container {
        display: inline-flex;
        align-items: center;
        gap: ${InputVar.gap};
        cursor: pointer;
        position: relative;
        width: 100%;
      }

      .visually-hidden {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0;
      }

      .control {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: ${InputVar['control-size']};
        height: ${InputVar['control-size']};
        border: ${InputVar['control-border-width']} solid ${InputVar['control-border-color']};
        border-radius: ${InputVar['control-radius']};
        background-color: ${InputVar['control-bg']};
        transition: ${InputVar['hover-transition']};
        flex-shrink: 0;
      }

      .control svg {
        width: ${InputVar['icon-size']};
        height: ${InputVar['icon-size']};
        fill: white;
        transform: scale(${InputVar['icon-scale']});
        transition: transform 0.2s ease-in-out;
      }

      input:checked + .control {
        background-color: ${InputVar['control-bg-checked']};
        border-color: ${InputVar['control-border-color-checked']};
      }

      input:checked + .control svg {
        transform: scale(${InputVar['icon-scale-checked']});
      }

      input:focus-visible + .control {
        box-shadow: ${InputVar['focus-shadow']};
      }

      /* Hover state for control */
      input:hover:not(:disabled) + .control {
        border-color: ${InputVar['control-border-color-hover']};
        background-color: ${InputVar['control-bg-hover']};
      }

      :host([variant="card"]) .checkbox-container {
        border: 1px solid ${InputVar['control-border-color']};
        padding: ${InputVar['padding-large']};
        border-radius: ${InputVar.radius};
        transition: ${InputVar['hover-transition']};
        background-color: ${InputVar['container-bg']};
      }

      :host([variant="card"]) input:checked ~ .checkbox-container,
      :host([variant="card"]) .checkbox-container:has(input:checked) {
        border-color: ${InputVar['control-border-color-checked']};
        background-color:${InputVar['bg-hover']};
      }

      /* Disabled states are inherited from base-input */
      :host([disabled]) .control {
        background-color: ${InputVar['control-bg-disabled']};
        border-color: ${InputVar['control-border-color-disabled']};
        cursor: ${InputVar['disabled-cursor']};
      }

      /* Label text styling */
      .label-text {
        color: ${InputVar['text-color']};
        font-size: ${InputVar['font-size']};
      }

      .label-text .required-mark {
        color: ${InputVar['label-color-required']};
        margin-left: 2px;
      }
    `
  ];
}